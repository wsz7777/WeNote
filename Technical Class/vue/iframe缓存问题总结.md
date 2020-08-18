# iframe缓存问题总结

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。如在页面中使用iframe将http://www.baidu.com/的内容内嵌于自己的文档内容中。

## 需求描述

在多页签页面中保持各个已打开的页面的缓存（即保存离开页面时的搜索结果、查询状态、交互、高亮等）。包括各个搜索页面、列表页面以及内嵌于系统中的iframe内容。

 首先简单实现多页签切换并缓存当前页面状态

## 需求解决思路

由于该页面页签切换采取切换路由的形式，页签中的内容通过<router-view/>切换，对涉及到需要保存缓存的页面只需使用<keep-alive>将其包括即可。

```html
			<div>
        <a-tabs
          v-model={this.activeKey}
          animated={true}
          on-tabClick={this.toOtherTab}
        >
          {this.panes.map(v => (
            <a-tab-pane key={v.key} tab={v.key}></a-tab-pane>
          ))}
        </a-tabs>
        <div class={S.tabCont}>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
```



## 遇到问题（iframe缓存不生效）

使用keep-alive可以保证除iframe之外的页面保持缓存状态，在每次切换标签页时，由于路由的切换导致每次都需要重新加载iframe中的内容。

## 初步解决思路（iframe缓存不生效）

https://github.com/jmx164491960/vue-iframe-demo

该文中提出，将iframe中内容提取出来，通过采取v-show的方式对iframe页签进行切换。初步尝试已达预期效果。

## 改动（iframe缓存不生效）

设iframe组件为tabFrame组件，目前单个tabFrame标签实现缓存根据以上方式已经得到了初步的解决。但是由于项目中存在多个设施以及设备，会出现同时打开多个tabFrame组件页签的情况。上文链接中提出将tabFrame挂载于routers中，通过获取routers等一系列方式对组件进行挂载，显然与我们的需求不符。

根据示例发现，作者其实并没有在实际意义上挂载router。我们可以将已知组件直接引入到页签展示组件（以下皆为tabs.js或tabs）。在tabs中挂载组件方式如下。

```html
//tabs
				<div class={S.tabCont}>
          <RouterView
            v-show={this.$route.name !== "tab1" && this.$route.name !== "tab3"}
          />

          {this.componentsArr.map(v => (
            <tabFrame v-show={v.isOpened} key={v.name}  />
          ))}
        </div>
```

```js
//tabFrame
import Vue from "vue";
import S from "./tabs.module.scss";
export default Vue.extend({
  data() {
    return {
      info: ""
    };
  },
  props: {},
  mounted() {
    window.getInfo = this.getInfo;
  },
  methods: {
    getInfo(info) {
      this.info = info;
      console.log(info);
    }
  },
  computed: {},
  render() {
    return (
      <div class={S.flex}>
        <iframe src="/cloud/tab" style="width:100%;height:100vh"></iframe>
        <div>{this.info}</div>
      </div>
    );
  }
});

```

#### 发现问题（同时打开两个页签交互出现问题）

在上述方法中，我们可以看到iframe的缓存已经完成，但是当点击iframe中的按钮时得到的反馈信息会显示在最新打开的页签中，并不会在当前页签实现交互。根据该问题需要从tabFrame中定位问题。

#### 定位问题

组件是通过v-for/map形式渲染且已通过key值进行唯一值绑定。按照正常情况来说，各个方法以及变量不会共享。通过剖析问题得出在各个组件中都会对window对象绑定getInfo方法，在每次渲染组件时都会重新改变window的指向，当我们打开新的组件时，window即绑定新组建的getInfo方法，所以我们在旧组件点击iframe内容时交互会发生于新组件中。

#### 解决思路

首先我们的tab页面切换为更改路由更改展示内容，所以在改变window指向时可以通过各个组件监听路由变化实现window指向的变动。

切换tab页面方法如下：

```js
//tabs
toOtherTab(key) {
      console.log(key);
      const one = this.panes.find(v => v.key === key);
      const isNowTab = this.activeKey === key;
      this.activeKey = one;
      !isNowTab && this.$router.push({ name: key });
    }
```

由于组件相同，能够提供监听的条件只有路由，所以该问题需要在监听到路由变化时进行解决。

首先考虑路由导航进行路由监听，beforeRouteUpdate、beforeRouteEnter并没有实现监听。

换一种方式，通过watch对route进行监听，得到方法：

```js
//tabFrame 
watch: {
    $route(val, oldVal) {
      console.log(val, oldVal);
      window.getInfo = this.getInfo;
    }
  }
```

该方法可以监听到路由的变化，但是问题并没有解决，通过控制台可以看出，`console.log(val,oldVal)`共输出两次，如果打开三个页签，会触发三次，输出内容相同，即为最终结果，不能看出具体的执行顺序以及查看window是否指向正确的方法。

最终，通过父组件向下传递一个唯一值对每个组件进行区分，在路由监听函数中通过唯一值与路由的比较，最终使得window实现一对一正确的指向。

```js
//tabs
{this.componentsArr.map(v => (
            <tabFrame v-show={v.isOpened} key={v.name} code={v.name} />
          ))}
//tabFrame
 watch: {
    $route(val) {
      if (val.name === this.code) {
        window.getInfo = this.getInfo;
      }
    }
  }
```

## 总结

该问题难点主要分为iframe缓存问题不能依靠keep-alive解决，多开iframe点击事件交互问题（window方法指向）。针对这两个问题，通过组件持续挂载控制显隐以及监听路由修改指向的方式得到解决。关于问题的定位以及剖析，后续再做讨论。
## 背景

​	现有一个新需求，在已有的页签组件下解决路由切换页面缓存问题。该页签组件在切换页签时会通过更改路由的方式更新展示内容，其内部也含有菜单项实现路由切换更新页面展示。

```jsx
//tab内容展示
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
            <router-view />
        </div>
      </div>
```

​	当实现页签切换或者当前页签实现路由变化时，需要对已打开过的页面进行缓存处理，减少重复打开相同页面时重新渲染的次数。

## 问题分析

​	首先，页签切换都是采用路由切换形式进行页面更新，我们知晓`vue-router`进行路由切换时通过`<router-view />`匹配路由对应的组件进行渲染(动态组件)，可以通过`<keep-alive>` 对组件进行包裹实现动态组件的缓存。

​	如果项目中涉及到iframe的引入，需要考虑到keep-alive原理是把组件里的节点信息保留在了**VNode**（在内存里），在需要渲染时候从Vnode渲染到真实DOM上。iframe页里的内容并不属于节点的信息，所以使用keep-alive依然会重新渲染iframe内的内容。

​	由于组件是通过v-for/map形式渲染且已通过key值进行唯一值绑定。按照正常情况来说，各个方法以及变量不会共享。在各个组件中都会对window对象绑定getInfo方法，在每次渲染组件时都会重新改变window的指向，当我们打开新的组件时，window即绑定新组建的getInfo方法，所以我们在旧组件点击iframe内容时交互会发生于新组件中。

## 方案设计

### 方案一：简单实现

```jsx
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
          //使用<keep-alive></keep-alive>包裹<router-view />实现动态组件缓存
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
```

### 方案二：页面中含有iframe实现

​	针对iframe无法缓存的问题可以借鉴https://github.com/jmx164491960/vue-iframe-demo中的方法，将组件挂载于页签组件中，与页签内的展示内容放在一起。通过v-show控制显隐，这样的话iframe在路由切换时就不会进行重新渲染，当切换至iframe对应路由时将其v-show设为true即可实现类似如router-view的效果。

​	针对同时打开多个iframe组件交互问题，需要通过监听路由变化以及唯一值的绑定在切换页签时将window的函数指向对应的iframe页签即可实现交互的一一对应。

## 方案实现

​	当页面中含有iframe组件时，需要通过更改路由配置、在页签组件中修改页签切换逻辑等方法实现页面内容的缓存。

### 路由挂载

​	首先，在router配置文件中设定好页签切换需要用到的页面组件。其中iframe页面组件不需要挂载组件。

```jsx
routes: [
    {
      path: "/tabs",
      name: "tabs",
      meta: { title: "tab页签" },
      component: () =>
        import(/* webpackChunkName: "tabs" */ "@/views/tabs/tabs"),
      children: [
        {
          path: "/tabs/tab1",
          name: "tab1",
          meta: { title: "tab1页签" }
  			//无需挂载组件
        },
        {
          path: "/tabs/tab2",
          name: "tab2",
          meta: { title: "tab2页签" },
          component: () =>
            import(/* webpackChunkName: "tabs" */ "@/views/tabs/tab2")
        },
        {
          path: "/tabs/tab3",
          name: "tab3",
          meta: { title: "tab3页签" }
          //无需挂载组件
        },
        {
          path: "*",
          name: "404",
          component: () => import("@/views/exception/404")
        }
      ]
    },
    { path: "/", redirect: "/tabs" }
  ]
```

### 页签组件

​	配置好路由之后，开始构造多页签页面的公共页面。其中页签切换采取路由跳转方式。iframe组件的挂载也放在这个页面中，通过遍历渲染的形式同时挂载多个iframe组件。<tabFrame v-show={v.isOpened} key={v.name} code={v.name} />中code为监听路由变化的唯一值。

当页面挂载以及路由发生更新时，都会调用`getComponentsArr`方法对iframe组件进行检测以及更改组件的显隐控制。

​	i.通过懒加载的形式，当检测到数组中不存在当前路由信息的元素时新增该元素。

​	ii.遍历数组，匹配路由信息，将匹配到的元素设置为显示，将其他元素设置为隐藏。

​	iii.当路由为iframe组件相关路由时，将routerView隐藏。

```jsx
//tabs.js
import Vue from "vue";
import { tabs, button } from "ant-design-vue";
import RouterView from "./routeView";
import tab1 from "./tab1.js";
import S from "./tabs.module.scss";
//注册组件
Vue.component("tabFrame", tab1);
Vue.use(tabs);
Vue.use(button);

export default Vue.extend({
  beforeRouteUpdate(to, from, next) {
    this.getComponentsArr(to);
    next();
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.getComponentsArr(to);
      vm.activeKey = to.name;
    });
  },
  data() {
    return {
      activeKey: "",
      panes: [{ key: "tab1" }, { key: "tab2" }, { key: "tab3" }],
      componentsArr: [],
      currentRoute: {},
    };
  },
  created() {},
  props: {},
  mounted() {},
  methods: {
    //切换页签方法
    toOtherTab(key) {
      const one = this.panes.find(v => v.key === key);
      const isNowTab = this.activeKey === key;
      this.activeKey = one;
      //实现路由跳转
      !isNowTab && this.$router.push({ name: key });
    },
    //获取iframe组件数组
    getComponentsArr(to) {
      let route = {};
      if (to) {
        route = to;
      } else {
        route = this.$route;
      }
      const name = route.name;
      if (
        (name === "tab1" || name === "tab3") &&
        !this.componentsArr.find(v => v.name === name)
      ) {
        this.componentsArr.push({
          name,
          key: name,
          isOpened: false
        });
      }
      this.changeOpened(route);
    },
    //控制iframe显隐
    changeOpened(route) {
      const routeName = route.name;
      if (routeName === "tab1" || routeName === "tab3") {
        this.componentsArr.forEach(v => (v.isOpened = false));
        this.componentsArr.find(v => v.name === routeName).isOpened = true;
      } else {
        this.componentsArr.forEach(v => (v.isOpened = false));
      }
    }
  },
  computed: {},
  render() {
    return (
      <div>
        <div key="kkk">
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
            <RouterView
              v-show={
                this.$route.name !== "tab1" && this.$route.name !== "tab3"
              }
            />
            {this.componentsArr.map(v => (
              <tabFrame v-show={v.isOpened} key={v.name} code={v.name} />
            ))}
          </div>
        </div>
      </div>
    );
  }
});


//RouteView
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {},
  computed: {},
  render() {
    return (
      <keep-alive>
        <router-view />
      </keep-alive>
    );
  }
});

```

### iframe组件

​	tab1为iframe组件。由于该组件为页面组件中的局部展示组件，在监听路由时不会触发beforeRouteUpdate、beforeRouteEnter这两个钩子函数，通过watch监听$route也可以达到类似效果。

```jsx
//tab1.js
import Vue from "vue";
import S from "./tabs.module.scss";
export default Vue.extend({
  data() {
    return {
      info: ""
    };
  },
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  mounted() {
    window.getInfo = this.getInfo;
  },
  //修改window方法绑定
  watch: {
    //可以有两个参数，（newRoute，oldRoute），本例中val为newRoute
    $route(val) {
      if (val.name === this.code) {
        window.getInfo = this.getInfo;
      }
    }
  },
  methods: {
    getInfo(info) {
      this.info = info;
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

### iframe内部页面

​	iframe内部页面如下。通过触发window.parent.getInfo向tab项目中传递参数。

```jsx
//  iframe    /cloud/tab
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  props: {},
  created() {},
  mounted() {},
  methods: {
    onclick(info) {
      window.parent.getInfo(info);
    }
  },
  computed: {},
  render() {
    return (
      <div>
        <button on-click={() => this.onclick("11")}>info1</button>
        <button on-click={() => this.onclick("22")}>info2</button>
        <button on-click={() => this.onclick("33")}>info3</button>
      </div>
    );
  }
});

```



## 问题总结

​	该问题难点主要分为iframe缓存问题不能依靠keep-alive解决，多开iframe点击事件交互问题（window方法指向）。针对这两个问题，通过组件持续挂载控制显隐以及监听路由修改指向的方式得到解决。关于问题的定位以及剖析，后续再做讨论。

​	细节：

- 普通元素和特殊元素的区别是有没有通过src加载外部资源
- 页面组件和普通组件的区别 vue-router路由钩子能不能被调用问题
- router-view(组件切换)和tabFrame(多次实例化)
- 
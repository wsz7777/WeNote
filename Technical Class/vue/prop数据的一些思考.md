[toc]

# prop

`prop` 是父组件向子组件传递数据的一种方法，基础使用的话参见`vue`的官方文档

## 直接引用

```jsx
export default Vue.extend({
	name: 'props-test',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render(){
    return <div>{this.value}</div>
  }
})
```



## 拷贝使用

​	我们在实际使用时有需要去获取到父级所传的props数据进行修改，但是这种修改并不想实时去更改（类似`v-model`原理）而是需要进行一定的操作以及调整再去进行手动触发更新（例如点击确认按钮进行数据更新操作）。所以鉴于此应用场景我们有两种方式去拷贝一份数据并进行响应式化

### computed

我们先上代码：

```jsx
export default Vue.extend({
	name: 'props-test',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    valueCopy(){
      return this.value
    }
  }
  render(){
    return (  
      <div>
        <input value={this.valueCopy} on-input={(value)=>{this.$emit('input',value)}}/>
      </div>
    )
  }
})
```



### watch

```jsx
export default Vue.extend({
	name: 'props-test',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      valueCopy: [
        //{
        //  name: '字段名',
        //  value: '值'
        //}
      ]  
    }
  }
  watch: {
    value: {
      handler(val, old){
  			this.valueCopy = val
      },
      deep: true,
      immediate: true
    }
  },
  render(){
    return (  
      <div>
        {this.valueCopy.map(v => (
        	<div>
            {v.name}:
            <input v-model={v.value} />
          </div>
        ))}
        <button on-click={()=>{this.$emit('input',this.valueCoyp)}}>提交</button>
      </div>
    )
  }
})
```

然后你会发现，使用 `computed` 的时候，响应式数据依赖于父级，在使用`watch` 的时候，响应式数据依存在于当前组件。
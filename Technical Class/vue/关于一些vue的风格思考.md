[toc]

# 一些关于vue风格的思考

## 书写vue的风格

### **JSX对象** 

jsx对象可以帮助我们在视图定义上获取js的完全编程能力

1. github babel-plugin-transform-vue-jsx 的说明，实现jsx => render 的转换  https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage
2. vue官方文档相关jsx和render函数部分的相关说明 [https://vue.docschina.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1-The-Data-Object-In-Depth](https://vue.docschina.org/v2/guide/render-function.html#深入了解数据对象-The-Data-Object-In-Depth)
3. vue中使用jsx编写组件的语法 https://juejin.im/post/5affa64df265da0b93488fdd
4. 前瞻vue3.x中使用jsx https://zhuanlan.zhihu.com/p/157164874



### **Class风格组件**

编写class风格组件需要依赖以下两个库 vue-class-component 和 vue-property-decorator。前者是vue官方实现的class组件到Object options组件转换，后者是装饰器对class风格组件的增强。class组件中可以帮助我们实现开发时的this指向正确，并且最大化jsDoc的能力，避免混乱。

1. vue-class-component 官方文档  https://class-component.vuejs.org/guide/class-component.html
2. vue-property-decorator 文档  https://github.com/kaorun343/vue-property-decorator



## **啰嗦两句**

官方最开始支持的是`template（.vue）`风格组件，是出于对一个编程的理想化状态，即单文件、组件化等云云。近年来社区的诉求是完美的使用js生态所支持的内容，而不是重新定义一套页面编写方式所以`jsx`、`class`风格组件应运而生。并且`vue2.x`对`ts`的增强、`vue3.x`使用`ts`的重构，从这些事情上我们也能看到`vue`官方对于`js`的生态圈的一个态度——拥抱js的变化

`vue`的`Object Options`风格的组件里 `ts` 的类型指向无法明确，甚至某些情况下会混乱；在`template`中绑定事件方法时会混乱掉`js`开发者对`function`本身和`function`的执行结果；无法在`vscode`中看到`jsdoc`的提示......等等问题。这些问题`vue`官方解决了一部分，但是还有一些无法解决，而且解决的那一部分还需要额外安装编辑器插件来解决。并不是说这样不好，而是我们为什么不能通过`js`现有生态来解决呢，`vscode`默认支持`ts/js+jsdoc`的类型推断，其他的编辑器也在积极支持这样的方式（`webstorem`已经支持了）




[TOC]

# 地理定位

## 应用前提

现代浏览器提供了定位功能，出于安全原因，这个功能是必须受用户同意使用才可以生效的。例如你进入一个页面，浏览器的 `js` 引擎解析到有获取地理定位的行为，则会直接弹窗提示用户是否同意此网站获取地理定位的数据。

## 原理

浏览器原生提供的 `API` ，接口为 `window.navigator.geolocation` 。浏览器会自动从 `GPS` 、 `wifi` 、 `IP 地址` 、 `数据连接3G/4G` 来选择最优的方式获取最精确的地理定位。

## 接口简述

`window.navigator.geolocation` ，接口中的 `callBack` 函数是有返回延迟时间的。

| 名称               | 使用                                                      | 备注                                                         |
| ------------------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| watchPostion       | watchPosition ( successCallBack, errorCallback, Options ) | 1. 返回一个 `id` 值；<br>2. 该方法的作用是一直监听移动变化；<br>3. Option 配置参见下文。 |
| clearWatch         | clearWatch(id)                                            | 清除监听（ watchPosition ），上述 `id` 值传入清除指定位置监听方法。 |
| getCurrentPosition | getCurrentPosition()                                      |                                                              |

#### Option 参数

| 参数名             | 数据类型 | 作用                                                         |
| ------------------ | -------- | ------------------------------------------------------------ |
| enableHighAccuracy | Boolean  | 是否启用最佳结果。如果`true`设备能够提供更准确的位置，它将会这样做。请注意，这可能会导致响应时间变慢或功耗增加（例如移动设备上的GPS芯片）。另一方面，如果`false`设备可以通过更快速地响应和/或使用更少的功率来自由地节省资源。默认值：`false`。 |
| timeout            | Number   | 设置设备返回位置的最长响应时间。 （以毫秒为单位）            |
| maximumAge         | Number   | 可以返回的可能缓存位置的最大时间。如果设置为`Infinity`设备必须返回缓存位置，默认值为 `0` 。 |

```javascript
var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};
```



## 使用案例

`html` 结构部分：

```html
<div id="get">获取地址</div>
<div id="address"></div>

<div id="mask">
    <p>获取位置中。。。</p>
</div>
```

`css` 样式部分：

```css
#get {
    cursor: pointer;
}

#mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: none;
}

#mask p {
    width: 200px;
    height: 40px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

#mask.show {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

`js` 应用：

```javascript
 document.getElementById('get').onclick = function() {
 	document.getElementById('mask').classList.add('show');
 	navigator.geolocation.watchPosition(success, error);
 }

function success(msg) {
	var str = `
		<div>纬度：${msg.coords.latitude}</div>
		<div>经度：${msg.coords.longitude}</div>
		<div>精度：${msg.coords.accuracy}</div>
		<div>海拔高度：${msg.coords.altitude}</div>
	`;
	document.getElementById('address').innerHTML = str;
	document.getElementById('mask').classList.remove('show');
}

function error(msg) {
	console.log(msg);
}
```


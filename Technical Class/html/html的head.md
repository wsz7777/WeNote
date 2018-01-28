[TOC]

# document头部的优化实践

## html

`html`标签有一个属性`lang`有助于翻译

```html
<!-- 一般状态 lang="en"是在写英文网站 -->
<html lang="en"></html>

<!-- 以下是标记简体和繁体 -->
<html lang="zh-Hans"></html>
<html lang="zh-Hant"></html>

<!-- 目前写中文网页的最佳实践 -->
<html lang="zh-CN"></html>
```

实测`lang`的值为`zh-Hans`、`zh-Hant`的时候页面中的`box-sizing: border-box`属性会失效。所以目前的状态属性值设置为`zh-CN`是比较好的状态，不会莫名引起一些高级属性的失效。

## meta

### 编码

请在 `<head>` 中第一行统一使用 `utf-8` 编码声明。

```html
<meta charset="utf-8">
```

不要使用其他编码格式，`utf-8`是页面的通用编码格式。如果这里的编码格式不是`utf-8`的话应用`css`、`js`文件的时候可能会出现文件编码问题引起的各类奇葩问题。

### viewport

设置 viewport 的宽度为设备宽度，默认缩放比为 1（允许用户缩放），设置 viewport-fit=cover 以兼容 iPhone X 全面屏“刘海”的显示

```html
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
```

### 文档信息

HTML 文档的一些元数据，包括：作者、描述、关键词和生成工具；设置 robots 为 index,follow 指示搜索引擎爬虫该页面需要进入索引，并且页面内的所有链接都要继续跟踪；设置 referrer 为 origin-when-cross-origin 指示浏览器在进行跨域跳转时，其 referrer 值将统一为域名，而非具体的 URL 地址。

```html
<meta name="author" content="wsz">
<meta name="description" content="wsz">
<meta name="keywords" content="wsz,博客，笔记">
<meta name="generator" content="WeNote 1.1.1">
<meta name="robots" content="index,follow">
<meta name="referrer" content="origin-when-cross-origin">
```



### 浏览器渲染&百度搜索

- 对于国内各种双核浏览器，通过设置 `renderer` 头要求它们使用 `webkit` 内核；
- 对于 `IE` 浏览器，通过设置 `IE=edge` 要求它使用最新的版本；
- 对于百度搜索强制转码的流氓做法，通过 `no-transform` 禁止其自动转码；
- 指示浏览器对类似电话、邮箱或地址的内容不要自作聪明的瞎识别（移动端）。

```html
<!-- 渲染偏好 -->
<meta name="renderer" content="webkit">
<!-- 用在360中 -->
<meta name="force-rendering" content="webkit">
<!-- 用在其它 -->
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- 用在360中 -->
<meta name="renderer" content="webkit">
<!-- 用在其它 -->
<meta name="force-rendering" content="webkit">
<!-- 针对 IE 浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对百度搜索 -->
<meta http-equiv="Cache-Control" content="no-transform">

<meta name="format-detection" content="telephone=no,email=no,adress=no">
```

### 手机浏览器web应用适配

```html
<!-- 主题颜色 -->
<meta name="theme-color" content="#ff6600">
<!-- 应用名称 -->
<meta name="application-name" content="SnowWolf">
<!-- 隐藏状态栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">
<!-- 状态栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- iOS 下的应用名称 -->
<meta name="apple-mobile-web-app-title" content="SnowWolf">
<!-- Hover 的提示信息 -->
<meta name="msapplication-tooltip" content="SnowWolf">
<!-- 磁贴背景颜色 -->
<meta name="msapplication-TileColor" content="#ff6600">
<!-- 磁贴图标 -->
<meta name="msapplication-TileImage" content="/img/logo.png">
<!-- 磁贴配置文件 -->
<meta name="msapplication-config" content="/browserconfig.xml">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
```

### 社交分享页面

#### 推特（Twitter）

`Twitter` 卡片用于将网站内容以更加优雅漂亮的方式分享到 `twitter.com` 网站，从形式上说，分为：`summary, summary_large_image, app, player` 四种形式，通常我们的站点只需要 `summary` 这种形式。

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@melaozhu">
<meta name="twitter:title" content="此处为分享标题">
<meta name="twitter:description" content="此处为分享描述">
<meta name="twitter:image" content="此处为分享配图">
<!-- 配置上线后，你可以通过这个 Card validator 工具检查是否正确显示。 -->
```

#### 脸书（FaceBook）

Open Graph（Facebook Open Graph） 是一套开放的网页标注协议，通过 meta 标签标注网页的类型，主要由 Facebook 推动，已经成为社交分享领域的事实标准。如果你希望明确告诉社交网络或搜索引擎你的网页类型，你应该添加这些 meta 标签。

```html
<meta property="og:type" content="article">
<meta property="og:title" content="此处为分享标题">
<meta property="og:description" content="此处为分享描述">
<meta property="og:image" content="此处为分享配图">
<meta property="og:url" content="此处为分享的链接地址">

```




## link

### icon图标

```html
<!-- Browser Favicon -->
<link rel="icon" type="image/png" href="/img/logo-16.png" sizes="16x16">
<!-- Taskbar Shortcut -->
<link rel="icon" type="image/png" href="/img/logo-32.png" sizes="32x32">
<!-- Desktop Shortcut -->
<link rel="icon" type="image/png" href="/img/logo-96.png" sizes="96x96">
<!-- Chrome Web Store -->
<link rel="icon" type="image/png" href="/img/logo-128.png" sizes="128x128">
<!-- Chrome for Android Home Screen -->
<link rel="icon" type="image/png" href="/img/logo-196.png" sizes="196x196">
<!-- Opera Coast Icon -->
<link rel="icon" type="image/png" href="/img/logo-228.png" sizes="228x228">
<!-- iPhone -->
<link rel="apple-touch-icon" href="/img/logo-120.png">
<!-- iPad -->
<link rel="apple-touch-icon" href="/img/logo-152.png" sizes="152x152">
<!-- iPhone Plus -->
<link rel="apple-touch-icon" href="/img/logo-180.png" sizes="180x180">
<!-- iPad Pro -->
<link rel="apple-touch-icon" href="/img/logo-167.png" sizes="167x167">
<!-- Safari Pinned Tab Icon -->
<link rel="mask-icon" href="/img/logo.svg" color="green">
<!-- Icons -->
```

虽说所有浏览器都还支持过时的 favicon.ico 格式，但在 HTML5 时代，我们应该使用更好的 PNG icon with sizes 方案。同时为了兼容老旧浏览器，我们可以将生成好的 favicon.ico 文件放在网站的根目录下面，通常浏览器会自动请求并加载它，并不需要额外通过 link 标签引入。

#### 微软

微软为了让 Metro UI 更好看，引入了 browserconfig.xml 文件，主要用于定制网站固定磁铁的图标和背景颜色，其格式如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/img/logo-70.png" />
            <square150x150logo src="/img/logo-150.png" />
            <wide310x150logo src="/img/logo-310x150.png" />
            <square310x310logo src="/img/logo-310.png" />
            <TileImage src="/img/logo-144.png" />
            <TileColor>#db5945</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

favicon.ico 实际上是一个图片容器，里面至少应该包含 16x16，32x32，48x48 三个尺寸的 png 图片，我们可以使用 ImageMagick 工具在本地直接生成（生成之前需要对 png 图片进行压缩以减小尺寸）。$ convert favicon-16.png favicon-32.png favicon-48.png favicon.ico

> 注意：apple-mobile-web-app-status-bar-style 值默认状态栏为白色，可设置为 black（黑色） 或者 black-translucent（灰色半透明）；mask-icon 引入的 svg 文件必须只有一个图层，并且 viewBox 属性应该为 “0 0 16 16”。

### DNS预加载

DNS预加载是浏览器先对其域名进行dns预解析，并对解析内容缓存，等到用户点击的时候直接读取缓存。从而提高解析速度。

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//域名">
```

### 预请求

指示浏览器预先请求用户即将浏览页面所需要的关键性资源。可以看做是dns预解析进一步的预加载优化。

```html
<link rel="prefetch" href="/img/css-sprite.png">
<link rel="prefetch" href="/fonts/icons.woff2">
```

### 页面打印设置

对于可打印的页面（如文章页面），可提供针对打印机的样式表，使得网站用户可以将文章打印下来阅读。

```html
<link rel="stylesheet" href="/css/print.css" media="print">
```

### 交替样式表

定义交替样式表的时候，指定其 title 属性，以方便用户在浏览器中根据名称选择替代样式，交替样式表多用于多主题切换的站点

```html
<link href="default.css" rel="stylesheet">
<link href="high-contrast.css" rel="alternate stylesheet" title="High contrast">
```

### 固定连接

对于一份文档存在多个 URL 的情况，通过 rel="canonical" 指定唯一的固定链接。

```html
<link rel="canonical" href="https://laozhu.me/">
```
### RSS订阅

RSS 链接。对于支持 RSS 订阅的页面，可针对 RSS 阅读器提供可订阅的源文件。

```html
<link rel="alternative" href="/index.xml" title="米老朱的博客" type="application/atom+xml">
```
## IE9兼容h5（Polyfill）

可以专门为老旧的 IE 浏览器引入 `Polyfill` 方案，举个例子，为了让 `IE6-IE8` 浏览器能够使用 `HTML5` 标签和 `Media Query` 特性，我们需要引入 `html5shiv.js` 和 `response.js` 这两个库。

```html
<!--[if lt IE 9]>
	<script src="//cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  	<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>     
<![endif]-->
```




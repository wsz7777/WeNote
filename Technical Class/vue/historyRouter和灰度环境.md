[TOC]

# Router--History

## fontend project config

需要在`router.js`中设置如下内容

```js
export default new Router({
  mode: 'history',		               // 声明是 history 模式
  base: process.env.BASE_URL,    // 路径访问前缀 从port之后到router之前的 路径
	  ...
  ...
})
```



## Nginx config

Nomal config

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

自定义配置

```nginx
set $feurl /app/jf-mall/experimental/jf-fontend;
location /jf-fontend/jf-uactive {
	    alias $feurl/jf-uactive;
    try_files $uri $uri/ @jf-uactive;
    error_page 405 =200 $request_uri;
}
location @jf-uactive {
    rewrite ^(.+)$ /jf-fontend/jf-uactive/index.html last;
}
```

## 配合灰度环境

当前做的灰度环境是基于cookie分流实现的

```flow
st=>start: 请求：9001
e=>end: 按指定路径访问资源

url1=>operation: 
url2=>operation: 

co=>condition: cookie是否带有“name="xxxx"”
serve1=>operation: 正常环境服务
服务端口：10002
serve2=>operation: 灰度环境服务
服务端口：10003

st->co
co(yes)->serve2->e
co(no)->serve1->e

```

### 分流代码

按照端口直接分流

```nginx
location /jf-fontend {
    set $fe_port 10002;
    if ($cookie_name = "xxxx") {
        set $fe_port 10003;
    }
    proxy_pass http://xx.xx.xx.xx:$fe_port;
}
```

### 测试正常环境配置

```nginx
server {
    listen 10002;
    location /jf-fontend {
        alias /app/jf-mall/commonstatic02/jf-fontend;
    }
}
```

### 测试灰度环境

```nginx
server {
    listen 10003;
    set $feurl /app/jf-mall/experimental/jf-fontend;
    location /jf-fontend/jf-uactive {
        alias $feurl/jf-uactive;
        try_files $uri $uri/ @jf-uactive;
        error_page 405 =200 $request_uri;
    }
    location @jf-uactive {
        rewrite ^(.+)$ /jf-fontend/jf-uactive/index.html last;
    }
    location /jf-fontend/jf-confactive {
        alias $feurl/jf-confactive;
        try_files $uri $uri/ @jf-confactive;
        error_page 405 =200 $request_uri;
    }
    location @jf-confactive {
        rewrite ^(.+)$ /jf-fontend/jf-confactive/index.html last;
    }
    location /jf-fontend/jf-mfullstack {
        alias $feurl/jf-mfullstack;
    }
    location /jf-fontend/jf-wfullstack {
        alias $feurl/jf-wfullstack;
    }
    location /jf-fontend/jf-taro-donation {
        alias $feurl/jf-taro-donation;
    }
}
```


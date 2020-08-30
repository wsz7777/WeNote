[toc]

# .npmrc 相关配置

## 配置内容

```
disturl=https://npm.taobao.org/dist
nvm_nodejs_org_mirror=http://npm.taobao.org/mirrors/node
nodejs_org_mirror=http://npm.taobao.org/mirrors/node
sass_binary_site=http://npm.taobao.org/mirrors/node-sass
electron_mirror=http://npm.taobao.org/mirrors/electron/
SQLITE3_BINARY_SITE=http://npm.taobao.org/mirrors/sqlite3
profiler_binary_host_mirror=http://npm.taobao.org/mirrors/node-inspector/
node_inspector_cdnurl=https://npm.taobao.org/mirrors/node-inspector
selenium_cdnurl=http://npm.taobao.org/mirrors/selenium
puppeteer_download_host=https://npm.taobao.org/mirrors
chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
fse_binary_host_mirror=https://npm.taobao.org/mirrors/fsevents
home=https://npm.taobao.org
registry=https://registry.npm.taobao.org/
```

## 配置项

​	npm包安装时默认依赖的国外的镜像源，我们想在国内下载变快一点需要配置一下 `registry` 和 `home` 这个环境变量

​	有些需要安装脚本来实现，并且需要一些额外的二进制库。所以需要配置额外的环境变量来实现使用国内镜像源
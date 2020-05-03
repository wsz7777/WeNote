[TOC]

# npm update
## do
Use this code to do.
```bash
npm i npm -g
```
## question
We can use `npm i -g npm` made our npm to update.
But sometimes have question it do nothing.
## function
In China use it, we should change npm's source. So we need execution these code:
```Bash
npm config set registry https://registry.npm.taobao.org
sudo npm i npm -g
```
About this we can use `nrm` to change the npm's source.

Oh, I have an other way: Edit the `~/.npmrc` file, append something to it

```
registry=https://registry.npm.taobao.org

disturl="https://npm.taobao.org/dist"
nvm_nodejs_org_mirror="http://npm.taobao.org/mirrors/node"
nodejs_org_mirror="http://npm.taobao.org/mirrors/node"
sass_binary_site="http://npm.taobao.org/mirrors/node-sass"
electron_mirror="http://npm.taobao.org/mirrors/electron/"
SQLITE3_BINARY_SITE="http://npm.taobao.org/mirrors/sqlite3"
profiler_binary_host_mirror="http://npm.taobao.org/mirrors/node-inspector/"
node_inspector_cdnurl="https://npm.taobao.org/mirrors/node-inspector"
selenium_cdnurl="http://npm.taobao.org/mirrors/selenium"
puppeteer_download_host="https://npm.taobao.org/mirrors"
chromedriver_cdnurl="https://npm.taobao.org/mirrors/chromedriver"
operadriver_cdnurl="https://npm.taobao.org/mirrors/operadriver"
phantomjs_cdnurl="https://npm.taobao.org/mirrors/phantomjs"
fse_binary_host_mirror="https://npm.taobao.org/mirrors/fsevents"
```

it's make erverything ok


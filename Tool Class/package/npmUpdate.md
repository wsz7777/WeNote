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
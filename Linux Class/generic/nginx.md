[TOC]

# Nginx

## 安装

### 手动安装

```shell
# 获取安装包
wget  http://nginx.org/download/nginx-1.16.0.tar.gz

# 解压
tar -zxvf nginx-1.16.0.tar.gz

# 修改配置
cd nginx-1.16.0
./configure --prefix=/usr/local/nginx \
--with-http_slice_module \
--with-http_mp4_module \
--with-http_ssl_module \
--with-http_sub_module \
--with-http_gzip_static_module \
--with-http_stub_status_module \
--with-stream
```

> #### 参数说明：
>
> - `--prefix` 用于指定nginx编译后的安装目录
> - `--add-module` 为添加的第三方模块
> - `--with..._module` 表示启用的`nginx`模块，如此处启用了好几个模块
>
> #### 可能出现的错误：
>
> 1. 出现：`./configure:  error: the HTTP rewrite module requires the PCRE library.`
>    解决方法：`yum -y install pcre-devel`
> 2. 出现：`SSL modules require the OpenSSL library`
>    解决方法：`yum install openssl-devel` 



```shell
# 在nginx-1.16.0目录下
make & make install
```


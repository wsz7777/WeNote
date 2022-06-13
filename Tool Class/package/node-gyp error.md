[toc]

# node-gyp error

### 没有 binding.gyp

![image-20210507181837586](node-gyp%20error.assets/image-20210507181837586.png)

```bash
$ cd [global npm]/node_modules/node-gyp
$ vim binding.gyp
```

```json
// 填入以下内容
{
	"targets": [
		{
			"target_name": "binding",
			"sources": [ "build/Release/binding.node" ]
		}
	]
}
```



### 没有 g++

![image-20210507182519166](node-gyp%20error.assets/image-20210507182519166.png)

```bash
$ sudo apt-get install g++ -y
```



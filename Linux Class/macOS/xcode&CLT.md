# 两种解决方式：

## 第一种

```
# just for а preview (not necessary)
xcode-select --print-path
# in my case it printed `/Library/Developer/CommandLineTools`

# could be useful if the path is making a problem
sudo xcode-select --switch /Library/Developer/CommandLineTools

# only for the (I) resetting case
sudo xcode-select --reset

# only for the (II) uninstalling case - the next line deletes folder returned by the `xcode-select --print-path` command
sudo rm -rf $(xcode-select --print-path)


# only for the (II) uninstalling case - install tools (again) if you don't get a default installation prompt
xcode-select --install
```

## 第二种

1. 检查更新 softwareupdate -l
2. 穿紧固件一个空文件 sudo touch /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
3. 再次检查更新 softwareupdate -l
4. Command + space 查找 Software Update 工具
5. 点击更新
6. 移除空文件 sudo rm /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress

NOTE:

You do not need to do it per project, but only once
There was also discussion that you have to do it on every OSX update, in my case, later updating the OSX system didn't trigger this issue again
Credits to: [gyp: No Xcode or CLT version detected macOS Catalina](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d)

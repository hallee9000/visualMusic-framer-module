# Framer音乐视觉化模块

这个Framer module可以帮助你完成音频处理的任务，让你专注于可视化的创意。

## 使用方法

先在你的项目文件夹/modules里面添加`visual-music.coffee`文件，然后再在主文件`app.coffee`中添加以下代码。

```CoffeeScript
# 引入模块
visualMusic = require 'visual-music'
# 实例化一个对象
vm = new visualMusic
	src:'audio.mp3'
# 开始视觉化，每16.7毫秒执行一次
# 返回的sa是一个包含1024个元素的数组，每个元素都是一个0-255之间（包含0和255）的数字
vm.onVisualizing = (sa)->
    print sa
    # 你的代码
# 开始播放音乐
vm.play()
```

当然你也可以选择自动播放

```CoffeeScript
# 引入模块
visualMusic = require 'visual-music'
# 实例化一个对象
vm = new visualMusic
	src:'audio.mp3'
    autoPlay:true
# 开始视觉化
vm.onVisualizing = (sa)->
    print sa
    # 你的代码
```
## 效果演示

这是我写的一个效果，即visualMusic.framer项目。
![](demo.gif)

你可以下载下来参考一下，玩的开心哦。

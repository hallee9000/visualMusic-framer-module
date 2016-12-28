# Framer音频视觉化模块
[[English version](#A Framer module to visualize music)]

这个Framer module可以帮助你完成音频处理的任务，让你专注于可视化的创意。

### 使用方法

先在你的`项目文件夹/modules`里面添加`visual-music.coffee`文件，然后再在主文件`app.coffee`中添加以下代码。

初始化音频可视化对象：

```CoffeeScript
# 引入模块
visualMusic = require 'visual-music'
# 实例化一个对象，并添加音频
vm = new visualMusic
	src:'audio.mp3'
```

实时接收并将数据可视化：

```CoffeeScript
# 开始视觉化，里面你的代码每秒执行60次
# 返回的sa是一个包含1024个元素的数组，每个元素都是一个0-255之间（包含0和255）的数字
vm.onVisualizing = (sa)->
    print sa
    # 你的代码
# 开始播放音乐
vm.play()
```

当然你也可以实用配置项`autoPlay`让音频自动播放。

```CoffeeScript
# 引入模块
visualMusic = require 'visual-music'
# 实例化一个对象
vm = new visualMusic
	src:'audio.mp3'
    autoPlay: true
```

### 效果演示

这是我写的一个效果，让方块的`scale`随着音乐节奏变化（参见项目visualMusic.framer）。

![](demo.gif)

你可以下载下来并参考里面的代码实现你自己的创意，玩的开心哦。

____

# A Framer module to visualize music

This module help you deal with the audio processing, so you can focus on how to achieve your creativity.

### Usage

Copy the module file `visual-music.coffee` to your projectName/modules folder, then add the below code to your main file `app.coffee`.

Initialize the `visualMusic` object:

```CoffeeScript
# require module
visualMusic = require 'visual-music'
# create an instance of visualMusic and add the audio
vm = new visualMusic
	src:'audio.mp3'
```

Receive the processed data and visualize them.

```CoffeeScript
# start visualizing, your code inside will be executed 60 times per second
# sa is an array which includes 1024 elements and every element is a number between 0 and 255 (including 0 and 255)
vm.onVisualizing = (sa)->
    print sa
    # your code here

# start playing
vm.play()
```

You can also have it automatically play with the option 'autoPlay'.

```CoffeeScript
# require module
visualMusic = require 'visual-music'
# create an instance of visualMusic and add the audio
vm = new visualMusic
	src:'audio.mp3'
    autoPlay: true
```

### Demo

In this demo (see project `visualMusic.framer`), these squares can change their scales with the rhythm.

![](demo.gif)

You can download it and refer to the code to complete your creativity.

Have fun!

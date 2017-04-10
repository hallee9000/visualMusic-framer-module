# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "leadream4"
	twitter: ""
	description: ""

# 引入模块
visualMusic = require 'visual-music'
# 实例化模块
vm = new visualMusic
	src:'audio.mp3'
# 创建背景图层
bg = new Layer
	backgroundColor: 'transparent'
bg.center()
# 创建50个矩形图层
squares = []
for i in [0..50]
	square = squares[i] = new Layer
		name: "ball#{i}"
		parent: bg
		midX: 100
		midY: 100
		width: 10*i
		height: 10*i
		backgroundColor: 'transparent'
		scale: 0.5
		borderWidth: 1
# 开始视觉化，让每个矩形的大小根据能量值变化
vm.onVisualizing = (sa)->
	# 开始视觉化，这里的代码每秒执行60次
	# 返回的sa是一个包含1024个元素的数组，每个元素都是一个0-255之间（包含0和255）的数字
	for i in [0...squares.length]
		squares[i].scale = Utils.modulate(sa[i], [0, 255], [0, 1.2])
# 开始播放音乐
vm.play()
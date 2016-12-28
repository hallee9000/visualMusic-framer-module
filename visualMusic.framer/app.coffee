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
balls = []
for i in [0..50]
	# print Utils.round(i%20)*10, Utils.round(i/20-0.5)
	ball = balls[i] = new Layer
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
	for i in [0...balls.length]
		balls[i].scale = Utils.modulate(sa[i], [0, 255], [0, 1.2])
# 开始播放音乐
vm.play()
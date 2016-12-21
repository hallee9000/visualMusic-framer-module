# 使用时先用require引进
# visualMusic = require 'visual-music'
# 再将其实例化
# vm = new visualMusic
# 	src:'audio.mp3'

class visualMusic
	# 构造器
	constructor: (@options={}) ->
		# 基本配置项
		@options.autoPlay ?= false
		@options.src ?= null

		# 播放器、音频上下文和分析器
		@audio = new Audio
		@context = new webkitAudioContext() || AudioContext()
		@analyser = null

		# 加载音频同时循环输出频谱
		if @options.src
			@loadMusic(@audio,@context,@options.src)
			@dealLoop()
		else
			print '请设置播放源文件@options.src'

	# 创建播放器、加载音乐
	loadMusic: (audio,context,src) ->
		audio.src = src
        # 创建分析器
		@analyser = context.createAnalyser()
        # 创建播放源
		source = context.createMediaElementSource(audio)
        # 将播放源和分析器连接
		source.connect(@analyser)
        # 将分析器和音频上下文连接
		@analyser.connect(context.destination)
        # 播放音频（如果自动播放开启）
		if @options.autoPlay
			audio.play()

	# 播放控制
	play:()->
		@audio.play()

	# 循环频谱
	dealLoop: () ->
		# 创建循环器
		looper = =>
			requestAnimationFrame(looper)
			# 定义Uint8Array数组
			storageArr = new Uint8Array(@analyser.frequencyBinCount)
           	# 填充Uint8Array数组
			@analyser.getByteFrequencyData(storageArr)
			@onVisualizing(storageArr)
		looper()

	# 播放时循环操作，并将storageArr传出
	onVisualizing: (sa) ->

module.exports = visualMusic

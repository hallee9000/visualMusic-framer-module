require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"visual-music":[function(require,module,exports){
var visualMusic;

visualMusic = (function() {
  function visualMusic(options) {
    var base, base1;
    this.options = options != null ? options : {};
    if ((base = this.options).autoPlay == null) {
      base.autoPlay = false;
    }
    if ((base1 = this.options).src == null) {
      base1.src = null;
    }
    this.audio = new Audio;
    this.context = new webkitAudioContext() || AudioContext();
    this.analyser = null;
    if (this.options.src) {
      this.loadMusic(this.audio, this.context, this.options.src);
      this.dealLoop();
    } else {
      print('请设置播放源文件@options.src');
    }
  }

  visualMusic.prototype.loadMusic = function(audio, context, src) {
    var source;
    audio.src = src;
    this.analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(this.analyser);
    this.analyser.connect(context.destination);
    if (this.options.autoPlay) {
      return audio.play();
    }
  };

  visualMusic.prototype.play = function() {
    return this.audio.play();
  };

  visualMusic.prototype.dealLoop = function() {
    var looper;
    looper = (function(_this) {
      return function() {
        var storageArr;
        requestAnimationFrame(looper);
        storageArr = new Uint8Array(_this.analyser.frequencyBinCount);
        _this.analyser.getByteFrequencyData(storageArr);
        return _this.onVisualizing(storageArr);
      };
    })(this);
    return looper();
  };

  visualMusic.prototype.onVisualizing = function(sa) {};

  return visualMusic;

})();

module.exports = visualMusic;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvdmlzdWFsLW11c2ljLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyDkvb/nlKjml7blhYjnlKhyZXF1aXJl5byV6L+bXG4jIHZpc3VhbE11c2ljID0gcmVxdWlyZSAndmlzdWFsLW11c2ljJ1xuIyDlho3lsIblhbblrp7kvovljJZcbiMgdm0gPSBuZXcgdmlzdWFsTXVzaWNcbiMgXHRzcmM6J2F1ZGlvLm1wMydcblxuY2xhc3MgdmlzdWFsTXVzaWNcblx0IyDmnoTpgKDlmahcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHQjIOWfuuacrOmFjee9rumhuVxuXHRcdEBvcHRpb25zLmF1dG9QbGF5ID89IGZhbHNlXG5cdFx0QG9wdGlvbnMuc3JjID89IG51bGxcblxuXHRcdCMg5pKt5pS+5Zmo44CB6Z+z6aKR5LiK5LiL5paH5ZKM5YiG5p6Q5ZmoXG5cdFx0QGF1ZGlvID0gbmV3IEF1ZGlvXG5cdFx0QGNvbnRleHQgPSBuZXcgd2Via2l0QXVkaW9Db250ZXh0KCkgfHwgQXVkaW9Db250ZXh0KClcblx0XHRAYW5hbHlzZXIgPSBudWxsXG5cblx0XHQjIOWKoOi9vemfs+mikeWQjOaXtuW+queOr+i+k+WHuumikeiwsVxuXHRcdGlmIEBvcHRpb25zLnNyY1xuXHRcdFx0QGxvYWRNdXNpYyhAYXVkaW8sQGNvbnRleHQsQG9wdGlvbnMuc3JjKVxuXHRcdFx0QGRlYWxMb29wKClcblx0XHRlbHNlXG5cdFx0XHRwcmludCAn6K+36K6+572u5pKt5pS+5rqQ5paH5Lu2QG9wdGlvbnMuc3JjJ1xuXG5cdCMg5Yib5bu65pKt5pS+5Zmo44CB5Yqg6L296Z+z5LmQXG5cdGxvYWRNdXNpYzogKGF1ZGlvLGNvbnRleHQsc3JjKSAtPlxuXHRcdGF1ZGlvLnNyYyA9IHNyY1xuICAgICAgICAjIOWIm+W7uuWIhuaekOWZqFxuXHRcdEBhbmFseXNlciA9IGNvbnRleHQuY3JlYXRlQW5hbHlzZXIoKVxuICAgICAgICAjIOWIm+W7uuaSreaUvua6kFxuXHRcdHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGF1ZGlvKVxuICAgICAgICAjIOWwhuaSreaUvua6kOWSjOWIhuaekOWZqOi/nuaOpVxuXHRcdHNvdXJjZS5jb25uZWN0KEBhbmFseXNlcilcbiAgICAgICAgIyDlsIbliIbmnpDlmajlkozpn7PpopHkuIrkuIvmlofov57mjqVcblx0XHRAYW5hbHlzZXIuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKVxuICAgICAgICAjIOaSreaUvumfs+mike+8iOWmguaenOiHquWKqOaSreaUvuW8gOWQr++8iVxuXHRcdGlmIEBvcHRpb25zLmF1dG9QbGF5XG5cdFx0XHRhdWRpby5wbGF5KClcblxuXHQjIOaSreaUvuaOp+WItlxuXHRwbGF5OigpLT5cblx0XHRAYXVkaW8ucGxheSgpXG5cblx0IyDlvqrnjq/popHosLFcblx0ZGVhbExvb3A6ICgpIC0+XG5cdFx0IyDliJvlu7rlvqrnjq/lmahcblx0XHRsb29wZXIgPSA9PlxuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3Blcilcblx0XHRcdCMg5a6a5LmJVWludDhBcnJheeaVsOe7hFxuXHRcdFx0c3RvcmFnZUFyciA9IG5ldyBVaW50OEFycmF5KEBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudClcbiAgICAgICAgICAgXHQjIOWhq+WFhVVpbnQ4QXJyYXnmlbDnu4Rcblx0XHRcdEBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YShzdG9yYWdlQXJyKVxuXHRcdFx0QG9uVmlzdWFsaXppbmcoc3RvcmFnZUFycilcblx0XHRsb29wZXIoKVxuXG5cdCMg5pKt5pS+5pe25b6q546v5pON5L2c77yM5bm25bCGc3RvcmFnZUFycuS8oOWHulxuXHRvblZpc3VhbGl6aW5nOiAoc2EpIC0+XG5cbm1vZHVsZS5leHBvcnRzID0gdmlzdWFsTXVzaWNcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FETUE7O0FBQU07QUFFTjtBQUVFO0FBRkY7O0FBRUE7OztBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7O0FBZkE7O0FBa0JBO0FBQ0U7QUFBRjtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTs7QUFaQTs7QUFlQTtBQUNBO0FBREE7O0FBSUE7QUFFRTtBQUFGO0FBQUE7QUFDRztBQUFIO0FBRUE7QUFFQTtBQUNBO0FBTkE7QUFBQTtBQU9BO0FBVEE7O0FBWUE7Ozs7OztBQUVBOzs7In0=

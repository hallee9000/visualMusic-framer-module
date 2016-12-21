require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"audio":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AudioPlayer = (function(superClass) {
  extend(AudioPlayer, superClass);

  function AudioPlayer(options) {
    if (options == null) {
      options = {};
    }
    this.getTimeLeft = bind(this.getTimeLeft, this);
    if (options.backgroundColor == null) {
      options.backgroundColor = "transparent";
    }
    this.player = document.createElement("audio");
    this.player.setAttribute("webkit-playsinline", "true");
    this.player.setAttribute("preload", "auto");
    this.player.style.width = "100%";
    this.player.style.height = "100%";
    this.player.on = this.player.addEventListener;
    this.player.off = this.player.removeEventListener;
    AudioPlayer.__super__.constructor.call(this, options);
    this.controls = new Layer({
      backgroundColor: "transparent",
      width: 80,
      height: 80,
      superLayer: this,
      name: "controls"
    });
    this.controls.showPlay = function() {
      return this.image = "images/play.png";
    };
    this.controls.showPause = function() {
      return this.image = "images/pause.png";
    };
    this.controls.showPlay();
    this.controls.center();
    this.timeStyle = {
      "font-size": "20px",
      "color": "#000"
    };
    this.on(Events.Click, function() {
      var currentTime, duration;
      currentTime = Math.round(this.player.currentTime);
      duration = Math.round(this.player.duration);
      if (this.player.paused) {
        this.player.play();
        this.controls.showPause();
        if (currentTime === duration) {
          this.player.currentTime = 0;
          return this.player.play();
        }
      } else {
        this.player.pause();
        return this.controls.showPlay();
      }
    });
    this.player.onplaying = (function(_this) {
      return function() {
        return _this.controls.showPause();
      };
    })(this);
    this.player.onended = (function(_this) {
      return function() {
        return _this.controls.showPlay();
      };
    })(this);
    this.player.formatTime = function() {
      var min, sec;
      sec = Math.floor(this.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : '0' + sec;
      return min + ":" + sec;
    };
    this.player.formatTimeLeft = function() {
      var min, sec;
      sec = Math.floor(this.duration) - Math.floor(this.currentTime);
      min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      sec = sec >= 10 ? sec : '0' + sec;
      return min + ":" + sec;
    };
    this.audio = options.audio;
    this._element.appendChild(this.player);
  }

  AudioPlayer.define("audio", {
    get: function() {
      return this.player.src;
    },
    set: function(audio) {
      this.player.src = audio;
      if (this.player.canPlayType("audio/mp3") === "") {
        throw Error("No supported audio file included.");
      }
    }
  });

  AudioPlayer.define("showProgress", {
    get: function() {
      return this._showProgress;
    },
    set: function(showProgress) {
      return this.setProgress(showProgress, false);
    }
  });

  AudioPlayer.define("showVolume", {
    get: function() {
      return this._showVolume;
    },
    set: function(showVolume) {
      return this.setVolume(showVolume, false);
    }
  });

  AudioPlayer.define("showTime", {
    get: function() {
      return this._showTime;
    },
    set: function(showTime) {
      return this.getTime(showTime, false);
    }
  });

  AudioPlayer.define("showTimeLeft", {
    get: function() {
      return this._showTimeLeft;
    },
    set: function(showTimeLeft) {
      return this.getTimeLeft(showTimeLeft, false);
    }
  });

  AudioPlayer.prototype._checkBoolean = function(property) {
    var ref, ref1;
    if (_.isString(property)) {
      if ((ref = property.toLowerCase()) === "1" || ref === "true") {
        property = true;
      } else if ((ref1 = property.toLowerCase()) === "0" || ref1 === "false") {
        property = false;
      } else {
        return;
      }
    }
    if (!_.isBoolean(property)) {

    }
  };

  AudioPlayer.prototype.getTime = function(showTime) {
    this._checkBoolean(showTime);
    this._showTime = showTime;
    if (showTime === true) {
      this.time = new Layer({
        backgroundColor: "transparent",
        name: "currentTime"
      });
      this.time.style = this.timeStyle;
      return this.time.html = "0:00";
    }
  };

  AudioPlayer.prototype.getTimeLeft = function(showTimeLeft) {
    this._checkBoolean(showTimeLeft);
    this._showTimeLeft = showTimeLeft;
    if (showTimeLeft === true) {
      this.timeLeft = new Layer({
        backgroundColor: "transparent",
        name: "timeLeft"
      });
      this.timeLeft.style = this.timeStyle;
      this.timeLeft.html = "-0:00";
      return this.player.on("loadedmetadata", (function(_this) {
        return function() {
          return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
        };
      })(this));
    }
  };

  AudioPlayer.prototype.setProgress = function(showProgress) {
    var isMoving, wasPlaying;
    this._checkBoolean(showProgress);
    this._showProgress = showProgress;
    if (this._showProgress === true) {
      this.progressBar = new SliderComponent({
        width: 200,
        height: 6,
        backgroundColor: "#eee",
        knobSize: 20,
        value: 0,
        min: 0
      });
      this.player.oncanplay = (function(_this) {
        return function() {
          return _this.progressBar.max = Math.round(_this.player.duration);
        };
      })(this);
      this.progressBar.knob.draggable.momentum = false;
      wasPlaying = isMoving = false;
      if (!this.player.paused) {
        wasPlaying = true;
      }
      this.progressBar.on(Events.SliderValueChange, (function(_this) {
        return function() {
          var currentTime, progressBarTime;
          currentTime = Math.round(_this.player.currentTime);
          progressBarTime = Math.round(_this.progressBar.value);
          if (currentTime !== progressBarTime) {
            _this.player.currentTime = _this.progressBar.value;
          }
          if (_this.time && _this.timeLeft) {
            _this.time.html = _this.player.formatTime();
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          }
        };
      })(this));
      this.progressBar.knob.on(Events.DragMove, (function(_this) {
        return function() {
          return isMoving = true;
        };
      })(this));
      this.progressBar.knob.on(Events.DragEnd, (function(_this) {
        return function(event) {
          var currentTime, duration;
          currentTime = Math.round(_this.player.currentTime);
          duration = Math.round(_this.player.duration);
          if (wasPlaying && currentTime !== duration) {
            _this.player.play();
            _this.controls.showPause();
          }
          if (currentTime === duration) {
            _this.player.pause();
            _this.controls.showPlay();
          }
          return isMoving = false;
        };
      })(this));
      return this.player.ontimeupdate = (function(_this) {
        return function() {
          if (!isMoving) {
            _this.progressBar.knob.midX = _this.progressBar.pointForValue(_this.player.currentTime);
            _this.progressBar.knob.draggable.isMoving = false;
          }
          if (_this.time || _this.timeLeft) {
            _this.time.html = _this.player.formatTime();
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          }
        };
      })(this);
    }
  };

  AudioPlayer.prototype.setVolume = function(showVolume) {
    var base;
    this._checkBoolean(showVolume);
    if ((base = this.player).volume == null) {
      base.volume = 0.75;
    }
    this.volumeBar = new SliderComponent({
      width: 200,
      height: 6,
      backgroundColor: "#eee",
      knobSize: 20,
      min: 0,
      max: 1,
      value: this.player.volume
    });
    this.volumeBar.knob.draggable.momentum = false;
    this.volumeBar.on("change:width", (function(_this) {
      return function() {
        return _this.volumeBar.value = _this.player.volume;
      };
    })(this));
    return this.volumeBar.on("change:value", (function(_this) {
      return function() {
        return _this.player.volume = _this.volumeBar.value;
      };
    })(this));
  };

  return AudioPlayer;

})(Layer);


},{}],"visual-music":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvdmlzdWFsLW11c2ljLmNvZmZlZSIsIi4uL21vZHVsZXMvYXVkaW8uY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIOS9v+eUqOaXtuWFiOeUqHJlcXVpcmXlvJXov5tcbiMgdmlzdWFsTXVzaWMgPSByZXF1aXJlICd2aXN1YWwtbXVzaWMnXG4jIOWGjeWwhuWFtuWunuS+i+WMllxuIyB2bSA9IG5ldyB2aXN1YWxNdXNpY1xuIyBcdHNyYzonYXVkaW8ubXAzJ1xuXG5jbGFzcyB2aXN1YWxNdXNpY1xuXHQjIOaehOmAoOWZqFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdCMg5Z+65pys6YWN572u6aG5XG5cdFx0QG9wdGlvbnMuYXV0b1BsYXkgPz0gZmFsc2Vcblx0XHRAb3B0aW9ucy5zcmMgPz0gbnVsbFxuXG5cdFx0IyDmkq3mlL7lmajjgIHpn7PpopHkuIrkuIvmloflkozliIbmnpDlmahcblx0XHRAYXVkaW8gPSBuZXcgQXVkaW9cblx0XHRAY29udGV4dCA9IG5ldyB3ZWJraXRBdWRpb0NvbnRleHQoKSB8fCBBdWRpb0NvbnRleHQoKVxuXHRcdEBhbmFseXNlciA9IG51bGxcblxuXHRcdCMg5Yqg6L296Z+z6aKR5ZCM5pe25b6q546v6L6T5Ye66aKR6LCxXG5cdFx0aWYgQG9wdGlvbnMuc3JjXG5cdFx0XHRAbG9hZE11c2ljKEBhdWRpbyxAY29udGV4dCxAb3B0aW9ucy5zcmMpXG5cdFx0XHRAZGVhbExvb3AoKVxuXHRcdGVsc2Vcblx0XHRcdHByaW50ICfor7forr7nva7mkq3mlL7mupDmlofku7ZAb3B0aW9ucy5zcmMnXG5cblx0IyDliJvlu7rmkq3mlL7lmajjgIHliqDovb3pn7PkuZBcblx0bG9hZE11c2ljOiAoYXVkaW8sY29udGV4dCxzcmMpIC0+XG5cdFx0YXVkaW8uc3JjID0gc3JjXG4gICAgICAgICMg5Yib5bu65YiG5p6Q5ZmoXG5cdFx0QGFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpXG4gICAgICAgICMg5Yib5bu65pKt5pS+5rqQXG5cdFx0c291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoYXVkaW8pXG4gICAgICAgICMg5bCG5pKt5pS+5rqQ5ZKM5YiG5p6Q5Zmo6L+e5o6lXG5cdFx0c291cmNlLmNvbm5lY3QoQGFuYWx5c2VyKVxuICAgICAgICAjIOWwhuWIhuaekOWZqOWSjOmfs+mikeS4iuS4i+aWh+i/nuaOpVxuXHRcdEBhbmFseXNlci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pXG4gICAgICAgICMg5pKt5pS+6Z+z6aKR77yI5aaC5p6c6Ieq5Yqo5pKt5pS+5byA5ZCv77yJXG5cdFx0aWYgQG9wdGlvbnMuYXV0b1BsYXlcblx0XHRcdGF1ZGlvLnBsYXkoKVxuXG5cdCMg5pKt5pS+5o6n5Yi2XG5cdHBsYXk6KCktPlxuXHRcdEBhdWRpby5wbGF5KClcblxuXHQjIOW+queOr+mikeiwsVxuXHRkZWFsTG9vcDogKCkgLT5cblx0XHQjIOWIm+W7uuW+queOr+WZqFxuXHRcdGxvb3BlciA9ID0+XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcGVyKVxuXHRcdFx0IyDlrprkuYlVaW50OEFycmF55pWw57uEXG5cdFx0XHRzdG9yYWdlQXJyID0gbmV3IFVpbnQ4QXJyYXkoQGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KVxuICAgICAgICAgICBcdCMg5aGr5YWFVWludDhBcnJheeaVsOe7hFxuXHRcdFx0QGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHN0b3JhZ2VBcnIpXG5cdFx0XHRAb25WaXN1YWxpemluZyhzdG9yYWdlQXJyKVxuXHRcdGxvb3BlcigpXG5cblx0IyDmkq3mlL7ml7blvqrnjq/mk43kvZzvvIzlubblsIZzdG9yYWdlQXJy5Lyg5Ye6XG5cdG9uVmlzdWFsaXppbmc6IChzYSkgLT5cblxubW9kdWxlLmV4cG9ydHMgPSB2aXN1YWxNdXNpY1xuIiwiY2xhc3MgZXhwb3J0cy5BdWRpb1BsYXllciBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwidHJhbnNwYXJlbnRcIlxuXG5cdFx0IyBEZWZpbmUgcGxheWVyXG5cdFx0QHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKVxuXHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwid2Via2l0LXBsYXlzaW5saW5lXCIsIFwidHJ1ZVwiKVxuXHRcdEBwbGF5ZXIuc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIilcblx0XHRAcGxheWVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcblx0XHRAcGxheWVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiXG5cblx0XHRAcGxheWVyLm9uID0gQHBsYXllci5hZGRFdmVudExpc3RlbmVyXG5cdFx0QHBsYXllci5vZmYgPSBAcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXJcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdCMgRGVmaW5lIGJhc2ljIGNvbnRyb2xzXG5cdFx0QGNvbnRyb2xzID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0d2lkdGg6IDgwLCBoZWlnaHQ6IDgwLCBzdXBlckxheWVyOiBAXG5cdFx0XHRuYW1lOiBcImNvbnRyb2xzXCJcblxuXHRcdEBjb250cm9scy5zaG93UGxheSA9IC0+IEBpbWFnZSA9IFwiaW1hZ2VzL3BsYXkucG5nXCJcblx0XHRAY29udHJvbHMuc2hvd1BhdXNlID0gLT4gQGltYWdlID0gXCJpbWFnZXMvcGF1c2UucG5nXCJcblx0XHRAY29udHJvbHMuc2hvd1BsYXkoKVxuXHRcdEBjb250cm9scy5jZW50ZXIoKVxuXG5cdFx0QHRpbWVTdHlsZSA9IHsgXCJmb250LXNpemVcIjogXCIyMHB4XCIsIFwiY29sb3JcIjogXCIjMDAwXCIgfVxuXG5cdFx0IyBPbiBjbGlja1xuXHRcdEBvbiBFdmVudHMuQ2xpY2ssIC0+XG5cdFx0XHRjdXJyZW50VGltZSA9IE1hdGgucm91bmQoQHBsYXllci5jdXJyZW50VGltZSlcblx0XHRcdGR1cmF0aW9uID0gTWF0aC5yb3VuZChAcGxheWVyLmR1cmF0aW9uKVxuXG5cdFx0XHRpZiBAcGxheWVyLnBhdXNlZFxuXHRcdFx0XHRAcGxheWVyLnBsYXkoKVxuXHRcdFx0XHRAY29udHJvbHMuc2hvd1BhdXNlKClcblxuXHRcdFx0XHRpZiBjdXJyZW50VGltZSBpcyBkdXJhdGlvblxuXHRcdFx0XHRcdEBwbGF5ZXIuY3VycmVudFRpbWUgPSAwXG5cdFx0XHRcdFx0QHBsYXllci5wbGF5KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHBsYXllci5wYXVzZSgpXG5cdFx0XHRcdEBjb250cm9scy5zaG93UGxheSgpXG5cblx0XHQjIE9uIGVuZCwgc3dpdGNoIHRvIHBsYXkgYnV0dG9uXG5cdFx0QHBsYXllci5vbnBsYXlpbmcgPSA9PiBAY29udHJvbHMuc2hvd1BhdXNlKClcblx0XHRAcGxheWVyLm9uZW5kZWQgPSA9PiBAY29udHJvbHMuc2hvd1BsYXkoKVxuXG5cdFx0IyBVdGlsc1xuXHRcdEBwbGF5ZXIuZm9ybWF0VGltZSA9IC0+XG5cdFx0XHRzZWMgPSBNYXRoLmZsb29yKEBjdXJyZW50VGltZSlcblx0XHRcdG1pbiA9IE1hdGguZmxvb3Ioc2VjIC8gNjApXG5cdFx0XHRzZWMgPSBNYXRoLmZsb29yKHNlYyAlIDYwKVxuXHRcdFx0c2VjID0gaWYgc2VjID49IDEwIHRoZW4gc2VjIGVsc2UgJzAnICsgc2VjXG5cdFx0XHRyZXR1cm4gXCIje21pbn06I3tzZWN9XCJcblxuXHRcdEBwbGF5ZXIuZm9ybWF0VGltZUxlZnQgPSAtPlxuXHRcdFx0c2VjID0gTWF0aC5mbG9vcihAZHVyYXRpb24pIC0gTWF0aC5mbG9vcihAY3VycmVudFRpbWUpXG5cdFx0XHRtaW4gPSBNYXRoLmZsb29yKHNlYyAvIDYwKVxuXHRcdFx0c2VjID0gTWF0aC5mbG9vcihzZWMgJSA2MClcblx0XHRcdHNlYyA9IGlmIHNlYyA+PSAxMCB0aGVuIHNlYyBlbHNlICcwJyArIHNlY1xuXHRcdFx0cmV0dXJuIFwiI3ttaW59OiN7c2VjfVwiXG5cblx0XHRAYXVkaW8gPSBvcHRpb25zLmF1ZGlvXG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkKEBwbGF5ZXIpXG5cblx0QGRlZmluZSBcImF1ZGlvXCIsXG5cdFx0Z2V0OiAtPiBAcGxheWVyLnNyY1xuXHRcdHNldDogKGF1ZGlvKSAtPlxuXHRcdFx0QHBsYXllci5zcmMgPSBhdWRpb1xuXHRcdFx0aWYgQHBsYXllci5jYW5QbGF5VHlwZShcImF1ZGlvL21wM1wiKSA9PSBcIlwiXG5cdFx0XHRcdHRocm93IEVycm9yIFwiTm8gc3VwcG9ydGVkIGF1ZGlvIGZpbGUgaW5jbHVkZWQuXCJcblxuXHRAZGVmaW5lIFwic2hvd1Byb2dyZXNzXCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dQcm9ncmVzc1xuXHRcdHNldDogKHNob3dQcm9ncmVzcykgLT4gQHNldFByb2dyZXNzKHNob3dQcm9ncmVzcywgZmFsc2UpXG5cblx0QGRlZmluZSBcInNob3dWb2x1bWVcIixcblx0XHRnZXQ6IC0+IEBfc2hvd1ZvbHVtZVxuXHRcdHNldDogKHNob3dWb2x1bWUpIC0+IEBzZXRWb2x1bWUoc2hvd1ZvbHVtZSwgZmFsc2UpXG5cblx0QGRlZmluZSBcInNob3dUaW1lXCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dUaW1lXG5cdFx0c2V0OiAoc2hvd1RpbWUpIC0+IEBnZXRUaW1lKHNob3dUaW1lLCBmYWxzZSlcblxuXHRAZGVmaW5lIFwic2hvd1RpbWVMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAX3Nob3dUaW1lTGVmdFxuXHRcdHNldDogKHNob3dUaW1lTGVmdCkgLT4gQGdldFRpbWVMZWZ0KHNob3dUaW1lTGVmdCwgZmFsc2UpXG5cblx0IyBDaGVja3MgYSBwcm9wZXJ0eSwgcmV0dXJucyBcInRydWVcIiBvciBcImZhbHNlXCJcblx0X2NoZWNrQm9vbGVhbjogKHByb3BlcnR5KSAtPlxuXHRcdGlmIF8uaXNTdHJpbmcocHJvcGVydHkpXG5cdFx0XHRpZiBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpIGluIFtcIjFcIiwgXCJ0cnVlXCJdXG5cdFx0XHRcdHByb3BlcnR5ID0gdHJ1ZVxuXHRcdFx0ZWxzZSBpZiBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpIGluIFtcIjBcIiwgXCJmYWxzZVwiXVxuXHRcdFx0XHRwcm9wZXJ0eSA9IGZhbHNlXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVyblxuXHRcdGlmIG5vdCBfLmlzQm9vbGVhbihwcm9wZXJ0eSkgdGhlbiByZXR1cm5cblxuXHRnZXRUaW1lOiAoc2hvd1RpbWUpIC0+XG5cdFx0QF9jaGVja0Jvb2xlYW4oc2hvd1RpbWUpXG5cdFx0QF9zaG93VGltZSA9IHNob3dUaW1lXG5cblx0XHRpZiBzaG93VGltZSBpcyB0cnVlXG5cdFx0XHRAdGltZSA9IG5ldyBMYXllclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHRuYW1lOiBcImN1cnJlbnRUaW1lXCJcblxuXHRcdFx0QHRpbWUuc3R5bGUgPSBAdGltZVN0eWxlXG5cdFx0XHRAdGltZS5odG1sID0gXCIwOjAwXCJcblxuXHRnZXRUaW1lTGVmdDogKHNob3dUaW1lTGVmdCkgPT5cblx0XHRAX2NoZWNrQm9vbGVhbihzaG93VGltZUxlZnQpXG5cdFx0QF9zaG93VGltZUxlZnQgPSBzaG93VGltZUxlZnRcblxuXHRcdGlmIHNob3dUaW1lTGVmdCBpcyB0cnVlXG5cdFx0XHRAdGltZUxlZnQgPSBuZXcgTGF5ZXJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdFx0bmFtZTogXCJ0aW1lTGVmdFwiXG5cblx0XHRcdEB0aW1lTGVmdC5zdHlsZSA9IEB0aW1lU3R5bGVcblxuXHRcdFx0IyBTZXQgdGltZUxlZnRcblx0XHRcdEB0aW1lTGVmdC5odG1sID0gXCItMDowMFwiXG5cdFx0XHRAcGxheWVyLm9uIFwibG9hZGVkbWV0YWRhdGFcIiwgPT5cblx0XHRcdFx0QHRpbWVMZWZ0Lmh0bWwgPSBcIi1cIiArIEBwbGF5ZXIuZm9ybWF0VGltZUxlZnQoKVxuXG5cdHNldFByb2dyZXNzOiAoc2hvd1Byb2dyZXNzKSAtPlxuXHRcdEBfY2hlY2tCb29sZWFuKHNob3dQcm9ncmVzcylcblxuXHRcdCMgU2V0IGFyZ3VtZW50IChzaG93UHJvZ3Jlc3MgaXMgZWl0aGVyIHRydWUgb3IgZmFsc2UpXG5cdFx0QF9zaG93UHJvZ3Jlc3MgPSBzaG93UHJvZ3Jlc3NcblxuXHRcdGlmIEBfc2hvd1Byb2dyZXNzIGlzIHRydWVcblxuXHRcdFx0IyBDcmVhdGUgUHJvZ3Jlc3MgQmFyICsgRGVmYXVsdHNcblx0XHRcdEBwcm9ncmVzc0JhciA9IG5ldyBTbGlkZXJDb21wb25lbnRcblx0XHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiA2LCBiYWNrZ3JvdW5kQ29sb3I6IFwiI2VlZVwiXG5cdFx0XHRcdGtub2JTaXplOiAyMCwgdmFsdWU6IDAsIG1pbjogMFxuXG5cdFx0XHRAcGxheWVyLm9uY2FucGxheSA9ID0+IEBwcm9ncmVzc0Jhci5tYXggPSBNYXRoLnJvdW5kKEBwbGF5ZXIuZHVyYXRpb24pXG5cdFx0XHRAcHJvZ3Jlc3NCYXIua25vYi5kcmFnZ2FibGUubW9tZW50dW0gPSBmYWxzZVxuXG5cdFx0XHQjIENoZWNrIGlmIHRoZSBwbGF5ZXIgd2FzIHBsYXlpbmdcblx0XHRcdHdhc1BsYXlpbmcgPSBpc01vdmluZyA9IGZhbHNlXG5cdFx0XHR1bmxlc3MgQHBsYXllci5wYXVzZWQgdGhlbiB3YXNQbGF5aW5nID0gdHJ1ZVxuXG5cdFx0XHRAcHJvZ3Jlc3NCYXIub24gRXZlbnRzLlNsaWRlclZhbHVlQ2hhbmdlLCA9PlxuXHRcdFx0XHRjdXJyZW50VGltZSA9IE1hdGgucm91bmQoQHBsYXllci5jdXJyZW50VGltZSlcblx0XHRcdFx0cHJvZ3Jlc3NCYXJUaW1lID0gTWF0aC5yb3VuZChAcHJvZ3Jlc3NCYXIudmFsdWUpXG5cdFx0XHRcdEBwbGF5ZXIuY3VycmVudFRpbWUgPSBAcHJvZ3Jlc3NCYXIudmFsdWUgdW5sZXNzIGN1cnJlbnRUaW1lID09IHByb2dyZXNzQmFyVGltZVxuXG5cdFx0XHRcdGlmIEB0aW1lIGFuZCBAdGltZUxlZnRcblx0XHRcdFx0XHRAdGltZS5odG1sID0gQHBsYXllci5mb3JtYXRUaW1lKClcblx0XHRcdFx0XHRAdGltZUxlZnQuaHRtbCA9IFwiLVwiICsgQHBsYXllci5mb3JtYXRUaW1lTGVmdCgpXG5cblx0XHRcdEBwcm9ncmVzc0Jhci5rbm9iLm9uIEV2ZW50cy5EcmFnTW92ZSwgPT4gaXNNb3ZpbmcgPSB0cnVlXG5cblx0XHRcdEBwcm9ncmVzc0Jhci5rbm9iLm9uIEV2ZW50cy5EcmFnRW5kLCAoZXZlbnQpID0+XG5cdFx0XHRcdGN1cnJlbnRUaW1lID0gTWF0aC5yb3VuZChAcGxheWVyLmN1cnJlbnRUaW1lKVxuXHRcdFx0XHRkdXJhdGlvbiA9IE1hdGgucm91bmQoQHBsYXllci5kdXJhdGlvbilcblxuXHRcdFx0XHRpZiB3YXNQbGF5aW5nIGFuZCBjdXJyZW50VGltZSBpc250IGR1cmF0aW9uXG5cdFx0XHRcdFx0QHBsYXllci5wbGF5KClcblx0XHRcdFx0XHRAY29udHJvbHMuc2hvd1BhdXNlKClcblxuXHRcdFx0XHRpZiBjdXJyZW50VGltZSBpcyBkdXJhdGlvblxuXHRcdFx0XHRcdEBwbGF5ZXIucGF1c2UoKVxuXHRcdFx0XHRcdEBjb250cm9scy5zaG93UGxheSgpXG5cblx0XHRcdFx0cmV0dXJuIGlzTW92aW5nID0gZmFsc2VcblxuXHRcdFx0IyBVcGRhdGUgUHJvZ3Jlc3Ncblx0XHRcdEBwbGF5ZXIub250aW1ldXBkYXRlID0gPT5cblx0XHRcdFx0dW5sZXNzIGlzTW92aW5nXG5cdFx0XHRcdFx0QHByb2dyZXNzQmFyLmtub2IubWlkWCA9IEBwcm9ncmVzc0Jhci5wb2ludEZvclZhbHVlKEBwbGF5ZXIuY3VycmVudFRpbWUpXG5cdFx0XHRcdFx0QHByb2dyZXNzQmFyLmtub2IuZHJhZ2dhYmxlLmlzTW92aW5nID0gZmFsc2VcblxuXHRcdFx0XHRpZiBAdGltZSBvciBAdGltZUxlZnRcblx0XHRcdFx0XHRAdGltZS5odG1sID0gQHBsYXllci5mb3JtYXRUaW1lKClcblx0XHRcdFx0XHRAdGltZUxlZnQuaHRtbCA9IFwiLVwiICsgQHBsYXllci5mb3JtYXRUaW1lTGVmdCgpXG5cblx0c2V0Vm9sdW1lOiAoc2hvd1ZvbHVtZSkgLT5cblx0XHRAX2NoZWNrQm9vbGVhbihzaG93Vm9sdW1lKVxuXG5cdFx0IyBTZXQgZGVmYXVsdCB0byA3NSVcblx0XHRAcGxheWVyLnZvbHVtZSA/PSAwLjc1XG5cblx0XHRAdm9sdW1lQmFyID0gbmV3IFNsaWRlckNvbXBvbmVudFxuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiA2XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2VlZVwiXG5cdFx0XHRrbm9iU2l6ZTogMjBcblx0XHRcdG1pbjogMCwgbWF4OiAxXG5cdFx0XHR2YWx1ZTogQHBsYXllci52b2x1bWVcblxuXHRcdEB2b2x1bWVCYXIua25vYi5kcmFnZ2FibGUubW9tZW50dW0gPSBmYWxzZVxuXG5cdFx0QHZvbHVtZUJhci5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0QHZvbHVtZUJhci52YWx1ZSA9IEBwbGF5ZXIudm9sdW1lXG5cblx0XHRAdm9sdW1lQmFyLm9uIFwiY2hhbmdlOnZhbHVlXCIsID0+XG5cdFx0XHRAcGxheWVyLnZvbHVtZSA9IEB2b2x1bWVCYXIudmFsdWVcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBRUEscUJBQUMsT0FBRDs7TUFBQyxVQUFROzs7O01BQ3JCLE9BQU8sQ0FBQyxrQkFBbUI7O0lBRzNCLElBQUMsQ0FBQSxNQUFELEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7SUFDVixJQUFDLENBQUEsTUFBTSxDQUFDLFlBQVIsQ0FBcUIsb0JBQXJCLEVBQTJDLE1BQTNDO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLFNBQXJCLEVBQWdDLE1BQWhDO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBZCxHQUFzQjtJQUN0QixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFkLEdBQXVCO0lBRXZCLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixHQUFhLElBQUMsQ0FBQSxNQUFNLENBQUM7SUFDckIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLEdBQWMsSUFBQyxDQUFBLE1BQU0sQ0FBQztJQUV0Qiw2Q0FBTSxPQUFOO0lBR0EsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxLQUFBLENBQ2Y7TUFBQSxlQUFBLEVBQWlCLGFBQWpCO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFDVyxNQUFBLEVBQVEsRUFEbkI7TUFDdUIsVUFBQSxFQUFZLElBRG5DO01BRUEs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

import _videojs from 'video.js';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var videojs = window.videojs || _videojs; // polyfill

if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
} // as of videojs 6.6.0


var DEFAULT_EVENTS = ['loadeddata', 'canplay', 'canplaythrough', 'play', 'pause', 'waiting', 'playing', 'ended', 'error']; // export

var script = {
  name: 'video-player',
  props: {
    start: {
      type: Number,
      default: 0
    },
    crossOrigin: {
      type: String,
      default: ''
    },
    playsinline: {
      type: Boolean,
      default: false
    },
    customEventName: {
      type: String,
      default: 'statechanged'
    },
    options: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    globalOptions: {
      type: Object,
      default: function _default() {
        return {
          // autoplay: false,
          controls: true,
          // preload: 'auto',
          // fluid: false,
          // muted: false,
          controlBar: {
            remainingTimeDisplay: false,
            playToggle: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeMenuButton: {
              inline: false,
              vertical: true
            }
          },
          techOrder: ['html5'],
          plugins: {}
        };
      }
    },
    globalEvents: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    trackList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      player: null,
      reseted: true
    };
  },
  mounted: function mounted() {
    if (!this.player) {
      this.initialize();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.player) {
      this.dispose();
    }
  },
  methods: {
    initialize: function initialize() {
      var _this = this;

      // videojs options
      var videoOptions = Object.assign({}, this.globalOptions, this.options); // ios fullscreen

      if (this.playsinline) {
        this.$refs.video.setAttribute('playsinline', this.playsinline);
        this.$refs.video.setAttribute('webkit-playsinline', this.playsinline);
        this.$refs.video.setAttribute('x5-playsinline', this.playsinline);
        this.$refs.video.setAttribute('x5-video-player-type', 'h5');
        this.$refs.video.setAttribute('x5-video-player-fullscreen', false);
      } // cross origin


      if (this.crossOrigin !== '') {
        this.$refs.video.crossOrigin = this.crossOrigin;
        this.$refs.video.setAttribute('crossOrigin', this.crossOrigin);
      } // emit event


      var emitPlayerState = function emitPlayerState(event, value) {
        if (event) {
          _this.$emit(event, _this.player);
        }

        if (value) {
          _this.$emit(_this.customEventName, _defineProperty({}, event, value));
        }
      }; // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"


      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__;
      } // videoOptions
      // console.log('videoOptions', videoOptions)
      // player


      var self = this;
      this.player = videojs(this.$refs.video, videoOptions, function () {
        var _this2 = this;

        // events
        var events = DEFAULT_EVENTS.concat(self.events).concat(self.globalEvents); // watch events

        var onEdEvents = {};

        for (var i = 0; i < events.length; i++) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (function (event) {
              onEdEvents[event] = null;

              _this2.on(event, function () {
                emitPlayerState(event, true);
              });
            })(events[i]);
          }
        } // watch timeupdate


        this.on('timeupdate', function () {
          emitPlayerState('timeupdate', this.currentTime());
        }); // player readied

        self.$emit('ready', this);
      });
    },
    dispose: function dispose(callback) {
      var _this3 = this;

      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== 'Flash') {
          this.player.pause && this.player.pause();
        }

        this.player.dispose();
        this.player = null;
        this.$nextTick(function () {
          _this3.reseted = false;

          _this3.$nextTick(function () {
            _this3.reseted = true;

            _this3.$nextTick(function () {
              callback && callback();
            });
          });
        });
        /*
        if (!this.$el.children.length) {
          const video = document.createElement('video')
          video.className = 'video-js'
          this.$el.appendChild(video)
        }
        */
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler: function handler(options, oldOptions) {
        var _this4 = this;

        this.dispose(function () {
          if (options && options.sources && options.sources.length) {
            _this4.initialize();
          }
        });
      }
    }
  }
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.reseted
    ? _c("div", { staticClass: "video-player" }, [
        _c(
          "video",
          { ref: "video", staticClass: "video-js" },
          _vm._l(_vm.trackList, function(crtTrack) {
            return _c("track", {
              attrs: {
                kind: crtTrack.kind,
                label: crtTrack.label,
                src: crtTrack.src,
                srcLang: crtTrack.srcLang,
                default: crtTrack.default
              }
            })
          })
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/shijinyu/code/vue-video-player/src/player.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var videoPlayer = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

/*
* Vue-Video-Player ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-video-player
* Adapted from Videojs (https://github.com/videojs/video.js)
*/
var videojs$1 = window.videojs || _videojs;

var install = function install(Vue, config) {
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = function () {
        return config.options;
      };
    }

    if (config.events) {
      videoPlayer.props.globalEvents.default = function () {
        return config.events;
      };
    }
  }

  Vue.component(videoPlayer.name, videoPlayer);
};

var VueVideoPlayer = {
  videojs: videojs$1,
  videoPlayer: videoPlayer,
  install: install
};

export default VueVideoPlayer;
export { videojs$1 as videojs, videoPlayer, install };

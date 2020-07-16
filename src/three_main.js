(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Main"] = factory();
	else
		root["Main"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function (e, t) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var o; }
}(this, function (exports) {
  "use strict";

  function i(e) {
    if (Array.isArray(e)) {
      for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];

      return o;
    }

    return Array.from(e);
  }

  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var l = !1;

  if ("undefined" != typeof window) {
    var e = {
      get passive() {
        l = !0;
      }

    };
    window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
  }

  function d(t) {
    return u.some(function (e) {
      return !(!e.options.allowTouchMove || !e.options.allowTouchMove(t));
    });
  }

  function c(e) {
    var t = e || window.event;
    return !!d(t.target) || 1 < t.touches.length || (t.preventDefault && t.preventDefault(), !1);
  }

  function o() {
    setTimeout(function () {
      void 0 !== m && (document.body.style.paddingRight = m, m = void 0), void 0 !== f && (document.body.style.overflow = f, f = void 0);
    });
  }

  var a = "undefined" != typeof window && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || "MacIntel" === window.navigator.platform && 1 < window.navigator.maxTouchPoints),
      u = [],
      s = !1,
      v = -1,
      f = void 0,
      m = void 0;
  exports.disableBodyScroll = function (r, e) {
    if (a) {
      if (!r) return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");

      if (r && !u.some(function (e) {
        return e.targetElement === r;
      })) {
        var t = {
          targetElement: r,
          options: e || {}
        };
        u = [].concat(i(u), [t]), r.ontouchstart = function (e) {
          1 === e.targetTouches.length && (v = e.targetTouches[0].clientY);
        }, r.ontouchmove = function (e) {
          var t, o, n, i;
          1 === e.targetTouches.length && (o = r, i = (t = e).targetTouches[0].clientY - v, d(t.target) || (o && 0 === o.scrollTop && 0 < i || (n = o) && n.scrollHeight - n.scrollTop <= n.clientHeight && i < 0 ? c(t) : t.stopPropagation()));
        }, s || (document.addEventListener("touchmove", c, l ? {
          passive: !1
        } : void 0), s = !0);
      }
    } else {
      n = e, setTimeout(function () {
        if (void 0 === m) {
          var e = !!n && !0 === n.reserveScrollBarGap,
              t = window.innerWidth - document.documentElement.clientWidth;
          e && 0 < t && (m = document.body.style.paddingRight, document.body.style.paddingRight = t + "px");
        }

        void 0 === f && (f = document.body.style.overflow, document.body.style.overflow = "hidden");
      });
      var o = {
        targetElement: r,
        options: e || {}
      };
      u = [].concat(i(u), [o]);
    }

    var n;
  }, exports.clearAllBodyScrollLocks = function () {
    a ? (u.forEach(function (e) {
      e.targetElement.ontouchstart = null, e.targetElement.ontouchmove = null;
    }), s && (document.removeEventListener("touchmove", c, l ? {
      passive: !1
    } : void 0), s = !1), u = [], v = -1) : (o(), u = []);
  }, exports.enableBodyScroll = function (t) {
    if (a) {
      if (!t) return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
      t.ontouchstart = null, t.ontouchmove = null, u = u.filter(function (e) {
        return e.targetElement !== t;
      }), s && 0 === u.length && (document.removeEventListener("touchmove", c, l ? {
        passive: !1
      } : void 0), s = !1);
    } else (u = u.filter(function (e) {
      return e.targetElement !== t;
    })).length || o();
  };
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function None() {}

/* harmony default export */ __webpack_exports__["default"] = (None);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function Responsive(main, resizeCallback, postResizeCallback) {
  var resizeFunction;
  var camera = main.camera;
  var renderer = main.renderer;
  var canvas = renderer.domElement;
  var lastWidth, lastHeight;
  var type = window.app && window.app.type && null;

  this.resizeNow = function () {
    if (resizeFunction) {
      resizeFunction();
    }
  };

  this.startResponsive = function () {
    if (type == "dapi_iron") {
      if (window.NUC) {
        NUC.callback.onResize(function (width, height) {
          // Recalculate positions of in-game elements for specific orientation
          resizeCanvas({
            width: width,
            height: height
          });
        });
      } else {
        dapi.addEventListener("adResized", resizeCanvas);
      }
    } else if (type == "nucleo") {
      if (window.NUC) {
        NUC.callback.onResize(function (width, height) {
          // Recalculate positions of in-game elements for specific orientation
          resizeCanvas({
            width: width,
            height: height
          });
        });
      }
    } else {
      window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas(event) {
      if (event && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      var data = main.data;
      var scale = 1 / data.resolution;
      canvas.setAttribute('style', ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' + ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' + ' transform-origin: top left;');
      var iw = window.innerWidth,
          ih = window.innerHeight;

      if (type == "dapi_iron" || type == "nucleo") {
        if (!event || !event.width) {
          var dimensions = dapi.getScreenSize();

          if (dimensions) {
            iw = dimensions.width;
            ih = dimensions.height;
          }
        } else {
          iw = event.width;
          ih = event.height;
        }
      }

      var realWidth = iw;
      var realHeight = ih;

      if (!iw || !ih) {
        setTimeout(function () {
          resizeCanvas(event);
        }, 500);
        return;
      } //document.body.style.width=iw+"px";
      //document.body.style.height=ih+"px";


      document.body.style.maxWidth = iw + "px";
      document.body.style.maxHeight = ih + "px";
      iw *= data.resolution;
      ih *= data.resolution;
      var styleWidth = iw + "px";
      var styleHeight = ih + "px";
      canvas.style.maxWidth = styleWidth;
      canvas.style.maxHeight = styleHeight;
      canvas.style.width = styleWidth;
      canvas.style.height = styleHeight;
      var aspect = iw / ih;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(iw, ih);
      resizeCallback(iw, ih, realWidth, realHeight);
      lastWidth = iw;
      lastHeight = ih;
      if (postResizeCallback) postResizeCallback();
      /*
      that.isHorizantal=false;
      if(lastWidth>lastHeight){
          that.isHorizantal=true;
      }
      
      that.lastWidth=iw;
      that.lastHeight=ih;
      */
    }

    resizeCanvas();
    resizeFunction = resizeCanvas;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Responsive);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Loader(main, THREE) {
  var storage = main.storage;
  var utility = main.utility;
  var textureLoader = new THREE.TextureLoader();
  var loader = new THREE.GLTFLoader();

  this.loadTexture = function (src, storageName) {
    if (storage.hasItem("texture", storageName)) {
      console.warn("Already exist in the storage!");
      return;
    }

    var texture = textureLoader.load(src);
    storage.addItem("texture", storageName, texture);
    return texture;
  };

  this.loadBulk = function (list) {
    var _iterator = _createForOfIteratorHelper(list),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (item.type == "texture") {
          this.loadTexture(item.src, item.name);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  this.loadModel = function (json, bin, textures, callback) {
    console.log(textures);

    if (bin) {
      if (!window.globalBins) window.globalBins = {};
      var binName = json.buffers[0].uri;
      window.globalBins[binName] = bin;
    }

    if (textures) {
      for (var i = 0; i < textures.length; i++) {
        var t = textures[i];
        json.images[i].uri = t;
      }
    }

    var modelGltf = JSON.stringify(json);
    loader.parse(modelGltf, '', callback, function () {}, null);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Loader);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/three_core/WebGL.js
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */
var WEBGL = {
  isWebGLAvailable: function isWebGLAvailable() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  },
  isWebGL2Available: function isWebGL2Available() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
    } catch (e) {
      return false;
    }
  },
  getWebGLErrorMessage: function getWebGLErrorMessage() {
    return this.getErrorMessage(1);
  },
  getWebGL2ErrorMessage: function getWebGL2ErrorMessage() {
    return this.getErrorMessage(2);
  },
  getErrorMessage: function getErrorMessage(version) {
    var names = {
      1: 'WebGL',
      2: 'WebGL 2'
    };
    var contexts = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext
    };
    var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';
    var element = document.createElement('div');
    element.id = 'webglmessage';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';

    if (contexts[version]) {
      message = message.replace('$0', 'graphics card');
    } else {
      message = message.replace('$0', 'browser');
    }

    message = message.replace('$1', names[version]);
    element.innerHTML = message;
    return element;
  }
};
/* harmony default export */ var WebGL = (WEBGL);
// CONCATENATED MODULE: ./src/three_core/misc/storage.js
function Storage(THREE) {
  var all = {
    material: {},
    texture: {},
    geometry: {},
    cannonShape: {}
  };
  var randomNameCounter = 0;

  this.init = function () {
    if (this.textureLoader) {
      console.warn("init only 1 time!");
      return;
    }

    this.textureLoader = new THREE.TextureLoader();
  };

  this.loadTexture = function () {}; ////FOR ALL TYPE OF STUFFS

  /*
      type - material,texture etc..
      name - storage name of this object
      data - the data to store    
  */


  this.addItem = function (type, name, data, forceAdd) {
    if (!name) {
      name = "storageData" + randomNameCounter;
      randomNameCounter++;
      console.warn("No name given," + name + " used!");
    }

    if (forceAdd) {
      all[type][name] = data;
      return;
    }

    if (all[type][name]) {
      console.warn("Already we have this stuff!");
      return all[type][name];
    }

    all[type][name] = data; //console.log(all);
  };

  this.hasItem = function (type, name) {
    return all[type][name];
  };

  this.getItem = function (type, name) {
    return all[type][name];
  };

  this.removeItem = function (type, name) {
    all[type][name] = null;
  };

  this.refreshItem = function (type, name, data) {
    this.addItem(type, name, data, true);
  };
}

/* harmony default export */ var storage = (Storage);
// CONCATENATED MODULE: ./src/three_core/misc/objectMaker.js
function ObjectMaker(scene, storage, physics) {
  //physics {type:cannon or matter, world, CANNON or matter}
  var CANNON, matter, world;
  var physicsType = physics && physics.type; ///matter

  if (physicsType == 1) {
    physicsType = "matter";
    matter = physics.matter;
  } else if (physicsType == 2) {
    physicsType = "cannon";
    world = physics.world;
    CANNON = physics.CANNON;
  }

  this.objectList = [];

  this.clear = function () {
    this.objectList = [];
  };

  function bodyUpdate(body) {
    /*body.allowSleep = true;
    body.sleepSpeedLimit = 0.01;
    body.sleepTimeLimit = 1;*/
  }

  function addCannonBody(shape, x, y, z, mass) {
    var body = new CANNON.Body({
      mass: mass
    });
    body.addShape(shape);
    body.position.set(x, y, z);
    world.addBody(body);
    return body;
  }

  this.destroyObject = function (obj) {
    var index = this.objectList.indexOf(obj);
    if (index < 0) return;
    this.objectList.splice(index, 1);

    if (obj.body) {
      if (physicsType == "cannon") {
        world.remove(obj.body);
      } else if (physicsType == "matter") {} ///matter destroy function
      //obj.body = null;

    }

    scene.remove(obj);
  };

  this.addBox = function (_ref) {
    var x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        wx = _ref.wx,
        wy = _ref.wy,
        wz = _ref.wz,
        color = _ref.color,
        _ref$mass = _ref.mass,
        mass = _ref$mass === void 0 ? 1 : _ref$mass,
        _ref$specificMatName = _ref.specificMatName,
        specificMatName = _ref$specificMatName === void 0 ? 0 : _ref$specificMatName,
        _ref$noPhysics = _ref.noPhysics,
        noPhysics = _ref$noPhysics === void 0 ? false : _ref$noPhysics,
        _ref$addToWorld = _ref.addToWorld,
        addToWorld = _ref$addToWorld === void 0 ? true : _ref$addToWorld;
    var body;
    var name = "box" + wx + "_" + wy + "_" + wz;

    if (noPhysics) {} else if (physicsType == "cannon") {
      ////CANNON RELATED
      var shape = checkStorage("cannonShape", name);

      if (!shape) {
        shape = new CANNON.Box(new CANNON.Vec3(wx / 2, wy / 2, wz / 2));
        addToStorage("cannonShape", name, shape);
      }

      body = addCannonBody(shape, x, y, z, mass);
    } else if (physicsType == "matter") {
      var scale = matter.meterToPixel;
      body = matter.rectangle(x * scale, z * scale, wx * scale, wz * scale);
    } ////THREE RELATED


    var geometry = checkStorage("geometry", name);

    if (!geometry) {
      geometry = new THREE.BoxBufferGeometry(wx, wy, wz);
      addToStorage("geometry", name, geometry);
    }

    var materialName = "lambert_" + color + "_" + specificMatName;
    var material = checkStorage("material", materialName);

    if (!material) {
      //material= new THREE.MeshLambertMaterial({color:color});
      material = new THREE.MeshLambertMaterial({
        color: color
      });
      addToStorage("material", materialName, material);
    }

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.body = body;

    if (body) {
      body.mesh = mesh;
      body.color = color;
    }

    if (addToWorld) {
      scene.add(mesh);
    }

    this.objectList.push(mesh);
    return mesh;
  };

  this.addSphere = function (_ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        z = _ref2.z,
        radius = _ref2.radius,
        detail = _ref2.detail,
        color = _ref2.color,
        _ref2$mass = _ref2.mass,
        mass = _ref2$mass === void 0 ? 1 : _ref2$mass,
        _ref2$noPhysics = _ref2.noPhysics,
        noPhysics = _ref2$noPhysics === void 0 ? false : _ref2$noPhysics,
        _ref2$uniqueMaterial = _ref2.uniqueMaterial,
        uniqueMaterial = _ref2$uniqueMaterial === void 0 ? false : _ref2$uniqueMaterial,
        _ref2$addToWorld = _ref2.addToWorld,
        addToWorld = _ref2$addToWorld === void 0 ? true : _ref2$addToWorld;
    var body;
    var name = "sphere" + radius + "_" + detail;

    if (noPhysics) {} else if (physicsType == "cannon") {
      ////CANNON RELATED
      var shape = checkStorage("cannonShape", name);

      if (!shape) {
        shape = new CANNON.Sphere(radius);
        addToStorage("cannonShape", name, shape);
      }

      body = new CANNON.Body({
        mass: mass
      });
      body.addShape(shape);
      body.position.set(x, y, z);
      world.addBody(body);
    } ////THREE RELATED


    var geometry = checkStorage("geometry", name);

    if (!geometry) {
      geometry = new THREE.SphereBufferGeometry(radius, detail, detail);
      addToStorage("geometry", name, geometry);
    }

    var material;

    if (!uniqueMaterial) {
      var materialName = "lambert_" + color;
      material = checkStorage("material", materialName);

      if (!material) {
        material = new THREE.MeshLambertMaterial({
          color: color
        });
        addToStorage("material", materialName, material);
      }
    } else {
      material = new THREE.MeshLambertMaterial({
        color: color
      });
    }

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.body = body;

    if (body) {
      body.mesh = mesh;
      body.color = color;
    }

    if (addToWorld) {
      scene.add(mesh);
    }

    this.objectList.push(mesh);
    return mesh;
  };

  this.addCone = function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y,
        z = _ref3.z,
        baseRadius = _ref3.baseRadius,
        height = _ref3.height,
        segment = _ref3.segment,
        color = _ref3.color,
        _ref3$mass = _ref3.mass,
        mass = _ref3$mass === void 0 ? 1 : _ref3$mass;
    var body;

    if (physicsType == "cannon") {
      ////CANNON RELATED
      var name = "cone" + baseRadius + "_" + height + "_" + segment;
      var shape = checkStorage("cannonShape", name);

      if (!shape) {
        shape = new CANNON.Box(new CANNON.Vec3(baseRadius, height / 2, baseRadius));
        addToStorage("cannonShape", name, shape);
      }

      body = new CANNON.Body({
        mass: mass
      });
      body.addShape(shape);
      body.position.set(x, y, z);
      world.addBody(body);
    } ////THREE RELATED


    var geometry = checkStorage("geometry", name);

    if (!geometry) {
      geometry = new THREE.ConeBufferGeometry(baseRadius, height, segment);
      addToStorage("geometry", name, geometry);
    }

    var materialName = "lambert_" + color;
    var material = checkStorage("material", materialName);

    if (!material) {
      material = new THREE.MeshLambertMaterial({
        color: color
      });
      addToStorage("material", materialName, material);
    }

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.body = body;

    if (body) {
      body.mesh = mesh;
      body.color = color;
    }

    scene.add(mesh);
    this.objectList.push(mesh);
    return mesh;
  };

  this.addCylinder = function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y,
        z = _ref4.z,
        baseRadius = _ref4.baseRadius,
        height = _ref4.height,
        segment = _ref4.segment,
        color = _ref4.color,
        _ref4$mass = _ref4.mass,
        mass = _ref4$mass === void 0 ? 1 : _ref4$mass,
        openEnded = _ref4.openEnded,
        _ref4$thetaStart = _ref4.thetaStart,
        thetaStart = _ref4$thetaStart === void 0 ? 0 : _ref4$thetaStart,
        _ref4$thetaLength = _ref4.thetaLength,
        thetaLength = _ref4$thetaLength === void 0 ? Math.PI * 2 : _ref4$thetaLength,
        _ref4$noPhysics = _ref4.noPhysics,
        noPhysics = _ref4$noPhysics === void 0 ? false : _ref4$noPhysics,
        _ref4$physicsDimensio = _ref4.physicsDimensions,
        physicsDimensions = _ref4$physicsDimensio === void 0 ? null : _ref4$physicsDimensio,
        _ref4$uniqueMaterial = _ref4.uniqueMaterial,
        uniqueMaterial = _ref4$uniqueMaterial === void 0 ? false : _ref4$uniqueMaterial;
    var pBaseRadius = physicsDimensions && physicsDimensions.baseRadius || baseRadius;
    var pHeight = physicsDimensions && physicsDimensions.height || height;
    var body;

    if (physicsType == "cannon" && !noPhysics) {
      ////CANNON RELATED
      var name = "cylinder" + pBaseRadius + "_" + pHeight + "_" + segment + "_" + openEnded;
      var shape = checkStorage("cannonShape", name);

      if (!shape) {
        shape = new CANNON.Box(new CANNON.Vec3(pBaseRadius, pHeight / 2, pBaseRadius));
        addToStorage("cannonShape", name, shape);
      }

      body = new CANNON.Body({
        mass: mass
      });
      body.addShape(shape);
      body.position.set(x, y, z);
      world.addBody(body);
    } ////THREE RELATED
    //CylinderBufferGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)


    var geometry = checkStorage("geometry", name);

    if (!geometry) {
      console.log(openEnded);
      geometry = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, height, segment, 1, openEnded, thetaStart, thetaLength);
      addToStorage("geometry", name, geometry);
    }

    var material;

    if (!uniqueMaterial) {
      var materialName = "lambert_" + color;
      material = checkStorage("material", materialName);

      if (!material) {
        material = new THREE.MeshLambertMaterial({
          color: color
        });
        addToStorage("material", materialName, material);
      }
    } else {
      material = new THREE.MeshLambertMaterial({
        color: color
      });
    }

    material.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.body = body;

    if (body) {
      body.mesh = mesh;
      body.color = color;
    }

    scene.add(mesh);
    this.objectList.push(mesh);
    return mesh;
  };

  function addToStorage(type, name, data) {
    if (!storage) {
      return;
    }

    storage.addItem(type, name, data);
  }

  function checkStorage(type, name) {
    if (!storage) {
      return;
    }

    var item = storage.getItem(type, name);
    return item;
  }
}

/* harmony default export */ var objectMaker = (ObjectMaker);
// CONCATENATED MODULE: ./src/three_core/main.js




var disableBodyScroll = __webpack_require__(0).disableBodyScroll;

var physicsLibrary = "none";

var PhysicsHelper = __webpack_require__(1)["default"];

function ThreeMain(main, data, THREE) {
  main.storage = new storage(THREE);
  var lastWidth = data.lastWidth,
      lastHeight = data.lastHeight;
  var camera, scene, renderer;
  var physicsLibraryList = {
    none: 0,
    matter: 1,
    cannon: 2,
    oimo: 3
  };
  var physicsType = physicsLibraryList[physicsLibrary] || 0; //var physicsType = physicsLibrary == "matter" ? 1 : (physicsLibrary =="cannon"?2:0);

  this.init = function () {
    checkWebGL();
  };

  function checkWebGL() {
    /////Check webgl
    if (!WebGL.isWebGLAvailable()) {
      setTimeout(checkWebGL, 500);
      return;
    }

    var rendererData = data.renderer;
    var rendererConfig = {
      antialias: rendererData.antialias,
      alpha: rendererData.alpha
    };

    if (rendererData.canvasId) {
      rendererConfig.canvas = document.getElementById(rendererData.canvasId);
    }

    renderer = new THREE.WebGLRenderer(rendererConfig);

    if (rendererData.alpha) {
      renderer.setClearColor(0x000000, 0);
    }

    if (rendererData.gradient) {
      document.body.style.background = "\n            linear-gradient(\n                180deg, \n                ".concat(rendererData.gradient.top, " 0%, \n                ").concat(rendererData.gradient.bot, " 100%\n            )");
    } else if (rendererData.bgColor) {
      renderer.setClearColor(rendererData.bgColor, 1);
    }

    document.body.appendChild(renderer.domElement);
    disableBodyScroll(renderer.domElement);
    renderer.setSize(lastWidth, lastHeight);
    camera = new THREE.PerspectiveCamera(data.FOV || 75, lastWidth / lastHeight, 0.1, data.cameraFar || 500);
    scene = new THREE.Scene();
    main.scene = scene;
    main.camera = camera;
    main.renderer = renderer;
    startPhysics.call(main); ////OBJECT MAKER

    var physicsData = {
      type: physicsType
    };

    if (physicsType == 1) {
      //physicsData.matter=MatterHelper;
      physicsData.matter = main.matter;
      physicsData.meterToPixel = data.materToPixel || 30;
      main.matter.meterToPixel = physicsData.meterToPixel;
    } else if (physicsType == 2) {
      //physicsData.CANNON=cannonHelper.CANNON;
      physicsData.CANNON = PhysicsHelper.CANNON;
      physicsData.world = main.world;
    } else if (physicsType == 3) {
      physicsData.OIMO = PhysicsHelper.OIMO;
      physicsData.world = main.world;
    }

    main.objectMaker = new objectMaker(scene, main.storage, physicsData);
    data.threeReady(); //wait for assets loaded
    //startGame();
  }

  function startPhysics() {
    if (physicsType == 1) {
      //this.matter= new MatterHelper(data.gravity);
      this.matter = new PhysicsHelper(main);

      if (data.addTwoPhysicsWorld) {
        this.matter2 = new PhysicsHelper(main);
      }
    } else if (physicsType == 2) {
      //this.world= cannonHelper.init(data.gravity);
      //this.CANNON=cannonHelper.CANNON;
      this.world = PhysicsHelper.init(data.gravity);
      this.CANNON = PhysicsHelper.CANNON;

      this.initCannonDebug = function () {
        this.cannonDebugRenderer = this.CANNON.initCannonDebug(this.scene, this.world);
      };
    } else if (physicsType == 3) {
      this.world = PhysicsHelper.init(oimoConfig);
      this.OIMO = PhysicsHelper.OIMO;
    }
  }
}

/* harmony default export */ var three_core_main = __webpack_exports__["default"] = (ThreeMain);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/time.js
function Time(totalGameTime) {
  var countTime,
      startTime,
      totalTimePassed = 0,
      totalTime = totalGameTime;
  this.isStarted = false;

  this.start = function () {
    //if(totalGameTime==0)return;
    this.isStarted = true;
    countTime = true;
    startTime = new Date().getTime();
  };

  this.stop = function () {
    if (!this.isStarted) {
      return;
    }

    totalTime = this.left();
    totalTimePassed = this.passed();
    countTime = false;
  };

  this.reset = function (newTime) {
    countTime = true;
    startTime = new Date().getTime();
    totalTime = newTime === undefined ? totalGameTime : newTime;
    totalGameTime = newTime;
  }; ///call when game is paused


  this.resume = function () {
    if (!countTime && startTime) {
      this.start();
    }
  }; ///get time left


  this.left = function () {
    if (!countTime) return totalTime - totalTimePassed;
    var elapsedTime = new Date().getTime() - startTime;
    elapsedTime /= 1000;
    return totalTime - elapsedTime;
  }; ///GET TIME Passed


  this.passed = function () {
    if (!countTime) return totalTimePassed;
    var elapsedTime = new Date().getTime() - startTime;
    elapsedTime /= 1000;
    return elapsedTime + totalTimePassed;
  };

  this.checkTimeUp = function () {
    if (!countTime || !totalGameTime) return;
    var elapsedTime = new Date().getTime() - startTime;
    elapsedTime /= 1000;

    if (elapsedTime >= totalTime) {
      return true;
    }
  };
}

/* harmony default export */ var src_time = (Time);
// CONCATENATED MODULE: ./src/index.js
var library = "three";
var physicsLibrary = "none";
console.log('%c Playable Factory ', 'font-weight: bold; font-size: 25px; color: #ffffff; background: #162538; text-shadow: 1px 1px 0px #ffb600, -1px 1px 0px #ffb600, 1px -1px 0px #ffb600, -1px -1px 0px #ffb600'); //console.log(library, physicsLibrary);

var LibraryMain = __webpack_require__(4)["default"];

var Responsive = __webpack_require__(2)["default"];

var Loader = __webpack_require__(3)["default"];

var Utility = __webpack_require__(6)["default"];



function Main(data) {
  var app = window.app || {};
  var that = this;
  var dapiGameStarted = false,
      mraidGameStarted = false,
      gameStartedCallback,
      gameInited = false,
      filesLoaded = false;
  this.gamePaused = false;
  var THREE = window.THREE || {};
  var phaserEvents;
  var responsivePlugin;
  var libraryMain = new LibraryMain(this, data, THREE);
  var loaderPlugin = new Loader(this, THREE);
  var time = new src_time(data.totalTime); ///public properties

  this.loader = loaderPlugin;
  this.time = time;
  this.lastWidth = data.width;
  this.lastHeight = data.height;
  this.soundEnabled = true;
  this.data = data;
  this.lastOrientation = null;
  this.curOrientation = data.width > data.height ? "landscape" : "portrait";
  this.utility = new Utility(this);
  /*
  0-boot
  1-preload
  2-assets loaded
  3-game state
  4-game ended
  */

  this.state = 0;

  window.forceGameStart = function () {
    if (gameInited) {
      return;
    }

    loaded = 100;
    initGame();
    var preloader = document.getElementById("preloader") || document.getElementById("preloader-gear");

    if (preloader) {
      //preloader.style.display="none";
      preloader.classList.add("hide");
    }
  }; ////type related stuffs


  var type = app.type || null;
  var checkMraidTypes = ["lifestreet", "applovin", "unity", "adcolony"];
  var isMraid = checkMraidTypes.indexOf(type) >= 0 ? true : false;

  if (type == "instant") {
    console.log("Waiting for instant");
    document.addEventListener("deviceready", function () {
      screen.orientation.lock('portrait');
      initGame();

      function hideSplashScreen() {
        if (navigator.splashscreen) {
          console.warn('Hiding splash screen'); // We're done initializing, remove the splash screen

          navigator.splashscreen.hide();
          return;
        }

        setTimeout(hideSplashScreen, 500);
      }

      setTimeout(hideSplashScreen, 1000);
      AndroidFullScreen.immersiveMode(successFunction, errorFunction);

      function successFunction() {
        console.log("success");
      }

      function errorFunction() {
        console.log("error");
      }
    }, false);
  }

  function callOnLoad() {
    if (type == "instant") {
      return;
    }

    if (app.onLoadCalled) return;
    app.onLoadCalled = true;

    if (type == "nucleo") {
      checkDapiNucleo();
    } else if (type == "dapi_iron") {
      checkDapi();
    } else if (isMraid) {
      checkMraid();
    } else if (type == "chartboost") {
      checkChartboost();
    } else {
      initGame();
    }

    if (data.nucleo && type == "nucleo") {
      var nuc = data.nucleo;
      NUC.init(nuc.mode || "pa", nuc.title, nuc.genre, nuc.version);
    }

    if (type == "crossinstall") {
      window.onerror = function (msg, url, line, col, error) {
        // '*' required
        window.parent.postMessage('IFRAME ERROR -- ' + error, '*');
      };
    }
  }

  window.onload = callOnLoad;

  app.callOnLoad = function () {
    callOnLoad();
  };

  function initGame() {
    if (gameInited) return;
    gameInited = true;

    if (library == "phaser") {
      var game = libraryMain.init(that, data);
      responsivePlugin = new Responsive(game, onResize, postResize);
      that.game = game;
      phaserEvents = game.events;
    } else if (library == "three") {
      gameStartedCallback = data.gameStartCallback;
      libraryMain.init(that, data, window.THREE);
      responsivePlugin = new Responsive(that, onResize, postResize);
    }

    if (type == "vungle") {
      window.addEventListener('ad-event-pause', function () {
        // Pause audio/video/animations inside here
        pauseGame();
      });
      window.addEventListener('ad-event-resume', function () {
        // Resume audio/video/animations inside here
        resumeGame();
      });
    } else if (type == "dapi_iron") {} else {
      window.addEventListener("blur", pauseGame);
      window.addEventListener("focus", resumeGame);
    }
  } ////RESIZE RELATED


  function onResize(w, h) {
    that.lastWidth = w;
    that.lastHeight = h;

    if (w > h) {
      that.curOrientation = "landscape";
    } else {
      that.curOrientation = "portrait";
    }

    if (library == "phaser") {
      phaserEvents.emit("gameresized", w, h);
    } else if (data.gameResized) {
      data.gameResized(w, h);
    }
  }

  function postResize(w, h) {
    that.lastOrientation = that.curOrientation;

    if (library == "phaser") {
      phaserEvents.emit("postresized", w, h);
    } else if (data.postResized) {
      data.postResized(w, h);
    }
  }

  var startGameCalled = false;

  function startGame() {
    if (startGameCalled) return;
    startGameCalled = true;

    function checkLoaded() {
      if (loaded >= 100) {
        setTimeout(toTheGame, 250);
      } else {
        loadUpdate(1);
        setTimeout(checkLoaded, 25);
      }
    }

    setTimeout(checkLoaded, 50);

    function toTheGame() {
      ////assetsLoaded function usually
      responsivePlugin.startResponsive();
      gameStartedCallback();
      that.state = 3;
      var canvas = library == "phaser" ? that.game.canvas : that.renderer.domElement;

      if (canvas) {
        canvas.style.visibility = "visible";
      } //responsivePlugin.startResponsive();


      that.resizeNow(); //is there a load gif

      var loading = document.getElementById("loading");

      if (loading) {
        loading.style.display = "none";
        loading.parentNode.removeChild(loading);
      } //is there a load bg


      var loadingBg = document.getElementById("loading-bg");

      if (loadingBg) {
        loadingBg.style.display = "none";
        loadingBg.parentNode.removeChild(loadingBg);
      } ////remove preloader


      var preloader = document.getElementById("preloader") || document.getElementById("preloader-gear");

      if (preloader) {
        preloader.classList.add("hide");
        setTimeout(function () {
          preloader.style.display = "none";
          preloader.parentElement.removeChild(preloader);

          if (library == "phaser") {
            that.game.input.enabled = true;
          }
        }, 500); //750
      } ////Some stuff realted to ad networks


      if (window.NUC) {
        NUC.trigger.ready();
      }

      if (type == "mobvista") {
        window.mobvistaGameReady && window.mobvistaGameReady();
      }
    }

    ;
  }

  function pauseGame() {
    time.stop();
    that.gamePaused = true;

    if (library == "phaser") {
      phaserEvents.emit("gamepaused");
    } else if (data.gamePaused) {
      data.gamePaused();
    }
  }

  function resumeGame() {
    time.resume();
    that.gamePaused = false;

    if (library == "phaser") {
      phaserEvents.emit("gamecontinue");
    } else if (data.gameContinue) {
      data.gameContinue();
    }
  } /////PUBLIC FUNCTIONS
  ///call this function to force resizing


  this.resizeNow = function () {
    responsivePlugin.resizeNow();
  };

  this.restartGame = function (newTime) {
    time.reset(newTime);
    this.state = 3;

    if (window.NUC) {
      NUC.trigger.tryAgain();
    }
  };

  this.interacted = function () {
    if (type == "vungle") {
      parent.postMessage('interacted', '*');
    }

    window.NUC && window.NUC.trigger.interaction(); ///is this the first time of interaction

    if (!this.firstInteracted) {
      this.firstInteracted = true;

      if (type == "chartboost") {
        window.playable && window.playable.startGame();
      }
    }
  };

  this.gameFinished = function (didWon, reason) {
    if (window.NUC) {
      if (didWon) {
        NUC.trigger.endGame('win');
      } else {
        if (reason == "timeup") {
          NUC.trigger.endGame('timer');
        } else {
          NUC.trigger.endGame('lose');
        }
      }
    }

    if (type == "mobvista") {
      window.mobvistaGameEnd && window.mobvistaGameEnd();
    } else if (type == "vungle") {
      parent.postMessage('complete', '*');
    } else if (type == "chartboost") {
      window.playable && window.playable.finishGame();
    } else if (type == "lifestreet") {
      window.lsm_goalAchieved && window.lsm_goalAchieved();
    }
  }; ///UPDATE


  this.update = function () {
    if (this.state == 3 && time.checkTimeUp()) {
      this.state = 4;

      if (library == "phaser") {
        phaserEvents.emit("timeup");
      } else if (data.timeUp) {
        data.timeUp();
      }
    }
  }; ///if the assets loaded from outside call this function


  this.assetsLoaded = function () {
    filesLoaded = true;
    that.state = 2;
    startGame();
  }; ///LOAD ASSETS


  this.loadAssets = function (scene, assetList, loadCallback) {
    gameStartedCallback = loadCallback;
    this.state = 1;

    function assetLoaded() {
      filesLoaded = true;
      that.state = 2; ///loading finished
      ///if type is dapi wait for dapi start

      if (type == "dapi_iron" && !dapiGameStarted) {
        return;
      }
      /*if(isMraid && !mraidGameStarted){
          return;
      }*/


      startGame();
    }

    loaderPlugin.loadBulk(scene, assetList, assetLoaded);
  };

  this.openMarket = function (events, localX, localY, func) {
    visitStore();

    if (events) {
      events.preventDefault && events.preventDefault();
      events.stopPropagation && events.stopPropagation();
    }

    if (func && func.stopPropagation) {
      func.stopPropagation();
    }
  };

  this.openMarketFinal = function (events, localX, localY, func) {
    visitStore();
    this.gameFinished(true);

    if (events) {
      events.preventDefault && events.preventDefault();
      events.stopPropagation && events.stopPropagation();
    }

    if (func && func.stopPropagation) {
      func.stopPropagation();
    }
  }; ////VISIT LINK


  this.gotoLink = function (pointer, localX, localY, func) {
    console.log("click" + type);
    visitStore();

    if (func && func.stopPropagation) {
      func.stopPropagation();
    }

    if (data.ctaClicked) {
      data.ctaClicked();
    }
  };

  function visitStore() {
    if (!window.type) {
      window.alert("CTA Clicked!");
    } else if (type == "instant") {
      window.plugins.instantHelper.download();
    } else if (type == "google") {
      if (window.ExitApi) {
        ExitApi.exit();
      } else {
        window.open(clickTag);
      }
    } else if (type == "fb") {
      FbPlayableAd.onCTAClick();
    } else if (type == "mobvista") {
      window.install && window.install();
    } else if (type == "mraid_iron") {
      mraid.openStoreUrl();
    } else if (type == "dapi_iron") {
      if (!window.dapi) {
        console.warn("dapi not found");
      }

      dapi.openStoreUrl();
    } else if (type == "nucleo") {
      if (window.NUC) {
        NUC.trigger.convert();
      }
    } else if (type == "adcolony") {
      if (!window.mraid) {
        console.warn("mraid not found");
      }

      mraid.openStore(lp_url);
    } else if (type == "lifestreet" || type == "unity" || type == "applovin") {
      if (!window.mraid) {
        console.warn("mraid not found");
      }

      mraid.open(lp_url);
    } else if (type == "vungle") {
      parent.postMessage('download', '*');
    } else if (type == "tapjoy") {
      window.TJ_API && window.TJ_API.objectiveComplete();
      window.TJ_API && window.TJ_API.gameplayFinished();
      window.TJ_API && window.TJ_API.click();
    } else if (type == "toutiao") {
      window.playableSDK.openAppStore();
    } else if (type == "crossinstall") {
      window.parent.postMessage('click_go', '*'); // '*' required
    } else if (type == "chartboost") {
      //window.playable && window.playable.clickInstall();
      mraid.open(lp_url);
    }
  }

  this.startTimer = function () {
    if (this.timeStarted) return;
    time.start();
    this.timeStarted = true;
  };

  function checkDapiNucleo() {
    function startGame(width, height) {
      if (dapiGameStarted) {
        resumeGame();
        return;
      }

      dapiGameStarted = true;
      initGame({
        width: width,
        height: height
      });
    }

    NUC.callback.onStart(function (width, height, isAudioEnabled) {
      // Start the gaming process here...
      startGame(width, height);
      that.soundEnabled = isAudioEnabled;
    });
    NUC.callback.onImpression(function (width, height) {
      // Start the gaming process here...
      startGame(width, height);
    });
    NUC.callback.onDeviceData(function (os, osVersion, deviceId, deviceLanguage, apiLevel) {//device data
    });
    NUC.callback.onPause(function () {
      // Pause tweens, timers, music and sound effects
      pauseGame();
    });
    NUC.callback.onResume(function () {
      // Resume tweens, timers, music and sound effects
      resumeGame();
    });
    NUC.callback.onMute(function () {
      // Disable all sound effects
      // ALL, seriously
      that.soundEnabled = false;

      if (phaserEvents) {
        phaserEvents.emit("soundchanged", that.soundEnabled);
      } else if (data.soundChanged) {
        data.soundChanged(that.soundEnabled);
      }
    });
    NUC.callback.onUnmute(function () {
      // Enable sound effects
      that.soundEnabled = true;

      if (phaserEvents) {
        phaserEvents.emit("soundchanged", that.soundEnabled);
      } else if (data.soundChanged) {
        data.soundChanged(that.soundEnabled);
      }
    }); ///SOME CALLBACKS
    //onTimeUpdate
  }

  function checkDapi() {
    dapi.isReady() ? onReadyCallback() : dapi.addEventListener("ready", onReadyCallback);

    function onReadyCallback() {
      //No need to listen to this event anymore
      dapi.removeEventListener("ready", onReadyCallback); //If the ad is visible start the game

      if (dapi.isViewable()) {
        startGame();
      }

      dapi.addEventListener("viewableChange", viewableChangeCallback);
      dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
      that.soundEnabled = !!dapi.getAudioVolume(); //dapi.addEventListener("adResized", orientationCallback);
    }

    function startGame() {
      if (dapiGameStarted) {
        resumeGame();
        return;
      }

      dapiGameStarted = true;
      initGame(dapi.getScreenSize());
    }

    function viewableChangeCallback(e) {
      e.isViewable ? startGame() : dapiPause(); //start the game or resume
    }

    function dapiPause() {
      pauseGame();
    }

    function audioVolumeChangeCallback(volume) {
      that.soundEnabled = !!volume;

      if (phaserEvents) {
        phaserEvents.emit("soundchanged", that.soundEnabled);
      } else if (data.soundChanged) {
        data.soundChanged(that.soundEnabled);
      }
    }
    /*
    dapi.addEventListener("adResized", function(event){
        let game = that.game;
        if(!game || !game.scale || !game.scale.resize){
            return;
        }
        var iw = window.innerWidth, ih=window.innerHeight;
        if(!event || !event.width){
            var dimensions=dapi.getScreenSize();
            if(dimensions){
                iw=dimensions.width;
                ih=dimensions.height;
            }
          }
        else{
            iw=event.width;
            ih=event.height;
        }
          game.scale.resize(iw,ih);
    });*/

  } ///MRAID RELATED


  function checkMraid() {
    if (!window.mraid) {
      mraidGameStarted = true;
      initGame();
      console.warn("mraid not found!");
      return;
    } // Wait for the SDK to become ready


    if (mraid.getState() === 'loading') {
      mraid.addEventListener('ready', onSdkReady);
    } else {
      onSdkReady();
    }

    function viewableChangeHandler(viewable) {
      // start/pause/resume gameplay, stop/play sounds
      if (viewable) {
        showMyAd();
      } else {// pause 
      }
    }

    function onSdkReady() {
      mraid.addEventListener('viewableChange', viewableChangeHandler); // Wait for the ad to become viewable for the first time

      if (mraid.isViewable()) {
        showMyAd();
      }
    }

    function showMyAd() {
      mraidGameStarted = true;

      if (!gameInited) {
        initGame();
        return;
      } ///l=!0,h.state>1||!c||y() and replace it with l=!0,h.state>2||!c||y()
      ////state 2 means assets loaded

      /*if(that.state>1 || !filesLoaded){
          return;
      }*/


      startGame();
    }
  } ////CHARTBOOST


  function checkChartboost() {
    if (!window.mraid) {
      mraidGameStarted = true;
      initGame();
      console.warn("mraid not found!");
      return;
    } // Wait for the SDK to become ready


    if (mraid.getState() === 'loading') {
      mraid.addEventListener('ready', onSdkReady);
    } else if (mraid.getState() === 'default') {
      showMyAd();
    } else {
      onSdkReady();
    }

    function viewableChangeHandler(viewable) {
      // start/pause/resume gameplay, stop/play sounds
      if (viewable) {
        showMyAd();
      } else {// pause 
      }
    }

    function onSdkReady() {
      mraid.addEventListener('viewableChange', viewableChangeHandler);

      if (mraid.isViewable()) {
        showMyAd();
      }
    }

    function showMyAd() {
      mraidGameStarted = true;

      if (!gameInited) {
        initGame();
        return;
      }

      startGame();
    }
  }

  function checkChartboostOld() {
    if (!window.playable) {
      initGame();
      return;
    }

    window.playable.init = function () {
      initGame(); //playable.GAME_NAME = '[companyName]-[gameName]';

      playable.GAME_NAME = data.gameName, playable.REWARDED_DURATION = data.totalTime; //'30'

      playable.INTERSTITIAL_DURATION = data.totalTime;
      playable.HIDE_TIMER = 'false';
    };
  }
}

/* harmony default export */ var src = __webpack_exports__["default"] = (Main);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/three_core/misc/anim.js
function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

///some utility functions
function AnimManager(model, animations, mixer) {
  var list = {};
  var animList = [];

  var _iterator = _createForOfIteratorHelper(animations),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var anim = _step.value;
      var name = anim.name;
      list[name] = anim;
      anim.defaultDuration = anim.duration;
      anim.timeScale = 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  this.addAnimation = function (_ref) {
    var name = _ref.name,
        startTime = _ref.startTime,
        duration = _ref.duration,
        noRepeat = _ref.noRepeat,
        _ref$timeScale = _ref.timeScale,
        timeScale = _ref$timeScale === void 0 ? 1 : _ref$timeScale,
        yoyo = _ref.yoyo;
    var anim = list[name];
    var animName = name + "Anim";
    if (duration) anim.duration = duration;
    this[animName] = mixer.clipAction(anim, model);
    animList.push(this[animName]);
    this[animName].clampWhenFinished = true;
    if (noRepeat) this[animName].repetitions = 0;
    this[animName].timeScale = timeScale;

    if (yoyo) {
      this[animName].loop = THREE.LoopPingPong;
    }
  };

  this.fadeTo = function name(name) {
    var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var noRepeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var timeScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var yoyo = arguments.length > 4 ? arguments[4] : undefined;
    var changeDuration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.25;
    timeScale = timeScale || list[name].timeScale;
    var animName = name + "Anim";

    if (!this[animName]) {
      this.addAnimation({
        name: name,
        startTime: startTime
      });
    }

    if (startTime != "none") {
      this[animName].time = startTime;
    }

    if (noRepeat) {
      this[animName].repetitions = 0;
    } else {
      this[animName].repetitions = Infinity;
    }

    this[animName].timeScale = timeScale;
    this[animName].play();
    this.curAnim.setEffectiveTimeScale(1).setEffectiveWeight(1).crossFadeTo(this[animName], changeDuration);
    this.curAnim = this[animName];
    this.curAnim.name = name;
    this.curAnim.duration = this.curAnim._clip.duration;
    this.curAnim.startTime = startTime;
    this.curAnim._clip.startTime = startTime;

    if (yoyo) {
      this.curAnim.loop = THREE.LoopPingPong;
    }
  };

  this.stopAllAnimations = function () {
    var _iterator2 = _createForOfIteratorHelper(animList),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var anim = _step2.value;
        anim.time = 0;
        anim.stop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  this.updateTimeScales = function (animations) {
    var _iterator3 = _createForOfIteratorHelper(animations),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var animData = _step3.value;
        var name = animData.name;
        var value = animData.value;
        list[name].timeScale = value;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };

  this.startAnimation = function (name) {
    var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var noRepeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var timeScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var yoyo = arguments.length > 4 ? arguments[4] : undefined;
    timeScale = timeScale || list[name].timeScale;
    var animName = name + "Anim";

    if (!this[animName]) {
      this.addAnimation({
        name: name,
        startTime: startTime
      }); //return;
    }

    this.stopAllAnimations();
    this[animName].reset();

    if (startTime != "none") {
      this[animName].time = startTime;
    }

    if (noRepeat) {
      this[animName].repetitions = 0;
    } else {
      this[animName].repetitions = Infinity;
    }

    this[animName].timeScale = timeScale;
    this[animName].play();
    this.curAnim = this[animName];
    this.curAnim.name = name;
    this.curAnim.duration = this.curAnim._clip.duration;
    this.curAnim.startTime = startTime;
    this.curAnim._clip.startTime = startTime;

    if (yoyo) {
      this.curAnim.loop = THREE.LoopPingPong;
    }
  };
} ///some utility functions


function TimeAnimManager(model, animData, animations, mixer) {
  var list = {};
  var animList = [];

  var _iterator4 = _createForOfIteratorHelper(animations),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var anim = _step4.value;
      var name = anim.name;
      list[name] = anim;

      if (anim.repeat == -1) {
        anim.endlessAnim = true;
      }

      anim.defaultDuration = anim.duration;
      anim.defaultRepeat = anim.repeat;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var clipAction = mixer.clipAction(animData, model);
  var completeCallback;
  this.clipAction = clipAction;
  var curAnim;

  this.startAnimation = function (name, callback) {
    curAnim = list[name];

    if (!curAnim) {
      console.warn("NO SUCH ANIMATION!");
    }

    curAnim.endTime = curAnim.startTime + curAnim.duration;
    curAnim.repeat = curAnim.defaultRepeat;
    clipAction.time = curAnim.startTime;
    clipAction.timeScale = curAnim.timeScale || 1;
    clipAction.play();
    curAnim.onComplete = callback;
    this.curAnimName = name;
  };

  this.update = function () {
    if (!curAnim) return;

    if (clipAction.time > curAnim.endTime) {
      curAnim.repeat--;

      if (curAnim.repeat < 0 && !curAnim.endlessAnim) {
        clipAction.timeScale = 0;

        if (curAnim.onComplete) {
          clearInterval(completeCallback);
          completeCallback = setTimeout(curAnim.onComplete, 200); //curAnim.onComplete();
        }

        curAnim = null;
      } else {
        clipAction.time = curAnim.startTime;
      }
    }
  };
}

 //export default TimeAnimManager;
// CONCATENATED MODULE: ./src/three_core/utility.js
function utility_createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = utility_unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function utility_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utility_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utility_arrayLikeToArray(o, minLen); }

function utility_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

///some utility functions


function Utility(main) {
  this.AnimManager = AnimManager;
  this.TimeAnimManager = TimeAnimManager; ////FPS CHECKER

  var lastDelta,
      deltas = [],
      deltaCheckTime = 100;

  this.checkFps = function (printDeltaElement) {
    var dt = performance.now();

    if (lastDelta) {
      var dif = dt - lastDelta;
      deltas.push(dif);

      if (deltas.length > 30) {
        deltas.shift();
      }
    }

    lastDelta = dt;
    deltaCheckTime--;

    if (deltaCheckTime <= 0) {
      deltaCheckTime = 100;
      var sum = 0,
          numOfDt = 0;

      var _iterator = utility_createForOfIteratorHelper(deltas),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var d = _step.value;

          if (d > 100) {
            continue;
          }

          sum += d;
          numOfDt++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var averageDelta = sum / numOfDt;
      deltas = [];

      if (printDeltaElement) {
        var fpsEl = document.getElementById(printDeltaElement);
        if (fpsEl) fpsEl.innerHTML = fps;
      } ////idealy should be  around 16


      if (averageDelta > 30) {
        deltaCheckTime = 9999;
        return true; //app.data.resolution=1;
        //main.resizeNow();
      }
    }
  };

  this.getMaterials = function (obj, list) {
    if (Array.isArray(obj)) {
      var _iterator2 = utility_createForOfIteratorHelper(obj),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var obj2 = _step2.value;
          this.getMaterials(obj2, list);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return;
    }

    if (obj.material) {
      var mat = obj.material;
      list.push(mat);
    }

    if (obj.children) {
      this.getMaterials(obj.children, list);
    }
  };

  this.fillMaterial = function (mat, hexColor) {
    hexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    var r = parseInt(hexColor[1], 16) / 256;
    var g = parseInt(hexColor[2], 16) / 256;
    var b = parseInt(hexColor[3], 16) / 256;
    mat.color.r = r;
    mat.color.g = g;
    mat.color.b = b;
  };

  this.getChildWithName = function (obj, childName) {
    var child;

    function findChild(obj, childName) {
      if (Array.isArray(obj)) {
        var _iterator3 = utility_createForOfIteratorHelper(obj),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var obj2 = _step3.value;
            //console.log(obj2)
            findChild(obj2, childName);
          } //return;

        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } //if(obj.type=="Object3D" && obj.name==childName){


      if (obj.name == childName) {
        //var mat=obj.material;
        //list.push(mat);
        child = obj;
        return;
      }

      if (obj.children) {
        findChild(obj.children, childName);
      }
    }

    findChild(obj, childName);
    return child;
  };

  this.startOrbitControls = function () {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var maxPolarAngle = arguments.length > 2 ? arguments[2] : undefined;
    var controls = new THREE.OrbitControls(main.camera, document.body); //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    if (maxPolarAngle !== undefined) {
      controls.maxPolarAngle = maxPolarAngle;
    } //controls.maxPolarAngle = maxPolarAngle;


    controls.minDistance = min;
    controls.maxDistance = max;
    return controls;
  };

  this.initControlsPointer = function () {
    var controlData = {
      isDown: false
    };
    var domElement = document.body; /////MOUSE CONTROL

    function mouseDown(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.downX = e.pageX;
      controlData.downY = e.pageY;
      controlData.mouseX = e.pageX;
      controlData.mouseY = e.pageY;
      controlData.prevX = e.pageX;
      controlData.prevY = e.pageY;
      controlData.isDown = true;
    }

    function mouseMove(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.prevX = controlData.mouseX;
      controlData.prevY = controlData.mouseY;
      controlData.mouseX = e.pageX;
      controlData.mouseY = e.pageY;
    }

    function mouseUp(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.isDown = false;
    }

    domElement.addEventListener("pointerdown", mouseDown);
    domElement.addEventListener("pointerup", mouseUp);
    domElement.addEventListener("pointermove", mouseMove);
    return controlData;
  };

  this.initControls = function () {
    var controlData = {
      isDown: false
    };
    var domElement = document.body; /////MOUSE CONTROL

    domElement.addEventListener("mousedown", mouseDown);

    function mouseDown(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.downX = e.pageX;
      controlData.downY = e.pageY;
      controlData.mouseX = e.pageX;
      controlData.mouseY = e.pageY;
      controlData.prevX = e.pageX;
      controlData.prevY = e.pageY;
      controlData.isDown = true;
      domElement.addEventListener("mouseup", mouseUp);
      domElement.addEventListener("mousemove", mouseMove);
    }

    function mouseMove(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.prevX = controlData.mouseX;
      controlData.prevY = controlData.mouseY;
      controlData.mouseX = e.pageX;
      controlData.mouseY = e.pageY;
    }

    function mouseUp(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.isDown = false;
      domElement.removeEventListener("mouseup", mouseUp);
      domElement.removeEventListener("mousemove", mouseMove);
    } ////TOUCH CONTROL


    domElement.addEventListener("touchstart", touchStart);

    function touchStart(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.downX = e.touches[0].pageX;
      controlData.downY = e.touches[0].pageY;
      controlData.mouseX = e.touches[0].pageX;
      controlData.mouseY = e.touches[0].pageY;
      controlData.prevX = e.touches[0].pageX;
      controlData.prevY = e.touches[0].pageY;
      controlData.isDown = true;
      domElement.addEventListener("touchend", touchEnd);
      domElement.addEventListener("touchmove", touchMove);
    }

    function touchMove(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.prevX = controlData.mouseX;
      controlData.prevY = controlData.mouseY;
      controlData.mouseX = e.touches[0].pageX;
      controlData.mouseY = e.touches[0].pageY;
    }

    function touchEnd(e) {
      /*e.preventDefault();
      e.stopPropagation();*/
      controlData.isDown = false;
      domElement.removeEventListener("touchend", touchEnd);
      domElement.removeEventListener("touchmove", touchMove);
    }

    return controlData;
  };

  this.activateCameraInputs = function (defaults) {
    var inputList = {};
    var div = document.createElement("div");
    document.body.appendChild(div);
    div.style.position = "absolute";
    div.style.left = 0;
    div.style.top = 0;
    div.style.zIndex = 99;
    var inputs = ["camx", "camy", "camz", "targetx", "targety", "targetz"];

    for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
      var inputId = _inputs[_i];
      var span = document.createElement("span");
      span.innerHTML = inputId + ":";
      var input = document.createElement("input");
      input.type = "range";
      input.value = "0";
      input.max = "100";
      input.min = "-100";
      input.style.width = "400px";
      input.style.maxWidth = "60%";
      input.value = defaults[inputId] || 0;
      /*
      if(inputId=="camy"){
          input.value=24;
      }
      else if(inputId=="camz"){
          input.value=18;
      }
      */

      div.appendChild(span);
      div.appendChild(input);
      var span2 = document.createElement("span");
      span2.innerHTML = input.value;
      div.appendChild(span2);
      input.span = span2;
      var br = document.createElement("br");
      div.appendChild(br);
      inputList[inputId] = input;

      input.oninput = function () {
        this.span.innerHTML = this.value;
        main.camera.position.set(inputList.camx.value, inputList.camy.value, inputList.camz.value);
        main.camera.lookAt(inputList.targetx.value, inputList.targety.value, inputList.targetz.value);
      };
    }
  };
}

/* harmony default export */ var utility = __webpack_exports__["default"] = (Utility);

/***/ })
/******/ ]);
});
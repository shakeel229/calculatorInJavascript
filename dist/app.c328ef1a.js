// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CalculatorManager = /*#__PURE__*/function () {
  function CalculatorManager() {
    _classCallCheck(this, CalculatorManager);
  }

  _createClass(CalculatorManager, [{
    key: "UiEventsHandler",
    value: function UiEventsHandler() {
      var _this = this;

      //grabbing the calculator div from DOM  to work with buttons and attach Event Listeners
      var calculator = document.querySelector(".calculator"); //variable to hold all the calculator keys to attach listeners

      var keys = calculator.querySelector(".calculator__keys"); //varaible holds the display screen to show calculation results on screen and to retrieve user input value as well

      var display = calculator.querySelector(".calculator__display"); //attached event listeners to keys

      keys.addEventListener("click", function (e) {
        // to confimr if click was to a button and then fetch its action and values further
        if (e.target.matches("button")) {
          //retrieve actual target button
          var key = e.target; //retrieve the datasent attributes of the button and current display status in constant data types

          var action = key.dataset.action;
          var keyContent = key.textContent;
          var displayedNum = display.textContent;
          var secondValue = displayedNum;
          var previousKeyType = calculator.dataset.previousKeyType;
          console.log(previousKeyType); //removing pressed class from the keys if applied

          Array.from(key.parentNode.children).forEach(function (k) {
            return k.classList.remove("is-depressed");
          }); //if the button has to action attribute then it is a numeric value

          if (!action) {
            calculator.dataset.previousKeyType = "number"; //if screen was at default zero value or the user is putting the second value of operation clear screen to new value

            if (displayedNum === "0" || previousKeyType === "operator") {
              display.textContent = keyContent;
            } else {
              display.textContent = displayedNum + keyContent;
            }
          } //if user clicks action buttons then following actions sequence should be executed


          if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
            var firstValue = calculator.dataset.firstValue;
            var operator = calculator.dataset.operator;
            secondValue = displayedNum; //first value exists and the operation to be performed exists then do calcualtion
            //but make sure last press of user was not the operator butn or calculate button

            if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
              var calcValue = _this.performCalculation(firstValue, operator, secondValue); //display calculation to screen


              display.textContent = calcValue; // Update calculated value as firstValue

              calculator.dataset.firstValue = calcValue;
            } else {
              // If there are no calculations, set displayedNum as the firstValue
              calculator.dataset.firstValue = displayedNum;
            } //when user click operator key show it as pressed for better Uesr experience he know which operation he is performing


            key.classList.add("is-depressed");
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.operator = action;
          } //if user enters decimal ensure the screen does not contain a decimal already in value


          if (action === "decimal") {
            if (!displayedNum.includes(".")) {
              display.textContent = displayedNum + ".";
            } // if it is second value or start of value then show 0. on screen
            else if (previousKeyType === "operator" || previousKeyType === "calculate") {
                display.textContent = "0.";
              } //set the previous click key status as decimal


            calculator.dataset.previousKeyType = "decimal";
          } //if user click clear screen button then clear the based on following conditions


          if (action === "clear") {
            //if clear button show AC all clear the remove first value second values and operator value to empty
            if (key.textContent === "AC") {
              calculator.dataset.firstValue = "";
              calculator.dataset.modValue = "";
              calculator.dataset.operator = "";
              calculator.dataset.previousKeyType = "";
              _this.firstValue = "";
              _this.secondValue = "";
            } else {
              key.textContent = "AC";
            } //set the screen to zero


            display.textContent = 0;
            calculator.dataset.previousKeyType = "clear";
          }

          if (action !== "clear") {
            var clearButton = calculator.querySelector("[data-action=clear]");
            clearButton.textContent = "CE";
          } //if user click on calculate operator =
          //then take following actions fetch first,last and operator value from calculator data-set attributes and screen


          if (action === "calculate") {
            var _firstValue = calculator.dataset.firstValue;
            var _operator = calculator.dataset.operator;
            var _secondValue = displayedNum; //if user again clicks the calculate button previous output will be set as a firsst value
            //and 2nd value will be the last 2nd number which user input befor last calcualtion we save in modValue

            if (_firstValue) {
              if (previousKeyType === "calculate") {
                _firstValue = displayedNum; //calculator.dataset.firstValue = firstValue;

                _secondValue = calculator.dataset.modValue;
                console.log(_firstValue + ":" + _secondValue + calculator.dataset.modValue);
              } //calling calculation method on values


              display.textContent = _this.performCalculation(_firstValue, _operator, _secondValue);
            } // Set modValue attribute every time users click calcuation button it is saved if user want to repaeat same caluction
            //by clicking calculation button again


            calculator.dataset.modValue = _secondValue;
            calculator.dataset.previousKeyType = "calculate";
          }
        }
      });
    } // this method performs calculation on given 2 values and the operator and returns output number

  }, {
    key: "performCalculation",
    value: function performCalculation(n1, operator, n2) {
      var firstNum = parseFloat(n1);
      var secondNum = parseFloat(n2);
      if (operator === "add") return firstNum + secondNum;
      if (operator === "subtract") return firstNum - secondNum;
      if (operator === "multiply") return firstNum * secondNum;
      if (operator === "divide") return firstNum / secondNum;
    }
  }]);

  return CalculatorManager;
}(); //const calculator = new CalculatorManager();
// //calling method to handle click events
//calculator.UiEventsHandler();


exports.default = CalculatorManager;
window.addEventListener("load", function () {
  //declaring class object
  var calculator = new CalculatorManager(); // //calling method to handle click events

  calculator.UiEventsHandler();
});
window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64848" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map
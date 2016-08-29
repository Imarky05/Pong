/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "35c4f6b35b6fa5746952"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/pong/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n__webpack_require__(1);\n\nvar _game = __webpack_require__(10);\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar game = new _game2.default();\n\nvar fps = 30;\n\nfunction gameLoop() {\n\tgame.render();\n\tsetTimeout(gameLoop, fps);\n}\n\ngameLoop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/YmM2NiJdLCJuYW1lcyI6WyJnYW1lIiwiZnBzIiwiZ2FtZUxvb3AiLCJyZW5kZXIiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxPQUFPLG9CQUFYOztBQUVBLElBQU1DLE1BQU0sRUFBWjs7QUFFQSxTQUFTQyxRQUFULEdBQW9CO0FBQ25CRixNQUFLRyxNQUFMO0FBQ0FDLFlBQVdGLFFBQVgsRUFBcUJELEdBQXJCO0FBQ0E7O0FBRURDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2dhbWUuY3NzJztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcclxuXHJcbnZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxuXHJcbmNvbnN0IGZwcyA9IDMwO1xyXG5cclxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XHJcblx0Z2FtZS5yZW5kZXIoKTtcclxuXHRzZXRUaW1lb3V0KGdhbWVMb29wLCBmcHMpO1xyXG59XHJcblxyXG5nYW1lTG9vcCgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(2);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(9)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(2, function() {\n\t\t\tvar newContent = __webpack_require__(2);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/YmM3YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(3)();\n// imports\n\n\n// module\nexports.push([module.id, \"/* http://meyerweb.com/eric/tools/css/reset/\\r\\n   v2.0 | 20110126\\r\\n   License: none (public domain)\\r\\n*/\\r\\n\\r\\nhtml, body, div, span, applet, object, iframe,\\r\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\r\\na, abbr, acronym, address, big, cite, code,\\r\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\r\\nsmall, strike, strong, sub, sup, tt, var,\\r\\nb, u, i, center,\\r\\ndl, dt, dd, ol, ul, li,\\r\\nfieldset, form, label, legend,\\r\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\r\\narticle, aside, canvas, details, embed,\\r\\nfigure, figcaption, footer, header, hgroup,\\r\\nmenu, nav, output, ruby, section, summary,\\r\\ntime, mark, audio, video {\\r\\n   margin: 0;\\r\\n   padding: 0;\\r\\n   border: 0;\\r\\n   font-size: 100%;\\r\\n   font: inherit;\\r\\n   vertical-align: baseline;\\r\\n}\\r\\n/* HTML5 display-role reset for older browsers */\\r\\narticle, aside, details, figcaption, figure,\\r\\nfooter, header, hgroup, menu, nav, section {\\r\\n   display: block;\\r\\n}\\r\\nbody {\\r\\n   line-height: 1;\\r\\n}\\r\\nol, ul {\\r\\n   list-style: none;\\r\\n}\\r\\nblockquote, q {\\r\\n   quotes: none;\\r\\n}\\r\\nblockquote:before, blockquote:after,\\r\\nq:before, q:after {\\r\\n   content: '';\\r\\n   content: none;\\r\\n}\\r\\ntable {\\r\\n   border-collapse: collapse;\\r\\n   border-spacing: 0;\\r\\n}\\r\\n\\r\\n/* Game Styles */\\r\\n\\r\\n@font-face {\\r\\n    font-family: 'PressStart2P Web';\\r\\n    src: url(\" + __webpack_require__(4) + \");\\r\\n    src: url(\" + __webpack_require__(4) + \"?#iefix) format('embedded-opentype'),\\r\\n         url(\" + __webpack_require__(5) + \") format('woff2'),\\r\\n         url(\" + __webpack_require__(6) + \") format('woff'),\\r\\n         url(\" + __webpack_require__(7) + \") format('truetype'),\\r\\n         url(\" + __webpack_require__(8) + \"#press_start_2pregular) format('svg');\\r\\n    font-weight: normal;\\r\\n    font-style: normal;\\r\\n}\\r\\nbody {\\r\\n   font-family: 'PressStart2P Web', monospace;\\r\\n   margin: 0 auto;\\r\\n   text-align: center;\\r\\n}\\r\\nh1 {\\r\\n   margin-top: 20px;\\r\\n}\\r\\n#game {\\r\\n   display: block;\\r\\n   height: 256px;\\r\\n   margin: 20px auto;\\r\\n   width: 512px;\\r\\n}\\r\\n.players {\\r\\n   display: inline-flex;\\r\\n   justify-content: space-between;\\r\\n   text-align: center;\\r\\n   width: 512px;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/NDMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLDhwQkFBOHBCLGlCQUFpQixrQkFBa0IsaUJBQWlCLHVCQUF1QixxQkFBcUIsZ0NBQWdDLEtBQUsscUpBQXFKLHNCQUFzQixLQUFLLFVBQVUsc0JBQXNCLEtBQUssWUFBWSx3QkFBd0IsS0FBSyxtQkFBbUIsb0JBQW9CLEtBQUssK0RBQStELG1CQUFtQixxQkFBcUIsS0FBSyxXQUFXLGlDQUFpQyx5QkFBeUIsS0FBSyw2Q0FBNkMsd0NBQXdDLGlEQUF1RSw4V0FBK2QsNEJBQTRCLDJCQUEyQixLQUFLLFVBQVUsa0RBQWtELHNCQUFzQiwwQkFBMEIsS0FBSyxRQUFRLHdCQUF3QixLQUFLLFdBQVcsc0JBQXNCLHFCQUFxQix5QkFBeUIsb0JBQW9CLEtBQUssY0FBYyw0QkFBNEIsc0NBQXNDLDBCQUEwQixvQkFBb0IsS0FBSzs7QUFFM3pFIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcbiAgIG1hcmdpbjogMDtcXHJcXG4gICBwYWRkaW5nOiAwO1xcclxcbiAgIGJvcmRlcjogMDtcXHJcXG4gICBmb250LXNpemU6IDEwMCU7XFxyXFxuICAgZm9udDogaW5oZXJpdDtcXHJcXG4gICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcbiAgIGxpbmUtaGVpZ2h0OiAxO1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcbiAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcbiAgIHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcbiAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgIGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG4gICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgIGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHYW1lIFN0eWxlcyAqL1xcclxcblxcclxcbkBmb250LWZhY2Uge1xcclxcbiAgICBmb250LWZhbWlseTogJ1ByZXNzU3RhcnQyUCBXZWInO1xcclxcbiAgICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIikgKyBcIik7XFxyXFxuICAgIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFwiKSArIFwiPyNpZWZpeCkgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxcclxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMlwiKSArIFwiKSBmb3JtYXQoJ3dvZmYyJyksXFxyXFxuICAgICAgICAgdXJsKFwiICsgcmVxdWlyZShcIi4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmZcIikgKyBcIikgZm9ybWF0KCd3b2ZmJyksXFxyXFxuICAgICAgICAgdXJsKFwiICsgcmVxdWlyZShcIi4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnR0ZlwiKSArIFwiKSBmb3JtYXQoJ3RydWV0eXBlJyksXFxyXFxuICAgICAgICAgdXJsKFwiICsgcmVxdWlyZShcIi4uL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnN2Z1wiKSArIFwiI3ByZXNzX3N0YXJ0XzJwcmVndWxhcikgZm9ybWF0KCdzdmcnKTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICBmb250LWZhbWlseTogJ1ByZXNzU3RhcnQyUCBXZWInLCBtb25vc3BhY2U7XFxyXFxuICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5oMSB7XFxyXFxuICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG59XFxyXFxuI2dhbWUge1xcclxcbiAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgIGhlaWdodDogMjU2cHg7XFxyXFxuICAgbWFyZ2luOiAyMHB4IGF1dG87XFxyXFxuICAgd2lkdGg6IDUxMnB4O1xcclxcbn1cXHJcXG4ucGxheWVycyB7XFxyXFxuICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICB3aWR0aDogNTEycHg7XFxyXFxufVxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9zcmMvZ2FtZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.eot\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3Q/MWUwYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff2\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMj9kOTUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmPzEyMGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmZcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.ttf\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGY/NTYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnR0ZlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.svg\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmc/ZjRjYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnN2Z1wiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n      value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _paddle = __webpack_require__(11);\n\nvar _paddle2 = _interopRequireDefault(_paddle);\n\nvar _board = __webpack_require__(12);\n\nvar _board2 = _interopRequireDefault(_board);\n\nvar _ball = __webpack_require__(13);\n\nvar _ball2 = _interopRequireDefault(_ball);\n\nvar _scoreBoard = __webpack_require__(14);\n\nvar _scoreBoard2 = _interopRequireDefault(_scoreBoard);\n\nvar _settings = __webpack_require__(15);\n\nvar _settings2 = _interopRequireDefault(_settings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Game = function () {\n      function Game() {\n            _classCallCheck(this, Game);\n\n            var canvas = document.getElementById('game');\n            this.width = canvas.width;\n            this.height = canvas.height;\n            this.context = canvas.getContext('2d');\n            this.context.fillStyle = 'white';\n\n            // boards\n            this.board = new _board2.default(this.width, this.height);\n\n            // players\n            this.player1 = new _paddle2.default(this.height, _settings2.default.gap, _settings2.default.p1Keys);\n            this.player2 = new _paddle2.default(this.height, this.width - 4 - _settings2.default.gap, _settings2.default.p2Keys);\n\n            //Ball\n            this.ball = new _ball2.default(this.height, this.width);\n\n            // Scores\n            this.p1score = new _scoreBoard2.default(this.width / 4, 20);\n            this.p2score = new _scoreBoard2.default(this.width / 4 * 3, 20);\n\n            // console.log(this.player1, this.player2);\n      }\n\n      _createClass(Game, [{\n            key: 'drawLine',\n            value: function drawLine() {\n                  this.context.setLineDash([10, 10]);\n                  this.context.beginPath();\n                  this.context.moveTo(this.width / 2, 0);\n                  this.context.lineTo(this.width / 2, this.height);\n                  this.context.strokeStyle = \"red\";\n                  this.context.stroke();\n            }\n      }, {\n            key: 'render',\n            value: function render() {\n                  this.drawLine();\n\n                  // boarder\n                  this.board.render(this.context);\n\n                  // paddles\n                  this.player1.render(this.context);\n                  this.player2.render(this.context);\n\n                  this.ball.render(this.context, this.player1, this.player2);\n                  this.ball.fillStyle = \"red\";\n                  //console.log(this.ball);\n\n                  // scoreboard\n                  this.p1score.draw(this.context, this.player1);\n                  this.p2score.draw(this.context, this.player2);\n            }\n      }]);\n\n      return Game;\n}();\n\nexports.default = Game;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FtZS5qcz83M2E5Il0sIm5hbWVzIjpbIkdhbWUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImJvYXJkIiwicGxheWVyMSIsImdhcCIsInAxS2V5cyIsInBsYXllcjIiLCJwMktleXMiLCJiYWxsIiwicDFzY29yZSIsInAyc2NvcmUiLCJzZXRMaW5lRGFzaCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwiZHJhd0xpbmUiLCJyZW5kZXIiLCJkcmF3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxJO0FBQ3BCLHNCQUFjO0FBQUE7O0FBQ2IsZ0JBQU1DLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBZjtBQUNJLGlCQUFLQyxLQUFMLEdBQWFILE9BQU9HLEtBQXBCO0FBQ0EsaUJBQUtDLE1BQUwsR0FBY0osT0FBT0ksTUFBckI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlTCxPQUFPTSxVQUFQLENBQWtCLElBQWxCLENBQWY7QUFDQSxpQkFBS0QsT0FBTCxDQUFhRSxTQUFiLEdBQXlCLE9BQXpCOztBQUVBO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYSxvQkFBVSxLQUFLTCxLQUFmLEVBQXNCLEtBQUtDLE1BQTNCLENBQWI7O0FBRUE7QUFDQSxpQkFBS0ssT0FBTCxHQUFlLHFCQUFXLEtBQUtMLE1BQWhCLEVBQXdCLG1CQUFTTSxHQUFqQyxFQUFzQyxtQkFBU0MsTUFBL0MsQ0FBZjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUscUJBQVcsS0FBS1IsTUFBaEIsRUFBd0IsS0FBS0QsS0FBTCxHQUFhLENBQWIsR0FBaUIsbUJBQVNPLEdBQWxELEVBQXVELG1CQUFTRyxNQUFoRSxDQUFmOztBQUVBO0FBQ0EsaUJBQUtDLElBQUwsR0FBWSxtQkFBUyxLQUFLVixNQUFkLEVBQXNCLEtBQUtELEtBQTNCLENBQVo7O0FBRUE7QUFDQSxpQkFBS1ksT0FBTCxHQUFlLHlCQUFnQixLQUFLWixLQUFMLEdBQVcsQ0FBM0IsRUFBOEIsRUFBOUIsQ0FBZjtBQUNBLGlCQUFLYSxPQUFMLEdBQWUseUJBQWlCLEtBQUtiLEtBQUwsR0FBVyxDQUFaLEdBQWUsQ0FBL0IsRUFBa0MsRUFBbEMsQ0FBZjs7QUFFQTtBQUNKOzs7O3VDQUNVO0FBQ04sdUJBQUtFLE9BQUwsQ0FBYVksV0FBYixDQUF5QixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQXpCO0FBQ0EsdUJBQUtaLE9BQUwsQ0FBYWEsU0FBYjtBQUNBLHVCQUFLYixPQUFMLENBQWFjLE1BQWIsQ0FBb0IsS0FBS2hCLEtBQUwsR0FBYSxDQUFqQyxFQUFvQyxDQUFwQztBQUNBLHVCQUFLRSxPQUFMLENBQWFlLE1BQWIsQ0FBb0IsS0FBS2pCLEtBQUwsR0FBYSxDQUFqQyxFQUFvQyxLQUFLQyxNQUF6QztBQUNBLHVCQUFLQyxPQUFMLENBQWFnQixXQUFiLEdBQTJCLEtBQTNCO0FBQ0EsdUJBQUtoQixPQUFMLENBQWFpQixNQUFiO0FBQ0Y7OztxQ0FDUTtBQUNOLHVCQUFLQyxRQUFMOztBQUVBO0FBQ0EsdUJBQUtmLEtBQUwsQ0FBV2dCLE1BQVgsQ0FBa0IsS0FBS25CLE9BQXZCOztBQUVBO0FBQ0EsdUJBQUtJLE9BQUwsQ0FBYWUsTUFBYixDQUFvQixLQUFLbkIsT0FBekI7QUFDQSx1QkFBS08sT0FBTCxDQUFhWSxNQUFiLENBQW9CLEtBQUtuQixPQUF6Qjs7QUFHQSx1QkFBS1MsSUFBTCxDQUFVVSxNQUFWLENBQWlCLEtBQUtuQixPQUF0QixFQUErQixLQUFLSSxPQUFwQyxFQUE2QyxLQUFLRyxPQUFsRDtBQUNBLHVCQUFLRSxJQUFMLENBQVVQLFNBQVYsR0FBc0IsS0FBdEI7QUFDQTs7QUFFQTtBQUNBLHVCQUFLUSxPQUFMLENBQWFVLElBQWIsQ0FBa0IsS0FBS3BCLE9BQXZCLEVBQWdDLEtBQUtJLE9BQXJDO0FBQ0EsdUJBQUtPLE9BQUwsQ0FBYVMsSUFBYixDQUFrQixLQUFLcEIsT0FBdkIsRUFBZ0MsS0FBS08sT0FBckM7QUFFRjs7Ozs7O2tCQW5EaUJiLEkiLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFkZGxlIGZyb20gJy4vcGFkZGxlJztcclxuaW1wb3J0IEJvYXJkIGZyb20gJy4vYm9hcmQnO1xyXG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xyXG5pbXBvcnQgU2NvcmVCb2FyZCBmcm9tICcuL3Njb3JlQm9hcmQnO1xyXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XHJcbiAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxuICAgICAgLy8gYm9hcmRzXHJcbiAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgLy8gcGxheWVyc1xyXG4gICAgICB0aGlzLnBsYXllcjEgPSBuZXcgUGFkZGxlKHRoaXMuaGVpZ2h0LCBzZXR0aW5ncy5nYXAsIHNldHRpbmdzLnAxS2V5cyk7XHJcbiAgICAgIHRoaXMucGxheWVyMiA9IG5ldyBQYWRkbGUodGhpcy5oZWlnaHQsIHRoaXMud2lkdGggLSA0IC0gc2V0dGluZ3MuZ2FwLCBzZXR0aW5ncy5wMktleXMpO1xyXG5cclxuICAgICAgLy9CYWxsXHJcbiAgICAgIHRoaXMuYmFsbCA9IG5ldyBCYWxsKHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoKTtcclxuXHJcbiAgICAgIC8vIFNjb3Jlc1xyXG4gICAgICB0aGlzLnAxc2NvcmUgPSBuZXcgU2NvcmVCb2FyZCgodGhpcy53aWR0aC80KSwyMCk7XHJcbiAgICAgIHRoaXMucDJzY29yZSA9IG5ldyBTY29yZUJvYXJkKCgodGhpcy53aWR0aC80KSozKSwyMCk7XHJcblxyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBsYXllcjEsIHRoaXMucGxheWVyMik7XHJcblx0fVxyXG5cdGRyYXdMaW5lKCkge1xyXG4gICAgICB0aGlzLmNvbnRleHQuc2V0TGluZURhc2goWzEwLCAxMF0pO1xyXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8odGhpcy53aWR0aCAvIDIsIDApO1xyXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcclxuICAgfVxyXG4gICByZW5kZXIoKSB7XHJcbiAgICAgIHRoaXMuZHJhd0xpbmUoKTtcclxuXHJcbiAgICAgIC8vIGJvYXJkZXJcclxuICAgICAgdGhpcy5ib2FyZC5yZW5kZXIodGhpcy5jb250ZXh0KTtcclxuXHJcbiAgICAgIC8vIHBhZGRsZXNcclxuICAgICAgdGhpcy5wbGF5ZXIxLnJlbmRlcih0aGlzLmNvbnRleHQpO1xyXG4gICAgICB0aGlzLnBsYXllcjIucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcblxyXG5cclxuICAgICAgdGhpcy5iYWxsLnJlbmRlcih0aGlzLmNvbnRleHQsIHRoaXMucGxheWVyMSwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgdGhpcy5iYWxsLmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5iYWxsKTtcclxuXHJcbiAgICAgIC8vIHNjb3JlYm9hcmRcclxuICAgICAgdGhpcy5wMXNjb3JlLmRyYXcodGhpcy5jb250ZXh0LCB0aGlzLnBsYXllcjEpO1xyXG4gICAgICB0aGlzLnAyc2NvcmUuZHJhdyh0aGlzLmNvbnRleHQsIHRoaXMucGxheWVyMik7XHJcblxyXG4gICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9nYW1lLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Paddle = function () {\n   function Paddle(height, x, control) {\n      var _this = this;\n\n      _classCallCheck(this, Paddle);\n\n      this.width = 5;\n      this.height = 20;\n      this.x = x;\n      this.y = height / 2 - this.height / 2;\n      this.speed = 20;\n      this.maxHeight = height;\n      this.score = 0;\n      document.addEventListener('keydown', function (event) {\n         switch (event.keyCode) {\n            case control.up:\n               _this.y = Math.max(0, _this.y - _this.speed);\n               break;\n            case control.down:\n               _this.y = Math.min(_this.maxHeight - _this.height, _this.y + _this.speed);\n               break;\n         }\n      });\n   }\n\n   _createClass(Paddle, [{\n      key: 'render',\n      value: function render(ctx) {\n         ctx.fillRect(this.x, this.y, this.width, this.height);\n      }\n   }]);\n\n   return Paddle;\n}();\n\nexports.default = Paddle;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFkZGxlLmpzPzA5YmYiXSwibmFtZXMiOlsiUGFkZGxlIiwiaGVpZ2h0IiwieCIsImNvbnRyb2wiLCJ3aWR0aCIsInkiLCJzcGVlZCIsIm1heEhlaWdodCIsInNjb3JlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXlDb2RlIiwidXAiLCJNYXRoIiwibWF4IiwiZG93biIsIm1pbiIsImN0eCIsImZpbGxSZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxNO0FBQ2xCLG1CQUFZQyxNQUFaLEVBQW9CQyxDQUFwQixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFBQTs7QUFBQTs7QUFDN0IsV0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxXQUFLSCxNQUFMLEdBQWMsRUFBZDtBQUNBLFdBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFdBQUtHLENBQUwsR0FBVUosU0FBUyxDQUFWLEdBQWdCLEtBQUtBLE1BQUwsR0FBYyxDQUF2QztBQUNBLFdBQUtLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQk4sTUFBakI7QUFDQSxXQUFLTyxLQUFMLEdBQWEsQ0FBYjtBQUNBQyxlQUFTQyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxpQkFBUTtBQUMxQyxpQkFBUUMsTUFBTUMsT0FBZDtBQUNBLGlCQUFLVCxRQUFRVSxFQUFiO0FBQ0cscUJBQUtSLENBQUwsR0FBU1MsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBVyxNQUFLVixDQUFMLEdBQU8sTUFBS0MsS0FBdkIsQ0FBVDtBQUNBO0FBQ0gsaUJBQUtILFFBQVFhLElBQWI7QUFDRyxxQkFBS1gsQ0FBTCxHQUFTUyxLQUFLRyxHQUFMLENBQVUsTUFBS1YsU0FBTCxHQUFpQixNQUFLTixNQUFoQyxFQUF5QyxNQUFLSSxDQUFMLEdBQU8sTUFBS0MsS0FBckQsQ0FBVDtBQUNBO0FBTkg7QUFRRixPQVREO0FBV0Y7Ozs7NkJBQ01ZLEcsRUFBSztBQUNUQSxhQUFJQyxRQUFKLENBQ0csS0FBS2pCLENBRFIsRUFDVyxLQUFLRyxDQURoQixFQUVHLEtBQUtELEtBRlIsRUFFZSxLQUFLSCxNQUZwQjtBQUtGOzs7Ozs7a0JBM0JpQkQsTSIsImZpbGUiOiIxMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZGRsZSB7XHJcbiAgIGNvbnN0cnVjdG9yKGhlaWdodCwgeCwgY29udHJvbCkge1xyXG4gICAgICB0aGlzLndpZHRoID0gNTtcclxuICAgICAgdGhpcy5oZWlnaHQgPSAyMDtcclxuICAgICAgdGhpcy54ID0geDtcclxuICAgICAgdGhpcy55ID0gKGhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMik7XHJcbiAgICAgIHRoaXMuc3BlZWQgPSAyMDtcclxuICAgICAgdGhpcy5tYXhIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT57XHJcbiAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICBjYXNlIGNvbnRyb2wudXA6XHJcbiAgICAgICAgICAgIHRoaXMueSA9IE1hdGgubWF4KDAsdGhpcy55LXRoaXMuc3BlZWQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBjb250cm9sLmRvd246XHJcbiAgICAgICAgICAgIHRoaXMueSA9IE1hdGgubWluKCh0aGlzLm1heEhlaWdodCAtIHRoaXMuaGVpZ2h0KSwgdGhpcy55K3RoaXMuc3BlZWQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgIH1cclxuICAgcmVuZGVyKGN0eCkge1xyXG4gICAgICBjdHguZmlsbFJlY3QoXHJcbiAgICAgICAgIHRoaXMueCwgdGhpcy55LFxyXG4gICAgICAgICB0aGlzLndpZHRoLCB0aGlzLmhlaWdodFxyXG4gICAgICApO1xyXG4gICAgICBcclxuICAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3BhZGRsZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Board = function () {\n    function Board(width, height) {\n        _classCallCheck(this, Board);\n\n        this.width = width;\n        this.height = height;\n    }\n\n    _createClass(Board, [{\n        key: \"drawLine\",\n        value: function drawLine(ctx) {\n            ctx.setLineDash([10, 10]);\n            ctx.beginPath();\n            ctx.moveTo(this.width / 2, 0);\n            ctx.lineTo(this.width / 2, this.height);\n            // ctx.strokeStyle = \"white\";\n            ctx.stroke();\n        }\n    }, {\n        key: \"render\",\n        value: function render(ctx) {\n            ctx.clearRect(0, 0, this.width, this.height);\n            this.drawLine(ctx);\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.default = Board;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYm9hcmQuanM/OGUyMSJdLCJuYW1lcyI6WyJCb2FyZCIsIndpZHRoIiwiaGVpZ2h0IiwiY3R4Iiwic2V0TGluZURhc2giLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJjbGVhclJlY3QiLCJkcmF3TGluZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsSztBQUNqQixtQkFBWUMsS0FBWixFQUFtQkMsTUFBbkIsRUFBMkI7QUFBQTs7QUFDdkIsYUFBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7Ozs7aUNBQ1FDLEcsRUFBSztBQUNWQSxnQkFBSUMsV0FBSixDQUFnQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQWhCO0FBQ0FELGdCQUFJRSxTQUFKO0FBQ0FGLGdCQUFJRyxNQUFKLENBQVcsS0FBS0wsS0FBTCxHQUFhLENBQXhCLEVBQTJCLENBQTNCO0FBQ0FFLGdCQUFJSSxNQUFKLENBQVcsS0FBS04sS0FBTCxHQUFhLENBQXhCLEVBQTJCLEtBQUtDLE1BQWhDO0FBQ0E7QUFDQUMsZ0JBQUlLLE1BQUo7QUFDSDs7OytCQUNNTCxHLEVBQUs7QUFDWkEsZ0JBQUlNLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEtBQUtSLEtBQXpCLEVBQWdDLEtBQUtDLE1BQXJDO0FBQ0ksaUJBQUtRLFFBQUwsQ0FBY1AsR0FBZDtBQUNIOzs7Ozs7a0JBaEJnQkgsSyIsImZpbGUiOiIxMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBkcmF3TGluZShjdHgpIHtcclxuICAgICAgICBjdHguc2V0TGluZURhc2goWzEwLCAxMF0pO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKHRoaXMud2lkdGggLyAyLCAwKTtcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcihjdHgpIHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZHJhd0xpbmUoY3R4KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9ib2FyZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar size = 3;\nvar pongSound01 = document.getElementById('pongSound01');\nvar pongSound02 = document.getElementById('pongSound02');\n\nvar Ball = function () {\n   function Ball(height, width) {\n      _classCallCheck(this, Ball);\n\n      this.x = width / 2;\n      this.y = height / 2;\n      this.vy = Math.max(Math.floor(Math.random() * 12 - 6), 3);\n      this.vx = 7 - Math.abs(this.vy);\n      this.size = size;\n      this.maxHeight = height;\n      this.ydirection = 1;\n      this.xdirection = 1;\n      this.maxWidth = width;\n   }\n\n   _createClass(Ball, [{\n      key: 'wallBounce',\n      value: function wallBounce(ctx) {\n         if (this.y >= this.maxHeight - size) {\n            pongSound02.play();\n            this.y = this.maxHeight - size;\n            this.ydirection = -this.ydirection;\n         } else if (this.y <= size) {\n            pongSound02.play();\n            this.y = size;\n            this.ydirection = -this.ydirection;\n         }\n      }\n   }, {\n      key: 'ballReset',\n      value: function ballReset() {\n         this.x = this.maxWidth / 2;\n         this.y = this.maxHeight / 2;\n         this.vy = Math.max(Math.floor(Math.random() * 12 - 6), 3);\n         this.vx = 7 - Math.abs(this.vy);\n      }\n   }, {\n      key: 'goal',\n      value: function goal(player1, player2) {\n         if (this.x >= this.maxWidth) {\n            this.ballReset();\n            player1.score += 1;\n         } else if (this.x <= 0) {\n            this.ballReset();\n            player2.score += 1;\n         }\n      }\n   }, {\n      key: 'paddleCollision',\n      value: function paddleCollision(player1, player2) {\n         if (this.x <= player2.x + player2.width && this.x >= player2.x - size && this.y <= player2.y + player2.height && this.y >= player2.y) {\n            pongSound01.play();\n            this.x = player2.x - player2.width;\n            this.xdirection = -this.xdirection;\n            this.vy = this.vy + Math.random() * 0.5;\n         } else if (this.x >= player1.x + player1.width && this.x <= player1.x + player1.width + size && this.y <= player1.y + player1.height && this.y >= player1.y) {\n            pongSound01.play();\n            this.x = player1.x + player1.width * 2;\n            this.xdirection = -this.xdirection;\n            this.vy = this.vy + Math.random() * 0.5;\n         }\n      }\n   }, {\n      key: 'ballRender',\n      value: function ballRender(ctx) {\n         ctx.beginPath();\n         ctx.arc(this.x, this.y, size, 0, Math.PI * 2, true);\n         ctx.closePath();\n         ctx.fill();\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, player1, player2) {\n         this.paddleCollision(player1, player2);\n\n         this.wallBounce(ctx);\n         this.goal(player1, player2);\n\n         this.x += this.vx * this.xdirection;\n         this.y += this.vy * this.ydirection;\n\n         this.ballRender(ctx);\n      }\n   }]);\n\n   return Ball;\n}();\n\nexports.default = Ball;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFsbC5qcz85NDU2Il0sIm5hbWVzIjpbInNpemUiLCJwb25nU291bmQwMSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwb25nU291bmQwMiIsIkJhbGwiLCJoZWlnaHQiLCJ3aWR0aCIsIngiLCJ5IiwidnkiLCJNYXRoIiwibWF4IiwiZmxvb3IiLCJyYW5kb20iLCJ2eCIsImFicyIsIm1heEhlaWdodCIsInlkaXJlY3Rpb24iLCJ4ZGlyZWN0aW9uIiwibWF4V2lkdGgiLCJjdHgiLCJwbGF5IiwicGxheWVyMSIsInBsYXllcjIiLCJiYWxsUmVzZXQiLCJzY29yZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsInBhZGRsZUNvbGxpc2lvbiIsIndhbGxCb3VuY2UiLCJnb2FsIiwiYmFsbFJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU8sQ0FBYjtBQUNBLElBQU1DLGNBQWNDLFNBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBcEI7QUFDQSxJQUFNQyxjQUFjRixTQUFTQyxjQUFULENBQXdCLGFBQXhCLENBQXBCOztJQUVxQkUsSTtBQUNsQixpQkFBWUMsTUFBWixFQUFvQkMsS0FBcEIsRUFBMkI7QUFBQTs7QUFDNUIsV0FBS0MsQ0FBTCxHQUFTRCxRQUFNLENBQWY7QUFDQSxXQUFLRSxDQUFMLEdBQVNILFNBQU8sQ0FBaEI7QUFDQSxXQUFLSSxFQUFMLEdBQVVDLEtBQUtDLEdBQUwsQ0FBVUQsS0FBS0UsS0FBTCxDQUFXRixLQUFLRyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQWhDLENBQVYsRUFBK0MsQ0FBL0MsQ0FBVjtBQUNBLFdBQUtDLEVBQUwsR0FBVyxJQUFJSixLQUFLSyxHQUFMLENBQVMsS0FBS04sRUFBZCxDQUFmO0FBQ0EsV0FBS1YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBS2lCLFNBQUwsR0FBaUJYLE1BQWpCO0FBQ0EsV0FBS1ksVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCYixLQUFoQjtBQUNFOzs7O2lDQUNVYyxHLEVBQUk7QUFDYixhQUFHLEtBQUtaLENBQUwsSUFBVSxLQUFLUSxTQUFMLEdBQWlCakIsSUFBOUIsRUFBbUM7QUFDbENJLHdCQUFZa0IsSUFBWjtBQUNBLGlCQUFLYixDQUFMLEdBQVMsS0FBS1EsU0FBTCxHQUFpQmpCLElBQTFCO0FBQ0UsaUJBQUtrQixVQUFMLEdBQWtCLENBQUMsS0FBS0EsVUFBeEI7QUFDRixVQUpELE1BS0ssSUFBSSxLQUFLVCxDQUFMLElBQVVULElBQWQsRUFBb0I7QUFDeEJJLHdCQUFZa0IsSUFBWjtBQUNBLGlCQUFLYixDQUFMLEdBQVNULElBQVQ7QUFDRSxpQkFBS2tCLFVBQUwsR0FBa0IsQ0FBQyxLQUFLQSxVQUF4QjtBQUNGO0FBRUY7OztrQ0FDVTtBQUNULGNBQUtWLENBQUwsR0FBUyxLQUFLWSxRQUFMLEdBQWMsQ0FBdkI7QUFDQSxjQUFLWCxDQUFMLEdBQVMsS0FBS1EsU0FBTCxHQUFlLENBQXhCO0FBQ0EsY0FBS1AsRUFBTCxHQUFVQyxLQUFLQyxHQUFMLENBQVVELEtBQUtFLEtBQUwsQ0FBV0YsS0FBS0csTUFBTCxLQUFnQixFQUFoQixHQUFxQixDQUFoQyxDQUFWLEVBQStDLENBQS9DLENBQVY7QUFDSCxjQUFLQyxFQUFMLEdBQVcsSUFBS0osS0FBS0ssR0FBTCxDQUFTLEtBQUtOLEVBQWQsQ0FBaEI7QUFDRTs7OzJCQUNJYSxPLEVBQVFDLE8sRUFBUTtBQUNuQixhQUFHLEtBQUtoQixDQUFMLElBQVUsS0FBS1ksUUFBbEIsRUFBMkI7QUFDMUIsaUJBQUtLLFNBQUw7QUFDQUYsb0JBQVFHLEtBQVIsSUFBaUIsQ0FBakI7QUFDQSxVQUhELE1BSUssSUFBSSxLQUFLbEIsQ0FBTCxJQUFVLENBQWQsRUFBZ0I7QUFDcEIsaUJBQUtpQixTQUFMO0FBQ0FELG9CQUFRRSxLQUFSLElBQWlCLENBQWpCO0FBQ0E7QUFDRjs7O3NDQUNnQkgsTyxFQUFTQyxPLEVBQVM7QUFDakMsYUFBRyxLQUFLaEIsQ0FBTCxJQUFVZ0IsUUFBUWhCLENBQVIsR0FBWWdCLFFBQVFqQixLQUE5QixJQUNGLEtBQUtDLENBQUwsSUFBVWdCLFFBQVFoQixDQUFSLEdBQVlSLElBRHBCLElBRUYsS0FBS1MsQ0FBTCxJQUFVZSxRQUFRZixDQUFSLEdBQVllLFFBQVFsQixNQUY1QixJQUdGLEtBQUtHLENBQUwsSUFBVWUsUUFBUWYsQ0FIbkIsRUFJQTtBQUNDUix3QkFBWXFCLElBQVo7QUFDQSxpQkFBS2QsQ0FBTCxHQUFTZ0IsUUFBUWhCLENBQVIsR0FBWWdCLFFBQVFqQixLQUE3QjtBQUNFLGlCQUFLWSxVQUFMLEdBQWtCLENBQUMsS0FBS0EsVUFBeEI7QUFDQSxpQkFBS1QsRUFBTCxHQUFVLEtBQUtBLEVBQUwsR0FBV0MsS0FBS0csTUFBTCxLQUFjLEdBQW5DO0FBQ0YsVUFURCxNQVVLLElBQUksS0FBS04sQ0FBTCxJQUFVZSxRQUFRZixDQUFSLEdBQVllLFFBQVFoQixLQUE5QixJQUNSLEtBQUtDLENBQUwsSUFBVWUsUUFBUWYsQ0FBUixHQUFZZSxRQUFRaEIsS0FBcEIsR0FBNEJQLElBRDlCLElBRVIsS0FBS1MsQ0FBTCxJQUFVYyxRQUFRZCxDQUFSLEdBQVljLFFBQVFqQixNQUZ0QixJQUdSLEtBQUtHLENBQUwsSUFBVWMsUUFBUWQsQ0FIZCxFQUlMO0FBQ0NSLHdCQUFZcUIsSUFBWjtBQUNBLGlCQUFLZCxDQUFMLEdBQVNlLFFBQVFmLENBQVIsR0FBYWUsUUFBUWhCLEtBQVIsR0FBYyxDQUFwQztBQUNFLGlCQUFLWSxVQUFMLEdBQWtCLENBQUMsS0FBS0EsVUFBeEI7QUFDQSxpQkFBS1QsRUFBTCxHQUFVLEtBQUtBLEVBQUwsR0FBV0MsS0FBS0csTUFBTCxLQUFjLEdBQW5DO0FBQ0Y7QUFDRjs7O2lDQUNVTyxHLEVBQUk7QUFDYkEsYUFBSU0sU0FBSjtBQUNITixhQUFJTyxHQUFKLENBQVEsS0FBS3BCLENBQWIsRUFBZ0IsS0FBS0MsQ0FBckIsRUFBd0JULElBQXhCLEVBQThCLENBQTlCLEVBQWlDVyxLQUFLa0IsRUFBTCxHQUFRLENBQXpDLEVBQTRDLElBQTVDO0FBQ0FSLGFBQUlTLFNBQUo7QUFDQVQsYUFBSVUsSUFBSjtBQUVFOzs7NkJBRU1WLEcsRUFBS0UsTyxFQUFTQyxPLEVBQVM7QUFDNUIsY0FBS1EsZUFBTCxDQUFxQlQsT0FBckIsRUFBOEJDLE9BQTlCOztBQUVBLGNBQUtTLFVBQUwsQ0FBZ0JaLEdBQWhCO0FBQ0EsY0FBS2EsSUFBTCxDQUFVWCxPQUFWLEVBQWtCQyxPQUFsQjs7QUFFQSxjQUFLaEIsQ0FBTCxJQUFVLEtBQUtPLEVBQUwsR0FBVSxLQUFLSSxVQUF6QjtBQUNBLGNBQUtWLENBQUwsSUFBVSxLQUFLQyxFQUFMLEdBQVUsS0FBS1EsVUFBekI7O0FBRUEsY0FBS2lCLFVBQUwsQ0FBZ0JkLEdBQWhCO0FBRUQ7Ozs7OztrQkFsRmlCaEIsSSIsImZpbGUiOiIxMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNpemUgPSAzO1xyXG5jb25zdCBwb25nU291bmQwMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb25nU291bmQwMScpO1xyXG5jb25zdCBwb25nU291bmQwMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb25nU291bmQwMicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbCB7XHJcbiAgIGNvbnN0cnVjdG9yKGhlaWdodCwgd2lkdGgpIHtcclxuXHRcdHRoaXMueCA9IHdpZHRoLzI7XHJcblx0XHR0aGlzLnkgPSBoZWlnaHQvMjtcclxuXHRcdHRoaXMudnkgPSBNYXRoLm1heCgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIgLSA2KSksIDMpO1xyXG5cdFx0dGhpcy52eCA9ICg3IC0gTWF0aC5hYnModGhpcy52eSkpO1xyXG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcclxuXHRcdHRoaXMubWF4SGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0dGhpcy55ZGlyZWN0aW9uID0gMTtcclxuXHRcdHRoaXMueGRpcmVjdGlvbiA9IDE7XHJcblx0XHR0aGlzLm1heFdpZHRoID0gd2lkdGg7XHJcbiAgIH1cclxuICAgd2FsbEJvdW5jZShjdHgpe1xyXG4gICBcdFx0aWYodGhpcy55ID49IHRoaXMubWF4SGVpZ2h0IC0gc2l6ZSl7XHJcbiAgIFx0XHRcdHBvbmdTb3VuZDAyLnBsYXkoKTtcclxuICAgXHRcdFx0dGhpcy55ID0gdGhpcy5tYXhIZWlnaHQgLSBzaXplOyBcclxuICAgICAgXHRcdHRoaXMueWRpcmVjdGlvbiA9IC10aGlzLnlkaXJlY3Rpb247XHJcbiAgIFx0XHR9XHJcbiAgIFx0XHRlbHNlIGlmICh0aGlzLnkgPD0gc2l6ZSkge1xyXG4gICBcdFx0XHRwb25nU291bmQwMi5wbGF5KCk7XHJcbiAgIFx0XHRcdHRoaXMueSA9IHNpemU7IFxyXG4gICAgICBcdFx0dGhpcy55ZGlyZWN0aW9uID0gLXRoaXMueWRpcmVjdGlvbjtcclxuICAgXHRcdH1cclxuXHJcbiAgIH1cclxuICAgYmFsbFJlc2V0KCl7XHJcbiAgIFx0XHR0aGlzLnggPSB0aGlzLm1heFdpZHRoLzI7XHJcbiAgIFx0XHR0aGlzLnkgPSB0aGlzLm1heEhlaWdodC8yO1xyXG4gICBcdFx0dGhpcy52eSA9IE1hdGgubWF4KChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMiAtIDYpKSwgMyk7XHJcblx0XHR0aGlzLnZ4ID0gKDcgLSAoTWF0aC5hYnModGhpcy52eSkpKTtcclxuICAgfVxyXG4gICBnb2FsKHBsYXllcjEscGxheWVyMil7XHJcbiAgIFx0XHRpZih0aGlzLnggPj0gdGhpcy5tYXhXaWR0aCl7XHJcbiAgIFx0XHRcdHRoaXMuYmFsbFJlc2V0KCk7XHJcbiAgIFx0XHRcdHBsYXllcjEuc2NvcmUgKz0gMTtcclxuICAgXHRcdH1cclxuICAgXHRcdGVsc2UgaWYgKHRoaXMueCA8PSAwKXtcclxuICAgXHRcdFx0dGhpcy5iYWxsUmVzZXQoKTtcclxuICAgXHRcdFx0cGxheWVyMi5zY29yZSArPSAxO1xyXG4gICBcdFx0fVxyXG4gICB9XHJcbiAgIHBhZGRsZUNvbGxpc2lvbiAocGxheWVyMSwgcGxheWVyMikge1xyXG4gICBcdFx0aWYodGhpcy54IDw9IHBsYXllcjIueCArIHBsYXllcjIud2lkdGggJiYgXHJcbiAgIFx0XHRcdHRoaXMueCA+PSBwbGF5ZXIyLnggLSBzaXplICYmIFxyXG4gICBcdFx0XHR0aGlzLnkgPD0gcGxheWVyMi55ICsgcGxheWVyMi5oZWlnaHQgJiYgXHJcbiAgIFx0XHRcdHRoaXMueSA+PSBwbGF5ZXIyLnkpXHJcbiAgIFx0XHR7XHJcbiAgIFx0XHRcdHBvbmdTb3VuZDAxLnBsYXkoKTtcclxuICAgXHRcdFx0dGhpcy54ID0gcGxheWVyMi54IC0gcGxheWVyMi53aWR0aDsgXHJcbiAgICAgIFx0XHR0aGlzLnhkaXJlY3Rpb24gPSAtdGhpcy54ZGlyZWN0aW9uO1xyXG4gICAgICBcdFx0dGhpcy52eSA9IHRoaXMudnkgKyAoTWF0aC5yYW5kb20oKSowLjUpO1xyXG4gICBcdFx0fVxyXG4gICBcdFx0ZWxzZSBpZiAodGhpcy54ID49IHBsYXllcjEueCArIHBsYXllcjEud2lkdGggJiYgXHJcbiAgIFx0XHRcdHRoaXMueCA8PSBwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoICsgc2l6ZSAmJiBcclxuICAgXHRcdFx0dGhpcy55IDw9IHBsYXllcjEueSArIHBsYXllcjEuaGVpZ2h0ICYmIFxyXG4gICBcdFx0XHR0aGlzLnkgPj0gcGxheWVyMS55KSBcclxuICAgXHRcdHtcclxuICAgXHRcdFx0cG9uZ1NvdW5kMDEucGxheSgpO1xyXG4gICBcdFx0XHR0aGlzLnggPSBwbGF5ZXIxLnggKyAocGxheWVyMS53aWR0aCoyKTsgXHJcbiAgICAgIFx0XHR0aGlzLnhkaXJlY3Rpb24gPSAtdGhpcy54ZGlyZWN0aW9uO1xyXG4gICAgICBcdFx0dGhpcy52eSA9IHRoaXMudnkgKyAoTWF0aC5yYW5kb20oKSowLjUpO1xyXG4gICBcdFx0fVxyXG4gICB9XHJcbiAgIGJhbGxSZW5kZXIoY3R4KXtcclxuICAgXHRcdGN0eC5iZWdpblBhdGgoKTtcclxuXHRcdGN0eC5hcmModGhpcy54LCB0aGlzLnksIHNpemUsIDAsIE1hdGguUEkqMiwgdHJ1ZSk7XHJcblx0XHRjdHguY2xvc2VQYXRoKCk7XHJcblx0XHRjdHguZmlsbCgpO1xyXG5cdFx0XHJcbiAgIH1cclxuXHJcbiAgIHJlbmRlcihjdHgsIHBsYXllcjEsIHBsYXllcjIpIHtcclxuICAgXHRcdHRoaXMucGFkZGxlQ29sbGlzaW9uKHBsYXllcjEsIHBsYXllcjIpO1xyXG5cclxuICAgXHRcdHRoaXMud2FsbEJvdW5jZShjdHgpO1xyXG4gICBcdFx0dGhpcy5nb2FsKHBsYXllcjEscGxheWVyMik7XHJcblxyXG4gICBcdFx0dGhpcy54ICs9IHRoaXMudnggKiB0aGlzLnhkaXJlY3Rpb247XHJcbiAgIFx0XHR0aGlzLnkgKz0gdGhpcy52eSAqIHRoaXMueWRpcmVjdGlvbjtcclxuXHJcbiAgIFx0XHR0aGlzLmJhbGxSZW5kZXIoY3R4KTtcclxuXHJcbiAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2JhbGwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ScoreBoard = function () {\n   function ScoreBoard(x, y) {\n      _classCallCheck(this, ScoreBoard);\n\n      this.x = x;\n      this.y = y;\n      this.score = 0;\n   }\n\n   _createClass(ScoreBoard, [{\n      key: \"draw\",\n      value: function draw(ctx, player) {\n         ctx.font = \"15px Arial\";\n         ctx.fillText(player.score, this.x, this.y);\n      }\n   }]);\n\n   return ScoreBoard;\n}();\n\nexports.default = ScoreBoard;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc2NvcmVCb2FyZC5qcz9mMDg0Il0sIm5hbWVzIjpbIlNjb3JlQm9hcmQiLCJ4IiwieSIsInNjb3JlIiwiY3R4IiwicGxheWVyIiwiZm9udCIsImZpbGxUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxVO0FBQ2xCLHVCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFDZixXQUFLRCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxXQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxXQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNGOzs7OzJCQUNJQyxHLEVBQUtDLE0sRUFBUTtBQUNmRCxhQUFJRSxJQUFKLEdBQVcsWUFBWDtBQUNBRixhQUFJRyxRQUFKLENBQWFGLE9BQU9GLEtBQXBCLEVBQTJCLEtBQUtGLENBQWhDLEVBQW1DLEtBQUtDLENBQXhDO0FBQ0Y7Ozs7OztrQkFUaUJGLFUiLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZUJvYXJkIHtcclxuICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgfVxyXG4gICBkcmF3KGN0eCwgcGxheWVyKSB7XHJcbiAgICAgIGN0eC5mb250ID0gXCIxNXB4IEFyaWFsXCI7XHJcbiAgICAgIGN0eC5maWxsVGV4dChwbGF5ZXIuc2NvcmUsIHRoaXMueCwgdGhpcy55KTtcclxuICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvc2NvcmVCb2FyZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 15 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar settings = {\n\tgap: 10,\n\tp1Keys: { up: 65, down: 90 },\n\tp2Keys: { up: 38, down: 40 }\n};\n\nexports.default = settings;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc2V0dGluZ3MuanM/Y2JiZCJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImdhcCIsInAxS2V5cyIsInVwIiwiZG93biIsInAyS2V5cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxXQUFZO0FBQ2pCQyxNQUFLLEVBRFk7QUFFakJDLFNBQVEsRUFBQ0MsSUFBSSxFQUFMLEVBQVNDLE1BQU0sRUFBZixFQUZTO0FBR2pCQyxTQUFRLEVBQUNGLElBQUksRUFBTCxFQUFTQyxNQUFNLEVBQWY7QUFIUyxDQUFsQjs7a0JBTWVKLFEiLCJmaWxlIjoiMTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZXR0aW5ncyAgPSB7XHJcblx0Z2FwOiAxMCxcclxuXHRwMUtleXM6IHt1cDogNjUsIGRvd246IDkwfSxcclxuXHRwMktleXM6IHt1cDogMzgsIGRvd246IDQwfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2V0dGluZ3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvc2V0dGluZ3MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
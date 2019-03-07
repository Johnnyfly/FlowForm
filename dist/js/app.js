/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== "undefined") {
		factory(module, exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports);
		global.autosize = mod.exports;
	}
})(undefined, function (module, exports) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			delete: function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	}();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		createEvent = function createEvent(name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = null;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}

			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				var width = ta.style.width;
				ta.style.width = '0px';

				ta.offsetWidth;

				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			if (ta.scrollHeight === 0) {
				return;
			}

			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop;

			ta.style.minHeight = '';
			ta.style.minHeight = ta.scrollHeight + heightOffset + 'px';

			clientWidth = ta.clientWidth;

			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			if (actualHeight < styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map.delete(ta);
		}.bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function autosize(el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function autosize(el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	exports.default = autosize;
	module.exports = exports['default'];
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(2);

var _Index = __webpack_require__(3);

var _Index2 = _interopRequireDefault(_Index);

var _Index3 = __webpack_require__(6);

var _Index4 = _interopRequireDefault(_Index3);

var _Index5 = __webpack_require__(20);

var _Index6 = _interopRequireDefault(_Index5);

var _Index7 = __webpack_require__(23);

var _Index8 = _interopRequireDefault(_Index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormDesi(params) {

    if (!this instanceof FormDesi) {
        return new FormDesi(params);
    }

    var defaults = {
        $el: $("body"),
        mode: "desi"
    };

    this.Settings = $.extend(defaults, params);

    this.NavControls.$$root = this;
    this.DesiContent.$$root = this;
    this.DesiProps.$$root = this;
    this.$el = this.Settings.$el;

    this.NavControls.init(this.Settings);
    this.DesiProps.init(this.Settings);
    this.DesiContent.init(this.Settings);
}

FormDesi.prototype.find = function (el) {
    return this.Settings.$el.find(el);
};

FormDesi.prototype.NavControls = _Index2.default;

FormDesi.prototype.AllControls = _Index4.default;

FormDesi.prototype.DesiContent = _Index6.default;

FormDesi.prototype.DesiProps = _Index8.default;

window.FormDesi = FormDesi;

exports.default = FormDesi;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(4);

var _DropTo = __webpack_require__(5);

var _DropTo2 = _interopRequireDefault(_DropTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Libs = {
    init: function init() {
        this.render();
    },
    render: function render() {

        var html = this.genTab();

        this.$$root.$el.prepend(html);

        this.initEvent();
    },
    initEvent: function initEvent() {
        var _this = this;

        var $allControls = this.$$root.find(".allControls");

        _DropTo2.default.init($allControls, function (type) {
            _this.insetControl(type);
        });

        $allControls.on("click", ".tabControl .item", function () {

            var $this = $(this),
                type = $this.attr("type");

            $this.addClass("ThemeBorderColorLightSelected").siblings().removeClass("ThemeBorderColorLightSelected");

            $allControls.find(".ControlBox").hide().end().find("." + type + "ControlBox").show();
        });
    },
    insetControl: function insetControl(type) {

        var $$root = this.$$root,
            InsControl = $$root.AllControls.getControlByType(type);

        if (InsControl) {
            var $insetEl = $$root.Settings.$el.find("#insetEl");
            InsControl.$$root = $$root;

            var _controlHtml = InsControl.render();
            _controlHtml.addClass("selected");
            $insetEl.after(_controlHtml);

            InsControl.renderProps();

            $insetEl.remove();
        }
    },
    genTab: function genTab(Options) {

        var AllControls = this.$$root.AllControls.Controls,
            defaultTab = this.$$root.Settings.defaultTab || "LayOut",
            $allControls = $('<div class="allControls"/>'),
            $controlTab = $('<ul class="tabControl" />');

        for (var key in AllControls) {
            $controlTab.append('<li type="' + key + '" class="item">' + AllControls[key].metaInfo.title + '</li>');
            $allControls.append(this.genControl(key, AllControls[key].Controls));
        }

        $allControls.prepend($controlTab);

        $allControls.find("." + defaultTab + "ControlBox").show();
        $allControls.find(".tabControl .item[type=" + defaultTab + "]").addClass("ThemeBorderColorLightSelected");

        return $allControls;
    },
    genControl: function genControl(type, Controls) {

        var className = type + "ControlBox",
            $controlBox = $('<div class="ControlBox" />');

        $controlBox.addClass(className);

        $.each(Controls, function (i, item) {

            var $cItem = $('<div class="cItem ThemeBgCoolHover ThemeBorderColorLightHover" />'),
                $text = $('<span class="text"/>'),
                $icon = $('<i class="iconComm zppiconfont"/>'),
                title = item.metaInfo.title || "拖拽至页面中间",
                iconClass = item.metaInfo.iconClass || "iconNull";

            $cItem.attr("type", item.metaInfo.type);
            $cItem.attr("title", title);

            $text.text(item.metaInfo.name);
            $icon.addClass(iconClass);

            $cItem.append($text);
            $cItem.append($icon);

            $controlBox.append($cItem);
        });

        return $controlBox;
    }
};

exports.default = Libs;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var DropEvent = {
    init: function init($el, callback) {

        var that = this;

        $el.on("mousedown", ".ControlBox .cItem", function (event) {
            that.bindDropEvent({
                callback: callback,
                $el: $(this),
                elX: event.pageX,
                elY: event.pageY
            });
        });
    },

    bindDropEvent: function bindDropEvent(opts) {

        var $dropEl = opts.$el.clone(false, false),
            ElOffset = opts.$el.offset(),
            diffX = opts.elX - ElOffset.left,
            diffY = opts.elY - ElOffset.top,
            that = this,
            type = $dropEl.attr("type");

        $dropEl.attr("id", "dropEl");

        $("body").append($dropEl);

        $("body").addClass("noSelected");

        $(window).on("mousemove.moveInput", function (event) {

            var newX = event.pageX,
                newY = event.pageY,
                StyleObj = {
                $el: opts.$el,
                left: newX - diffX,
                top: newY - diffY,
                type: type
            };

            if (newX == opts.elX && newY == opts.elY) {
                return;
            }

            $dropEl.css(StyleObj);

            that.diffInsertPos(StyleObj);

            return false;
        });

        $(window).on("mouseup.moveInput", function () {

            $(window).off("mousemove.moveInput");

            $(window).off("mouseup.moveInput");

            if ($("#insetEl").length > 0) {
                opts.callback && opts.callback(type);
            }

            $dropEl.remove();

            $("body").removeClass("noSelected");
        });
    },

    diffInsertPos: function diffInsertPos(StyleObj) {

        var $desiContent = StyleObj.$el.closest(".allControls").parent().find(".fromDesign"),
            Offset = $desiContent.offset(),
            cT = Offset.top,
            cX = Offset.left,
            cH = $desiContent.height(),
            cW = $desiContent.width(),
            DH = $("#dropEl").height(),
            that = this,
            insetElHtml = '<div class="fieldItem"  id="insetEl"/>';

        if (StyleObj.top + DH > cT && StyleObj.top < cT + cH && StyleObj.left > cX && StyleObj.left < cX + cW) {

            var $fieldItem = $desiContent.find(".fieldItem");

            if ($fieldItem.length <= 0) {

                if ($("#insetEl").length <= 0) {
                    $desiContent.append(insetElHtml);
                }
            } else {

                var isFind = false;

                $fieldItem.each(function () {

                    if ($(this).closest("td").length > 0 && $(this).attr("type") != "TextInput") {
                        return true;
                    }

                    var $this = $(this),
                        C_Offset = $this.offset(),
                        cT = C_Offset.top,
                        cH = $this.height(),
                        $insetEl = $("#insetEl");

                    if (StyleObj.top < cT && StyleObj.top + DH > cT) {
                        isFind = true;
                        if ($insetEl.length <= 0) {
                            $this.before(insetElHtml);
                        } else {
                            $this.before($insetEl);
                        }
                        return false;
                    }

                    if (StyleObj.top > cT && StyleObj.top < cT + cH) {

                        isFind = true;

                        if ($this.attr("id") == "insetEl") {
                            return false;
                        }

                        if ($this.find("table").length > 0 && StyleObj.type != "Table" && StyleObj.type != "DataTable") {

                            var $prev = $this.prev();

                            if ($prev.length > 0) {

                                var type = $prev.attr("type");
                                if (type = "Table" || type == "DataTable") {
                                    cT += 10;
                                }
                            }

                            if (DH + StyleObj.top > cT + cH) {
                                if ($insetEl.length <= 0) {
                                    $this.after(insetElHtml);
                                } else {
                                    $this.after($insetEl);
                                }
                                return false;
                            }

                            $this.find("td").each(function () {

                                var $td = $(this),
                                    cX = $td.offset().left,
                                    cY = $td.offset().top,
                                    cW = $td.width(),
                                    cH = $td.height(),
                                    isInTop = cX < StyleObj.left && cX + cW > StyleObj.left || cX > StyleObj.left && cX < StyleObj.left + StyleObj.width;

                                if ($td.find(".fieldItem").length > 1) {
                                    $td.find(".fieldItem:first").nextAll().remove();
                                }

                                if (!isInTop || $td.find(".fieldItem").length > 0 && $td.find(".fieldItem").attr("type") != "TextInput") {
                                    return true;
                                }

                                if (cY < StyleObj.top && cY + cH > StyleObj.top || cY > StyleObj.top && cY < StyleObj.top + StyleObj.height) {
                                    if ($this.attr("type") == "DataTable") {
                                        if ($td.parent().index() == 0) {
                                            var index = $td.index();
                                            $td = $td.parent().next().find("td").eq(index);
                                        }
                                    }

                                    if ($td.find(".fieldItem").length > 0 && $td.find(".fieldItem.textInput").length <= 0) {
                                        return true;
                                    }

                                    if ($insetEl.length <= 0) {
                                        $td.prepend(insetElHtml);
                                    } else {
                                        $td.prepend($insetEl);
                                    }

                                    return false;
                                }
                            });

                            return false;
                        }

                        if (StyleObj.top > cT + cH / 2) {

                            if ($insetEl.length <= 0) {
                                $this.after(insetElHtml);
                            } else {
                                $this.after($insetEl);
                            }
                        } else {

                            if ($insetEl.length <= 0) {
                                $this.before(insetElHtml);
                            } else {
                                $this.before($insetEl);
                            }
                        }

                        return false;
                    }
                });

                if (!isFind) {

                    if ($("#insetEl").length <= 0) {
                        $desiContent.append(insetElHtml);
                    } else {
                        $desiContent.find(".fieldItem:last").after($("#insetEl"));
                    }
                }
            }
        } else {
            $("#insetEl").remove();
        }
    },

    insertControl: function insertControl(type, callback) {

        var $insetEl = $("#insetEl");

        if ($insetEl.length > 0) {

            if (!Libs.AllControls[type]) {
                return;
            }

            var Control = Libs.AllControls[type],
                $el = Control.render();

            if ($insetEl.closest("tr").length <= 0) {

                $insetEl.after($el);
            } else {

                var $td = $insetEl.closest("td"),
                    $tb = $td.closest("table");

                $insetEl.remove();

                if (type == "Table" || type == "DataTable") {
                    $dropEl.remove();
                    return;
                }

                if ($td.find(".fieldItem.textInput").length >= 1) {
                    $td.find(".fieldItem").remove();
                }

                if ($td.find(".fieldItem").length > 0) {
                    $dropEl.remove();
                    return;
                }

                if (!$td.attr("width")) {
                    $tb.find("tr td").each(function () {
                        var $this = $(this);
                        $this.attr("width", $this.width()).attr("height", $this.height());
                    });
                }

                var tdArr = [];

                $td.closest(".tbLayout").find("td").each(function () {
                    var $this = $(this);
                    tdArr.push({
                        $el: $this,
                        w: $this.width(),
                        h: $this.height()
                    });
                });

                $.each(tdArr, function (i, item) {
                    item.$el.attr("width", item.w).attr("height", item.h);
                });

                Comm.diffElementFixedW($el, $td.width());

                if ($td.closest(".fieldItem").attr("type") == "DataTable") {
                    $el.addClass("hideTitle");
                }

                $td.append($el);

                $td.find('.default-ele').remove();
            }

            $insetEl.remove();

            $("#desiContent .fieldItem.selected").removeClass("selected");

            $el.addClass("selected");

            DesignProps.render({ type: type, $el: $container });
        }
    }
};

exports.default = DropEvent;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Index = __webpack_require__(7);

var _Index2 = _interopRequireDefault(_Index);

var _Index3 = __webpack_require__(17);

var _Index4 = _interopRequireDefault(_Index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllControls = {
    getControlByType: function getControlByType(type) {

        var InsControl = false;

        $.each(_Index4.default.Controls, function (i, item) {
            if (item.metaInfo.type == type) {
                InsControl = item;
                return false;
            }
        });

        if (InsControl) {
            return InsControl;
        }

        $.each(_Index2.default.Controls, function (i, item) {
            if (item.metaInfo.type == type) {
                InsControl = item;
                return false;
            }
        });

        if (InsControl) {
            return InsControl;
        }

        return InsControl;
    },


    Controls: {

        Basics: _Index4.default,

        LayOut: _Index2.default
    }

};

exports.default = AllControls;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Index = __webpack_require__(8);

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayOut = {

    metaInfo: {
        title: "布局"
    },

    Controls: [_Index2.default],

    addControl: function addControl(control) {
        this.Controls.push(control);
    }
};

exports.default = LayOut;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(9);

var _Index = __webpack_require__(10);

var _Index2 = _interopRequireDefault(_Index);

var _autosize = __webpack_require__(0);

var _autosize2 = _interopRequireDefault(_autosize);

var _Index3 = __webpack_require__(12);

var _Index4 = _interopRequireDefault(_Index3);

var _Index5 = __webpack_require__(15);

var _Index6 = _interopRequireDefault(_Index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableControl = {

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格"
    },

    PrivateProps: _Index4.default,

    defaultData: function defaultData(rowLen, cellLen) {

        var rows = [],
            head = [];

        if (!rowLen) {
            rowLen = 3;
        }
        if (!cellLen) {
            cellLen = 3;
        }

        for (var i = 0; i < rowLen; i++) {

            var cell = [],
                tCell = [];

            for (var j = 0; j < cellLen; j++) {

                cell.push({
                    childrens: []
                });

                tCell.push({
                    childrens: []
                });
            }

            rows.push({
                cells: cell
            });

            if (i == 0) {
                head.push({
                    cells: tCell
                });
            }
        }

        return {
            type: "Table",
            id: "Table_" + +new Date(),
            Settings: {},
            layOut: {
                tbody: rows,
                thead: head
            }
        };
    },

    render: function render(data) {

        if (!data || arguments.length > 1) {
            var deData = this.defaultData.apply(this, arguments);
            data = Object.create(deData);
        }

        var $fieldItem = $('<div class="fieldItem" /> ');

        this.renderCell($fieldItem, data);

        (0, _autosize2.default)($fieldItem.find(".txtInput"));

        if (this.$$root.Settings.mode == "desi") {
            _Index6.default.DropTo.init($fieldItem);
        }

        return $fieldItem;
    },

    renderCell: function renderCell($fieldItem, data) {

        var $tb = $('<table class="tbLayout" />'),
            $$root = this.$$root;

        $tb.append('<thead />');
        $tb.append('<tbody />');

        $tb.attr("id", data.id);

        if (data.layOut && data.layOut.thead) {

            var rows = data.layOut.tbody;

            $.each(rows, function (i, rowItem) {

                var $tr = $('<tr/>');

                $.each(rowItem.cells, function (j, cellItem) {

                    var $td = $('<td/>'),
                        Settings = cellItem.Settings,
                        childrens = cellItem.childrens;

                    if (Settings) {
                        if (Settings.rowSpan) {
                            $td.attr("rowspan", Settings.rowSpan);
                        }

                        if (Settings.colSpan) {
                            $td.attr("colspan", Settings.colSpan);
                        }
                    }

                    if (childrens && childrens.length > 0) {

                        $.each(childrens, function (l, childItem) {

                            var InsControl = $$root.AllControls.getControlByType(childItem.type);

                            if (InsControl) {
                                var $fieldItem = InsControl.render($$root, childItem).render(childItem);
                                $td.append($fieldItem);
                            }
                        });
                    } else {
                        $td.append($$root.AllControls.getControlByType("TextInput").render());
                    }

                    $tr.append($td);
                });

                $tr.append('<td class="seatLast" />');

                $tb.find("tbody").append($tr);
            });

            var headRows = data.layOut.thead;

            $.each(headRows, function (i, tRowItem) {

                var $tr = $('<tr/>');

                $.each(tRowItem.cells, function (j, cellItem) {
                    $tr.append('<th>TT</th>');
                });

                $tr.append('<th class="seatLast" />');

                $tb.find("thead").append($tr);
            });
        }

        $fieldItem.append($tb);
    },
    renderProps: function renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        $setProps.empty();

        var $group = this.genGroup({
            className: "setRowCol",
            title: "行列数"
        });
        $group.append(this.PrivateProps.setColRow.call(this, $fieldItem));

        $setProps.append($group);

        var $group = this.genGroup({
            className: "tbSet"
        });
        $group.append(this.PrivateProps.tbSet.call(this, $fieldItem));

        $setProps.append($group);
    },
    destroy: function destroy() {}
};

Object.setPrototypeOf(TableControl, _Index2.default);

exports.default = TableControl;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _AttrHtml = __webpack_require__(11);

var _AttrHtml2 = _interopRequireDefault(_AttrHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseControl = {
        genGroup: function genGroup(groupItem) {

                var $groupItem = $('<div class="attrItem" />');

                if (groupItem.className) {
                        $groupItem.addClass(groupItem.className);
                }

                if (groupItem.title) {
                        $groupItem.append('<div class="attrTitle">' + groupItem.title + '</div>');
                }

                return $groupItem;
        },
        genTitle: function genTitle() {
                var $title = $(_AttrHtml2.default.title);

                $title.on("keyup", function () {});

                return $title;
        },
        genHideTitle: function genHideTitle() {

                var $hideTitle = $(_AttrHtml2.default.hideTitle);

                $hideTitle.on("keyup", function () {});

                return $hideTitle;
        },
        genplaceHolder: function genplaceHolder() {

                var $placeHolder = $(_AttrHtml2.default.placeHolder);

                $placeHolder.on("keyup", function () {});

                return $placeHolder;
        }
};

exports.default = BaseControl;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var AttrHtml = {
    title: '<div class="optItem"><input maxlength="50" type="text" class="txtTitle" /></div>',

    hideTitle: '<div class="optItem"><label class="attrLab"><input class="ckHideBox" type="checkbox"> 隐藏标题 </label></div>',

    placeHolder: '<div class="optItem"><input type="text" class="txtPlaceHolder"></div>',

    required: '<div class="optItem"><label class="attrLab"><input class="ckBox" type="checkbox"> 这个是必填项目 </label></div>',

    layout: '<div class="optItem"><label class="attrLab"><input name="setRowCol" checked="true" class="ckLayOut" key="row" type="radio"> 横向 </label>' + '<label class="attrLab"><input key="col" name="setRowCol" class="ckLayOut" type="radio"> 纵向 </label></div>'

};

exports.default = AttrHtml;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DefHtml = __webpack_require__(13);

var _DefHtml2 = _interopRequireDefault(_DefHtml);

var _CellOp = __webpack_require__(14);

var _CellOp2 = _interopRequireDefault(_CellOp);

var _autosize = __webpack_require__(0);

var _autosize2 = _interopRequireDefault(_autosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Props = {
    setColRow: function setColRow($fieldItem) {
        var $colRow = $(_DefHtml2.default.colRow),
            col = $fieldItem.find("th").length,
            row = $fieldItem.find("tbody tr").length;

        $colRow.find(".txtRow").val(row);
        $colRow.find(".txtCol").val(col);

        var that = this;

        $colRow.on("click", ".btnSet", function () {

            var newRow = parseInt($colRow.find(".txtRow").val()),
                newCol = parseInt($colRow.find(".txtCol").val());

            if (!newRow || !newCol) {
                col = $fieldItem.find("th").length, row = $fieldItem.find("tbody tr").length;
                $colRow.find(".txtRow").val(row);
                $colRow.find(".txtCol").val(col);
                return;
            }

            var $oldFieldItem = $fieldItem.find(".fieldItem"),
                $newEl = that.render(newRow, newCol);

            $fieldItem.find(".tbLayout").html($newEl.find(".tbLayout").html());

            (0, _autosize2.default)($fieldItem.find(".txtInput"));

            var op = $(this).attr("op");

            if (op != 'reset') {

                $fieldItem.find("td").each(function (i) {

                    var $this = $(this);
                    if ($this.hasClass("seatLast")) {
                        return true;
                    }

                    if ($oldFieldItem[i]) {
                        $this.html($oldFieldItem[i]);
                    }
                });
            }
        });

        return $colRow;
    },
    tbSet: function tbSet($fieldItem) {

        var $tbSet = $(_DefHtml2.default.tbSet);

        _CellOp2.default.$$root = this.$$root;

        $tbSet.on("click", ".btnNorMal", function () {

            var type = $(this).attr("type");

            if (_CellOp2.default[type]) {
                _CellOp2.default[type]($fieldItem.find(".tbLayout"));
            }
        });

        return $tbSet;
    }
};

exports.default = Props;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var AttrHtml = {

    colRow: '<div class="optItem"><input class="txtShort txtRow" type="text"><span class="desc">行</span>' + '<span class="gap">×</span><input type="text" class="txtShort txtCol"><span class="desc">列</span>' + '<span type="tbSet" class="btnNorMal ThemeBorderColorLightHover ThemeColorLightHover btnSet">设定</span>' + '<span type="tbSet" op="reset" class="btnNorMal ThemeBorderColorLightHover ThemeColorLightHover btnSet">重置</span></div>',

    tbSet: '<div class="optItem"><span type="rowColSpan" class="btnHandleMal btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">合并单元格</span>' + '<span type="splitCell" class="btnHandleMal btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">拆分单元格</span>' + '<span type="insertTr" class="btnHandleMal addRow btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">添加行</span>' + '<span type="insertTd" class="btnHandleMal addCol btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">添加列</span>' + '<span type="deleteTr" class="btnHandleMal delRow btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">删除行</span>' + '<span type="deleteTd" class="btnHandleMal delColTable btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">删除列</span></div>'

};

exports.default = AttrHtml;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _autosize = __webpack_require__(0);

var _autosize2 = _interopRequireDefault(_autosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CellOp = {
    rowColSpan: function rowColSpan($tb) {

        if ($tb.find("td.active").length <= 1) {
            return;
        }

        var colspan = 0,
            rowSpan = 0,
            $tr = $tb.find("td.active:first").closest("tr"),
            $trs = $tb.find("td.active").closest("tr");

        $tr.find("td.active").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                colspan += parseInt(tdColspan);
            } else {
                colspan += 1;
            }
        });

        $trs.each(function () {
            var tdRowSpan = $(this).find("td.active:first").attr("rowspan");
            if (tdRowSpan && $(this).next().find("td.active").length <= 0) {
                rowSpan += parseInt(tdRowSpan);
            } else {
                rowSpan += 1;
            }
        });

        var $firstTd = $tb.find("td.active:first");

        $firstTd.attr("rowspan", rowSpan).attr("colspan", colspan).removeClass("active");

        $tb.find("td.active").remove();
    },

    getTdPosi: function getTdPosi($tb) {

        var $firstTr = $tb.find("thead tr:first"),
            TdsWidth = [];

        $firstTr.find("th").each(function (i) {

            var $this = $(this);

            TdsWidth.push({
                $td: $this,
                X: $this.offset().left,
                W: $this.width()
            });
        });

        return TdsWidth;
    },
    insertTr: function insertTr($tb) {

        var $td = $tb.find("td.active:first"),
            $tr = false;
        if ($td.length <= 0) {
            this.insertToLast($tb);
            return;
        } else {
            $tr = $td.closest("tr");
        }

        var tbtdLen = $tb.find("thead tr:first th").length,
            trtdLen = 0;

        var TdPosi = this.getTdPosi($tb),
            DefectIndex = [],
            tdCol = 0;

        $tr.find("td").each(function (i) {

            var tdColspan = $(this).attr("colspan");

            var tLeft = $(this).offset().left;

            if (tdColspan) {

                trtdLen += parseInt(tdColspan);

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += parseInt(tdColspan);
                        DefectIndex.push(c);
                    } else {
                        tdCol += parseInt(tdColspan);
                        break;
                    }
                }
            } else {

                trtdLen += 1;

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += 1;
                        DefectIndex.push(c);
                    } else {
                        tdCol += 1;
                        break;
                    }
                }
            }
        });

        if (tdCol < TdPosi.length) {
            for (var de = tdCol; de < TdPosi.length; de++) {
                DefectIndex.push(de);
            }
        }

        var $clone = $tr.clone(false, false).find("td").html('<div class="tdNull"></div>').parent(),
            isHasRowSpan = false;

        if ($clone.find("td").length != 1) {

            $clone.find("td").each(function () {
                if ($(this).attr("rowspan")) {
                    isHasRowSpan = true;
                    return false;
                }
            });
        }

        if ($tr.find("td").length > 0) {

            if (trtdLen == tbtdLen && !isHasRowSpan) {

                var rowSpan = $tr.find("td:first").attr("rowspan");

                if (rowSpan) {

                    rowSpan = parseInt(rowSpan) - 1;

                    for (var ix = 0; ix < rowSpan; ix++) {
                        $tr = $tr.next();
                    }

                    $tr.after($clone);

                    for (var ij = 0; ij < rowSpan; ij++) {
                        $clone.after('<tr/>');
                    }
                } else {
                    $tr.after($clone);
                }
            } else {

                $tr.find("td").each(function (i) {

                    var tdRowSpan = $(this).attr("rowspan");

                    if (tdRowSpan && parseInt(tdRowSpan) > 1) {
                        $(this).attr("rowspan", parseInt(tdRowSpan) + 1);
                        $clone.find("td").eq(i).addClass("removeTd");
                    }
                });

                $clone.find("td.removeTd").remove();

                $tr.after($clone);
            }
        }

        if (trtdLen == tbtdLen) {
            return;
        }

        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left,
                        index = 0;

                    $.each(TdPosi, function (i, item) {
                        if (item.X == tLeft) {
                            index = i;
                            return false;
                        }
                    });

                    var removeIndex = 0;

                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            $this.attr("rowspan", parseInt(tdRowSpan) + 1);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);
                        }
                    }
                }

                if (DefectIndex.length <= 0) {
                    return false;
                }
            });

            if (DefectIndex.length <= 0) {
                return false;
            }
        });
    },
    insertToLast: function insertToLast($tb) {

        var $tr = $("<tr/>"),
            colspan = $tb.find("thead tr:first th").length;

        for (var i = 0; i < colspan; i++) {
            var $td = $('<td/>');
            $td.append(this.$$root.AllControls.getControlByType("TextInput").render());
            $tr.append($td);
        }

        $tb.find("tbody").append($tr);

        (0, _autosize2.default)($tr.find(".txtInput"));
    },
    deleteTr: function deleteTr($tb) {

        var $active = $tb.find("tbody .active");

        if ($active.length > 0) {
            var that = this;
            $active.each(function () {
                that.deleteTrComm($(this));
            });
        } else {
            this.deleteTrComm($tb.find("tbody tr:last td:first"));
        }
    },
    deleteTrComm: function deleteTrComm($td) {

        if (!$td) {
            return;
        }

        var tdRowSpan = $td.attr("rowspan"),
            $trArr = [],
            $tr = $td.parent();

        $trArr.push($tr);

        if (tdRowSpan && tdRowSpan > 1) {
            var row = +tdRowSpan;

            for (var i = 1; i < row; i++) {
                $trArr.push($trArr[i - 1].next());
            }
        }

        var delCount = $trArr.length;

        for (var j = 0; j < delCount; j++) {
            this.commDeleteTr($trArr[j]);
        }

        return delCount;
    },
    commDeleteTr: function commDeleteTr($tr) {

        var $tb = $tr.closest(".tbLayout");

        var tbtdLen = $tb.find("thead tr:first th").length,
            trtdLen = 0;

        var TdPosi = this.getTdPosi($tb),
            DefectIndex = [],
            tdCol = 0;

        $tr.find("td").each(function (i) {

            var tdColspan = $(this).attr("colspan");

            var tLeft = $(this).offset().left;

            if (tdColspan) {

                trtdLen += parseInt(tdColspan);

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += parseInt(tdColspan);
                        DefectIndex.push(c);
                    } else {
                        tdCol += parseInt(tdColspan);
                        break;
                    }
                }
            } else {

                trtdLen += 1;

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += 1;
                        DefectIndex.push(c);
                    } else {
                        tdCol += 1;
                        break;
                    }
                }
            }
        });

        if (tdCol < TdPosi.length) {
            for (var de = tdCol; de < TdPosi.length; de++) {
                DefectIndex.push(de);
            }
        }

        if ($tr.find("td").length > 0) {

            $tr.find("td").each(function (i) {
                var $this = $(this),
                    tdRowSpan = $this.attr("rowspan");

                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left;

                    var $cloneTd = $this.clone();
                    $cloneTd.attr("rowspan", parseInt(tdRowSpan) - 1);

                    $tr.next().find("td").each(function () {

                        var tsLeft = $(this).offset().left;

                        if (tsLeft > tLeft) {
                            $(this).before($cloneTd);
                            return false;
                        }
                    });

                    $this.removeAttr("rowspan");
                }
            });
        } else {}

        if (trtdLen == tbtdLen) {
            $tr.remove();
            $("#desiContent").removeAttr("style");
            return;
        }

        var $diffRowTr = [];

        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left,
                        index = 0;

                    $.each(TdPosi, function (i, item) {
                        if (item.X == tLeft) {
                            index = i;
                            return false;
                        }
                    });

                    var removeIndex = 0;

                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            $diffRowTr.push($this);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);
                        }
                    }
                }

                if (DefectIndex.length <= 0) {
                    return false;
                }
            });

            if (DefectIndex.length <= 0) {
                return false;
            }
        });

        $.each($diffRowTr, function (i, $item) {
            $item.attr("rowspan", parseInt($item.attr("rowspan")) - 1);
        });

        $tr.remove();
    },
    insertTd: function insertTd($tb) {

        var $td = $tb.find("td.active:first");

        if ($td.length <= 0) {
            $td = $tb.find("thead tr th.seatLast").prev();
        }

        var newTdW = this.reDiffTdWidth($tb),
            $newTd = $('<td/>');

        if (newTdW) {
            var tdOffset = $td.offset(),
                tdLeft = tdOffset.left,
                tdRigth = tdOffset.left + $td.width();

            $tb.find("thead tr th").each(function () {
                var $eTd = $(this),
                    Eoffset = $eTd.offset();

                if (Eoffset.left <= tdLeft && Eoffset.left + $eTd.width() >= tdRigth) {
                    $eTd.after('<th width="' + newTdW + '">TT</th>');
                }
            });
        } else {
            $tb.find("thead tr .seatLast").before('<th>TT</th>');
        }

        $newTd.append(this.$$root.AllControls.getControlByType("TextInput").render());

        var tdStr = $('<div/>').append($newTd).html();

        $tb.find("tbody tr").each(function () {
            $(this).append('<td/>');
        });

        var breakCount = 0;

        $tb.find("tbody tr").each(function () {

            var $tTr = $(this);

            if (breakCount > 0) {
                $tTr.find("td:last").remove();
                breakCount--;
                return true;
            }

            var tdOffset = $td.offset(),
                tdLeft = tdOffset.left,
                tdRigth = tdOffset.left + $td.width();

            $tTr.find("td").each(function () {

                var $eTd = $(this),
                    Eoffset = $eTd.offset();

                if (Eoffset.left <= tdLeft && Eoffset.left + $eTd.width() >= tdRigth) {

                    var thisColspan = $eTd.attr("colspan");

                    if (thisColspan && thisColspan > 1) {

                        var newColspan = parseInt(thisColspan) + 1,
                            thisRowSpan = $eTd.attr("rowspan");

                        if (thisRowSpan && thisRowSpan > 1) {
                            breakCount = parseInt(thisRowSpan) - 1;
                        }

                        $eTd.attr("colspan", newColspan);
                    } else {
                        $eTd.after(tdStr);
                    }

                    $tTr.find("td:last").remove();

                    return false;
                }
            });
        });
    },
    reDiffTdWidth: function reDiffTdWidth($tb) {

        var $fieldItem = $tb.closest(".fieldItem"),
            isFixedW = $tb.find("thead tr th:first").attr("width");

        if (isFixedW) {
            var colspan = $tb.find("thead tr th").length - 1,
                fwidth = $fieldItem.width(),
                tbW = $fieldItem.width();

            var nW = Math.floor(fwidth / (colspan + 1));

            $tb.find("thead tr th").each(function () {

                var $this = $(this),
                    tW = parseInt($this.attr("width"));

                tW -= tW / tbW * nW;

                tW = tW > 1 && tW || 1;

                tW = Math.floor(tW);

                $this.attr("width", tW);
            });

            return nW;
        }

        return false;
    },
    deleteTd: function deleteTd($tb) {

        var $active = $tb.find("tbody .active");

        if ($active.length > 0) {
            var that = this;
            $active.each(function () {
                that.deleteTdExec($(this));
            });
        } else {
            this.deleteTdExec($tb.find("tbody tr:last td:last").prev());
        }
    },
    deleteTdExec: function deleteTdExec($td) {

        if (!$td || $td.closest("body").length <= 0) {
            return;
        }

        var $tb = $td.closest(".tbLayout"),
            tdColspan = $td.attr("colspan"),
            tdRowSpan = $td.attr("rowspan"),
            $tdArr = [];

        if (tdColspan && tdColspan > 1 || tdRowSpan && tdRowSpan > 1) {
            this.splitCell($td);

            var count = parseInt(tdColspan);

            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    if ($tdArr.length > 0) {
                        $tdArr.push($tdArr[i - 1].next());
                    } else {
                        $tdArr.push($td);
                    }
                }
            } else {
                $tdArr.push($td);
            }
        } else {
            $tdArr.push($td);
        }

        var delCol = 0,
            self = this;

        $.each($tdArr, function () {

            var $this = this,
                removeOffset = $this.offset(),
                rLeft = removeOffset.left,
                tw = $this.width(),
                rRight = removeOffset.left + tw,
                cacheOpTds = [];

            $tb.find("thead tr").each(function () {
                $(this).find("th").each(function () {

                    var $eTd = $(this),
                        Eoffset = $eTd.offset();

                    if (Eoffset.left <= rLeft && Eoffset.left + $eTd.width() >= rRight) {

                        cacheOpTds.push({
                            $el: $eTd,
                            type: "remove"
                        });

                        return false;
                    }
                });
            });

            $tb.find("tbody tr").each(function () {
                $(this).find("td").each(function () {

                    var $eTd = $(this),
                        Eoffset = $eTd.offset();

                    if (Eoffset.left <= rLeft && Eoffset.left + $eTd.width() >= rRight) {

                        var thisColspan = $eTd.attr("colspan");

                        if (thisColspan && thisColspan > 1) {

                            var newColspan = parseInt(thisColspan) - 1;

                            cacheOpTds.push({
                                $el: $eTd,
                                type: "colspan",
                                colSpan: newColspan
                            });
                        } else {
                            cacheOpTds.push({
                                $el: $eTd,
                                type: "remove"
                            });
                        }

                        return false;
                    }
                });
            });

            $.each(cacheOpTds, function (i) {
                if (this.type == "remove") {

                    if (i == 0) {
                        self.CellAverage(this.$el);
                    }
                    this.$el.remove();
                } else {
                    this.$el.attr("colspan", this.colSpan);
                }
            });

            delCol++;
        });
    },
    CellAverage: function CellAverage($td) {

        var nW = $td.attr("width");

        if (nW) {
            var $tds = $td.siblings(),
                tbW = $td.parent().width() - nW;

            $tds.each(function () {

                var $this = $(this),
                    tW = parseInt($this.attr("width"));

                tW += tW / tbW * nW;

                tW = Math.floor(tW);

                $this.attr("width", tW);
            });
        }
    },
    splitCell: function splitCell($tb) {

        var $tds = $tb.find("td.active"),
            that = this;

        $tds.each(function () {
            that.splitCellTd($(this));
        });
    },
    splitCellTd: function splitCellTd($td) {
        var $tb = $td.closest('.tbLayout'),
            tbtdLen = $tb.find("thead tr:first th").length,
            thisColspan = $td.attr("colspan");

        var TdPosi = this.getTdPosi($tb),
            tdOffset = $td.offset(),
            tdRowSpan = $td.attr("rowspan"),
            index = 0;

        $.each(TdPosi, function (i, item) {
            if (item.X == tdOffset.left) {
                index = i;
                return false;
            }
        });

        var strTd = '',
            $tdVir = $('<td/>').append(this.$$root.AllControls.getControlByType("TextInput").render()),
            firstTd = $('<div/>').append($tdVir).html();

        index++;

        for (var j = 1; j < thisColspan; j++) {
            strTd += firstTd;
            index++;
        }

        if (tdRowSpan > 1) {
            var $tr = $td.parent(),
                $trArr = [];

            for (var k = 1; k < tdRowSpan; k++) {

                if ($trArr.length > 0) {
                    $trArr.push($trArr[k - 2].next());
                } else {
                    $trArr.push($tr.next());
                }
            }

            $trArr.reverse();

            if (thisColspan == tbtdLen) {

                $.each($trArr, function () {
                    var $this = this,
                        newRowspan = parseInt($td.attr("rowspan")) - 1;
                    $this.append(firstTd + strTd);
                    $td.attr("rowspan", newRowspan).removeAttr("height");
                });
            } else {

                $.each($trArr, function () {

                    var $this = this;

                    $this.find("td").each(function () {

                        var $ttd = $(this),
                            nextLen = $ttd.next().length,
                            isOffsetF = $ttd.offset().left > tdOffset.left;

                        if (isOffsetF || nextLen <= 0) {

                            var newRowspan = parseInt($td.attr("rowspan")) - 1;

                            if (!isOffsetF) {
                                $ttd.after(firstTd + strTd);
                            } else {
                                $ttd.before(firstTd + strTd);
                            }

                            $td.attr("rowspan", newRowspan).removeAttr("height");

                            return false;
                        }
                    });
                });
            }

            if (thisColspan > 1) {
                $td.after(strTd);
                $td.removeAttr("colspan");
            }
        } else {
            $td.after(strTd);
            $td.removeAttr("colspan");
        }
    }
};

exports.default = CellOp;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DropTo = __webpack_require__(16);

var _DropTo2 = _interopRequireDefault(_DropTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = {
  DropTo: _DropTo2.default
};

exports.default = Events;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DropTo = {
    init: function init($tb) {

        var that = this;

        $tb.on("mousemove", "th", function (event) {

            var $this = $(this),
                $tb = $this.closest(".tbLayout");

            $tb.find(".ewResize").removeClass("ewResize");

            that.tdCellWidth($this, event);

            return;
        });

        $tb.on("mousedown", "th.ewResize", function (event) {
            that.tdMoveChangeCellWidth($(this), event);
        });

        $tb.on("mousedown", "td", function (event) {

            that.bindSelectionTdEvent({
                initX: event.pageX,
                initY: event.pageY,
                $table: $(this).closest("table")
            });
        });
    },
    tdCellWidth: function tdCellWidth($el, event) {

        var eOffset = $el.offset(),
            eW = $el.width(),
            pageX = event.pageX,
            isFirst = $el.prev().length <= 0 && true || false,
            isLast = $el.next().length <= 0 && true || false;

        if (!isFirst) {

            if (pageX > eOffset.left && pageX < eOffset.left + 10) {
                $el.addClass("ewResize");
                $el.data("ewdirc", "left");
                return;
            } else {
                $el.removeClass("ewResize");
            }
        }

        if (!isLast) {
            var tdW = eOffset.left + eW;
            if (pageX < tdW && pageX > tdW - 10) {
                $el.addClass("ewResize");
                $el.addClass("ewResize");
                $el.data("ewdirc", "right");
            } else {
                $el.removeClass("ewResize");
            }
        }
    },
    tdMoveChangeCellWidth: function tdMoveChangeCellWidth($el, event) {
        if (!$el.attr("width")) {
            $el.closest(".tbLayout").find("th").each(function () {
                var $this = $(this);
                $this.attr("width", $this.width());
            });
        }

        var sourceX = event.pageX,
            that = this,
            ewdirc = $el.data("ewdirc"),
            sourceW = parseInt($el.attr("width"));

        $(window).on("mousemove.ewResize", function (event) {

            var diffX = event.pageX - sourceX;

            if (diffX == 0) {
                return;
            }

            if (ewdirc != "left") {

                var newW = sourceW + diffX,
                    diffTdW = newW - parseInt($el.attr("width"));

                if (newW < 1) {
                    return;
                }

                var nextW = parseInt($el.next().attr("width")) - diffTdW,
                    elW = parseInt($el.attr("width")) + diffTdW;

                if (nextW < 2 || elW < 2) {
                    return false;
                }

                $el.next().attr("width", nextW);
                $el.attr("width", elW);
            } else {

                var newW = sourceW - diffX,
                    diffTdW = newW - parseInt($el.attr("width"));

                if (newW < 1) {
                    return;
                }

                var prevW = parseInt($el.prev().attr("width")) - diffTdW,
                    elW = parseInt($el.attr("width")) + diffTdW;

                if (prevW < 2 || elW < 2) {
                    tdArr = [];
                    return false;
                }

                $el.prev().attr("width", prevW);
                $el.attr("width", elW);
            }

            return false;
        });

        $(window).on("mouseup.ewResize", function () {
            $(window).off("mousemove.ewResize");
            $(window).off("mouseup.ewResize");
            $(".tbLayout .ewResize").removeClass("ewResize");
        });
    },

    bindSelectionTdEvent: function bindSelectionTdEvent(initPoint) {

        $("body").addClass("noSelected");

        var that = this,
            $selectionBox = false;

        $(window).on("mousemove.selectionTd", function (event) {

            var newX = event.pageX,
                newY = event.pageY,
                w = newX - initPoint.initX,
                h = newY - initPoint.initY,
                styleObj = {
                width: w,
                height: h,
                left: initPoint.initX,
                top: initPoint.initY
            };

            if (initPoint.initX == newX && initPoint.initY == newY) {
                return false;
            }

            if ($("#selectionBox").length <= 0) {
                $("body").append("<div id='selectionBox'></div>");
                $selectionBox = $("#selectionBox");
            }

            if (w < 0) {

                styleObj.left = initPoint.initX + w;
                w = Math.abs(w);
                styleObj.width = w;
            }

            if (h < 0) {
                styleObj.top = initPoint.initY + h;
                h = Math.abs(h);
                styleObj.height = h;
            }

            $selectionBox.css(styleObj);

            that.diffSelectionTd(styleObj, initPoint.$table);
            return false;
        });

        $(window).on("mouseup.selectionTd", function () {

            $(window).off("mousemove.selectionTd");

            $(window).off("mouseup.selectionTd");

            $selectionBox && $selectionBox.remove();

            $("body").removeClass("noSelected");

            $("body").one("click", function () {
                initPoint.$table.find(".active").removeClass("active");
            });
        });
    },

    diffSelectionTd: function diffSelectionTd(styleObj, $table) {

        var that = this;

        $table.find("td").each(function () {

            var $td = $(this),
                cX = $td.offset().left,
                cY = $td.offset().top,
                cW = $td.width(),
                cH = $td.height(),
                isInTop = cX < styleObj.left && cX + cW > styleObj.left || cX > styleObj.left && cX < styleObj.left + styleObj.width;

            if (!isInTop) {
                $td.removeClass("active");
                return true;
            }

            if (cY < styleObj.top && cY + cH > styleObj.top || cY > styleObj.top && cY < styleObj.top + styleObj.height) {
                if (!$td.hasClass("seatLast")) {
                    $td.addClass("active");
                }

                if ($td.attr("colspan")) {
                    var newRight = cX + cW;
                    if (newRight > styleObj.left + styleObj.width) {

                        styleObj.width = newRight - styleObj.left;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    } else if (cX < styleObj.left) {

                        styleObj.width = styleObj.left + styleObj.width - cX - 1;

                        styleObj.left = cX - 1;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    }
                }

                if ($td.attr("rowspan")) {

                    var newBottom = cY + cH;

                    if (newBottom > styleObj.top + styleObj.height) {

                        styleObj.height = newBottom - styleObj.top;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    } else {

                        if (cY < styleObj.top - 2) {

                            var diffTop = styleObj.top - cY - 1;
                            styleObj.top -= diffTop;
                            styleObj.height += diffTop;

                            that.diffSelectionTd(styleObj, $table);

                            return false;
                        }
                    }
                }
            } else {
                $td.removeClass("active");
            }
        });
    }

};

exports.default = DropTo;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Index = __webpack_require__(18);

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Basics = {

    metaInfo: {
        title: "控件"
    },

    Controls: [_Index2.default],

    addControl: function addControl(control) {
        this.Controls.push(control);
    }
};

exports.default = Basics;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(19);

var TextInput = {
    defaultData: function defaultData() {

        return {

            type: "TextInput",

            id: "TextInput_" + +new Date(),

            Settings: {
                placeHolderText: ""
            },

            values: []
        };
    },


    metaInfo: {
        type: "TextInput",
        name: "文本输入框",
        iconClass: "icon-wenbenshurukuang",
        attrs: {
            maxLen: 200,
            minLen: false,
            placeHolderText: true
        }
    },

    render: function render(data) {

        if (!data) {
            data = TextInput.defaultData();
        }

        var $fieldItem = $('<div class="fieldItem" />'),
            $setPlaceHolderBox = $('<div class="txtInputBox" />'),
            $txtInput = $('<textarea rows="1" class="txtInput"/>');

        if (data.Settings.placeHolderText) {
            $txtInput.attr('placeholder', data.Settings.placeHolderText);
        }

        $fieldItem.attr("id", data.id).attr("type", data.type);

        if (data.values[0]) {
            $txtInput.val(data.values[0]);
        }

        if (data.Settings.style) {
            $txtInput.attr("style", data.Settings.style);
        }

        $setPlaceHolderBox.append($txtInput);

        $fieldItem.append($setPlaceHolderBox);

        return $fieldItem;
    },
    parse: function parse() {},
    renderProps: function renderProps() {}
};

exports.default = TextInput;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _defTpl = __webpack_require__(21);

var _defTpl2 = _interopRequireDefault(_defTpl);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DesiContent = {
        init: function init() {

                var $el = $('<div class="desiContent"/>');

                $el.append(_defTpl2.default.toDo);

                $el.append('<div class="fromDesign"/>');

                this.$$root.$el.append($el);
        }
};

exports.default = DesiContent;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Tpl = {

    toDo: '<div class="reToDo">' + '<span class="btnReDo empty"><i class="commoniconfont icon-chexiao"></i><span class="text">撤销</span></span>' + ' <span class="btnToDo empty"><i class="commoniconfont icon-huifu1"></i><span class="text">恢复</span></span></div>'

};

exports.default = Tpl;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(24);

var PropsDesign = {
    init: function init(Opts) {

        var $el = $('<div class="designProps"/>');

        $el.append('<ul class="tabAttrs"><li class="item">控件设置</li></ul>');

        $el.append('<div class="setProps"></div>');

        Opts.$el.append($el);
    },
    render: function render(opts) {

        var type = opts.type,
            $setProps = opts.$el.find(".setProps"),
            Control = Libs.AllControls[type];

        if (Control) {

            var attrs = Control.metaInfo.attrs;

            $setProps.html('');

            if (attrs && attrs.length > 0) {

                $.each(attrs, function (i, item) {

                    var $attrItem = $('<div class="attrItem" />');

                    if (item.className) {
                        $attrItem.addClass(item.className);
                    }

                    if (item.title) {
                        $attrItem.append('<div class="attrTitle">' + item.title + '</div>');
                    }

                    var Options = item.Options;

                    for (var key in Options) {
                        if (CommPropsDef[key]) {
                            $attrItem.append(CommPropsDef[key]);
                        } else if (Control.PropsHtmlDef[key]) {
                            $attrItem.append(Control.PropsHtmlDef[key]);
                        }
                    }

                    $setProps.append($attrItem);
                });
            }
        }
    }
};

exports.default = PropsDesign;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
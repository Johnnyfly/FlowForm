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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ControlLibs;

var _Index = __webpack_require__(6);

var _Index2 = _interopRequireDefault(_Index);

var _Index3 = __webpack_require__(12);

var _Index4 = _interopRequireDefault(_Index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ControlType = {
    Base: 'Base',
    MixControl: 'MixControl',
    LayOut: 'LayOut'
};

var ControlLibs = (_ControlLibs = {
    ControlType: ControlType

}, _defineProperty(_ControlLibs, ControlType.Base, {}), _defineProperty(_ControlLibs, ControlType.MixControl, {}), _defineProperty(_ControlLibs, ControlType.LayOut, {
    Table: _Index2.default
}), _ControlLibs);

ControlLibs.AllControls = {};

for (var key in ControlType) {

    for (var key2 in ControlLibs[key]) {
        ControlLibs.AllControls[key2] = ControlLibs[key][key2];
    }
}

ControlLibs.AllControls.TextInput = _Index4.default;

exports.default = ControlLibs;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(18);

var _Index = __webpack_require__(0);

var _Index2 = _interopRequireDefault(_Index);

var _CommPropsDef = __webpack_require__(19);

var _CommPropsDef2 = _interopRequireDefault(_CommPropsDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            Control = _Index2.default.AllControls[type];

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
                        if (_CommPropsDef2.default[key]) {
                            $attrItem.append(_CommPropsDef2.default[key]);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _index = __webpack_require__(3);

var ApplicatinForm = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var FormApplicatin = {
        init: function init($el) {

                ApplicatinForm.Controls.render({ $el: $el });

                ApplicatinForm.DesignProps.init({ $el: $el });

                ApplicatinForm.FormDesign.init({ $el: $el });
        }
};

window.ZppFormApplicatin = FormApplicatin;

exports.default = FormApplicatin;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesignProps = exports.FormDesign = exports.Controls = undefined;

__webpack_require__(4);

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _Index = __webpack_require__(20);

var _Index2 = _interopRequireDefault(_Index);

var _Index3 = __webpack_require__(1);

var _Index4 = _interopRequireDefault(_Index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Controls = _index2.default;
exports.FormDesign = _Index2.default;
exports.DesignProps = _Index4.default;

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

var _Index = __webpack_require__(0);

var _Index2 = _interopRequireDefault(_Index);

__webpack_require__(14);

__webpack_require__(15);

var _Index3 = __webpack_require__(16);

var _Index4 = _interopRequireDefault(_Index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = {
        render: function render(opts) {

                var defaults = {
                        renderType: ['Base', 'LayOut', 'MixControl'],
                        showDefault: _Index2.default.ControlType.LayOut,
                        $el: $("body")
                };

                var Options = $.extend(defaults, opts);

                this.renderTab(Options);

                var $el = Options.$el;

                if (Options.$desiEl) {
                        $el = Options.$desiEl;
                }

                _Index4.default.init($el);
        },
        renderTab: function renderTab(Options) {

                var renderType = Options.renderType,
                    $allControls = $('<div class="allControls"/>');

                if (renderType && renderType.length > 1) {

                        var $controlTab = $('<ul class="tabControl" />'),
                            ControlType = _Index2.default.ControlType;

                        if (renderType.indexOf(ControlType.Base) > -1) {
                                $controlTab.append('<li type="' + ControlType.Base + '" class="item ThemeBorderColorLightSelected">控件</li>');
                                $allControls.append(this.renderControl(ControlType.Base, Options.$el));
                        }

                        if (renderType.indexOf(ControlType.MixControl) > -1) {
                                $controlTab.append('<li type="' + ControlType.MixControl + '" class="item ThemeBorderColorLightSelected">套件</li>');
                                $allControls.append(this.renderControl(ControlType.MixControl, Options.$el));
                        }

                        if (renderType.indexOf(ControlType.LayOut) > -1) {
                                $controlTab.append('<li type="' + ControlType.LayOut + '" class="item ThemeBorderColorLightSelected">布局</li>');
                                $allControls.append(this.renderControl(ControlType.LayOut, Options.$el));
                        }
                }

                $allControls.prepend($controlTab);

                Options.$el.append($allControls);

                var $defaultShow = Options.$el.find("." + Options.showDefault + "ControlBox");

                if ($defaultShow.length <= 0) {
                        Options.$el.find(".ControlBox:first").show();
                } else {
                        $defaultShow.show();
                }

                var $selTab = Options.$el.find(".tabControl .item[type='" + Options.showDefault + "']");

                if ($selTab.length > 0) {
                        $selTab.addClass("selected");
                } else {
                        Options.$el.find(".tabControl .item:first").addClass("selected");
                }
        },
        renderControl: function renderControl(type, $el) {

                var Controls = _Index2.default[type],
                    className = type + "ControlBox",
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

                        item.initEvent && item.initEvent($el);
                });

                return $controlBox;
        }
};

exports.default = Controls;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(7);

var _Index = __webpack_require__(0);

var _Index2 = _interopRequireDefault(_Index);

var _autosize = __webpack_require__(8);

var _autosize2 = _interopRequireDefault(_autosize);

var _Index3 = __webpack_require__(9);

var _Index4 = _interopRequireDefault(_Index3);

var _PropsHtmlDef = __webpack_require__(29);

var _PropsHtmlDef2 = _interopRequireDefault(_PropsHtmlDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableControl = {
    defaultData: function defaultData() {

        var rows = [];

        for (var i = 0; i < 3; i++) {

            var cell = [];

            for (var j = 0; j < 3; j++) {

                cell.push({
                    childrens: []
                });
            }
            rows.push({
                cells: cell
            });
        }

        return {

            type: "Table",

            id: "Table_" + +new Date(),

            Settings: {},

            layOutData: {
                data: rows
            }

        };
    },

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格",
        attrs: [{
            className: "setRowCol",
            title: "行列数",
            Options: {
                tbCount: true,
                tb: true

            }
        }, {
            title: "其他设置",
            Options: {
                border: true
            }
        }]
    },

    methods: {
        render: function render(data) {

            if (!data) {
                data = Object.create(TableControl.defaultData());
            }

            var $fieldItem = $('<div class="fieldItem" /> ');

            this.renderCell($fieldItem, data);

            (0, _autosize2.default)($fieldItem.find(".txtInput"));

            return $fieldItem;
        },

        renderCell: function renderCell($fieldItem, data) {

            var $tb = $('<table class="tbLayout" />');

            $tb.attr("id", data.id);

            if (data.layOutData && data.layOutData.data) {

                var rows = data.layOutData.data;

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
                                if (_Index2.default.AllControls[childItem.type]) {
                                    var $fieldItem = _Index2.default.AllControls[childItem.type].render(childItem);
                                    $td.append($fieldItem);
                                }
                            });
                        } else {

                            if (_Index2.default.AllControls.TextInput) {
                                var $fieldItem = _Index2.default.AllControls.TextInput.render();
                                $td.append($fieldItem);
                            }
                        }

                        $tr.append($td);
                    });

                    $tb.append($tr);
                });
            }

            $fieldItem.append($tb);
        },


        parse: function parse() {},

        bindPropsEvents: function bindPropsEvents($el) {}
    },

    initEvent: function initEvent($el) {
        _Index4.default.init($el);
    },
    render: function render(pars) {
        return TableControl.methods.render(pars);
    },


    PropsHtmlDef: _PropsHtmlDef2.default

};

exports.default = TableControl;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mousedown = __webpack_require__(10);

var _mousedown2 = _interopRequireDefault(_mousedown);

var _AttrEvent = __webpack_require__(11);

var _AttrEvent2 = _interopRequireDefault(_AttrEvent);

var _context = __webpack_require__(28);

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = {
    init: function init($el) {
        _mousedown2.default.init($el);
        _AttrEvent2.default.init($el);
        _context2.default.init($el);
    }
};

exports.default = Events;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mousedownEvents = {
    init: function init($fieldItem) {
        $fieldItem.on("mousedown", "td", function (event) {

            if (event.button != 0) {
                return;
            }

            var $fieldItem = $(this).closest(".fieldItem");

            $(".fieldItem").removeClass("selected");
            $fieldItem.addClass("selected");

            $(".fieldItem").find("textarea").blur();

            mousedownEvents.bindSelectionTdEvent({
                initX: event.pageX,
                initY: event.pageY,
                $table: $(this).closest(".tbLayout")
            });
        });

        $("body").on("click", function () {
            $fieldItem.find(".active").removeClass("active");
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

                $td.addClass("active");

                var isReturn = false;

                if ($td.attr("colspan")) {

                    var newRight = cX + cW;

                    if (newRight > styleObj.left + styleObj.width) {

                        styleObj.width = newRight - styleObj.left;

                        isReturn = true;
                    }
                    if (cX < styleObj.left) {

                        styleObj.width = styleObj.left + styleObj.width - cX - 1;

                        styleObj.left = cX - 1;

                        isReturn = true;
                    }
                }

                if ($td.attr("rowspan")) {

                    var newBottom = cY + cH;

                    if (newBottom > styleObj.top + styleObj.height) {

                        styleObj.height = newBottom - styleObj.top;

                        isReturn = true;
                    }

                    if (cY < styleObj.top) {
                        styleObj.height = styleObj.top + styleObj.height - cY - 1;

                        styleObj.top = cY - 1;
                    }
                }

                if (isReturn) {
                    that.diffSelectionTd(styleObj, $table);
                    return false;
                }
            } else {
                $td.removeClass("active");
            }
        });
    }
};

exports.default = mousedownEvents;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
            value: true
});

var _TbOp = __webpack_require__(27);

var _TbOp2 = _interopRequireDefault(_TbOp);

var _Index = __webpack_require__(0);

var _Index2 = _interopRequireDefault(_Index);

var _autosize = __webpack_require__(8);

var _autosize2 = _interopRequireDefault(_autosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttrEvent = {
            init: function init($el) {

                        var that = this;

                        $el.on("click", ".btnHandleTable", function () {

                                    var $this = $(this),
                                        type = $this.attr("type"),
                                        $fieldItem = $el.find(".fieldItem.selected");

                                    if ($fieldItem.length > 0) {
                                                that.eventObj[type] && that.eventObj[type]($fieldItem, $this);
                                    }
                        });
            },

            eventObj: {
                        mergeCell: function mergeCell($fieldItem, $el) {
                                    _TbOp2.default.rowColSpan($fieldItem.find(".tbLayout"));
                        },
                        splitCell: function splitCell($fieldItem, $el) {

                                    $fieldItem.find("td.active").each(function () {

                                                var $this = $(this);

                                                if ($this.attr("rowspan") > 1 || $this.attr("colspan") > 1) {
                                                            _TbOp2.default.splitCell($this);
                                                }

                                                this.replaceContolToTextInput($fieldItem);
                                    });
                        },
                        addRow: function addRow($fieldItem, $el) {

                                    var $active = $fieldItem.find(".active:last");

                                    if ($active.length > 0) {
                                                _TbOp2.default.insertTr($active.closest("tr"));
                                    } else {
                                                _TbOp2.default.insertToLast($fieldItem);
                                    }

                                    this.replaceContolToTextInput($fieldItem);
                        },
                        addColTable: function addColTable($fieldItem, $el) {
                                    var $active = $fieldItem.find(".active:last");

                                    if ($active.length > 0 && $active.next().length > 0) {
                                                _TbOp2.default.insertTd($active);
                                    } else {
                                                this.addCol($fieldItem);
                                    }
                        },

                        addCol: function addCol($fieldItem) {

                                    var isFixedW = $fieldItem.find("table tr td:first").attr("width");

                                    if (isFixedW) {

                                                var colspan = 0,
                                                    fwidth = $fieldItem.width(),
                                                    tbW = 0;

                                                $fieldItem.find("table tr:first td").each(function () {

                                                            var tdColspan = $(this).attr("colspan");
                                                            tbW += $(this).width();

                                                            if (tdColspan) {
                                                                        colspan += parseInt(tdColspan);
                                                            } else {
                                                                        colspan += 1;
                                                            }
                                                });

                                                var nW = Math.floor(fwidth / (colspan + 1));

                                                $fieldItem.find("table tr td").each(function () {

                                                            var $this = $(this),
                                                                tW = parseInt($this.attr("width"));

                                                            tW -= tW / tbW * nW;

                                                            tW = tW > 1 && tW || 1;

                                                            tW = Math.floor(tW);

                                                            $this.attr("width", tW);
                                                });

                                                $fieldItem.find("table tr").each(function (i) {

                                                            var $aTd = $("<td/>");

                                                            $aTd.attr("width", nW);

                                                            $aTd.append('<div class="tdNull">&nbsp;</div>');

                                                            $(this).append($aTd);
                                                });
                                    } else {

                                                $fieldItem.find("table tr").each(function (i) {

                                                            var $aTd = $("<td/>");

                                                            $aTd.append('<div class="tdNull">&nbsp;</div>');

                                                            $(this).append($aTd);
                                                });
                                    }

                                    this.replaceContolToTextInput($fieldItem);
                        },

                        delColTable: function delColTable($fieldItem) {
                                    if ($fieldItem.find("tr:first td").length <= 1) {
                                                $fieldItem.find(".btnDelField").click();
                                                return;
                                    }

                                    var $td = $fieldItem.find(".active");

                                    if ($td.length <= 0) {
                                                $td = $fieldItem.find("tr:first td:last");
                                    }

                                    $td.each(function () {
                                                _TbOp2.default.deleteTd($(this));
                                    });
                        },
                        delRow: function delRow($fieldItem) {

                                    var $active = $fieldItem.find(".active"),
                                        delCount = 1;

                                    if ($active.length > 0) {
                                                delCount = 0;
                                                $active.parent().each(function () {
                                                            delCount += _TbOp2.default.deleteTr($(this).find("td:first"));
                                                });
                                    } else {
                                                delCount = _TbOp2.default.deleteTr($fieldItem.find("tr:last td:first"));
                                    }

                                    if ($fieldItem.find("td").length <= 0) {
                                                $fieldItem.find(".btnDelField").trigger("click", {
                                                            trigge: true
                                                });

                                                return;
                                    }
                        },
                        replaceContolToTextInput: function replaceContolToTextInput($fieldItem) {

                                    var $tds = $fieldItem.find(".tdNull").parent();

                                    $tds.each(function () {
                                                var $fieldItem = _Index2.default.AllControls.TextInput.render();
                                                $(this).html($fieldItem);
                                    });

                                    (0, _autosize2.default)($tds.find(".txtInput"));
                        }
            }

};

exports.default = AttrEvent;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(13);

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

    methods: {
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
        parse: function parse() {}
    },

    render: function render(data) {
        return TextInput.methods.render(data);
    }
};

exports.default = TextInput;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Drop = __webpack_require__(17);

var _Drop2 = _interopRequireDefault(_Drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventInit = {
    init: function init($el) {

        _Drop2.default.init($el);
    }
};

exports.default = EventInit;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Index = __webpack_require__(0);

var _Index2 = _interopRequireDefault(_Index);

var _Index3 = __webpack_require__(1);

var _Index4 = _interopRequireDefault(_Index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropEvent = {
    init: function init($el) {

        var that = this;

        $el.on("mousedown", ".ControlBox .cItem", function (event) {
            that.bindDropEvent({
                $container: $el,
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
                $container: opts.$container,
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

            that.insertControl(type, opts.$container);

            $dropEl.remove();

            $("body").removeClass("noSelected");
        });
    },

    diffInsertPos: function diffInsertPos(StyleObj) {

        var $desiContent = StyleObj.$container.find(".fromDesign"),
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

    insertControl: function insertControl(type, $container) {

        var $insetEl = $("#insetEl");

        if ($insetEl.length > 0) {

            if (!_Index2.default.AllControls[type]) {
                return;
            }

            var Control = _Index2.default.AllControls[type],
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

            _Index4.default.render({ type: type, $el: $container });
        }
    }
};

exports.default = DropEvent;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var PropsDef = {

    title: '<div class="optItem"><input maxlength="50" type="text" class="txtTitle" /></div>',

    hideTitle: '<div class="optItem"><label class="attrLab"><input class="ckHideBox" type="checkbox"> 隐藏标题 </label></div>',

    placeHolder: '<div class="optItem"><input type="text" class="txtPlaceHolder"></div>',

    required: '<div class="optItem"><label class="attrLab"><input class="ckBox" type="checkbox"> 这个是必填项目 </label></div>',

    layout: '<div class="optItem"><label class="attrLab"><input name="setRowCol" checked="true" class="ckLayOut" key="row" type="radio"> 横向 </label>' + '<label class="attrLab"><input key="col" name="setRowCol" class="ckLayOut" type="radio"> 纵向 </label></div>'

};

exports.default = PropsDef;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(21);

var FromDesign = {
    init: function init(Opts) {

        var $el = $('<div class="desiContent"/>');

        $el.append(this.reToDoHtml());

        $el.append('<div class="fromDesign"/>');

        Opts.$el.append($el);
    },
    reToDoHtml: function reToDoHtml() {
        return '<div class="reToDo">' + '<span class="btnReDo empty"><i class="commoniconfont icon-chexiao"></i><span class="text">撤销</span></span>' + ' <span class="btnToDo empty"><i class="commoniconfont icon-huifu1"></i><span class="text">恢复</span></span></div>';
    }
};

exports.default = FromDesign;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var TbOp = {
    rowColSpan: function rowColSpan($tb) {

        if ($tb.find("td.active").length <= 1) {
            return;
        }

        var colspan = 0,
            rowSpan = 0,
            $tr = $tb.find("td.active:first").closest("tr"),
            $trs = $tb.find("td.active").closest("tr"),
            tdDeW = 0;

        $tr.find("td.active").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                colspan += parseInt(tdColspan);
            } else {
                colspan += 1;
            }

            if ($(this).attr("width")) {
                tdDeW += parseInt($(this).attr("width"));
            }
        });

        var aSpanRow = 0,
            tdOffH = $("td.active:last").offset().top + $("td.active:last").height() - $("td.active:first").offset().top;

        $trs.each(function () {
            var tdRowSpan = $(this).find("td.active:first").attr("rowspan");
            if (tdRowSpan && $(this).next().find("td.active").length <= 0) {
                rowSpan += parseInt(tdRowSpan);
            } else {
                rowSpan += 1;
            }
        });

        rowSpan -= aSpanRow;

        if (!$tb.find("tr:first td:first").attr("width")) {
            $tb.find("tr td").each(function () {
                var $this = $(this);
                $this.attr("width", $this.width()).attr("height", $this.height());
            });
        }

        var $firstTd = $tb.find("td.active:first"),
            tdW = $firstTd.width(),
            tdColSpan = parseInt($firstTd.attr("colspan")) || 1;

        if (tdColSpan && !Number.isNaN(tdColSpan)) {
            tdW /= tdColSpan;
        }

        var $firstControl = $tb.find('td.active .fieldItem:first');

        $firstTd.attr("rowspan", rowSpan).attr("colspan", colspan).removeClass("active");

        $tb.find("td.active").remove();

        if ($firstControl.length > 0) {

            $firstTd.html("").append($firstControl);
        }

        tdW *= parseInt(colspan);

        $firstTd.attr("width", tdDeW == 0 && tdW || tdDeW).attr("height", tdOffH);
    },

    getTdPosi: function getTdPosi(tbtdLen, $tb) {

        var _tr = '<tr>';

        for (var j = 0; j < tbtdLen; j++) {
            _tr += '<td></td>';
        }
        _tr += '</tr>';

        $tb.prepend(_tr);

        var $firstTr = $tb.find("tr:first"),
            TdsWidth = [];

        $firstTr.find("td").each(function (i) {

            var $this = $(this);

            TdsWidth.push({
                $td: $this,
                X: $this.offset().left,
                W: $this.width()
            });
        });

        $firstTr.remove();

        return TdsWidth;
    },
    insertTr: function insertTr($tr) {

        if (!$tr) {
            return;
        }

        var $tb = $tr.closest(".tbLayout");

        var tbtdLen = 0,
            trtdLen = 0;

        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        var TdPosi = this.getTdPosi(tbtdLen, $tb),
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
    insertToLast: function insertToLast($fieldItem) {

        var $tr = $("<tr/>"),
            colspan = 0;

        $fieldItem.find("table tr:first td").each(function () {

            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                colspan += parseInt(tdColspan);
            } else {
                colspan += 1;
            }
        });

        for (var i = 0; i < colspan; i++) {
            $tr.append('<td><div class="tdNull"></div></td>');
        }

        $fieldItem.find("table").append($tr);
    },
    deleteTr: function deleteTr($td) {

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
        $("#desiContent").css("overflow", "hidden");

        var $tb = $tr.closest(".tbLayout");

        var tbtdLen = 0,
            trtdLen = 0;

        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        var TdPosi = this.getTdPosi(tbtdLen, $tb),
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
        $("#desiContent").removeAttr("style");
    },
    insertTd: function insertTd($td) {

        if (!$td) {
            return;
        }

        $("#desiContent").css("overflow", "hidden");

        var $tb = $td.closest(".tbLayout"),
            newTdW = this.reDiffTdWidth($tb),
            $newTd = $('<td/>');

        if (newTdW) {
            $newTd.attr("width", newTdW);
        }
        $newTd.append('<div class="default-ele">&nbsp;</div>');
        var tdStr = $('<div/>').append($newTd).html();

        $tb.find("tr").each(function () {
            $(this).append(tdStr);
        });

        var tdOffset = $td.offset(),
            tdLeft = tdOffset.left,
            tdRigth = tdOffset.left + $td.width(),
            breakCount = 0;

        $tb.find("tr").each(function () {

            var $tTr = $(this);

            if (breakCount > 0) {
                $tTr.find("td:last").remove();
                breakCount--;
                return true;
            }

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

        $("#desiContent").removeAttr("style");
    },
    reDiffTdWidth: function reDiffTdWidth($tb) {

        var $fieldItem = $tb.closest(".fieldItem"),
            isFixedW = $tb.find("tr td:first").attr("width");

        if (isFixedW) {

            var colspan = 0,
                fwidth = $fieldItem.width(),
                tbW = 0;

            $fieldItem.find("table tr:first td").each(function () {

                var tdColspan = $(this).attr("colspan");
                tbW += $(this).width();

                if (tdColspan) {
                    colspan += parseInt(tdColspan);
                } else {
                    colspan += 1;
                }
            });

            var nW = Math.floor(fwidth / (colspan + 1));

            $fieldItem.find("table tr td").each(function () {

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
    deleteTd: function deleteTd($td) {

        if (!$td || $td.closest("body").length <= 0) {
            return;
        }

        $("#desiContent").css("overflow", "hidden");

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

            if ($tb.find("tr:first td").length <= 1) {
                $tb.closest(".fieldItem").find(".btnDelField").click();
                return false;
            }

            $tb.find("tr").each(function () {
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

            $.each(cacheOpTds, function () {
                if (this.type == "remove") {
                    self.CellAverage(this.$el);
                    this.$el.remove();
                } else {
                    var newW = this.$el.width() - tw;
                    this.$el.attr("colspan", this.colSpan).attr("width", newW);
                }
            });

            delCol++;
        });

        var $txtCol = $("#controlAttrs .txtCol");
        $txtCol.val(parseInt($txtCol.val()) - delCol);

        $("#desiContent").removeAttr("style");
    },
    CellAverage: function CellAverage($td) {

        var $tds = $td.siblings(),
            nW = $td.width(),
            tbW = $td.parent().width() - nW;

        $tds.each(function () {

            var $this = $(this),
                tW = parseInt($this.attr("width"));

            tW += tW / tbW * nW;

            tW = Math.floor(tW);

            $this.attr("width", tW);
        });
    },
    splitCell: function splitCell($td) {
        var $tb = $td.closest('.tbLayout'),
            tbtdLen = 0,
            thisColspan = $td.attr("colspan");

        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        var TdPosi = this.getTdPosi(tbtdLen, $tb),
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
            firstTd = '<td width="' + TdPosi[index].W + '"><div class="tdNull">&nbsp;</div></td>',
            firstW = TdPosi[index].W;

        index++;

        for (var j = 1; j < thisColspan; j++) {
            strTd += '<td width="' + TdPosi[index].W + '"><div class="tdNull">&nbsp;</div></td>';
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
                $td.attr("width", firstW).attr("colspan", 1);
            }
        } else {
            $td.after(strTd);
            $td.attr("width", firstW).attr("colspan", 1);
        }
    }
};

exports.default = TbOp;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _PropsHtmlDef = __webpack_require__(29);

var _PropsHtmlDef2 = _interopRequireDefault(_PropsHtmlDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextMenu = {
        init: function init($el) {

                var that = this;

                $el.on("contextmenu", ".tbLayout", function (event) {

                        that.insertContextMeun(event, $el);

                        return false;
                });

                $("body").on("click.tbContentMeun", function () {
                        $("#tbContextMenu").remove();
                });
        },
        insertContextMeun: function insertContextMeun(event, $el) {
                $("#tbContextMenu").remove();

                var $contextMenu = $('<div id="tbContextMenu" />');

                $contextMenu.html(_PropsHtmlDef2.default.tb);

                $contextMenu.find(".btnNorMal").addClass("ThemeBgCoolHover");

                $contextMenu.css({ top: event.pageY, left: event.pageX });

                $("body").append($contextMenu);

                this.initContextEvent($contextMenu, $el);
        },
        initContextEvent: function initContextEvent($contextMenu, $el) {

                $contextMenu.on("click", ".btnHandleTable", function () {

                        var type = $(this).attr("type");

                        $el.find(".designProps .optItem .btnHandleTable[type='" + type + "']").click();
                });
        }
};

exports.default = ContextMenu;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var PropsHtmlDef = {

    tb: '<div class="optItem"><span type="mergeCell" class="btnHandleTable btnNorMal">合并单元格</span>' + '<span type="splitCell" class="btnHandleTable btnNorMal">拆分单元格</span>' + '<span type="addRow" class="btnHandleTable addRow btnNorMal">添加行</span>' + '<span type="addColTable" class="btnHandleTable addCol btnNorMal">添加列</span>' + '<span type="delRow" class="btnHandleTable delRow btnNorMal show">删除行</span>' + '<span type="delColTable" class="btnHandleTable delColTable btnNorMal show">删除列</span></div>',

    tbCount: '<div class="optItem"><input class="txtShort txtRow" type="text"><span class="desc">行</span>' + '<span class="gap">×</span><input type="text" class="txtShort txtCol"><span class="desc">列</span>' + '<span type="tbSet" class="btnNorMal primary">确定</span></div>',

    border: '<div class="optItem"> <label class="attrLab"><input class="ckBorder" type="checkbox" />不显示线框</label></div>'
};

exports.default = PropsHtmlDef;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
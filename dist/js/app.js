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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/Form/Css/reset.less
var Css_reset = __webpack_require__(1);
var reset_default = /*#__PURE__*/__webpack_require__.n(Css_reset);

// EXTERNAL MODULE: ./src/Form/NavControls/Css/Index.less
var Index = __webpack_require__(2);
var Index_default = /*#__PURE__*/__webpack_require__.n(Index);

// CONCATENATED MODULE: ./src/Form/NavControls/Events/DropTo.js


var DropEvent = {

    //初始化绑定
    init($el, callback) {

        var that = this;

        //拖拽控件放入
        $el.on("mousedown", ".ControlBox .cItem", function (event) {
            that.bindDropEvent({
                callback: callback,
                $el: $(this),
                elX: event.pageX,
                elY: event.pageY
            });
        });
    },

    //拖拽事件绑定
    bindDropEvent: function (opts) {

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

            //计算插入的位置
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

    //计算插入的位置
    diffInsertPos: function (StyleObj) {

        var $desiContent = StyleObj.$el.closest(".allControls").parent().find(".fromDesign"),
            Offset = $desiContent.offset(),
            cT = Offset.top,
            cX = Offset.left,
            cH = $desiContent.height(),
            cW = $desiContent.width(),
            DH = $("#dropEl").height(),
            that = this,
            insetElHtml = '<div class="fieldItem"  id="insetEl"/>';

        //在 中间
        if (StyleObj.top + DH > cT && StyleObj.top < cT + cH && StyleObj.left > cX && StyleObj.left < cX + cW) {

            var $fieldItem = $desiContent.find(".fieldItem");

            //空 没有元素
            if ($fieldItem.length <= 0) {

                if ($("#insetEl").length <= 0) {
                    $desiContent.append(insetElHtml);
                }
            } else {

                var isFind = false;
                //上面下面
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

                    //在该元素内
                    if (StyleObj.top > cT && StyleObj.top < cT + cH) {

                        isFind = true;

                        if ($this.attr("id") == "insetEl") {
                            return false;
                        }

                        //表格
                        if ($this.find("table").length > 0 && StyleObj.type != "Table" && StyleObj.type != "DataTable") {

                            var $prev = $this.prev();

                            if ($prev.length > 0) {

                                var type = $prev.attr("type");
                                if (type = "Table" || type == "DataTable") {
                                    cT += 10;
                                }
                            }

                            //底部了
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

                                    //数据表格
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

                        //下部分
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

    //放入控件
    insertControl(type, callback) {

        var $insetEl = $("#insetEl");
        //可以插入
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

                //默认输入
                if ($td.find(".fieldItem.textInput").length >= 1) {
                    $td.find(".fieldItem").remove();
                }

                if ($td.find(".fieldItem").length > 0) {
                    $dropEl.remove();
                    return;
                }

                //没有width
                if (!$td.attr("width")) {
                    //设置宽度
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

                //计算浮动宽度
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

            DesignProps.render({ type, $el: $container });
        }
    }

};

/* harmony default export */ var DropTo = (DropEvent);
// CONCATENATED MODULE: ./src/Form/NavControls/Index.js





var Index_Libs = {

    init() {
        this.render();
    },

    render() {

        var html = this.genTab();

        //生成页面
        this.$$root.$el.prepend(html);

        //事件初始化
        this.initEvent();
    },

    //事件初始化
    initEvent() {

        var $allControls = this.$$root.find(".allControls");

        //拖拽
        DropTo.init($allControls, type => {
            this.insetControl(type);
        });

        //切换
        $allControls.on("click", ".tabControl .item", function () {

            var $this = $(this),
                type = $this.attr("type");

            $this.addClass("ThemeBorderColorLightSelected").siblings().removeClass("ThemeBorderColorLightSelected");

            $allControls.find(".ControlBox").hide().end().find("." + type + "ControlBox").show();
        });
    },

    //控件插入
    insetControl(type) {

        var $$root = this.$$root,
            InsControl = $$root.AllControls.getControlByType(type);

        if (InsControl) {
            //插入元素 移除 红框
            var $insetEl = $$root.Settings.$el.find("#insetEl");
            InsControl.$$root = $$root;

            var _controlHtml = InsControl.render();
            _controlHtml.addClass("selected");
            $insetEl.after(_controlHtml);

            //渲染属性
            InsControl.renderProps();

            $insetEl.remove();
        }
    },

    //切换控件
    genTab(Options) {

        var AllControls = this.$$root.AllControls.Controls,
            defaultTab = this.$$root.Settings.defaultTab || "LayOut",
            $allControls = $('<div class="allControls"/>'),
            $controlTab = $('<ul class="tabControl" />');

        for (var key in AllControls) {
            $controlTab.append('<li type="' + key + '" class="item">' + AllControls[key].metaInfo.title + '</li>');
            $allControls.append(this.genControl(key, AllControls[key].Controls));
        }

        $allControls.prepend($controlTab);

        //默认选中第一个
        $allControls.find("." + defaultTab + "ControlBox").show();
        $allControls.find(".tabControl .item[type=" + defaultTab + "]").addClass("ThemeBorderColorLightSelected");

        return $allControls;
    },

    //渲染控件
    genControl(type, Controls) {

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

/* harmony default export */ var NavControls_Index = (Index_Libs);
// EXTERNAL MODULE: ./src/Form/Controls/LayOut/Table/Css/Index.less
var Css_Index = __webpack_require__(3);
var Css_Index_default = /*#__PURE__*/__webpack_require__.n(Css_Index);

// CONCATENATED MODULE: ./src/Form/Controls/Base/AttrHtml.js


var AttrHtml = {

    //标题
    title: '<div class="optItem"><input maxlength="50" type="text" class="txtTitle" /></div>',

    //隐藏标题
    hideTitle: '<div class="optItem"><label class="attrLab"><input class="ckHideBox" type="checkbox"> 隐藏标题 </label></div>',

    //输入提示
    placeHolder: '<div class="optItem"><input type="text" class="txtPlaceHolder"></div>',

    //是否必填
    required: '<div class="optItem"><label class="attrLab"><input class="ckBox" type="checkbox"> 这个是必填项目 </label></div>',

    layout: '<div class="optItem"><label class="attrLab"><input name="setRowCol" checked="true" class="ckLayOut" key="row" type="radio"> 横向 </label>' + '<label class="attrLab"><input key="col" name="setRowCol" class="ckLayOut" type="radio"> 纵向 </label></div>'

};

/* harmony default export */ var Base_AttrHtml = (AttrHtml);
// CONCATENATED MODULE: ./src/Form/Controls/Base/Index.js



var BaseControl = {

        //生成分组
        genGroup(groupItem) {

                var $groupItem = $('<div class="attrItem" />');

                if (groupItem.className) {
                        $groupItem.addClass(groupItem.className);
                }

                if (groupItem.title) {
                        $groupItem.append('<div class="attrTitle">' + groupItem.title + '</div>');
                }

                return $groupItem;
        },

        //生成title
        genTitle() {

                //html
                var $title = $(Base_AttrHtml.title);

                //事件
                $title.on("keyup", function () {});

                return $title;
        },

        //生成隐藏标题
        genHideTitle() {

                var $hideTitle = $(Base_AttrHtml.hideTitle);

                //事件
                $hideTitle.on("keyup", function () {});

                return $hideTitle;
        },

        //生成输入框提示
        genplaceHolder() {

                var $placeHolder = $(Base_AttrHtml.placeHolder);

                //事件
                $placeHolder.on("keyup", function () {});

                return $placeHolder;
        }

};

/* harmony default export */ var Base_Index = (BaseControl);
// EXTERNAL MODULE: ./src/Form/Js/autosize.js
var autosize = __webpack_require__(4);
var autosize_default = /*#__PURE__*/__webpack_require__.n(autosize);

// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Props/DefHtml.js


var DefHtml_AttrHtml = {

    colRow: '<div class="optItem"><input class="txtShort txtRow" type="text"><span class="desc">行</span>' + '<span class="gap">×</span><input type="text" class="txtShort txtCol"><span class="desc">列</span>' + '<span type="tbSet" class="btnNorMal primary">确定</span></div>'

};

/* harmony default export */ var DefHtml = (DefHtml_AttrHtml);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Props/Index.js


var Props = {

          //设置行列
          setColRow() {

                    //html
                    var $colRow = $(DefHtml.colRow);

                    //事件
                    $colRow.on("keyup", function () {});

                    return $colRow;
          }

};

/* harmony default export */ var Props_Index = (Props);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Index.js








var TableControl = {

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格"
    },

    //默认绘制表格数据
    defaultData() {

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

    //渲染
    render: function (data) {

        if (!data) {
            data = Object.create(this.defaultData());
        }

        var $fieldItem = $('<div class="fieldItem" /> ');

        //渲染列
        this.renderCell($fieldItem, data);

        autosize_default()($fieldItem.find(".txtInput"));

        return $fieldItem;
    },

    //获取textInput
    getTextInput() {},

    //渲染列
    renderCell($fieldItem, data) {

        var $tb = $('<table class="tbLayout" />'),
            $$root = this.$$root;

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

                $tb.append($tr);
            });
        }

        $fieldItem.append($tb);
    },

    //渲染属性
    renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        var $group = this.genGroup({
            className: "setRowCol",
            title: "行列数"
        });

        $group.append(Props_Index.setColRow());

        $setProps.append($group);
    },

    //销毁
    destroy() {}

};

Object.setPrototypeOf(TableControl, Base_Index);

/* harmony default export */ var Table_Index = (TableControl);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Index.js



var LayOut = {

    metaInfo: {
        title: "布局"
    },

    Controls: [Table_Index],

    addControl(control) {
        this.Controls.push(control);
    }
};

/* harmony default export */ var LayOut_Index = (LayOut);
// EXTERNAL MODULE: ./src/Form/Controls/Basics/TextInput/Css/Index.less
var TextInput_Css_Index = __webpack_require__(5);
var TextInput_Css_Index_default = /*#__PURE__*/__webpack_require__.n(TextInput_Css_Index);

// CONCATENATED MODULE: ./src/Form/Controls/Basics/TextInput/Index.js


var TextInput = {

    defaultData() {

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

    render(data) {

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

    parse() {}

};

/* harmony default export */ var TextInput_Index = (TextInput);
// CONCATENATED MODULE: ./src/Form/Controls/Basics/Index.js



var Basics = {

    metaInfo: {
        title: "控件"
    },

    Controls: [TextInput_Index],

    addControl(control) {
        this.Controls.push(control);
    }
};

/* harmony default export */ var Basics_Index = (Basics);
// CONCATENATED MODULE: ./src/Form/Controls/Index.js




var AllControls = {

    getControlByType(type) {

        var InsControl = false;

        //查找控件 
        $.each(Basics_Index.Controls, function (i, item) {
            //找到了
            if (item.metaInfo.type == type) {
                InsControl = item;
                return false;
            }
        });

        if (InsControl) {
            return InsControl;
        }

        //查找控件 
        $.each(LayOut_Index.Controls, function (i, item) {
            //找到了
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

        Basics: Basics_Index,

        LayOut: LayOut_Index
    }

};

/* harmony default export */ var Controls_Index = (AllControls);
// CONCATENATED MODULE: ./src/Form/Content/defTpl.js
var Tpl = {

    toDo: '<div class="reToDo">' + '<span class="btnReDo empty"><i class="commoniconfont icon-chexiao"></i><span class="text">撤销</span></span>' + ' <span class="btnToDo empty"><i class="commoniconfont icon-huifu1"></i><span class="text">恢复</span></span></div>'

};

/* harmony default export */ var defTpl = (Tpl);
// EXTERNAL MODULE: ./src/Form/Content/Css/Index.less
var Content_Css_Index = __webpack_require__(6);
var Content_Css_Index_default = /*#__PURE__*/__webpack_require__.n(Content_Css_Index);

// CONCATENATED MODULE: ./src/Form/Content/Index.js





var DesiContent = {

        //初始化
        init() {

                var $el = $('<div class="desiContent"/>');

                $el.append(defTpl.toDo);

                $el.append('<div class="fromDesign"/>');

                this.$$root.$el.append($el);
        }

};

/* harmony default export */ var Content_Index = (DesiContent);
// EXTERNAL MODULE: ./src/Form/Props/Css/Index.less
var Props_Css_Index = __webpack_require__(7);
var Props_Css_Index_default = /*#__PURE__*/__webpack_require__.n(Props_Css_Index);

// CONCATENATED MODULE: ./src/Form/Props/Index.js



var PropsDesign = {

    //初始化
    init(Opts) {

        var $el = $('<div class="designProps"/>');

        $el.append('<ul class="tabAttrs"><li class="item">控件设置</li></ul>');

        $el.append('<div class="setProps"></div>');

        Opts.$el.append($el);
    },

    render(opts) {

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

/* harmony default export */ var Form_Props_Index = (PropsDesign);
// CONCATENATED MODULE: ./src/Form/Index.js








function FormDesi(params) {

    if (!this instanceof FormDesi) {
        return new FormDesi(params);
    }

    var defaults = {
        $el: $("body")
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

FormDesi.prototype.NavControls = NavControls_Index;

FormDesi.prototype.AllControls = Controls_Index;

FormDesi.prototype.DesiContent = Content_Index;

FormDesi.prototype.DesiProps = Form_Props_Index;

window.FormDesi = FormDesi;

/* harmony default export */ var Form_Index = __webpack_exports__["default"] = (FormDesi);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	autosize 4.0.2
	license: MIT
	http://www.jacklmoore.com/autosize
*/
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
})(this, function (module, exports) {
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
		// IE does not support `new Event()`
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
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
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
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				return;
			}

			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.minHeight = '';
			ta.style.minHeight = ta.scrollHeight + heightOffset + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
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

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that 
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight < styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
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
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
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

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
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

	// Do nothing in Node.js environment and IE8 (or lower)
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
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
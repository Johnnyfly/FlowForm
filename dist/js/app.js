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

    colRow: '<div class="optItem"><input class="txtShort txtRow" type="text"><span class="desc">行</span>' + '<span class="gap">×</span><input type="text" class="txtShort txtCol"><span class="desc">列</span>' + '<span type="tbSet" class="btnNorMal ThemeBorderColorLightHover ThemeColorLightHover btnSet">设定</span>' + '<span type="tbSet" op="reset" class="btnNorMal ThemeBorderColorLightHover ThemeColorLightHover btnSet">重置</span></div>',

    tbSet: '<div class="optItem"><span type="rowcolspan" class="btnHandleMal btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">合并单元格</span>' + '<span type="splitCell" class="btnHandleMal btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">拆分单元格</span>' + '<span type="addRow" class="btnHandleMal addRow btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">添加行</span>' + '<span type="addColTable" class="btnHandleMal addCol btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">添加列</span>' + '<span type="delRow" class="btnHandleMal delRow btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">删除行</span>' + '<span type="delColTable" class="btnHandleMal delColTable btnNorMal ThemeBorderColorLightHover ThemeColorLightHover">删除列</span></div>'

};

/* harmony default export */ var DefHtml = (DefHtml_AttrHtml);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Props/CellOp.js
var CellOp = {

    //合并行
    rowColSpan: function ($tb) {

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

        var aSpanRow = 0;
        $trs.each(function () {
            var tdRowSpan = $(this).find("td.active:first").attr("rowspan");
            if (tdRowSpan && $(this).next().find("td.active").length <= 0) {
                rowSpan += parseInt(tdRowSpan);
            } else {
                rowSpan += 1;
            }
        });
        //合并行 两行合并 只合并了前两列 会多出一行 因为遍历的是tr所以需要去掉
        rowSpan -= aSpanRow;

        var $firstTd = $tb.find("td.active:first");

        $firstTd.attr("rowspan", rowSpan).attr("colspan", colspan).removeClass("active");

        $tb.find("td.active").remove();

        //Comm.diffElementFixedW($fieldItem); 
    },

    /**********************************************************  添加行 *******************************************************/
    //获取td 的位置
    getTdPosi(tbtdLen, $tb) {

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

    //插入tr
    insertTr($tr) {

        if (!$tr) {
            return;
        }

        var $tb = $tr.closest(".tbLayout");

        //插入后处理
        var tbtdLen = 0,
            trtdLen = 0;

        //表格td 的 个数
        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        //每个td的位置
        var TdPosi = this.getTdPosi(tbtdLen, $tb),
            DefectIndex = [],
            tdCol = 0;

        //当前tr td 的个数 如果一样 不需要处理 不一样 需要递归向上处理
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

        //清除数据
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

        //td 中不止一个元素
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

        //么有合并不用处理
        if (trtdLen == tbtdLen) {
            return;
        }

        //DefectIndex 缺失行的索引 
        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                //纯在合并行
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
                    //如果刚好是缺失的行 行加一  跳出
                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            $this.attr("rowspan", parseInt(tdRowSpan) + 1);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    //如果缺失的行还有 colspan
                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);
                        }
                    }
                }

                //么有了跳出
                if (DefectIndex.length <= 0) {
                    return false;
                }
            });

            if (DefectIndex.length <= 0) {
                return false;
            }
        });
    },

    //插入最后
    insertToLast($fieldItem) {

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

    /**********************************************************  添加行 end *******************************************************/

    deleteTr($td) {

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

    //删除行
    commDeleteTr($tr) {

        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        var $tb = $tr.closest(".tbLayout");

        //插入后处理
        var tbtdLen = 0,
            trtdLen = 0;

        //表格td 的 个数
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

        //当前tr td 的个数 如果一样 不需要处理 不一样 需要递归向上处理
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

        //后门还有合并的行
        if (tdCol < TdPosi.length) {
            for (var de = tdCol; de < TdPosi.length; de++) {
                DefectIndex.push(de);
            }
        }

        //td 中不止一个元素
        if ($tr.find("td").length > 0) {

            $tr.find("td").each(function (i) {

                //当前有合并的行需要处理
                var $this = $(this),
                    tdRowSpan = $this.attr("rowspan");

                //当前有合并想  合并的行需要移除
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
        // $tr.remove();


        //么有合并不用处理
        if (trtdLen == tbtdLen) {
            $tr.remove();
            $("#desiContent").removeAttr("style");
            return;
        }

        var $diffRowTr = [];

        //DefectIndex 缺失行的索引 
        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                //纯在合并行
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
                    //如果刚好是缺失的行 行加一  跳出
                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            //$this.attr("rowspan", parseInt(tdRowSpan) - 1); 
                            $diffRowTr.push($this);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    //如果缺失的行还有 colspan
                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);
                        }
                    }
                }

                //么有了跳出
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

    /***********************************************************  行操作 end  ***************************************************************/

    /***********************************************************  列操作 end  ***************************************************************/

    insertTd($td) {

        if (!$td) {
            return;
        }

        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        // 实现原理 先 追加到 最后，然后重新计算位置
        var $tb = $td.closest(".tbLayout"),
            newTdW = this.reDiffTdWidth($tb),
            $newTd = $('<td/>');
        //新的td
        //td 有宽度
        if (newTdW) {
            $newTd.attr("width", newTdW);
        }
        $newTd.append('<div class="default-ele">&nbsp;</div>');
        var tdStr = $('<div/>').append($newTd).html();

        //追加到最后
        $tb.find("tr").each(function () {
            $(this).append(tdStr);
        });

        //插入后处理
        var tdOffset = $td.offset(),
            tdLeft = tdOffset.left,
            tdRigth = tdOffset.left + $td.width(),
            breakCount = 0;

        $tb.find("tr").each(function () {

            var $tTr = $(this);

            //跳过  
            if (breakCount > 0) {
                $tTr.find("td:last").remove();
                breakCount--;
                return true;
            }

            //遍历没有td 找到 相同位置上的元素
            $tTr.find("td").each(function () {

                var $eTd = $(this),
                    Eoffset = $eTd.offset();

                //找到了
                if (Eoffset.left <= tdLeft && Eoffset.left + $eTd.width() >= tdRigth) {

                    var thisColspan = $eTd.attr("colspan");

                    if (thisColspan && thisColspan > 1) {

                        var newColspan = parseInt(thisColspan) + 1,
                            thisRowSpan = $eTd.attr("rowspan");
                        //合并单元格的行
                        if (thisRowSpan && thisRowSpan > 1) {
                            //减去当前 这一行
                            breakCount = parseInt(thisRowSpan) - 1;
                        }

                        $eTd.attr("colspan", newColspan);
                    } else {
                        $eTd.after(tdStr);
                    }

                    //移除最后一个 是我们自己添加的占位符
                    $tTr.find("td:last").remove();
                    //下一行
                    return false;
                }
            });
        });

        $("#desiContent").removeAttr("style");
    },

    //重新计算td的宽度
    reDiffTdWidth($tb) {

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

            //添加一列后的宽度 默认 平分的宽度
            var nW = Math.floor(fwidth / (colspan + 1));

            //重新计算td 的宽度  按比例 减去 宽度
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

        //没有计算
        return false;
    },

    //删除表格列
    deleteTd($td) {

        if (!$td || $td.closest("body").length <= 0) {
            return;
        }

        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        //实现思路 存在 合并单元格的 处理太复杂 所以 如果有存在合并的 就拆分掉 在 循环遍历处理  一次只删除一个单元格

        var $tb = $td.closest(".tbLayout"),
            tdColspan = $td.attr("colspan"),
            tdRowSpan = $td.attr("rowspan"),
            $tdArr = [];

        //合并单元格的 td
        if (tdColspan && tdColspan > 1 || tdRowSpan && tdRowSpan > 1) {

            //拆分单元格
            this.splitCell($td);
            //动态加载出来的td个数
            var count = parseInt(tdColspan);

            if (count > 0) {
                //所有需要删除的td
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

            //缓存td的操作 避免 即时操作 表格变形
            cacheOpTds = [];

            //保留一列 不让删除
            if ($tb.find("tr:first td").length <= 1) {
                $tb.closest(".fieldItem").find(".btnDelField").click();
                return false;
            }

            $tb.find("tr").each(function () {

                //遍历没有td 找到 相同位置上的元素
                $(this).find("td").each(function () {

                    var $eTd = $(this),
                        Eoffset = $eTd.offset();

                    //找到了
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
                        //下一行
                        return false;
                    }
                });
            });

            //进行真实的操作 没一列 进行一次操作
            $.each(cacheOpTds, function () {
                if (this.type == "remove") {
                    //平均分列宽
                    self.CellAverage(this.$el);
                    this.$el.remove();
                } else {

                    //减去删除的宽度
                    var newW = this.$el.width() - tw;
                    this.$el.attr("colspan", this.colSpan).attr("width", newW);
                }
            });

            delCol++;
        });

        var $txtCol = $("#controlAttrs .txtCol");
        $txtCol.val(parseInt($txtCol.val()) - delCol);

        //清除滚动条
        $("#desiContent").removeAttr("style");
    },

    //平均分移除td的宽度
    CellAverage($td) {

        var $tds = $td.siblings(),
            nW = $td.width(),
            tbW = $td.parent().width() - nW;

        //重新计算td 的宽度  按比例 减去 宽度
        $tds.each(function () {

            var $this = $(this),
                tW = parseInt($this.attr("width"));

            tW += tW / tbW * nW;

            tW = Math.floor(tW);

            $this.attr("width", tW);
        });
    },

    //拆分单元格
    splitCell($td) {

        //td 总行数
        var $tb = $td.closest('.tbLayout'),
            tbtdLen = 0,
            thisColspan = $td.attr("colspan");

        //表格td 的 个数
        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        //每个td的位置
        var TdPosi = this.getTdPosi(tbtdLen, $tb),
            tdOffset = $td.offset(),
            tdRowSpan = $td.attr("rowspan"),
            index = 0;

        $.each(TdPosi, function (i, item) {
            //找到了
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

            //所有需要处理的tr
            var $tr = $td.parent(),
                $trArr = [];

            for (var k = 1; k < tdRowSpan; k++) {

                if ($trArr.length > 0) {
                    $trArr.push($trArr[k - 2].next());
                } else {
                    $trArr.push($tr.next());
                }
            }

            //反转 从最后一个开始处理
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

                        //找到 或者 最后 加到最后 因为合并单元格在最后
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

            //当合并 列 大于一的时候 才对原始td进行colspan操作
            if (thisColspan > 1) {
                //原本的td处理
                $td.after(strTd);
                $td.attr("width", firstW).attr("colspan", 1);
            }
        } else {
            $td.after(strTd);
            $td.attr("width", firstW).attr("colspan", 1);
        }
    }

};

/* harmony default export */ var Props_CellOp = (CellOp);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Props/Index.js



var Props = {

    //设置行列
    setColRow($fieldItem) {

        //html
        var $colRow = $(DefHtml.colRow),
            col = $fieldItem.find("th").length,
            row = $fieldItem.find("tbody tr").length;

        $colRow.find(".txtRow").val(row);
        $colRow.find(".txtCol").val(col);

        var that = this;

        //确定
        $colRow.on("click", ".btnSet", function () {

            var newRow = parseInt($colRow.find(".txtRow").val()),
                newCol = parseInt($colRow.find(".txtCol").val());

            //输入有误
            if (!newRow || !newCol) {
                col = $fieldItem.find("th").length, row = $fieldItem.find("tbody tr").length;
                $colRow.find(".txtRow").val(row);
                $colRow.find(".txtCol").val(col);
                return;
            }

            var $oldFieldItem = $fieldItem.find(".fieldItem"),
                $newEl = that.render(newRow, newCol);

            $fieldItem.find(".tbLayout").html($newEl.find(".tbLayout").html());

            var op = $(this).attr("op");

            //不是重置 恢复数据
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

    //表格设置
    tbSet($fieldItem) {

        var $tbSet = $(DefHtml.tbSet);

        //操作
        $tbSet.on("click", ".btnNorMal", function () {

            var type = $(this).attr("type");
            if (type == "rowcolspan") {
                Props_CellOp.rowColSpan($fieldItem.find(".tbLayout"));
            }
        });

        return $tbSet;
    }

};

/* harmony default export */ var Props_Index = (Props);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Events/DropTo.js
var DropTo_DropTo = {

    //入口
    init($tb) {

        var that = this;

        //hover 显示resize
        $tb.on("mousemove", "th", function (event) {

            var $this = $(this),
                $tb = $this.closest(".tbLayout");

            $tb.find(".ewResize").removeClass("ewResize");

            that.tdCellWidth($this, event);

            return;
        });

        //td 选中
        $tb.on("mousedown", "th.ewResize", function (event) {
            that.tdMoveChangeCellWidth($(this), event);
        });

        //td 框选
        $tb.on("mousedown", "td", function (event) {

            that.bindSelectionTdEvent({
                initX: event.pageX,
                initY: event.pageY,
                $table: $(this).closest("table")
            });
        });
    },

    //拖动列宽
    tdCellWidth($el, event) {

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

    //拖拽改变大小
    tdMoveChangeCellWidth($el, event) {

        //没有合并过
        if (!$el.attr("width")) {

            //设置宽度
            $el.closest(".tbLayout").find("th").each(function () {
                var $this = $(this);
                $this.attr("width", $this.width());
            });
        }

        var {
            pageX: sourceX
        } = event,
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

                //宽度小于1  不用处理
                if (nextW < 2 || elW < 2) {
                    return false;
                }

                $el.next().width(nextW);
                $el.width(elW);

                //that.setTdWidth(tdArr);
            } else {

                var newW = sourceW - diffX,
                    diffTdW = newW - parseInt($el.attr("width"));

                if (newW < 1) {
                    return;
                }

                var prevW = parseInt($el.prev().attr("width")) - diffTdW,
                    elW = parseInt($el.attr("width")) + diffTdW;

                //宽度小于1  不用处理
                if (prevW < 2 || elW < 2) {
                    tdArr = [];
                    return false;
                }

                $el.prev().width(prevW);
                $el.width(elW);
                //that.setTdWidth(tdArr);
            }

            return false;
        });

        $(window).on("mouseup.ewResize", function () {
            $(window).off("mousemove.ewResize");
            $(window).off("mouseup.ewResize");
            $(".tbLayout .ewResize").removeClass("ewResize");
        });
    },

    //绑定td合并前的选中
    bindSelectionTdEvent: function (initPoint) {

        $("body").addClass("noSelected");

        //initPoint  初始化 位置 
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

            //计算
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

    //计算选中的td
    diffSelectionTd: function (styleObj, $table) {

        var that = this;
        //遍历所有的td  
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

                //横向
                if ($td.attr("colspan")) {
                    var newRight = cX + cW;
                    if (newRight > styleObj.left + styleObj.width) {

                        styleObj.width = newRight - styleObj.left;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    } else if (cX < styleObj.left) {

                        styleObj.width = styleObj.left + styleObj.width - cX - 1;
                        //因为是小于 所以要去掉一
                        styleObj.left = cX - 1;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    }
                }

                //纵向
                if ($td.attr("rowspan")) {

                    var newBottom = cY + cH;

                    if (newBottom > styleObj.top + styleObj.height) {

                        styleObj.height = newBottom - styleObj.top;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    }
                }
            } else {
                $td.removeClass("active");
            }
        });
    }

};

/* harmony default export */ var Events_DropTo = (DropTo_DropTo);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Events/Index.js


var Events = {
  DropTo: Events_DropTo
};

/* harmony default export */ var Events_Index = (Events);
// CONCATENATED MODULE: ./src/Form/Controls/LayOut/Table/Index.js









var TableControl = {

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格"
    },

    PrivateProps: Props_Index,

    //默认绘制表格数据
    defaultData(rowLen, cellLen) {

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

    //渲染
    render: function (data) {

        if (!data || arguments.length > 1) {
            var deData = this.defaultData.apply(this, arguments);
            data = Object.create(deData);
        }

        var $fieldItem = $('<div class="fieldItem" /> ');

        //渲染列
        this.renderCell($fieldItem, data);

        //自动到不 textinput
        autosize_default()($fieldItem.find(".txtInput"));

        //设计模式
        if (this.$$root.Settings.mode == "desi") {
            //拖拽改变宽度
            Events_Index.DropTo.init($fieldItem);
        }

        return $fieldItem;
    },

    //渲染列
    renderCell($fieldItem, data) {

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

                $tb.find("thead").append($tr);
            });
        }

        $fieldItem.append($tb);
    },

    //渲染属性
    renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        //清空
        $setProps.empty();

        //行列数
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
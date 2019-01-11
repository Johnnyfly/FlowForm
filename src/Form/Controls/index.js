

import Libs from "./Libs/Index"
import "./Css/Index.less";
import "./Css/iconfont/iconfont.css";

import Events from "./Js/Events/Index"

//初始化
var Controls = {

    //渲染组件
    render(opts) {

        var defaults = {
            renderType: ['Base', 'LayOut', 'MixControl'],
            showDefault: Libs.ControlType.LayOut,
            $el: $("body")
        }

        var Options = $.extend(defaults, opts); 

        this.renderTab(Options);

        var $el = Options.$el;

        if (Options.$desiEl) {
            $el = Options.$desiEl;
        }

        //事件初始化
        Events.init($el);

    },

    //切换控件
    renderTab(Options) {

        var renderType = Options.renderType,
            $allControls = $('<div class="allControls"/>');

        //一个的时候直接显示 不用处理
        if (renderType && renderType.length > 1) {

            var $controlTab = $('<ul class="tabControl" />'),
                ControlType = Libs.ControlType;

            //基础
            if (renderType.indexOf(ControlType.Base) > -1) {
                $controlTab.append('<li type="' + ControlType.Base + '" class="item ThemeBorderColorLightSelected">控件</li>');
                $allControls.append(this.renderControl(ControlType.Base, Options.$el));
            }

            //套件
            if (renderType.indexOf(ControlType.MixControl) > -1) {
                $controlTab.append('<li type="' + ControlType.MixControl + '" class="item ThemeBorderColorLightSelected">套件</li>');
                $allControls.append(this.renderControl(ControlType.MixControl, Options.$el));

            }

            //布局
            if (renderType.indexOf(ControlType.LayOut) > -1) {
                $controlTab.append('<li type="' + ControlType.LayOut + '" class="item ThemeBorderColorLightSelected">布局</li>');
                $allControls.append(this.renderControl(ControlType.LayOut, Options.$el));
            }

        }

        $allControls.prepend($controlTab);

        Options.$el.append($allControls);

        var $defaultShow = Options.$el.find("." + Options.showDefault + "ControlBox");

        //显示
        if ($defaultShow.length <= 0) {
            Options.$el.find(".ControlBox:first").show();
        } else {
            $defaultShow.show();
        }

        //tab 选中
        var $selTab = Options.$el.find(".tabControl .item[type='" + Options.showDefault + "']");

        if ($selTab.length > 0) {
            $selTab.addClass("selected");
        } else {
            Options.$el.find(".tabControl .item:first").addClass("selected");
        }

    },

    //渲染控件
    renderControl(type,$el) {

        var Controls = Libs[type],
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

            //事件初始化 一次
            item.initEvent && item.initEvent($el);

        });

        return $controlBox;
    }

}

export default Controls;
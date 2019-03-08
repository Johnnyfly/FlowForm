
import "./Css/Index.less";

import DropTo from "./Events/DropTo.js"

var Libs = {

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
        DropTo.init($allControls, (type) => {
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
            var $insetEl =  $$root.Settings.$el.find("#insetEl");
            InsControl.$$root = $$root;
            
            $insetEl.closest(".fromDesign").find(".fieldItem").removeClass("selected");
             
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

            if(item.metaInfo.show == false){
                return true;
            }

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
}

export default Libs;
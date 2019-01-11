

import PropsHtmlDef from "../Js/PropsHtmlDef"

var ContextMenu = {

    init($el) {

        var that = this;
        //右键菜单
        $el.on("contextmenu", ".tbLayout", function (event) {

            that.insertContextMeun(event, $el);

            return false;

        });

        

   
        $("body").on("click.tbContentMeun", function () {
            $("#tbContextMenu").remove();
        });

    },

    //插入元素
    insertContextMeun(event, $el) {

        //移除上一个
        $("#tbContextMenu").remove();

        var $contextMenu = $('<div id="tbContextMenu" />');

        $contextMenu.html(PropsHtmlDef.tb);

        $contextMenu.find(".btnNorMal").addClass("ThemeBgCoolHover");

        $contextMenu.css({ top: event.pageY, left: event.pageX });

        $("body").append($contextMenu);

        //每次都是新的所有要冲绑定书剑
        this.initContextEvent($contextMenu, $el);

    }, 

    //事件绑定
    initContextEvent($contextMenu, $el) {

        $contextMenu.on("click", ".btnHandleTable", function () {

            var type = $(this).attr("type");
            //委托处理
            $el.find(".designProps .optItem .btnHandleTable[type='" + type + "']").click();

        });
    }


}


export default ContextMenu;
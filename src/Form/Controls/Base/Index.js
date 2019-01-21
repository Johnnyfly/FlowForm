
import AttrHtml from "./AttrHtml"

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
        var $title = $(AttrHtml.title);

        //事件
        $title.on("keyup", function () {

        });

        return $title;
    },

    //生成隐藏标题
    genHideTitle() {

        var $hideTitle = $(AttrHtml.hideTitle);

        //事件
        $hideTitle.on("keyup", function () {

        });

        return $hideTitle;
    },

    //生成输入框提示
    genplaceHolder() {

        var $placeHolder = $(AttrHtml.placeHolder);

        //事件
        $placeHolder.on("keyup", function () {

        });

        return $placeHolder;
    }


}

export default BaseControl;
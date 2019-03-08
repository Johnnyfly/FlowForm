import "./Css/Index.less"
import BaseControl from "../../Base/Index"
import PrivateProps from "./Props/Index"

var LabelControl = {

    defaultData() {

        return {

            type: "Label",

            id: "Label_" + (+new Date()),

            Settings: {
                fontSize: 16
            },

            values: ['Label']
        }
    },

    metaInfo: {
        type: "Label",
        name: "文字",
        iconClass: "zppicon-wenzi"
       
    },



    render(data) {

        if (!data) {
            data = this.defaultData();
        }

        var $fieldItem = $('<div class="fieldItem" />'),
            $labelBox = $('<div class="LabelText" />');


        $fieldItem.attr("id", data.id).attr("type", data.type);

        if (data.values[0]) {
            $labelBox.text(data.values[0]);
        }

        $labelBox.css("fontSize", data.Settings.fontSize);

        $fieldItem.append($labelBox);

        return $fieldItem;

    },

    parse() {

    }, 

    renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        //清空
        $setProps.empty();

        //行列数
        var $group = this.genGroup({
            className: "setFontSize",
            //title: "字体大小"
        });
        $group.append(PrivateProps.fontSize.call(this, $fieldItem));

        $setProps.append($group);
    }


}

Object.setPrototypeOf(LabelControl, BaseControl);

export default LabelControl;
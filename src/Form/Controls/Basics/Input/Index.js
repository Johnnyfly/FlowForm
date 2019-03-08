import "./Css/Index.less"
import BaseControl from "../../Base/Index"

var InputControl = {
 
    defaultData() {

        return {

            type: "Input",

            id: "Input_" + (+new Date()),

            Settings: {
                placeHolder: '请输入'
            },

            values: ['']
        }
    },

    metaInfo: {
        type: "Input",
        name: "文本输入框",
        iconClass: "zppicon-wenbenshurukuang" 
    },



    render(data) {

        if (!data) {
            data = this.defaultData();
        }

        var $fieldItem = $('<div class="fieldItem" />'),
            $lTitle = $('<span class="lTitle">文本输入框</span>'),
            $inputBox = $('<div class="inputBox"><textarea class="txtInput"></textarea></div>');


        $fieldItem.attr("id", data.id).attr("type", data.type);

        if (data.values[0]) {
            $inputBox.val(data.values[0]);
        } 

        $fieldItem.append($lTitle);
        $fieldItem.append($inputBox);

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
        //$group.append(PrivateProps.fontSize.call(this, $fieldItem));

        $setProps.append($group);
    }

}


Object.setPrototypeOf(InputControl, BaseControl);

export default InputControl;



import "./Css/Index.less"


var TextInput = {

    defaultData() {

        return {

            type: "TextInput",

            id: "TextInput_" + (+new Date()),

            Settings: {
                placeHolderText: ""
            },

            values: []
        }
    },

    metaInfo: {
        type: "TextInput",
        name: "文本输入框",
        iconClass: "icon-wenbenshurukuang",
        attrs: {
            maxLen: 200,
            minLen: false,
            placeHolderText: true,
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

    parse() {

    },

    renderProps(){
        
    }


}

export default TextInput;
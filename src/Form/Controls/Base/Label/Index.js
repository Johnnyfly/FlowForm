


//显示文字
var LabelControl = {

    defaultData() {
        return {
            type: "Label",
            id: "Label_" + (+new Date()),
            html: "描述文字",
            value: ["描述文字"]
        }

    },

    //基础配置
    metaInfo: {
        type: "Label",
        name: "描述文字",
        iconClass: "icon-wenzi",
        attrs: {
            Text: "描述文字",
            FullEdit: true
        }
    },

    //方法集
    methods: {

        //渲染
        render: function (data) {

            if (!data) {
                data = Object.create(LabelControl.defaultData());
            }

            var _html = '<div class="fieldItem ';

            _html += ' id="' + data.id + '" type="' + data.type + '" >' +
                data.html +
                '</div>';

            return $(_html);
        },

        parse: function () {

        }


    }

}

import "./Index.less";


import Libs from "../../Libs/Index"
import autosize from "../../Comm/Libs/autosize"
import Events from "./Events/Index"
import PropsHtmlDef from "./Js/PropsHtmlDef"

//表格
var TableControl = {

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

            id: "Table_" + (+new Date()),

            Settings: {

            },

            layOutData: {
                data: rows
            }

        }

    },

    //基础配置
    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格",
        attrs: [{
            className: "setRowCol",
            title: "行列数",
            Options: {
                tbCount: true,
                tb: true,

            }
        }, {
            title: "其他设置",
            Options: {
                border: true
            }
        }]
    },

    //方法集
    methods: {

        //渲染
        render: function (data) {

            if (!data) {
                data = Object.create(TableControl.defaultData());
            }

            var $fieldItem = $('<div class="fieldItem" /> ');

            //渲染列
            this.renderCell($fieldItem, data);

            autosize($fieldItem.find(".txtInput"));

            return $fieldItem;
        },

        //渲染列
        renderCell($fieldItem, data) {

            var $tb = $('<table class="tbLayout" />');

            $tb.attr("id",data.id);

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
                                if (Libs.AllControls[childItem.type]) {
                                    var $fieldItem = Libs.AllControls[childItem.type].render(childItem);
                                    $td.append($fieldItem);
                                }
                            });

                        } else {

                            if (Libs.AllControls.TextInput) {
                                var $fieldItem = Libs.AllControls.TextInput.render();
                                $td.append($fieldItem);
                            }
                        }

                        $tr.append($td);

                    });

                    $tb.append($tr);

                });
            }



            $fieldItem.append($tb);

        },

        parse: function () {

        },

        //渲染属性
        bindPropsEvents($el) {

        }
    },

    //事件初始化
    initEvent($el) {
        Events.init($el);
    },

    render(pars) {
        return TableControl.methods.render(pars);
    },

    PropsHtmlDef: PropsHtmlDef

}


export default TableControl;
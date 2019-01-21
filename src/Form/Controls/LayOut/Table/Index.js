
import "./Css/Index.less"

import BaseControl from "../../Base/Index"
import autosize from "../../../Js/autosize"

import PrivateProps from "./Props/Index"

var TableControl = {

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格"
    },

    //默认绘制表格数据
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

    //渲染
    render: function (data) {

        if (!data) {
            data = Object.create(this.defaultData());
        }

        var $fieldItem = $('<div class="fieldItem" /> ');

        //渲染列
        this.renderCell($fieldItem, data);

        autosize($fieldItem.find(".txtInput"));

        return $fieldItem;
    },

    //获取textInput
    getTextInput() {

    },

    //渲染列
    renderCell($fieldItem, data) {


        var $tb = $('<table class="tbLayout" />'),
            $$root = this.$$root;

        $tb.attr("id", data.id);

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

                            var InsControl = $$root.AllControls.getControlByType(childItem.type)

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

                $tb.append($tr);

            });
        }



        $fieldItem.append($tb);

    },

    //渲染属性
    renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        var $group = this.genGroup({
            className: "setRowCol",
            title: "行列数"
        });

        $group.append(PrivateProps.setColRow());

        $setProps.append($group);



    },

    //销毁
    destroy() {

    }

}


Object.setPrototypeOf(TableControl, BaseControl);

export default TableControl;



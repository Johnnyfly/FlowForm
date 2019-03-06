import "./Css/Index.less"

import BaseControl from "../../Base/Index"
import autosize from "../../../Js/autosize"

import PrivateProps from "./Props/Index"

import PrivateEvents from "./Events/Index"

var TableControl = {

    metaInfo: {
        type: "Table",
        name: "布局表格",
        iconClass: "zppicon-biaoge",
        title: "用于页面布局，允许合并单元格"
    },

    PrivateProps:PrivateProps,

    //默认绘制表格数据
    defaultData(rowLen, cellLen) {

        var rows = [],
            head = [];

        if (!rowLen) {
            rowLen = 3;
        }
        if (!cellLen) {
            cellLen = 3;
        }

        for (var i = 0; i < rowLen; i++) {

            var cell = [],
                tCell = [];

            for (var j = 0; j < cellLen; j++) {

                cell.push({
                    childrens: []
                });

                tCell.push({
                    childrens: []
                });
            }

            rows.push({
                cells: cell
            });

            if (i == 0) {
                head.push({
                    cells: tCell
                });
            }

        }

        return {
            type: "Table",
            id: "Table_" + (+new Date()),
            Settings: {},
            layOut: {
                tbody: rows,
                thead: head
            }
        }

    },

    //渲染
    render: function (data) {

        if (!data || arguments.length > 1) {
            var deData = this.defaultData.apply(this,arguments);
            data = Object.create(deData);
        }

        var $fieldItem = $('<div class="fieldItem" /> ');

        //渲染列
        this.renderCell($fieldItem, data);

        //自动到不 textinput
        autosize($fieldItem.find(".txtInput"));

        //设计模式
        if (this.$$root.Settings.mode == "desi") {
            //拖拽改变宽度
            PrivateEvents.DropTo.init($fieldItem);
        }

        return $fieldItem;
    },

    //渲染列
    renderCell($fieldItem, data) {


        var $tb = $('<table class="tbLayout" />'),
            $$root = this.$$root;

        $tb.append('<thead />');
        $tb.append('<tbody />');

        $tb.attr("id", data.id);

        if (data.layOut && data.layOut.thead) {

            var rows = data.layOut.tbody;

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

                $tr.append('<td class="seatLast" />');

                $tb.find("tbody").append($tr);

            });


            var headRows = data.layOut.thead;

            $.each(headRows, function (i, tRowItem) {

                var $tr = $('<tr/>');

                $.each(tRowItem.cells, function (j, cellItem) {
                    $tr.append('<th>TT</th>');
                });

                $tb.find("thead").append($tr);

            });


        }

        $fieldItem.append($tb);

    },

    //渲染属性
    renderProps() {

        var $setProps = this.$$root.find(".setProps"),
            $fieldItem = this.$$root.find(".fieldItem.selected");

        //清空
        $setProps.empty();

        //行列数
        var $group = this.genGroup({
            className: "setRowCol",
            title: "行列数"
        });
        $group.append(this.PrivateProps.setColRow.call(this,$fieldItem));

        $setProps.append($group);


        var $group = this.genGroup({
            className: "tbSet", 
        });
        $group.append(this.PrivateProps.tbSet.call(this,$fieldItem));

        $setProps.append($group);



    },

    //销毁
    destroy() {

    }

}


Object.setPrototypeOf(TableControl, BaseControl);

export default TableControl;
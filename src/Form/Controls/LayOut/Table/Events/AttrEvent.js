
import TbOp from "./TbOp"
import Libs from "../../../Libs/Index"
import autosize from "../../../Comm/Libs/autosize"


var AttrEvent = {

    init($el) {

        var that = this;

        //绑定事件
        $el.on("click", ".btnHandleTable", function () {

            var $this = $(this),
                type = $this.attr("type"),
                $fieldItem = $el.find(".fieldItem.selected");

            if ($fieldItem.length > 0) {
                that.eventObj[type] && that.eventObj[type]($fieldItem, $this);
            }

        });

    },

    //事件处理对象
    eventObj: {

        //合并单元格
        mergeCell($fieldItem, $el) {
            TbOp.rowColSpan($fieldItem.find(".tbLayout"));
        },

        //拆分单元格
        splitCell($fieldItem, $el) {

            $fieldItem.find("td.active").each(function () {

                var $this = $(this);

                if ($this.attr("rowspan") > 1 || $this.attr("colspan") > 1) {
                    TbOp.splitCell($this);
                }

                this.replaceContolToTextInput($fieldItem);

            });
        },

        //添加行
        addRow($fieldItem, $el) {

            var $active = $fieldItem.find(".active:last");

            if ($active.length > 0) {
                TbOp.insertTr($active.closest("tr"));
            } else {
                TbOp.insertToLast($fieldItem);
            }

            this.replaceContolToTextInput($fieldItem);
            // var $txtRow = $("#controlAttrs .txtRow");
            // $txtRow.val(parseInt($txtRow.val()) + 1); 
        },

        //布局表格添加列
        addColTable($fieldItem, $el) {

            //选中的列
            var $active = $fieldItem.find(".active:last");

            if ($active.length > 0 && $active.next().length > 0) {
                TbOp.insertTd($active);
                //重新计算控件大小
                //Comm.diffElementFixedW($fieldItem);

            } else {
                this.addCol($fieldItem);
            }

        },

        //添加列 数据表格
        addCol: function ($fieldItem) {

            var isFixedW = $fieldItem.find("table tr td:first").attr("width");

            if (isFixedW) {

                var colspan = 0,
                    fwidth = $fieldItem.width(),
                    tbW = 0;

                $fieldItem.find("table tr:first td").each(function () {

                    var tdColspan = $(this).attr("colspan");
                    tbW += $(this).width();

                    if (tdColspan) {
                        colspan += parseInt(tdColspan);
                    } else {
                        colspan += 1;
                    }
                });

                var nW = Math.floor(fwidth / (colspan + 1));

                //重新计算td 的宽度  按比例 减去 宽度
                $fieldItem.find("table tr td").each(function () {

                    var $this = $(this),

                        tW = parseInt($this.attr("width"));

                    tW -= (tW / tbW * nW);

                    tW = tW > 1 && tW || 1;

                    tW = Math.floor(tW);

                    $this.attr("width", tW);

                    //var $fieldItem = $this.find(".fieldItem");

                    //if ($fieldItem.length > 0) {
                    //Comm.diffElementFixedW($fieldItem);
                    //}

                });


                $fieldItem.find("table tr").each(function (i) {

                    var $aTd = $("<td/>");

                    $aTd.attr("width", nW);

                    $aTd.append('<div class="tdNull">&nbsp;</div>');

                    $(this).append($aTd);

                    // if ($fieldItem.attr("type") == "DataTable") {
                    //     myautosize($aTd.find(".setPlaceHolder"));
                    // }
                });


            } else {

                $fieldItem.find("table tr").each(function (i) {

                    var $aTd = $("<td/>");

                    $aTd.append('<div class="tdNull">&nbsp;</div>');

                    $(this).append($aTd);

                    // if ($fieldItem.attr("type") == "DataTable") {
                    //     myautosize($aTd.find(".setPlaceHolder"));
                    // }
                });
            }

            this.replaceContolToTextInput($fieldItem);

            // var $txtCol = $("#controlAttrs .txtCol");
            // $txtCol.val(parseInt($txtCol.val()) + 1);

        },

        //删除列 布局表格
        delColTable($fieldItem) {

            //默认保留一列
            if ($fieldItem.find("tr:first td").length <= 1) {
                $fieldItem.find(".btnDelField").click();
                return;
            }

            //选中的列
            var $td = $fieldItem.find(".active");

            if ($td.length <= 0) {
                $td = $fieldItem.find("tr:first td:last");
            }

            //遍历全部删除
            $td.each(function () {
                TbOp.deleteTd($(this));
            });


            //重新计算控件大小
            //Comm.diffElementFixedW($fieldItem);


        },

        //删除行
        delRow($fieldItem) {

            var $active = $fieldItem.find(".active"),
                delCount = 1;

            //删除选中的或者 最后一个
            if ($active.length > 0) {
                delCount = 0;
                $active.parent().each(function () {
                    delCount += TbOp.deleteTr($(this).find("td:first"));
                });

            } else {
                delCount = TbOp.deleteTr($fieldItem.find("tr:last td:first"));
            }

            //删除后有可能没有了
            if ($fieldItem.find("td").length <= 0) {

                //最后一行删除表格
                $fieldItem.find(".btnDelField").trigger("click", {
                    trigge: true
                });

                return;
            }

            // var $txtRow = $("#controlAttrs .txtRow");
            // $txtRow.val(parseInt($txtRow.val()) - delCount);

        },

        //替换
        replaceContolToTextInput($fieldItem) {

            var $tds = $fieldItem.find(".tdNull").parent();

            //空的td
            $tds.each(function () {
                var $fieldItem = Libs.AllControls.TextInput.render();
                $(this).html($fieldItem);
            });

            autosize($tds.find(".txtInput"));
        }
    },




}

export default AttrEvent;
import DefHtml from "./DefHtml.js"
import CellOp from "./CellOp"
import autosize from "../../../../Js/autosize"

var Props = {

    //设置行列
    setColRow($fieldItem) {

        //html
        var $colRow = $(DefHtml.colRow),
            col = $fieldItem.find("th").length,
            row = $fieldItem.find("tbody tr").length;

        $colRow.find(".txtRow").val(row);
        $colRow.find(".txtCol").val(col);

        var that = this;

        //确定
        $colRow.on("click", ".btnSet", function () {

            var newRow = parseInt($colRow.find(".txtRow").val()),
                newCol = parseInt($colRow.find(".txtCol").val());

            //输入有误
            if (!newRow || !newCol) {
                col = $fieldItem.find("th").length,
                    row = $fieldItem.find("tbody tr").length;
                $colRow.find(".txtRow").val(row);
                $colRow.find(".txtCol").val(col);
                return;
            }

            var $oldFieldItem = $fieldItem.find(".fieldItem"),
                $newEl = that.render(newRow, newCol);

            $fieldItem.find(".tbLayout").html($newEl.find(".tbLayout").html());

            autosize($fieldItem.find(".txtInput"));
            

            var op = $(this).attr("op");

            //不是重置 恢复数据
            if (op != 'reset') {

                $fieldItem.find("td").each(function (i) {

                    var $this = $(this);
                    if ($this.hasClass("seatLast")) {
                        return true;
                    }

                    if ($oldFieldItem[i]) {
                        $this.html($oldFieldItem[i]);
                    }

                });
            }

        });

        return $colRow;
    },

    //表格设置
    tbSet($fieldItem){

        var $tbSet = $(DefHtml.tbSet); 

        CellOp.$$root = this.$$root;

        //操作
        $tbSet.on("click",".btnNorMal",function(){

            var type = $(this).attr("type");

            if(CellOp[type]){
                CellOp[type]($fieldItem.find(".tbLayout"));
            } 
             
        });

        return $tbSet;
        
    }

}

export default Props;
import DefHtml from "./DefHtml.js"

var Props = {

    //设置行列
    setColRow() {

          //html
          var $colRow = $(DefHtml.colRow);

          //事件
          $colRow.on("keyup", function () {
  
          });
  
          return $colRow;
    }

}

export default Props;
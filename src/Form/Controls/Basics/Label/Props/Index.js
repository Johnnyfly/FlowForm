import DefHtml from "./DefPropsTpl.js"


var Props = {

    fontSize($fieldItem) {

        var $fSize = $(DefHtml.fontSize);
        
        $fSize.eq(1).on("change",function(){ 
            $fieldItem.find(".LabelText").css("font-size",this.value+"px"); 
        });

        return $fSize;
    }
}


export default Props;
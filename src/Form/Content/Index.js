
import defTpl from "./defTpl.js"

import "./Css/Index.less"

var DesiContent = {

    //初始化
    init() {

        var $el = $('<div class="desiContent"/>'); 
        
        $el.append(defTpl.toDo);

        $el.append('<div class="fromDesign desiForm"/>');

        this.$$root.$el.append($el);

        this.initEvent($el);

    },

    //初始化事件
    initEvent($el){

        //点击
        $el.on("click",".fieldItem",function(){
            $el.find(".fieldItem").removeClass("selected");
            $(this).addClass("selected");
        });
    }



}

export default DesiContent;
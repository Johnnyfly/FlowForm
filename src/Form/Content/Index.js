
import defTpl from "./defTpl.js"

import "./Css/Index.less"

var DesiContent = {

    //初始化
    init() {

        var $el = $('<div class="desiContent"/>'); 
        
        $el.append(defTpl.toDo);

        $el.append('<div class="fromDesign"/>');

        this.$$root.$el.append($el);

    },



}

export default DesiContent;
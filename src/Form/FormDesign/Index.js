

import "./Css/Index.less"

var FromDesign = {

    //初始化
    init(Opts){

        var $el = $('<div class="desiContent"/>');
        
        $el.append(this.reToDoHtml());
        
        $el.append('<div class="fromDesign"/>'); 

        Opts.$el.append($el);

    },

    reToDoHtml(){
        return '<div class="reToDo">' +
        '<span class="btnReDo empty"><i class="commoniconfont icon-chexiao"></i><span class="text">撤销</span></span>'+
        ' <span class="btnToDo empty"><i class="commoniconfont icon-huifu1"></i><span class="text">恢复</span></span></div>'; 
    },

}

export default FromDesign;
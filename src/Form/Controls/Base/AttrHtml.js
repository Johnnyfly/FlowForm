

var AttrHtml = {

    //标题
    title: '<div class="optItem"><input maxlength="50" type="text" class="txtTitle" /></div>',

    //隐藏标题
    hideTitle: '<div class="optItem"><label class="attrLab"><input class="ckHideBox" type="checkbox"> 隐藏标题 </label></div>',

    //输入提示
    placeHolder: '<div class="optItem"><input type="text" class="txtPlaceHolder"></div>',

    //是否必填
    required: '<div class="optItem"><label class="attrLab"><input class="ckBox" type="checkbox"> 这个是必填项目 </label></div>',

    layout: '<div class="optItem"><label class="attrLab"><input name="setRowCol" checked="true" class="ckLayOut" key="row" type="radio"> 横向 </label>' +
        '<label class="attrLab"><input key="col" name="setRowCol" class="ckLayOut" type="radio"> 纵向 </label></div>',

   
}

export default AttrHtml;
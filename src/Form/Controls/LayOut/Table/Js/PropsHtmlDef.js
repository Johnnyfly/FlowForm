

var PropsHtmlDef = {

    tb: '<div class="optItem"><span type="mergeCell" class="btnHandleTable btnNorMal">合并单元格</span>' +
        '<span type="splitCell" class="btnHandleTable btnNorMal">拆分单元格</span>' +
        '<span type="addRow" class="btnHandleTable addRow btnNorMal">添加行</span>' +
        '<span type="addColTable" class="btnHandleTable addCol btnNorMal">添加列</span>' +
        '<span type="delRow" class="btnHandleTable delRow btnNorMal show">删除行</span>' +
        '<span type="delColTable" class="btnHandleTable delColTable btnNorMal show">删除列</span></div>',

    tbCount: '<div class="optItem"><input class="txtShort txtRow" type="text"><span class="desc">行</span>' +
        '<span class="gap">×</span><input type="text" class="txtShort txtCol"><span class="desc">列</span>' +
        '<span type="tbSet" class="btnNorMal primary">确定</span></div>',

    //是否显示边框
    border: '<div class="optItem"> <label class="attrLab"><input class="ckBorder" type="checkbox" />不显示线框</label></div>'
}

export default PropsHtmlDef;
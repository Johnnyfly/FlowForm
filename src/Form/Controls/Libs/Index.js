
//base
import Table from "../LayOut/Table/Index"
import TextInput from "../Base/TextInput/Index"


var ControlType = {
    Base: 'Base',
    MixControl: 'MixControl',
    LayOut: 'LayOut'
}

var ControlLibs = {

    //控件类型
    ControlType: ControlType,

    //基础控件
    [ControlType.Base]: {

    },

    //套件
    [ControlType.MixControl]: {

    },

    //布局
    [ControlType.LayOut]: {
        Table
    }


};

ControlLibs.AllControls = {

}

for (var key in ControlType) {

    for (var key2 in ControlLibs[key]) {
        ControlLibs.AllControls[key2] = ControlLibs[key][key2];
    } 
}

ControlLibs.AllControls.TextInput = TextInput;

export default ControlLibs;
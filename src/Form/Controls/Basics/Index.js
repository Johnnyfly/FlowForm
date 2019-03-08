
import TextInputControl from "./TextInput/Index"
import LabelControl from "./Label/Index"
import InputControl from "./Input/Index"


var Basics = {

    metaInfo: {
        title: "控件"
    },

    Controls: [TextInputControl,LabelControl,InputControl],

    addControl(control){
        this.Controls.push(control);
    }
}

export default Basics;
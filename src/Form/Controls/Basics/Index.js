
import TextInputControl from "./TextInput/Index"

var Basics = {

    metaInfo: {
        title: "控件"
    },

    Controls: [TextInputControl],

    addControl(control){
        this.Controls.push(control);
    }
}

export default Basics;
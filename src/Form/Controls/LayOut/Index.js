
import TableControl from "./Table/Index"

var LayOut = {

    metaInfo: {
        title: "布局"
    },

    Controls: [TableControl],

    addControl(control){
        this.Controls.push(control);
    }
}

export default LayOut;
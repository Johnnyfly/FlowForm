
import LayOut from "./LayOut/Index"
import Basics from "./Basics/Index"

var AllControls = {

    getControlByType(type) {

        var InsControl = false;

        //查找控件 
        $.each(Basics.Controls, function (i, item) {
            //找到了
            if (item.metaInfo.type == type) {
                InsControl = item;
                return false;
            }
        });

        if(InsControl){
            return InsControl;
        }

        //查找控件 
        $.each(LayOut.Controls, function (i, item) {
            //找到了
            if (item.metaInfo.type == type) {
                InsControl = item;
                return false;
            }
        });

        if(InsControl){
            return InsControl;
        }

        return InsControl;

    },

    Controls: {

        Basics: Basics,

        LayOut: LayOut,
    },


}


export default AllControls;
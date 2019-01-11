import MousedownEvent from "./mousedown"
import AttrEvent from "./AttrEvent"
import ContextMenu from "./context"

var Events = { 
    init:function($el){
        MousedownEvent.init($el);
        AttrEvent.init($el);
        ContextMenu.init($el);
    }
}

export default Events;
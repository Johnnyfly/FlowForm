
import "./Css/reset.less";

import NavControls from "./NavControls/Index"
import AllControls from "./Controls/Index"
import DesiContent from "./Content/Index"
import DesiProps from "./Props/Index" 


function FormDesi(params){  
     
    if(!this instanceof FormDesi){
        return new FormDesi(params);
    }

    var defaults = { 
        $el: $("body"),
        mode:"desi"
    }

    this.Settings = $.extend(defaults, params);  

    this.NavControls.$$root = this;
    this.DesiContent.$$root = this;
    this.DesiProps.$$root = this;
    this.$el = this.Settings.$el;

    this.NavControls.init(this.Settings); 
    this.DesiProps.init(this.Settings);
    this.DesiContent.init(this.Settings);
   
}

FormDesi.prototype.find = function(el){
    return this.Settings.$el.find(el);
}

FormDesi.prototype.NavControls = NavControls; 
 
FormDesi.prototype.AllControls = AllControls;

FormDesi.prototype.DesiContent = DesiContent;

FormDesi.prototype.DesiProps = DesiProps;

window.FormDesi = FormDesi;

export default FormDesi;

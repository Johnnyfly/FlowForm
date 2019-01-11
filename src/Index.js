

import * as ApplicatinForm from "./Form/index"


var FormApplicatin = {

    init($el) {

        ApplicatinForm.Controls.render({ $el });

        ApplicatinForm.DesignProps.init({ $el });

        ApplicatinForm.FormDesign.init({ $el });
    }
}

window.ZppFormApplicatin = FormApplicatin;


export default FormApplicatin;
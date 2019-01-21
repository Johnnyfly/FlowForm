
import "./Css/Index.less" 

var PropsDesign = {

    //初始化
    init(Opts) {

        var $el = $('<div class="designProps"/>');

        $el.append('<ul class="tabAttrs"><li class="item">控件设置</li></ul>');

        $el.append('<div class="setProps"></div>');

        Opts.$el.append($el);

    },

    render(opts) {

        var type = opts.type,
            $setProps = opts.$el.find(".setProps"),
            Control = Libs.AllControls[type];

         
        if (Control) {

            var attrs = Control.metaInfo.attrs;

            $setProps.html('');

            if (attrs && attrs.length > 0) {

                $.each(attrs, function (i, item) { 

                    var $attrItem = $('<div class="attrItem" />');

                    if(item.className){
                        $attrItem.addClass(item.className);
                    }

                    if (item.title) {
                        $attrItem.append('<div class="attrTitle">' + item.title + '</div>');
                    }

                    var Options = item.Options;

                    for (var key in Options) {
                        if (CommPropsDef[key]) {
                            $attrItem.append(CommPropsDef[key]);
                        } else if (Control.PropsHtmlDef[key]) {
                            $attrItem.append(Control.PropsHtmlDef[key]);
                        }
                    }

                    $setProps.append($attrItem);

                });

            }

        }

    }
}

export default PropsDesign;
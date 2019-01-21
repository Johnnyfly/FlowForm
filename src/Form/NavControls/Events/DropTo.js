 

var DropEvent = {

    //初始化绑定
    init($el,callback) {

        var that = this;

        //拖拽控件放入
        $el.on("mousedown", ".ControlBox .cItem", function (event) {
            that.bindDropEvent({
                callback:callback, 
                $el: $(this),
                elX: event.pageX,
                elY: event.pageY
            });
        });


    },

    //拖拽事件绑定
    bindDropEvent: function (opts) {

        var $dropEl = opts.$el.clone(false, false),
            ElOffset = opts.$el.offset(),
            diffX = opts.elX - ElOffset.left,
            diffY = opts.elY - ElOffset.top,
            that = this,
            type = $dropEl.attr("type");

        $dropEl.attr("id", "dropEl");

        $("body").append($dropEl);

        $("body").addClass("noSelected");

        $(window).on("mousemove.moveInput", function (event) {

            var newX = event.pageX,
                newY = event.pageY,
                StyleObj = {
                    $el: opts.$el,
                    left: newX - diffX,
                    top: newY - diffY,
                    type: type
                };

            if (newX == opts.elX && newY == opts.elY) {
                return;
            }

            $dropEl.css(StyleObj);

            //计算插入的位置
            that.diffInsertPos(StyleObj);

            return false;

        });

        $(window).on("mouseup.moveInput", function () {

            $(window).off("mousemove.moveInput");

            $(window).off("mouseup.moveInput"); 

            if($("#insetEl").length > 0 ){
                opts.callback &&  opts.callback(type);
            } 

            $dropEl.remove();

            $("body").removeClass("noSelected");

        });

    },


    //计算插入的位置
    diffInsertPos: function (StyleObj) {

        var $desiContent = StyleObj.$el.closest(".allControls").parent().find(".fromDesign"),
            Offset = $desiContent.offset(),
            cT = Offset.top,
            cX = Offset.left,
            cH = $desiContent.height(),
            cW = $desiContent.width(),
            DH = $("#dropEl").height(),
            that = this,
            insetElHtml = '<div class="fieldItem"  id="insetEl"/>';


        //在 中间
        if (StyleObj.top + DH > cT && StyleObj.top < cT + cH && StyleObj.left > cX && StyleObj.left < cX + cW) {

            var $fieldItem = $desiContent.find(".fieldItem");

            //空 没有元素
            if ($fieldItem.length <= 0) {

                if ($("#insetEl").length <= 0) {
                    $desiContent.append(insetElHtml);
                }

            } else {

                var isFind = false;
                //上面下面
                $fieldItem.each(function () {

                    if ($(this).closest("td").length > 0 && $(this).attr("type") != "TextInput") {
                        return true;
                    }

                    var $this = $(this),
                        C_Offset = $this.offset(),
                        cT = C_Offset.top,
                        cH = $this.height(),
                        $insetEl = $("#insetEl");


                    if (StyleObj.top < cT && StyleObj.top + DH > cT) {
                        isFind = true;
                        if ($insetEl.length <= 0) {
                            $this.before(insetElHtml);
                        } else {
                            $this.before($insetEl);
                        }
                        return false;
                    }


                    //在该元素内
                    if (StyleObj.top > cT && StyleObj.top < cT + cH) {

                        isFind = true;

                        if ($this.attr("id") == "insetEl") {
                            return false;
                        }

                        //表格
                        if ($this.find("table").length > 0 && StyleObj.type != "Table" && StyleObj.type != "DataTable") {

                            var $prev = $this.prev();

                            if ($prev.length > 0) {

                                var type = $prev.attr("type");
                                if (type = "Table" || type == "DataTable") {
                                    cT += 10;
                                }
                            }

                            //底部了
                            if (DH + StyleObj.top > cT + cH) {
                                if ($insetEl.length <= 0) {
                                    $this.after(insetElHtml);
                                } else {
                                    $this.after($insetEl);
                                }
                                return false;
                            }


                            $this.find("td").each(function () {

                                var $td = $(this),
                                    cX = $td.offset().left,
                                    cY = $td.offset().top,
                                    cW = $td.width(),
                                    cH = $td.height(),
                                    isInTop = cX < StyleObj.left && cX + cW > StyleObj.left || cX > StyleObj.left && cX < StyleObj.left + StyleObj.width;

                                if ($td.find(".fieldItem").length > 1) {
                                    $td.find(".fieldItem:first").nextAll().remove();
                                }

                                if (!isInTop || $td.find(".fieldItem").length > 0 && $td.find(".fieldItem").attr("type") != "TextInput") {
                                    return true;
                                }

                                if (cY < StyleObj.top && cY + cH > StyleObj.top || cY > StyleObj.top && cY < StyleObj.top + StyleObj.height) {

                                    //数据表格
                                    if ($this.attr("type") == "DataTable") {
                                        if ($td.parent().index() == 0) {
                                            var index = $td.index();
                                            $td = $td.parent().next().find("td").eq(index);
                                        }
                                    }

                                    if ($td.find(".fieldItem").length > 0 && $td.find(".fieldItem.textInput").length <= 0) {
                                        return true;
                                    }

                                    if ($insetEl.length <= 0) {
                                        $td.prepend(insetElHtml);
                                    } else {
                                        $td.prepend($insetEl);
                                    }

                                    return false;

                                }

                            });

                            return false;
                        }

                        //下部分
                        if (StyleObj.top > (cT + cH / 2)) {

                            if ($insetEl.length <= 0) {
                                $this.after(insetElHtml);
                            } else {
                                $this.after($insetEl);
                            }

                        } else {

                            if ($insetEl.length <= 0) {
                                $this.before(insetElHtml);
                            } else {
                                $this.before($insetEl);
                            }

                        }

                        return false;
                    }
                });

                if (!isFind) {

                    if ($("#insetEl").length <= 0) {
                        $desiContent.append(insetElHtml);
                    } else {
                        $desiContent.find(".fieldItem:last").after($("#insetEl"));
                    }
                }
            }
        } else {
            $("#insetEl").remove();
        }

    },

    //放入控件
    insertControl(type, callback) {

        var $insetEl = $("#insetEl");
        //可以插入
        if ($insetEl.length > 0) {

            if (!Libs.AllControls[type]) {
                return;
            }

            var Control = Libs.AllControls[type],
                $el = Control.render();


            if ($insetEl.closest("tr").length <= 0) {

                $insetEl.after($el);

            } else {

                var $td = $insetEl.closest("td"),
                    $tb = $td.closest("table");

                $insetEl.remove();

                if (type == "Table" || type == "DataTable") {
                    $dropEl.remove();
                    return;
                }

                //默认输入
                if ($td.find(".fieldItem.textInput").length >= 1) {
                    $td.find(".fieldItem").remove();
                }

                if ($td.find(".fieldItem").length > 0) {
                    $dropEl.remove();
                    return;
                }


                //没有width
                if (!$td.attr("width")) {
                    //设置宽度
                    $tb.find("tr td").each(function () {
                        var $this = $(this);
                        $this.attr("width", $this.width()).attr("height", $this.height());
                    });
                }


                var tdArr = [];

                $td.closest(".tbLayout").find("td").each(function () {
                    var $this = $(this);
                    tdArr.push({
                        $el: $this,
                        w: $this.width(),
                        h: $this.height()
                    });
                });

                $.each(tdArr, function (i, item) {
                    item.$el.attr("width", item.w).attr("height", item.h);
                });


                //计算浮动宽度
                Comm.diffElementFixedW($el, $td.width());

                if ($td.closest(".fieldItem").attr("type") == "DataTable") {
                    $el.addClass("hideTitle");
                }

                $td.append($el);

                $td.find('.default-ele').remove();
            }


            $insetEl.remove();

            $("#desiContent .fieldItem.selected").removeClass("selected");

            $el.addClass("selected");

            DesignProps.render({ type, $el: $container });


        }

    },

}


export default DropEvent;
var DropTo = {

    //入口
    init($tb) {

        var that = this;

        //hover 显示resize
        $tb.on("mousemove", "th", function (event) {

            var $this = $(this),
                $tb = $this.closest(".tbLayout");

            $tb.find(".ewResize").removeClass("ewResize");

            that.tdCellWidth($this, event);

            return;
        });


        //td 选中
        $tb.on("mousedown", "th.ewResize", function (event) {
            that.tdMoveChangeCellWidth($(this), event);
        });

        //td 框选
        $tb.on("mousedown", "td", function (event) {

            that.bindSelectionTdEvent({
                initX: event.pageX,
                initY: event.pageY,
                $table: $(this).closest("table")
            });

        });
    },


    //拖动列宽
    tdCellWidth($el, event) {

        var eOffset = $el.offset(),
            eW = $el.width(),
            pageX = event.pageX,
            isFirst = $el.prev().length <= 0 && true || false,
            isLast = $el.next().length <= 0 && true || false;

        if (!isFirst) {

            if (pageX > eOffset.left && pageX < eOffset.left + 10) {
                $el.addClass("ewResize");
                $el.data("ewdirc", "left");
                return;
            } else {
                $el.removeClass("ewResize");
            }
        }

        if (!isLast) {
            var tdW = eOffset.left + eW;
            if (pageX < tdW && pageX > tdW - 10) {
                $el.addClass("ewResize");
                $el.addClass("ewResize");
                $el.data("ewdirc", "right");
            } else {
                $el.removeClass("ewResize");
            }
        }

    },

    //拖拽改变大小
    tdMoveChangeCellWidth($el, event) {

        //没有合并过
        if (!$el.attr("width")) {

            //设置宽度
            $el.closest(".tbLayout").find("th").each(function () {
                var $this = $(this);
                $this.attr("width", $this.width());
            });
        }

        var {
            pageX: sourceX
        } = event,

        that = this,
            ewdirc = $el.data("ewdirc"),
            sourceW = parseInt($el.attr("width"));


        $(window).on("mousemove.ewResize", function (event) {

            var diffX = event.pageX - sourceX;

            if (diffX == 0) {
                return;
            }


            if (ewdirc != "left") {

                var newW = sourceW + diffX,
                    diffTdW = newW - parseInt($el.attr("width"));

                if (newW < 1) {
                    return;
                }

                var nextW = parseInt($el.next().attr("width")) - diffTdW,
                    elW = parseInt($el.attr("width")) + diffTdW

                //宽度小于1  不用处理
                if (nextW < 2 || elW < 2) {
                    return false;
                }

                $el.next().attr("width",nextW);
                $el.attr("width",elW);

                //that.setTdWidth(tdArr);

            } else {

                var newW = sourceW - diffX,
                    diffTdW = newW - parseInt($el.attr("width"));

                if (newW < 1) {
                    return;
                }

                var prevW = parseInt($el.prev().attr("width")) - diffTdW,
                    elW = parseInt($el.attr("width")) + diffTdW;


                //宽度小于1  不用处理
                if (prevW < 2 || elW < 2) {
                    tdArr = [];
                    return false;
                }

                $el.prev().attr("width",prevW);
                $el.attr("width",elW);
                //that.setTdWidth(tdArr);
            }

            return false;

        });

        $(window).on("mouseup.ewResize", function () {
            $(window).off("mousemove.ewResize");
            $(window).off("mouseup.ewResize");
            $(".tbLayout .ewResize").removeClass("ewResize");
        });
    },

    //绑定td合并前的选中
    bindSelectionTdEvent: function (initPoint) {

        $("body").addClass("noSelected");

        //initPoint  初始化 位置 
        var that = this,
            $selectionBox = false;

        $(window).on("mousemove.selectionTd", function (event) {

            var newX = event.pageX,
                newY = event.pageY,
                w = newX - initPoint.initX,
                h = newY - initPoint.initY,
                styleObj = {
                    width: w,
                    height: h,
                    left: initPoint.initX,
                    top: initPoint.initY
                };

            if (initPoint.initX == newX && initPoint.initY == newY) {
                return false;
            }

            if ($("#selectionBox").length <= 0) {
                $("body").append("<div id='selectionBox'></div>");
                $selectionBox = $("#selectionBox");
            }

            if (w < 0) {

                styleObj.left = initPoint.initX + w;
                w = Math.abs(w);
                styleObj.width = w;
            }

            if (h < 0) {
                styleObj.top = initPoint.initY + h;
                h = Math.abs(h);
                styleObj.height = h;
            }

            $selectionBox.css(styleObj);

            //计算
            that.diffSelectionTd(styleObj, initPoint.$table);
            return false;

        });


        $(window).on("mouseup.selectionTd", function () {

            $(window).off("mousemove.selectionTd");

            $(window).off("mouseup.selectionTd");

            $selectionBox && $selectionBox.remove();

            $("body").removeClass("noSelected");

            $("body").one("click", function () {
                initPoint.$table.find(".active").removeClass("active");
            });
        });
    },

    //计算选中的td
    diffSelectionTd: function (styleObj, $table) {

        var that = this;
        //遍历所有的td  
        $table.find("td").each(function () {
             
            var $td = $(this),
                cX = $td.offset().left,
                cY = $td.offset().top,
                cW = $td.width(),
                cH = $td.height(),
                isInTop = cX < styleObj.left && cX + cW > styleObj.left || cX > styleObj.left && cX < styleObj.left + styleObj.width;

            if (!isInTop) {
                $td.removeClass("active");
                return true;
            }

            if (cY < styleObj.top && cY + cH > styleObj.top || cY > styleObj.top && cY < styleObj.top + styleObj.height) {
                if (!$td.hasClass("seatLast")) {
                    $td.addClass("active");
                }

                //横向
                if ($td.attr("colspan")) {
                    var newRight = cX + cW;
                    if (newRight > styleObj.left + styleObj.width) {

                        styleObj.width = newRight - styleObj.left;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    } else if (cX < styleObj.left) {

                        styleObj.width = styleObj.left + styleObj.width - cX - 1;
                        //因为是小于 所以要去掉一
                        styleObj.left = cX - 1;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    }
                }

                //纵向
                if ($td.attr("rowspan")) {

                    var newBottom = cY + cH;

                    if (newBottom > styleObj.top + styleObj.height) {

                        styleObj.height = newBottom - styleObj.top;

                        that.diffSelectionTd(styleObj, $table);

                        return false;
                    } else {

                        if (cY < (styleObj.top-2)) { 

                            var diffTop = styleObj.top - cY -1;
                            styleObj.top -= diffTop;
                            styleObj.height += diffTop;

                            that.diffSelectionTd(styleObj, $table);

                            return false;

                        }


                    }
                }
            } else {
                $td.removeClass("active");
            }

        });

    },


}

export default DropTo;
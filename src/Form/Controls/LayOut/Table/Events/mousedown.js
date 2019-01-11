var mousedownEvents = {

    //框选
    init($fieldItem) {
        //td 选中
        $fieldItem.on("mousedown", "td", function (event) {

            if(event.button!=0){
                return;
            }

            var $fieldItem = $(this).closest(".fieldItem");
              
            $(".fieldItem").removeClass("selected");
            $fieldItem.addClass("selected");

            $(".fieldItem").find("textarea").blur();

            mousedownEvents.bindSelectionTdEvent({
                initX: event.pageX,
                initY: event.pageY,
                $table: $(this).closest(".tbLayout")
            });

        });

        $("body").on("click",function(){
            $fieldItem.find(".active").removeClass("active");
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

                $td.addClass("active");

                var isReturn = false;

                //横向
                if($td.attr("colspan")){

                    var newRight = cX + cW;

                    if(newRight > styleObj.left + styleObj.width ){

                        styleObj.width = newRight - styleObj.left;

                        //that.diffSelectionTd(styleObj, $table);

                        isReturn = true;

                    }
                    if(cX < styleObj.left){ 

                        styleObj.width = styleObj.left + styleObj.width - cX-1;
                        //因为是小于 所以要去掉一
                        styleObj.left = cX-1;
                        //that.diffSelectionTd(styleObj, $table);
                        isReturn = true;
                    }
                }
                 
                //纵向
                if($td.attr("rowspan")){

                    var newBottom = cY + cH;

                    if(newBottom > styleObj.top + styleObj.height ){

                        styleObj.height = newBottom - styleObj.top;

                        //that.diffSelectionTd(styleObj, $table);

                        isReturn = true;
                    }

                    if(cY < styleObj.top){ 
                        styleObj.height = styleObj.top + styleObj.height - cY-1;
                        //因为是小于 所以要去掉一
                        styleObj.top = cY-1;
                    }
                } 

                if(isReturn){
                    that.diffSelectionTd(styleObj, $table);
                    return false;
                }

            } else {
                $td.removeClass("active");
            }

        });

    } 
}

export default mousedownEvents;
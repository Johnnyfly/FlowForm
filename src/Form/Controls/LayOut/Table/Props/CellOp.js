var CellOp = {

    //合并行
    rowColSpan: function ($tb) {

        if ($tb.find("td.active").length <= 1) {
            return;
        }

        var colspan = 0,
            rowSpan = 0,
            $tr = $tb.find("td.active:first").closest("tr"),
            $trs = $tb.find("td.active").closest("tr")


        $tr.find("td.active").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                colspan += parseInt(tdColspan);
            } else {
                colspan += 1;
            }
        });

        var aSpanRow = 0
        $trs.each(function () {
            var tdRowSpan = $(this).find("td.active:first").attr("rowspan");
            if (tdRowSpan && $(this).next().find("td.active").length <= 0) {
                rowSpan += parseInt(tdRowSpan);
            } else {
                rowSpan += 1;
            }
        });
        //合并行 两行合并 只合并了前两列 会多出一行 因为遍历的是tr所以需要去掉
        rowSpan -= aSpanRow;

        var $firstTd = $tb.find("td.active:first");

        $firstTd.attr("rowspan", rowSpan).attr("colspan", colspan).removeClass("active");

        $tb.find("td.active").remove();


        //Comm.diffElementFixedW($fieldItem); 

    },

    /**********************************************************  添加行 *******************************************************/
    //获取td 的位置
    getTdPosi(tbtdLen, $tb) {

        var _tr = '<tr>';

        for (var j = 0; j < tbtdLen; j++) {
            _tr += '<td></td>';
        }
        _tr += '</tr>';

        $tb.prepend(_tr);

        var $firstTr = $tb.find("tr:first"),
            TdsWidth = [];

        $firstTr.find("td").each(function (i) {

            var $this = $(this);

            TdsWidth.push({
                $td: $this,
                X: $this.offset().left,
                W: $this.width()
            });

        });

        $firstTr.remove();

        return TdsWidth;
    },

    //插入tr
    insertTr($tr) {

        if (!$tr) {
            return;
        }


        var $tb = $tr.closest(".tbLayout");

        //插入后处理
        var tbtdLen = 0,
            trtdLen = 0;

        //表格td 的 个数
        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        //每个td的位置
        var TdPosi = this.getTdPosi(tbtdLen, $tb),
            DefectIndex = [],
            tdCol = 0;

        //当前tr td 的个数 如果一样 不需要处理 不一样 需要递归向上处理
        $tr.find("td").each(function (i) {

            var tdColspan = $(this).attr("colspan");

            var tLeft = $(this).offset().left;

            if (tdColspan) {

                trtdLen += parseInt(tdColspan);

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += parseInt(tdColspan);
                        DefectIndex.push(c);
                    } else {
                        tdCol += parseInt(tdColspan);
                        break;
                    }
                }


            } else {

                trtdLen += 1;

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += 1;
                        DefectIndex.push(c);
                    } else {
                        tdCol += 1;
                        break;
                    }
                }

            }

        });


        if (tdCol < TdPosi.length) {
            for (var de = tdCol; de < TdPosi.length; de++) {
                DefectIndex.push(de);
            }
        }


        //清除数据
        var $clone = $tr.clone(false, false).find("td").html('<div class="tdNull"></div>').parent(),
            isHasRowSpan = false;

        if ($clone.find("td").length != 1) {

            $clone.find("td").each(function () {
                if ($(this).attr("rowspan")) {
                    isHasRowSpan = true;
                    return false;
                }
            });

        }


        //td 中不止一个元素
        if ($tr.find("td").length > 0) {

            if (trtdLen == tbtdLen && !isHasRowSpan) {

                var rowSpan = $tr.find("td:first").attr("rowspan");

                if (rowSpan) {

                    rowSpan = parseInt(rowSpan) - 1;

                    for (var ix = 0; ix < rowSpan; ix++) {
                        $tr = $tr.next();
                    }

                    $tr.after($clone);

                    for (var ij = 0; ij < rowSpan; ij++) {
                        $clone.after('<tr/>');
                    }

                } else {
                    $tr.after($clone);
                }

            } else {

                $tr.find("td").each(function (i) {

                    var tdRowSpan = $(this).attr("rowspan");

                    if (tdRowSpan && parseInt(tdRowSpan) > 1) {
                        $(this).attr("rowspan", parseInt(tdRowSpan) + 1);
                        $clone.find("td").eq(i).addClass("removeTd");
                    }

                });


                $clone.find("td.removeTd").remove();

                $tr.after($clone);
            }

        }



        //么有合并不用处理
        if (trtdLen == tbtdLen) {
            return;
        }

        //DefectIndex 缺失行的索引 
        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                //纯在合并行
                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left,
                        index = 0;

                    $.each(TdPosi, function (i, item) {
                        if (item.X == tLeft) {
                            index = i;
                            return false;
                        }
                    });

                    var removeIndex = 0;
                    //如果刚好是缺失的行 行加一  跳出
                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            $this.attr("rowspan", parseInt(tdRowSpan) + 1);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    //如果缺失的行还有 colspan
                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);

                        }
                    }

                }

                //么有了跳出
                if (DefectIndex.length <= 0) {
                    return false;
                }

            });

            if (DefectIndex.length <= 0) {
                return false;
            }

        });
    },

    //插入最后
    insertToLast($fieldItem) {

        var $tr = $("<tr/>"),
            colspan = 0;

        $fieldItem.find("table tr:first td").each(function () {

            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                colspan += parseInt(tdColspan);
            } else {
                colspan += 1;
            }
        });

        for (var i = 0; i < colspan; i++) {
            $tr.append('<td><div class="tdNull"></div></td>');
        }

        $fieldItem.find("table").append($tr);
    },

    /**********************************************************  添加行 end *******************************************************/

    deleteTr($td) {

        if (!$td) {
            return;
        }

        var tdRowSpan = $td.attr("rowspan"),
            $trArr = [],
            $tr = $td.parent();

        $trArr.push($tr);

        if (tdRowSpan && tdRowSpan > 1) {
            var row = +tdRowSpan;

            for (var i = 1; i < row; i++) {
                $trArr.push($trArr[i - 1].next());
            }
        }

        var delCount = $trArr.length;

        for (var j = 0; j < delCount; j++) {
            this.commDeleteTr($trArr[j]);
        }

        return delCount;

    },

    //删除行
    commDeleteTr($tr) {


        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        var $tb = $tr.closest(".tbLayout");

        //插入后处理
        var tbtdLen = 0,
            trtdLen = 0;

        //表格td 的 个数
        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        var TdPosi = this.getTdPosi(tbtdLen, $tb),
            DefectIndex = [],
            tdCol = 0;

        //当前tr td 的个数 如果一样 不需要处理 不一样 需要递归向上处理
        $tr.find("td").each(function (i) {

            var tdColspan = $(this).attr("colspan");

            var tLeft = $(this).offset().left;

            if (tdColspan) {

                trtdLen += parseInt(tdColspan);

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += parseInt(tdColspan);
                        DefectIndex.push(c);
                    } else {
                        tdCol += parseInt(tdColspan);
                        break;
                    }
                }


            } else {

                trtdLen += 1;

                for (var c = tdCol; c < tbtdLen; c++) {

                    if (tLeft != TdPosi[c].X) {
                        tdCol += 1;
                        DefectIndex.push(c);
                    } else {
                        tdCol += 1;
                        break;
                    }
                }

            }

        });

        //后门还有合并的行
        if (tdCol < TdPosi.length) {
            for (var de = tdCol; de < TdPosi.length; de++) {
                DefectIndex.push(de);
            }
        }

        //td 中不止一个元素
        if ($tr.find("td").length > 0) {

            $tr.find("td").each(function (i) {

                //当前有合并的行需要处理
                var $this = $(this),
                    tdRowSpan = $this.attr("rowspan");

                //当前有合并想  合并的行需要移除
                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left;

                    var $cloneTd = $this.clone();
                    $cloneTd.attr("rowspan", parseInt(tdRowSpan) - 1);

                    $tr.next().find("td").each(function () {

                        var tsLeft = $(this).offset().left;

                        if (tsLeft > tLeft) {
                            $(this).before($cloneTd);
                            return false;
                        }

                    });

                    $this.removeAttr("rowspan");
                }

            });


        } else {
            // $tr.remove();
        }


        //么有合并不用处理
        if (trtdLen == tbtdLen) {
            $tr.remove();
            $("#desiContent").removeAttr("style");
            return;
        }

        var $diffRowTr = [];

        //DefectIndex 缺失行的索引 
        $tr.prevUntil().each(function () {

            $(this).find("td").each(function () {

                var $this = $(this);

                var tdRowSpan = $this.attr("rowspan");

                //纯在合并行
                if (tdRowSpan && parseInt(tdRowSpan) > 1) {

                    var tLeft = $this.offset().left,
                        index = 0;

                    $.each(TdPosi, function (i, item) {
                        if (item.X == tLeft) {
                            index = i;
                            return false;
                        }
                    });

                    var removeIndex = 0;
                    //如果刚好是缺失的行 行加一  跳出
                    for (var zp = 0; zp < DefectIndex.length; zp++) {
                        if (index == DefectIndex[zp]) {
                            //$this.attr("rowspan", parseInt(tdRowSpan) - 1); 
                            $diffRowTr.push($this);
                            DefectIndex.splice(zp, 1);
                            removeIndex = zp;
                            break;
                        }
                    }

                    var tdColSpan = $this.attr("colspan");

                    //如果缺失的行还有 colspan
                    if (tdColSpan && parseInt(tdColSpan) > 1) {

                        tdColSpan = parseInt(tdColSpan) - 1;

                        for (var zpl = 0; zpl < tdColSpan; zpl++) {

                            removeIndex += 1;

                            DefectIndex.splice(removeIndex, 1);

                        }
                    }

                }

                //么有了跳出
                if (DefectIndex.length <= 0) {
                    return false;
                }

            });

            if (DefectIndex.length <= 0) {
                return false;
            }

        });

        $.each($diffRowTr, function (i, $item) {
            $item.attr("rowspan", parseInt($item.attr("rowspan")) - 1);
        });

        $tr.remove();
        $("#desiContent").removeAttr("style");
    },

    /***********************************************************  行操作 end  ***************************************************************/


    /***********************************************************  列操作 end  ***************************************************************/

    insertTd($td) {

        if (!$td) {
            return;
        }

        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        // 实现原理 先 追加到 最后，然后重新计算位置
        var $tb = $td.closest(".tbLayout"),
            newTdW = this.reDiffTdWidth($tb),
            $newTd = $('<td/>');
        //新的td
        //td 有宽度
        if (newTdW) {
            $newTd.attr("width", newTdW);
        }
        $newTd.append('<div class="default-ele">&nbsp;</div>');
        var tdStr = $('<div/>').append($newTd).html();


        //追加到最后
        $tb.find("tr").each(function () {
            $(this).append(tdStr);
        });

        //插入后处理
        var tdOffset = $td.offset(),
            tdLeft = tdOffset.left,
            tdRigth = tdOffset.left + $td.width(),
            breakCount = 0;


        $tb.find("tr").each(function () {

            var $tTr = $(this);

            //跳过  
            if (breakCount > 0) {
                $tTr.find("td:last").remove();
                breakCount--;
                return true;
            }



            //遍历没有td 找到 相同位置上的元素
            $tTr.find("td").each(function () {

                var $eTd = $(this),
                    Eoffset = $eTd.offset();

                //找到了
                if (Eoffset.left <= tdLeft && Eoffset.left + $eTd.width() >= tdRigth) {

                    var thisColspan = $eTd.attr("colspan");

                    if (thisColspan && thisColspan > 1) {

                        var newColspan = parseInt(thisColspan) + 1,
                            thisRowSpan = $eTd.attr("rowspan");
                        //合并单元格的行
                        if (thisRowSpan && thisRowSpan > 1) {
                            //减去当前 这一行
                            breakCount = parseInt(thisRowSpan) - 1;
                        }

                        $eTd.attr("colspan", newColspan);

                    } else {
                        $eTd.after(tdStr);
                    }

                    //移除最后一个 是我们自己添加的占位符
                    $tTr.find("td:last").remove();
                    //下一行
                    return false;
                }

            });
        });

        $("#desiContent").removeAttr("style");

    },

    //重新计算td的宽度
    reDiffTdWidth($tb) {

        var $fieldItem = $tb.closest(".fieldItem"),
            isFixedW = $tb.find("tr td:first").attr("width");

        if (isFixedW) {

            var colspan = 0,
                fwidth = $fieldItem.width(),
                tbW = 0;

            $fieldItem.find("table tr:first td").each(function () {

                var tdColspan = $(this).attr("colspan");
                tbW += $(this).width();

                if (tdColspan) {
                    colspan += parseInt(tdColspan);
                } else {
                    colspan += 1;
                }
            });

            //添加一列后的宽度 默认 平分的宽度
            var nW = Math.floor(fwidth / (colspan + 1));

            //重新计算td 的宽度  按比例 减去 宽度
            $fieldItem.find("table tr td").each(function () {

                var $this = $(this),

                    tW = parseInt($this.attr("width"));

                tW -= (tW / tbW * nW);

                tW = tW > 1 && tW || 1;

                tW = Math.floor(tW);

                $this.attr("width", tW);

            });

            return nW;

        }

        //没有计算
        return false;

    },

    //删除表格列
    deleteTd($td) {

        if (!$td || $td.closest("body").length <= 0) {
            return;
        }


        //隐藏滚动条 以免添加行后出现 影响td位置计算
        $("#desiContent").css("overflow", "hidden");

        //实现思路 存在 合并单元格的 处理太复杂 所以 如果有存在合并的 就拆分掉 在 循环遍历处理  一次只删除一个单元格

        var $tb = $td.closest(".tbLayout"),
            tdColspan = $td.attr("colspan"),
            tdRowSpan = $td.attr("rowspan"),
            $tdArr = [];

        //合并单元格的 td
        if (tdColspan && tdColspan > 1 || tdRowSpan && tdRowSpan > 1) {

            //拆分单元格
            this.splitCell($td);
            //动态加载出来的td个数
            var count = parseInt(tdColspan);

            if (count > 0) {
                //所有需要删除的td
                for (var i = 0; i < count; i++) {
                    if ($tdArr.length > 0) {
                        $tdArr.push($tdArr[i - 1].next());
                    } else {
                        $tdArr.push($td);
                    }
                }
            } else {
                $tdArr.push($td);
            }

        } else {
            $tdArr.push($td);
        }

        var delCol = 0,
            self = this;

        $.each($tdArr, function () {

            var $this = this,
                removeOffset = $this.offset(),
                rLeft = removeOffset.left,
                tw = $this.width(),
                rRight = removeOffset.left + tw,
                //缓存td的操作 避免 即时操作 表格变形
                cacheOpTds = [];

            //保留一列 不让删除
            if ($tb.find("tr:first td").length <= 1) {
                $tb.closest(".fieldItem").find(".btnDelField").click();
                return false;
            }

            $tb.find("tr").each(function () {

                //遍历没有td 找到 相同位置上的元素
                $(this).find("td").each(function () {

                    var $eTd = $(this),
                        Eoffset = $eTd.offset();

                    //找到了
                    if (Eoffset.left <= rLeft && Eoffset.left + $eTd.width() >= rRight) {

                        var thisColspan = $eTd.attr("colspan");

                        if (thisColspan && thisColspan > 1) {

                            var newColspan = parseInt(thisColspan) - 1;

                            cacheOpTds.push({
                                $el: $eTd,
                                type: "colspan",
                                colSpan: newColspan
                            });

                        } else {
                            cacheOpTds.push({
                                $el: $eTd,
                                type: "remove"
                            });
                        }
                        //下一行
                        return false;
                    }

                });

            });

            //进行真实的操作 没一列 进行一次操作
            $.each(cacheOpTds, function () {
                if (this.type == "remove") {
                    //平均分列宽
                    self.CellAverage(this.$el);
                    this.$el.remove();
                } else {

                    //减去删除的宽度
                    var newW = this.$el.width() - tw;
                    this.$el.attr("colspan", this.colSpan).attr("width", newW);

                }
            });

            delCol++;

        });

        var $txtCol = $("#controlAttrs .txtCol");
        $txtCol.val(parseInt($txtCol.val()) - delCol);

        //清除滚动条
        $("#desiContent").removeAttr("style");

    },

    //平均分移除td的宽度
    CellAverage($td) {

        var $tds = $td.siblings(),
            nW = $td.width(),
            tbW = $td.parent().width() - nW;

        //重新计算td 的宽度  按比例 减去 宽度
        $tds.each(function () {

            var $this = $(this),

                tW = parseInt($this.attr("width"));

            tW += (tW / tbW * nW);

            tW = Math.floor(tW);

            $this.attr("width", tW);

        });


    },

    //拆分单元格
    splitCell($td) {

        //td 总行数
        var $tb = $td.closest('.tbLayout'),
            tbtdLen = 0,
            thisColspan = $td.attr("colspan");

        //表格td 的 个数
        $tb.find("tr:first td").each(function () {
            var tdColspan = $(this).attr("colspan");
            if (tdColspan) {
                tbtdLen += parseInt(tdColspan);
            } else {
                tbtdLen += 1;
            }
        });

        //每个td的位置
        var TdPosi = this.getTdPosi(tbtdLen, $tb),
            tdOffset = $td.offset(),
            tdRowSpan = $td.attr("rowspan"),
            index = 0;

        $.each(TdPosi, function (i, item) {
            //找到了
            if (item.X == tdOffset.left) {
                index = i;
                return false;
            }
        });

        var strTd = '',
            firstTd = '<td width="' + TdPosi[index].W + '"><div class="tdNull">&nbsp;</div></td>',
            firstW = TdPosi[index].W;

        index++;

        for (var j = 1; j < thisColspan; j++) {
            strTd += '<td width="' + TdPosi[index].W + '"><div class="tdNull">&nbsp;</div></td>';
            index++;
        }

        if (tdRowSpan > 1) {

            //所有需要处理的tr
            var $tr = $td.parent(),
                $trArr = [];

            for (var k = 1; k < tdRowSpan; k++) {

                if ($trArr.length > 0) {
                    $trArr.push($trArr[k - 2].next());
                } else {
                    $trArr.push($tr.next());
                }
            }

            //反转 从最后一个开始处理
            $trArr.reverse();

            if (thisColspan == tbtdLen) {

                $.each($trArr, function () {
                    var $this = this,
                        newRowspan = parseInt($td.attr("rowspan")) - 1;
                    $this.append(firstTd + strTd);
                    $td.attr("rowspan", newRowspan).removeAttr("height");
                });

            } else {

                $.each($trArr, function () {

                    var $this = this;


                    $this.find("td").each(function () {

                        var $ttd = $(this),
                            nextLen = $ttd.next().length,
                            isOffsetF = $ttd.offset().left > tdOffset.left;

                        //找到 或者 最后 加到最后 因为合并单元格在最后
                        if (isOffsetF || nextLen <= 0) {

                            var newRowspan = parseInt($td.attr("rowspan")) - 1;

                            if (!isOffsetF) {
                                $ttd.after(firstTd + strTd);
                            } else {
                                $ttd.before(firstTd + strTd);
                            }

                            $td.attr("rowspan", newRowspan).removeAttr("height");

                            return false;
                        }

                    });

                });
            }

            //当合并 列 大于一的时候 才对原始td进行colspan操作
            if (thisColspan > 1) {
                //原本的td处理
                $td.after(strTd);
                $td.attr("width", firstW).attr("colspan", 1);
            }

        } else {
            $td.after(strTd);
            $td.attr("width", firstW).attr("colspan", 1);
        }


    },

}

export default CellOp;
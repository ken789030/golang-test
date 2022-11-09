var cashDrawPageObj = {

    initEvent: function () {
        //初始化选择器
        $("#onlineDepositUrl").addClass("active");
        //初始化控件--------------------------------------------------
        //申請時間
        var startTime = $('#startTime');
        var endTime = $('#endTime');
        //初始化申請時間
        $('.form_applytime').datetimepicker({
            language: 'zh-CN',
            todayBtn: true,
            minuteStep: 1,
            format: 'yyyy-mm-dd',
            minView: 'month',
            autoclose: true
        });

        startTime.datetimepicker().on("input change", function (e) {
            //跟預設值不一樣就勾起來
            var oriStartTime = $(this).attr("oriStartTime");
            if (oriStartTime != e.target.value) {
                $("#CKApplyTime").prop("checked", true);
            }

        });

        endTime.datetimepicker().on("input change", function (e) {
            //跟預設值不一樣就勾起來
            var oriEndTime = $(this).attr("oriEndTime");
            if (oriEndTime != e.target.value) {
                $("#CKApplyTime").prop("checked", true);
            }

        });

        //时间选择器显示时触发----開始時間不能小於結束時間
        startTime.datetimepicker()
            .on('show', function (ev) {
                startTime.datetimepicker('setEndDate', endTime.val());
            });

        endTime.datetimepicker()
            .on('show', function (ev) {
                endTime.datetimepicker('setStartDate', startTime.val());
                endTime.datetimepicker('setEndDate', new Date());
            });

        //出款時間
        var startDrawTime = $('#startDrawTime');
        var endDrawTime = $('#endDrawTime');
        //初始化出款時間
        $('.form_drawtime').datetimepicker({
            language: 'zh-CN',
            todayBtn: true,
            minuteStep: 1,
            format: 'yyyy-mm-dd',
            minView: 'month',
            autoclose: true
        });

        startDrawTime.datetimepicker().on("input change", function (e) {
            //跟預設值不一樣就勾起來
            var oriStartDrawTime = $(this).attr("oriStartDrawTime");
            if (oriStartDrawTime != e.target.value) {
                $("#CKDrawTime").prop("checked", true);
            }

        });
        endDrawTime.datetimepicker().on("input change", function (e) {
            //跟預設值不一樣就勾起來
            var oriEndDrawTime = $(this).attr("oriEndDrawTime");

            if (oriEndDrawTime != e.target.value) {
                $("#CKDrawTime").prop("checked", true);
            }

        });

        //时间选择器显示时触发----開始時間不能小於結束時間
        startDrawTime.datetimepicker()
            .on('show', function (ev) {
                startDrawTime.datetimepicker('setEndDate', endDrawTime.val());
            });

        endDrawTime.datetimepicker()
            .on('show', function (ev) {
                endDrawTime.datetimepicker('setStartDate', startDrawTime.val());
                endDrawTime.datetimepicker('setEndDate', new Date());
            });

        var newStartTime = $('#newStartTime');
        var newEndTime = $('#newEndTime');
        $('.form-newSearchTime').datetimepicker({
            language: 'zh-CN',
            todayBtn: true,
            minuteStep: 1,
            format: 'yyyy-mm-dd',
            minView: 'month',
            autoclose: true
        });
        newStartTime.datetimepicker().on("input change", function (e) {
            var ckTime = Number($("#setCkTimeId").val());
            //跟預設值不一樣就勾起來
            var oriStartTime = $(this).attr("oriStartTime");
            if (oriStartTime != e.target.value) {
                if (ckTime < 0) {
                    $("#setCkTimeId").val(0);
                    $("#dropTypeTime").html("全部");
                }
            }

        });
        newEndTime.datetimepicker().on("input change", function (e) {
            var ckTime = Number($("#setCkTimeId").val());
            //跟預設值不一樣就勾起來
            var oriEndTime = $(this).attr("oriEndTime");
            if (oriEndTime != e.target.value) {
                if (ckTime < 0) {
                    $("#setCkTimeId").val(0);
                    $("#dropTypeTime").html("全部");
                }
            }

        });
        newStartTime.datetimepicker()
            .on('show', function (ev) {
                newStartTime.datetimepicker('setEndDate', newEndTime.val());
            });

        newEndTime.datetimepicker()
            .on('show', function (ev) {
                newEndTime.datetimepicker('setStartDate', newStartTime.val());
                newEndTime.datetimepicker('setEndDate', new Date());
            });
        $("#searchForm").submit(function (event) {
            var setCkTimeIdvar = Number($('#setCkTimeId').val());
            var startTime = Date.parse(new Date($('#newStartTime').val()));
            var endTime = Date.parse(new Date($('#newEndTime').val()));
            if ((setCkTimeIdvar >= 0) && (startTime > endTime)) {
                $.altDialog({title: '温馨提示', content: '开始日期不能大于结束日期！'});
                return false;
            }
        });
        //进阶条件搜索
        $("#searchAdvBtn").click(function () {
            goSubmit();
        });


        //勾選分組，用戶分組條件打勾
        $("input[name='groupIds']").change(function () {


            if ($('[name="groupIds"]:checked').length > 0) {
                $("#CKUserGroup").prop("checked", true);
            } else {
                $("#CKUserGroup").prop("checked", false);
            }

        });

        //進階查詢 用戶分組 全選，全不選
        $("input[name='CKUserGroup']").change(function () {
            if (this.checked) {
                $("input[name='groupIds']").each(function () {
                    $(this).prop("checked", true);
                });
            } else {
                $("input[name='groupIds']").each(function () {
                    $(this).prop("checked", false);
                });
            }
        });

    },
    initPageObj: function () {
        this.initEvent();
    }
};
function setCkTime(type) {
    switch (type) {

        case 0:
            $("#setCkTimeId").val(0);
            $("#dropTypeTime").html("全部");
            break;
        case 1:
            $("#setCkTimeId").val(1);
            $("#dropTypeTime").html("提交时间");
            break;
        case 2:
            $("#setCkTimeId").val(2);
            $("#dropTypeTime").html("操作时间");
            break;
    }
}

function setCkTimeOrderBy(type) {
    switch (type) {
        case 0:
            $("#setCkTimeIdOrderBy").val(0);
            $("#dropTypeTimeOrderBy").html("降序");
            break;
        case 1:
            $("#setCkTimeIdOrderBy").val(1);
            $("#dropTypeTimeOrderBy").html("升序");
            break;
    }
}

function goSubmit() {
    var CKApplyTime = $("#CKApplyTime");
    var CKDrawTime = $("#CKDrawTime");

    // 時間檢查
    if (CKApplyTime.prop("checked") && Date.parse(new Date($('#startTime').val())) > Date.parse(new Date($('#endTime').val()))) {
        CKApplyTime.prop("checked", false);
        alertMsgDialog(10);
        return false;
    } else if (CKDrawTime.prop("checked") && Date.parse(new Date($('#startDrawTime').val())) > Date.parse(new Date($('#endDrawTime').val()))) {
        CKDrawTime.prop("checked", false);
        alertMsgDialog(11);
        return false;
    } else if ((Number($('#setCkTimeId').val()) >= 0) && (Date.parse(new Date($('#newStartTime').val())) > Date.parse(new Date($('#newEndTime').val())))) {
        $.altDialog({title: '温馨提示', content: '开始日期不能大于结束日期！'});
        return false;
    } else {
        console.log("searchForm");
        $("#searchForm").submit();
    }
}

//強制查詢欄位的開始時間跟結束時間只能輸入數字與dash(-)
function checkCharacterIfChineseOrNot() {
    $('#newStartTime,#newEndTime').on("input", function () {
        var re = /^\d+[-]*\d*[-]*\d*$/;
        //有輸入非數字的時候,強制刪除不合法的字元
        if (!re.test(this.value)) {
            this.value = /^\d+[-]*\d*[-]*\d*/.exec(this.value);
        }
    })
}

var the_timeout;
$(window).ready(function () {
    cashDrawPageObj.initPageObj();
});

function checkFuntion(txt) {
    $("#checkedText").html(txt);
    if (txt == '用户账号') {
        $("input[name=searchType]").val(0);
        //setType(0);
    } else if (txt == '出款单号') {
        $("input[name=searchType]").val(1);
        //setType(0);
    } else {
        $("input[name=searchType]").val(2);
        //setType(-1);
    }

}
function setTimeFun(time) {
    switch (time) {
        case 0:
            $("#dropTime").html("不启用");
            $("#sTime").val("0");
            break;
        case 1:
            $("#dropTime").html("30秒");
            $("#sTime").val("30");
            setTime = 30;
            break;
        case 2:
            $("#dropTime").html("60秒");
            $("#sTime").val("60");
            setTime = 60;
            break;
        case 3:
            $("#dropTime").html("300秒");
            $("#sTime").val("300");
            setTime = 300;
            break;
        case 4:
            $("#dropTime").html("15秒");
            $("#sTime").val("15");
            setTime = 15;
            break;
        default:
            break;
    }


    if (time == 0 || time == 5) {
        clearTimeout(the_timeout);
    }
    else {
        clearTimeout(the_timeout);
        the_timeout = setInterval('timedown()', parseInt(setTime * 1000));
    }
}

function setType(type) {
    switch (type) {
        case -1:
            $("#setTypeId").val(-1);
            $("#dropType").html("全部");
            break;
        case 1:
            $("#setTypeId").val(1);
            $("#dropType").html("已确认");
            break;
        case 2:
            $("#setTypeId").val(2);
            $("#dropType").html("已取消");
            break;
        case 3:
            $("#setTypeId").val(3);
            $("#dropType").html("已拒绝");
            break;
//	case 4:
//		$("#setTypeId").val(4);
//		$("#dropType").html("已审批");
//		break;
        case 0:
            $("#setTypeId").val(0);
            $("#dropType").html("未确认");
            break;
    }
    console.log("setTypeId");
    //goSubmit();
}

function timedown() {
    //下拉選單操作時不送表單
    if ($('.open').length >= 1) {
        return false;
    } else {
        goSubmit();
    }

}

//進階查詢取消後恢復秒數刷新
function searchAdvCnl() {
    if (setTime == 0) {
        clearTimeout(the_timeout);
        $("#dropTime").html("不启用");
    }
    else if (setTime != -1 && setTime != 0) {
        the_timeout = setInterval('timedown()', parseInt(setTime * 1000));
        $("#dropTime").html(setTime + "秒");
    }
    operate = false;
    diposeOperate = false;
}
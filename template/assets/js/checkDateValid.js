function checkDateValid(startDate, EndDate, required) {
    console.log(startDate, EndDate, required)
    var errorStr = "";
    //針對輸入格內日期做格式上的判斷
    var reg = /^([0-9]{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01]))*$/
    var error = false;
    if ((startDate != null && startDate != "" ) || (EndDate != null && EndDate != "")) {
        //開始日期有填寫就判斷格式，無填寫就跳出提醒
        if (!error) {
            if (startDate != null && startDate != "") {
                if (!reg.test(startDate) || !checkDateFormat(startDate) || new Date(transDate(startDate)) > new Date(transDate(new Date()))) {
                    errorStr = "温馨提示：日期格式错误";
                    error = true;
                }
            } else {
                errorStr = "温馨提示：请输入开始日期";
                error = true;
            }
        }
        //结束日期有填寫就判斷格式，無填寫就跳出提醒
        if (!error) {
            if (EndDate != null && EndDate != "") {
                if (!reg.test(EndDate) || !checkDateFormat(EndDate) || new Date(transDate(EndDate)) > new Date(transDate(new Date()))) {
                    errorStr = "温馨提示：日期格式错误";
                    error = true;
                }
            } else {
                errorStr = "温馨提示：请输入结束日期";
                error = true;
            }
        }
        //開始(結束)日期皆有填寫以及格式正確，判斷開始日期是否大於結束日期
        if (!error) {
            if (new Date(startDate) > new Date(EndDate)) {
                errorStr = "温馨提示：开始日期不能大于结束日期！";
                error = true;
            }
        }
    }
    if (required) {
        if ((startDate == null || startDate == "" ) && (EndDate == null || EndDate == "")) {
            errorStr = "温馨提示：请输入日期！";
            error = true;
        }
    }
    return errorStr;
}

//判斷日期是否有效
function checkDateFormat(date) {
    return (new Date(date).getDate() == date.substr(date.length - 2));
}

//current Date 取得年月日
function transDate(date) {
    var d = new Date(date);
    var newValue = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return newValue;
}

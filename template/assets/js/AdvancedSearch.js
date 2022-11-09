/**
 * 进阶选项自动生成工具
 * 
 * quickTime	日期选择快速生成 
 * 		例 <div class="quickTime" start="startSubmitTime" end="endSubmitTime" pattern="yyyy-MM-dd HH:mm:ss" ></div>
 * 			class quickTime 为抓取关键字
 * 			start	为开始日期的input的id
 * 			end 为结束日期的input的id
 * 			pattern 为格式化日期的格式 
 * 			还有个 options 可选 clear:"清空",today:"今日",yesterday:"昨日",thisweek:"本周",lastweek:"上周",thismonth:"本月",lastmonth:"上月",thisfq:"本季",prevfq:"上季",thisfy:"本年",prevfy:"去年"
 * 			填哪个就出现哪个按钮
 * 				例 <div ...    options="clear,today,yesterday" >  填写了 清空 今日 昨日 生成的下拉框出现对应3个按钮
 * 
 * 其它待添加
 */
(function($){
	$.fn.quickTime = function (options) {
        var options = $.extend({
        	startDateTime:"",
        	endDateTime:"",
        	pattern:"yyyy-MM-dd HH:mm:ss",
        	options:["clear","today","yesterday","thisweek","lastweek","thismonth","lastmonth"]
		},options);
        var language = {
        	title:"\u5feb\u901f\u9009\u62e9",//快速选择
        	clear:"\u6e05\u7a7a",//清空								
    		today:"\u4eca\u65e5",//今日
    		yesterday:"\u6628\u65e5",//昨日
    		thisweek:"\u672c\u5468",//本周
    		lastweek:"\u4e0a\u5468",//上周
    		thismonth:"\u672c\u6708",//本月
    		lastmonth:"\u4e0a\u6708",//上月
    		thisfq:"\u672c\u5b63",//本季
    		prevfq:"\u4e0a\u5b63",//上季
    		thisfy:"\u672c\u5e74",//本年
    		prevfy:"\u53bb\u5e74"//去年
    	};
        return this.each(function (i,v) {
        	var $this = $(this);
        	
        	options.pattern = $this.attr("pattern") || options.pattern;
        	options.startDateTime = $this.attr("start") || options.startDateTime;
        	options.endDateTime = $this.attr("end") || options.endDateTime;
        	var checkboxId = $this.attr("checkboxId") ;
        	
        	var ops = $this.attr("options");
        	if(ops) options.options = ops.split(",");
        	
        	$this.addClass("btn-group");
        	var $btn = $("<button id='quickTimeBtn_"+i+"' type='button' class='btn btn-default btn-sm dropdown-toggle' data-toggle='dropdown' aria-expanded='true'>"+language.title+"&nbsp;<span class='caret'></span></button>");
        	$btn.appendTo($this).click(function(){
        		//某些页面冲突 直接添加按钮都无法使用 使用事件强制打开快速选择菜单
        		setTimeout(function(){ 
        			if(!$this.hasClass("open")) $this.addClass("open");	 
        		},1);
        	});
        	var $ul = $("<ul class='dropdown-menu' dropdown='false' role='menu' aria-labelledby='quickTimeBtn_"+i+"'></ul>");
        	var id = i;
        	$.each(options.options,function(i,val) {
        		$li = $("<li></li>");
        		var startid = options.startDateTime,endid = options.endDateTime;
        		$("<a href='javascript:void(0);'>"+language[val]+"</a>").click(function(){setDate(id,val,startid,endid,checkboxId);}).appendTo($li);
        		$ul.append($li);
        	});
        	$this.append($ul);
        });
        
        /**
         * 部分暂未使用 不实现
         */
        function setDate(id,type,start,end,checkboxId) {
        	$("#quickTimeBtn_"+id).html(language[type]+"&nbsp<span class='caret'</span>");
			var $startDateTimeInp = $("#" + start );
			var $endDateTimeInp = $("#" + end );
			var millisecond = 1000 * 60 * 60 * 24;
			var currentDate = new Date();

			//除了清空 自動勾選
			if(checkboxId ){
				if(type != "clear"){
					$("#"+checkboxId).prop( "checked", true ); 
				}else{
					$("#"+checkboxId).prop( "checked", false );
				}
			}
		

			if (type == "clear") {
				$startDateTimeInp.val("");
				$endDateTimeInp.val("");
			} else if (type == "today") {// 当前日期
				var today = new Date().format("yyyy-MM-dd");
				$startDateTimeInp.val(new Date(strToDate(today + " 00:00:00"))
						.format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(today + " 23:59:59"))
						.format(options.pattern));
			} else if (type == "yesterday") {// 昨天
				var today = new Date(new Date().getTime() - millisecond)
						.format("yyyy-MM-dd");
				$startDateTimeInp.val(new Date(strToDate(today + " 00:00:00"))
						.format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(today + " 23:59:59"))
						.format(options.pattern));
			} else if (type == "tomorrow") { // 明天
				
			} else if (type == "thisweek") {// 本周
				var week = currentDate.getDay();
				var month = currentDate.getDate();
				var minusDay = week != 0 ? week - 1 : 6;
				var monday = new Date(currentDate.getTime()
						- (minusDay * millisecond));
//				var sunday = new Date(monday.getTime() + (6 * millisecond));
				$startDateTimeInp.val(new Date(strToDate(monday.format("yyyy-MM-dd") + " 00:00:00"))
						.format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(currentDate.format("yyyy-MM-dd") + " 23:59:59"))
						.format(options.pattern));
			} else if (type == "lastweek") {// 上周
				var week = currentDate.getDay();
				var month = currentDate.getDate();
				var minusDay = week != 0 ? week - 1 : 6;
				var currentWeekDayOne = new Date(currentDate.getTime()
						- (millisecond * minusDay));
				var priorWeekLastDay = new Date(currentWeekDayOne.getTime()
						- millisecond);
				var priorWeekFirstDay = new Date(priorWeekLastDay.getTime()
						- (millisecond * 6));
				$startDateTimeInp.val(new Date(strToDate(priorWeekFirstDay.format("yyyy-MM-dd")
						+ " 00:00:00")).format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(priorWeekLastDay.format("yyyy-MM-dd")
						+ " 23:59:59")).format(options.pattern));
			} else if (type == "nextweek") {// 下周

			} else if (type == "thismonth") {// 本月
				var currentMonth = currentDate.getMonth();
				var currentYear = currentDate.getFullYear();
				var firstDay = new Date(currentYear, currentMonth, 1);
				if (currentMonth == 11) {
					currentYear++;
					currentMonth = 0;
				} else {
					currentMonth++;
				}
				var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
//				var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
				$startDateTimeInp.val(new Date(
						strToDate(firstDay.format("yyyy-MM-dd") + " 00:00:00"))
						.format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(currentDate.format("yyyy-MM-dd") + " 23:59:59"))
						.format(options.pattern));
			} else if (type == "lastmonth") {// 上个月
				var currentMonth = currentDate.getMonth();
				var currentYear = currentDate.getFullYear();
				var priorMonthFirstDay = getPriorMonthFirstDay(currentYear,
						currentMonth);
				var priorMonthLastDay = new Date(priorMonthFirstDay
						.getFullYear(), priorMonthFirstDay.getMonth(),
						getMonthDays(priorMonthFirstDay.getFullYear(),
								priorMonthFirstDay.getMonth()));
				$startDateTimeInp.val(new Date(strToDate(priorMonthFirstDay.format("yyyy-MM-dd")
						+ " 00:00:00")).format(options.pattern));
				$endDateTimeInp.val(new Date(strToDate(priorMonthLastDay.format("yyyy-MM-dd")
						+ " 23:59:59")).format(options.pattern));
			} else if (type == "nextmonth") {// 下个月

			} else if (type == "thisfy") {// 本年

			} else if (type == "prevfy") {// 去年

			} else if (type == "nextfy") {// 明年

			} else if (type == "nextfq") {// 下季度

			} else if (type == "prevfq") {// 上季度

			} else if (type == "thisfq") {// 本季度

			} else {

			}
		}
    };
}(jQuery));

(function(){
	$(window).ready(function() {
		setTimeout(function(){//让其它组件先初始化 防止冲突 特别是 dropdown-menu 这个Class的冲突
			$(".quickTime").quickTime();
			//$('.dropdown-toggle').dropdown();
		},10);
	});
})();




//-------------------------------------------------日期工具-------------------------------------------------
Date.prototype.format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时 
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/** 
 * 返回上一个月的第一天Date类型 
 * @param year 年 
 * @param month 月 
 **/   
function getPriorMonthFirstDay(year,month){   
    if(month==0){   
        month=11;    
        year--;    
        return new Date(year,month,1);   
    }   
    month--;   
    return new Date(year,month,1);;   
};
/** 
 * 获得该月的天数 
 * @param year年份 
 * @param month月份 
 * */ 
function getMonthDays(year,month){   
    var relativeDate=new Date(year,month,1);   
    var relativeMonth=relativeDate.getMonth();   
    var relativeYear=relativeDate.getFullYear();   
    if(relativeMonth==11){   
        relativeYear++;   
        relativeMonth=0;   
    }else{   
        relativeMonth++;   
    }   
    var millisecond=1000*60*60*24;   
    var nextMonthDayOne=new Date(relativeYear,relativeMonth,1);   
    return new Date(nextMonthDayOne.getTime()-millisecond).getDate();   
}; 
function strToDate(str){
	return new Date(str.replace(/-/g,"/"));
}
/**
 * dropdown
 * 
 * 下拉框通用js
 * 
 * 最好用id选择 一个下拉框写一个id
 * 
 * 需要在  dropdown-menu 的 a 标签上添加 value 属性  属性为自定义的 可以起任意名称 通过 valueName 参数传递即可 默认为value
 * 
 * 
 * $('.dropdown').dropdown({
 * 	   name:"selectName"				form提交到后台的name
 * 	   current_value:"",					当前值 用于默认高亮
 *    callback:function(val){			onchange 回调  可以返回一个 boolean false 就阻止本次的change  也可不返回  默认true
 *     // val 是a标签上的 value 的值
 *   	   alert(val);
 *    }
 *  });
 *	        
 * 
 */
(function ($) {
	
	/**
	 * 用于表单提交校验
	 * 验证下拉框是否有选中内容
	 * 
	 * 获得指定dropdown 是否有选中选项信息
	 * obj 			需要判断的 dropdown ul  Jquery 对象 $("#对象id") 传递进来
	 * isAlert 		没有选中内容 是否弹出候选列表 进行提示
	 * @return boolean 下拉框是否有选中内容
	 */
	$.dropdownSel = function($obj,isAlert){
		var option = $obj.find(".currentSelect");
	    var flag = option && option.length > 0;
	    if(!flag && isAlert)
	    	$obj.parent().find("button").click();
	    return flag;
	}
	
	/**
	 * 获得当前值
	 * @return dropdown 当前 value
	 */
	$.fn.dropdownValue = function(){
		var $this = $(this);
		var options =  $this.data("options");
		return options.current_value;
	}
	
	/**
	 * 获得选择项
	 * @return dropdown 当前 选择项
	 */
	$.fn.dropdownSel = function(){
		var $this = $(this);
		var options =  $this.data("options");
		return $this.find(".currentSelect").attr(options.valueName);
	}
	
	/**
	 * 修改dropdown的当前选中值
	 * 当前对象必须调用过dropdown方法
	 * @return boolean 是否修改成功 基于callback的返回值
	 */
	$.fn.dropdownSelChange = function(value){
		var $this = $(this);
		var opts = $this.find("a[notOption!='true']");
		var $btn = $this.parent().find("button");
		var options =  $this.data("options");
		var valConfirm;
		opts.each(function(){
			var option = $(this);
			var thisVal = option.attr(options.valueName);
			
			if(thisVal == value) {
				if(options.callback && typeof(options.callback)=="function") valConfirm = options.callback(thisVal,option);
				if(valConfirm !=undefined && !valConfirm) return;
				
				options.current_value = thisVal;
				option.css("background","lightgrey");
				option.addClass("currentSelect")
				if($btn && $btn.length>0)$btn.html(option.html()+options.btnCaretTxt);
				if(options.afterCallback && typeof(options.afterCallback)=="function") options.afterCallback(thisVal,option);
				$this.data("options",options);
			 }else{
				 option.removeAttr("style");
				 option.removeClass("currentSelect");
			 }
		});
		if(valConfirm !=undefined && !valConfirm) return false;
		var hInp=$this.data("hInp");
		hInp.val(value);
		return true;
	}
	
	/**
	 * 主动调用回调
	 */
	$.fn.dropdownCallBack = function(){
		var $this = $(this);
		var options =  $this.data("options");
		var opts = $this.find(".currentSelect");
		var thisVal = opts.attr(options.valueName);
		if(options.callback && typeof(options.callback)=="function") 
			options.callback(thisVal,opts);
	}
	
    $.fn.dropdown = function (options) {
        var options = $.extend({}, $.fn.dropdown.defaults, options);
        return this.each(function () {
        		var $this = $(this);
        		
        		//过滤禁用 dropdown的ul 防止某些愚蠢的人类 使用 $('.dropdown-menu') 初始化菜单
        		var isDropdown = $this.attr('dropdown') || $this.prop('dropdown');
        		if(isDropdown && isDropdown == 'false') return;
        		
        		var $btn = $this.parent().find("button");
        		var $inp = $this.parent().find("input[type='text']");
        		var opts = $this.find("a[notOption!='true']");
        		var btnCaretTxt = options.btnCaretTxt;
        		$this.data("options",options);
        		
        		if(options.isScroll){
        			if(opts.length>12)
        				$this.css({"height":"300px","overflow-y":"scroll"});
        			else
        				$this.css({'height':'','overflow-y':'','left':'inherit'});
        		}		
        		
        		//如果默认配置了true,则值直接从页面取
        		if(options.isDefault){
        			options.name=$this.attr("name");
        			var currentValue=$this.attr("value");
        			if(currentValue) options.current_value=currentValue;
        			var dataType=$this.attr("dataType");
        			if(dataType && !$.StringUtils.isEmpty(dataType)){
        			   options.dataType=dataType;
        			}else{
        				options.dataType="String";
        			}
        		}
        		var hInp=$this.data("hInp");
        		if(!hInp){
        	    hInp = $('<input type="hidden"  style="display:none;" name="' + options.name + '" value="'+ options.current_value +'" dataType="'+options.dataType+'"  />'); 
        		var validate=$this.attr("validate");
        	    if(validate){
        	       hInp.attr("validate",validate);
        	    }
        	    $this.after(hInp);
        		$this.data("hInp",hInp);
        		}
        		opts.each(function(){
        			var option = $(this);
    				var thisVal = option.attr(options.valueName);
    				if(thisVal == options.current_value) {
    					var valConfirm;
    					if(options.isDefBack)if(options.callback && typeof(options.callback)=="function") valConfirm = options.callback(thisVal,option);
    					if(valConfirm !=undefined && !valConfirm) return;
    					
    					if(options.isDefBack)if(options.afterCallback && typeof(options.afterCallback)=="function") options.afterCallback(thisVal,option);
    					
    					option.css("background","lightgrey");
    					option.addClass("currentSelect")
    					if($btn && $btn.length>0)$btn.html(option.html()+btnCaretTxt);
    					if($inp && $inp.length>0)$inp.val(option.html());
    					options.afterSetText($btn);
    				}
    				option.click(function(event){
        				if((!options.current_value || !thisVal) || thisVal != options.current_value){
        					var valConfirm;
        					if(options.callback && typeof(options.callback)=="function") valConfirm = options.callback(thisVal,option);
        					if(valConfirm !=undefined && !valConfirm) return;
        					
        					if($btn && $btn.length>0)$btn.html(option.html()+btnCaretTxt);
        					if($inp && $inp.length>0)$inp.val(option.html());
        					options.afterSetText($btn);
        					
        					options.current_value = thisVal;
        					$this.data("options",options);
        					hInp.val(thisVal);
        					hInp.focusout();
        					opts.each(function(){
        						$(this).removeAttr("style");
        						$(this).removeClass("currentSelect");
        					});
            				option.css("background","lightgrey");
            				option.addClass("currentSelect");
            				if(options.afterCallback && typeof(options.afterCallback)=="function") options.afterCallback(thisVal,option);
        				}
        			});
        		});
        		
        });
    };

    $.fn.dropdown.defaults = {
    	btnCaretTxt:"&nbsp;<span class='caret'></span>",
    	valueName:"value",
    	current_value:"",
    	name:"",
    	isDefault:false,
    	isScroll:false,						//内容过多时是否出现滚动条
    	dataType:"String",
    	isDefBack:false,					//默认选中 是否触发一次 callback 回调
		afterSetText:function(btn){
			    		
    	}
    };

})(jQuery);

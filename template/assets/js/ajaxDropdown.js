(function ($) {
    $.fn.ajaxDropdown = function (options,config) {
        return this.each(function () {
        	    if(options){
        		var $this = $(this);
        		if(options instanceof Object){
        			  options = $.extend({}, $.fn.ajaxDropdown.defaults, options);
        			  var ajaxDropdown=new AjaxDropdown(options,$this);
        			  ajaxDropdown.init();
        			  $this.data("ajaxDropdown",ajaxDropdown);
          	    }else{
          	    	$this.data("ajaxDropdown")[options](config);
          	    }}
        });
    };
    function AjaxDropdown(options,target,config){
    	var self=this;
        this.init=function(){
        	self.$button=target;
        	self.$ul=target.next("ul");
        	self.options=options;
        	if(options.isAutoLoad==true){
        		self.load();
        	}
        };
        this.load=function(){
        	 $.ajax({
				 url:self.options.url,
				 type:"post",
				 dataType:"json",
				 data: $.extend({},self.options.params,self.options.paramsFn()),
				 cache:false,
				 success: function(datas){
					 self.options.loadSuccess(datas);
					 if(datas&&datas instanceof Array&&datas.length>0){
						 for(var i=0;i<datas.length;i++){
							 var data=datas[i];
							 var $li=$("<li></li>");
							 self.$ul.append($li);
							 var $a=$('<a href="javascript:void(0);" value="'+data[self.options.value]+'" notOption="'+data['notOption']+'" >'+data[self.options.text]+'</a>');
							 $li.append($a);
							 $a.data("data",data);
						 }
						 self.$ul.dropdown({
							 isDefault:true,
							 afterCallback:self.options.selectAfter,
							 afterSetText:self.options.afterSetText
							 });
					 }
				 }
			 }); 
        },
        this.reload=function(){
        	self.$ul.html("");
        	self.load();
        },
        this.setValue=function(config){
        	self.$button.html(config.text+"&nbsp;<span class='caret'></span>");
        	self.$ul.data("hInp").val(config.value);
        	self.$ul.find("a").css("background","").removeClass("currentSelect");
        	self.$ul.find("a[value='"+config.value+"']").css("background","lightgrey").addClass("currentSelect");
        },
        this.clearOptions=function(){
        	$ul.find("a[notOption!='true']").parent("li").remove(); 
        }
    }
    
    
    
    $.fn.ajaxDropdown.defaults = {
    	url:"",
    	isAutoLoad:true,
    	text:"text",
    	value:"value",
    	params:{},
    	paramsFn:function(){},
    	loadSuccess:function(datas){},
    	selectAfter:function(value,target){},
    	afterSetText:function(btn){
    		
    	}
    };

})(jQuery);

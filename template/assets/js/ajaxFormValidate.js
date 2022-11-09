(function ($) {
    $.fn.ajaxFormValidate = function (options) {
    	var validateResult=false;
    	var $form=this;
    	options=$.extend({}, $.fn.ajaxFormValidate.defaults, options);
    	var params={};
    	FormUtils.form2Entity($form.attr("id"),params);
        $.ajax({
    		 url:$form.attr("action")+"/validate",
    		 type:"post",
    		 data:$.extend({},params,options.params,options.paramsFn()),
    		 cache:false,
    		 async:false,
    		 success: function(result){
    			 validateResult=result.status;
    			 if(validateResult==false){
    				 bootbox.alert(result.content);
    			 }
    		 }}
        );
        return validateResult;
    };
    
    $.fn.ajaxFormValidate.defaults = {
        	params:{},
        	paramsFn:function(){}
    }
    
})(jQuery);

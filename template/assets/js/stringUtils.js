/**
 * author ganqd
 */
;(function($){
	$.StringUtils = $.StringUtils || {};
	$.extend($.StringUtils,{
		getEntityName : function(objectName){
			var objectProp = (objectName.substr(objectName.lastIndexOf(".")+1));
			objectProp = (objectProp.substring(0,1).toLowerCase())+objectProp.substring(1,objectProp.length);
			return objectProp;
		},
		getEntityId : function(objectName){
			return $.StringUtils.getEntityName(objectName)+"Id";
		},
		firstLowerCase : function(str){
			return str.substring(0,1).toLowerCase()+str.substring(1,str.length);
		},
		firstUpperCase : function(str){
			return str.substring(0,1).toUpperCase()+str.substring(1,str.length);
		},
		isEmpty : function(str){
			if(str == undefined || str == "" || str === "" || str == null || str === null || str.length<1){
				return true;
			}else{
				return false;	
			}
		},
		leftTrim : function(str){
			return str.replace(/(^[\s]*)/,"");
		},
		rightTrim : function(str){
			return str.replace(/(\s*$)/g,"");
		},
		allTrim : function(str){
			return str.replace(/\s+/g,"");
		}
	});
})(jQuery);
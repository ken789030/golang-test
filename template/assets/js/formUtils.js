FormUtils={
};
//把实体的值赋值到form去
FormUtils.entity2Form=function(entity,formId){
	FormUtils.entity2FormPrefix("",entity,formId);
};

FormUtils.entity2FormPrefix=function(entityName,entity,formId){
	var form=$("#"+formId);
	//如果有找到form
	if(form[0]){
     for(var name in entity){
    	 var value=entity[name];
    	 if(typeof value == "object"){
    		 if(value&&value!=null){
    		 value=new Date(value.time).toFormatString();
    		 }
    	 }else if(typeof value=="boolean"){
    		 value=value+""; 
    	 }
       var inputName=name;
       if(!$.StringUtils.isEmpty(entityName)){
    	   inputName=entityName+"."+name;
       }
       form.find("input[name='"+inputName+"'],select[name='"+inputName+"'],textarea[name='"+inputName+"']").val(value);
     }
    }
};


FormUtils.DataType={
		Integer:"Integer"
};


//把form的值设置到实体
FormUtils.form2Entity=function(formId,entity){
	var form=$("#"+formId);
	//如果有找到form
	if(form[0]){
		form.find("input,select,textarea").each(function(index,input){
		    if(input.type&&input.type.toLowerCase()=="radio"){
			 if(input.checked){
				 entity[input.name]=input.value;
	           }
			 //ck是表格的checkbox的name
			 }else if(input.type&&input.type.toLowerCase()=="checkbox" && input.name && input.name!='ck'){
				 if(input.checked){
					 if(!entity[input.name]){
						 entity[input.name] = new Array();
					 }
					 entity[input.name].push(input.value);
		           }
			 } else{
				 var value=input.value;
				 if($(input).attr("dataType")==FormUtils.DataType.Integer){
					 value=parseInt(value);
				 }
				 entity[input.name]=value;
			 }
		});
	}
};
//重置form
FormUtils.resetForm=function(formId){
	var form=$("#"+formId);
	//如果有找到form
	if(form[0]){
		form.find("input,select,textarea").each(function(index,inputDom){
			var input=$(inputDom);
			var ignore=input.attr("ignore");
			if(ignore!="true"){
			  if(inputDom.type&&inputDom.type.toLowerCase()=="checkbox"){
				  inputDom.checked=false;
			  }else{
				  input.val("");
			  }
			}
		});
	}
};
//禁用form
FormUtils.disabledForm=function(formId){
	var form=$("#"+formId);
	//如果有找到form
	if(form[0]){
		form.find("input,select,textarea").each(function(index,inputDom){
			var input=$(inputDom);
			   input.attr("disabled","disabled");
			   if(input.attr("comboname")){
				   input.combobox("disable");
			   }
		});
	}
};
//form设成只读
FormUtils.readOnlyForm=function(formId){
		var form=$("#"+formId);
		//如果有找到form
		if(form[0]){
			form.find("input,select,textarea").each(function(index,inputDom){
				var input=$(inputDom);
				FormUtils.readOnlyInput(input);
			});
		}		
};
//设成只读
FormUtils.readOnlyInput=function(input){
			   input.attr("readonly","readonly");
			   if(input.attr("comboname")){
			   	   input.combobox("readonly");
			   }
			   input.css("background-color","#F0F0F0");
			   input.click(function(){
				   $(this).select();
			   });
};
FormUtils.findByName=function(formId,name){
	var formInput=$("#"+formId+" input[name='"+name+"'],select[name='"+name+"'],textarea[name='"+name+"']");
	if(formInput[0]){
		return formInput;
	}
	return null;
};
FormUtils.readOnlyByName=function(formId,name){
	FormUtils.readOnlyInput(FormUtils.findByName(formId,name));
}
FormUtils.removeReadOnlyByName=function(){
	var input=FormUtils.findByName(formId,name);
	 input.removeAttr("readonly");
	   if(input.attr("comboname")){
	   	   input.combobox("readonly",false);
	   }
	   input.css("background-color","while");
	   input.unbind("click");
}
FormUtils.Date2String=function(date,format){
	if(!format||typeof format !="string"){
		format="yyyy-MM-dd";
	}
	if (date&&date!=null&&date.time) {
		var str = new Date(date.time).format(format);
		return str;
	} else {
		return "";
	}
};
FormUtils.getNowStr=function(){
	var now=new Date();
	return FormUtils.Date2String({time:now.getTime()});
}

FormUtils.getUrlParameter=function(paramName){
        var returnVal = "";
        try {
            var paramUrl = window.location.search;
            //处理长度
            if (paramUrl.length > 0) {
                paramUrl = paramUrl.substring(1, paramUrl.length);
                var paramUrlArray = paramUrl.split("&");
                for (var i = 0; i < paramUrlArray.length; i++) {
                    if (paramUrlArray[i].toLowerCase().indexOf(paramName.toLowerCase()) != -1) {
                        var temp = paramUrlArray[i].split("=");
                        if (temp[0].toLowerCase() == paramName.toLowerCase()) {
                            returnVal = temp[1];
                            break;
                        }
                    }
                }
            }
        }
        catch (e) { }
        return returnVal;
};


FormUtils.validateIDNumber = function (idNumber){
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子   
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X   
	var iSum=0 ;
	var info="" ;
	//基本长度，格式校验
	if(!/^\d{17}(\d|x)$/i.test(idNumber)&&!/^\d{15}$/i.test(idNumber)){
		return false; //"你输入的身份证长度或格式错误";	
	} 
	//15位补全18位
	if (idNumber.length==15){
	  idNumber=idNumber.substring(0,6)+"19"+idNumber.substring(6,15);
	  idNumber=idNumber+GetVerifyBit(idNumber);
	 }
	//校验地区码
	if(aCity[parseInt(idNumber.substr(0,2))]==null){
		return false ;//"你的身份证地区非法";
	} 
	sBirthday=idNumber.substr(6,4)+"-"+Number(idNumber.substr(10,2))+"-"+Number(idNumber.substr(12,2));
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
		return false ;//"身份证上的出生日期非法";
	}
	//x转a(后面计算校验码)
	idNumber=idNumber.replace(/x$/i,"a");
	 for(var i = 17;i>=0;i --){
		  iSum += (Math.pow(2,i) % 11) * parseInt(idNumber.charAt(17 - i),11);
	 }
	  if(iSum%11!=1){
		 return false;
	 }
	return true;
};


FormUtils.getBirthdayByIDNumber = function (idNumber){
	if(idNumber.length==18){
	     var year = idNumber.substring(6,10);
	     var month = idNumber.substring(10,12);
	     var date=idNumber.substring(12,14);
	     return year+"-"+month+"-"+date;
	  }else{
		  return "";
	  }
};

FormUtils.getSexByIDNumber = function (idNumber){
	var sex ;
    if(idNumber.length==15){  
        if(idNumber.substring(14,15)%2==0){  
        	sex = '女';  
        }else{  
        	sex = '男';  
        }  
    }else if(idNumber.length ==18){  
        if(idNumber.substring(14,17)%2==0){  
        	sex ='女'; 
        }else{  
        	sex = '男';  
        }  
    }else{  
    	sex = '错误'; 
    } 
    return sex;
};


Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
		"S" : this.getMilliseconds()
	//millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
							.substr(("" + o[k]).length));
	return format;
};
Date.prototype.toFormatString = function(){
	var d = this;
	if(d == null)  return '';
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	var date = d.getDate();
	if(month < 10)  month = '0' + month;
	if(date < 10)   date = '0' + date;
	return year + '-' + month + '-' + date;
};

Date.prototype.addDays = function(d)
{
    this.setDate(this.getDate() + d);
};


Date.prototype.addWeeks = function(w)
{
    this.addDays(w * 7);
};


Date.prototype.addMonths= function(m)
{
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};

Date.prototype.addYears = function(y)
{
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) 
    {
        this.setDate(0);
    }
};


FormUtils.monthDiffer=function(date1,date2){
	// 得到月数
	var d1Months = date1.getYear() * 12 + date1.getMonth();
	// 得到月数
	var d2Months = date2.getYear() * 12 + date2.getMonth();
	var m = Math.abs(d1Months - d2Months);
	return m;
};

/** 
 * 解析输入的dateStr，返回Date类型。 
 * dateStr: XXXX-XX-XX 
 */  
FormUtils.parseDate=function(dateStr){  
    var strArray = dateStr.split("-");
    var monthPre=strArray[1].substring(0,1);
    var month=0;
    if(monthPre=="0"){
    	 month=parseInt(strArray[1].substring(1,2))-1;
    }else{
    	 month=parseInt(strArray[1])-1;
    }
    if(strArray.length == 3){  
        return new Date(strArray[0], month, strArray[2]);  
    }  
};

/** 
 * 判断字符是否为yyy-MM-dd
 */  
FormUtils.isDateStr =function (value){
	var reg = /^(\d{4})-(\d{2})-(\d{2})$/;  
	if(reg.test(value)&& RegExp.$2<=12&&RegExp.$3<=31){
		return true;
	}else{
		return false;
	}
};

function GetVerifyBit(id){
	var result;
    var nNum=eval(id.charAt(0)*7+id.charAt(1)*9+id.charAt(2)*10+id.charAt(3)*5+id.charAt(4)*8+id.charAt(5)*4+id.charAt(6)*2+id.charAt(7)*1+id.charAt(8)*6+id.charAt(9)*3+id.charAt(10)*7+id.charAt(11)*9+id.charAt(12)*10+id.charAt(13)*5+id.charAt(14)*8+id.charAt(15)*4+id.charAt(16)*2);
    nNum=nNum%11;
    switch (nNum) {
       case 0 :
          result="1";
          break;
       case 1 :
          result="0";
          break;
       case 2 :
          result="x";
          break;
       case 3 :
          result="9";
          break;
       case 4 :
          result="8";
          break;
       case 5 :
          result="7";
          break;
       case 6 :
          result="6";
          break;
       case 7 :
          result="5";
          break;
       case 8 :
          result="4";
          break;
       case 9 :
          result="3";
          break;
       case 10 :
          result="2";
          break;
    }
    //document.write(result);
    return result
}
FormUtils.generDownATag=function(fileUrl){
	var fileName=FormUtils.getFileName(fileUrl);
	var downATag=$("<a></a>");
	downATag.attr('href','../../file/download/file/'+fileName+'?token='+fileName+'&fileUrl='+fileUrl);
	downATag.html(fileName);
	return downATag;
};
FormUtils.generArticleAttachmentsDownUrl=function(articleAttachments,attachmentPostionId){
	var attachmentPostion=$("#"+attachmentPostionId);
	if(articleAttachments&&articleAttachments!=null&&articleAttachments instanceof Array){
		  for(var i=0;i<articleAttachments.length;i++){
			  var articleAttachment=articleAttachments[i];
			  var aJquery=FormUtils.generDownATag(articleAttachment.fileUrl);
			  attachmentPostion.append(aJquery);
			  attachmentPostion.append("<br/>");
		  }
	  }
};

FormUtils.getFileDownUrl=function(fileUrl){
	var fileName=FormUtils.getFileName(fileUrl);
	var downUrl='../../file/download/file/'+fileName+'?token='+fileName+'&fileUrl='+fileUrl;
	return downUrl;
}

FormUtils.getFileName=function(fileUrl){
	var lastIndexYes=fileUrl.lastIndexOf("\\");
	var lastIndexNo=fileUrl.lastIndexOf("/");
	var lastIndex=lastIndexYes;
	if(lastIndex!=-1){
		if(lastIndex<lastIndexNo){
			lastIndex=lastIndexNo;
		}
	}else{
		lastIndex=lastIndexNo;
	}
	var fileName=fileUrl;
	if(lastIndex!=-1){
		fileName=fileUrl.substring(lastIndex+1);
		var lastHen=fileName.indexOf("-");
	    if(lastHen!=-1){
		   fileName=fileName.substring(lastHen+1);
		}
	}
	return fileName;
};
FormUtils.convertGetParam=function(params){
	var getParamStr="";
	var i=0;
	for(var name in params){
		if(i==0){
			getParamStr+=name+"="+params[name];
		}else{
			getParamStr+="&"+name+"="+params[name];
		}
	    i++;
	}
	return getParamStr;
};
FormUtils.exportExcel=function(url,params){
	 params.pageNum=1;
	 params.pageSize=5000;
	 var exportUrl = '../../file/download/'+url;
	 exportUrl+='&'+FormUtils.convertGetParam(params)+"&t="+new Date().getTime();
	 location.href=encodeURI(exportUrl);
}
FormUtils.staticsImage=function(imageId,params){
	 var image=$("#"+imageId);
	 params.pageNum=1;
	 params.pageSize=5000;
	 var staticsImageSrc = '../../StaticsticsImageServlet';
	 staticsImageSrc+='?'+FormUtils.convertGetParam(params)+"&t="+new Date().getTime();
	 image.attr("src",staticsImageSrc);
	 //如果是要显示的图片
	 if(image.css("display")!="none"){
		 var loadingImage=$('#statisticsLoadingImg');
		 if(!loadingImage[0]){
			 //如果加载图片不存在就创建一个
			 loadingImage=$("<img id='statisticsLoadingImg' src='../../resources/csis/img/loading2.gif'/>");
			 image.before(loadingImage);
			 //设置加载图片位置
			 var topOffset=(image.parent().height()-150)/2;
			 var leftOffset=(image.parent().width()-100)/2;
			 loadingImage.css("padding-top",topOffset);
			 loadingImage.css("padding-left",leftOffset);
		 }
		 //先隐藏显示图片，显示加载图片
		 image.hide();
		 loadingImage.show(); 
		 //图片加载完后，显示图片，隐藏加载图片。
		 image.load(function(){
			 loadingImage.hide();
			 image.show();
		 });
	 }
}
FormUtils.Boolean2String=function(value){
	if(value==true){
		return  "是";
	}else{
		return "否";
	}
}
FormUtils.isNotEmpty=function(value){
	return value&&value!=null&&value!="";
}
/**
 * 创建上传文件按钮
 * config={
 * positionId:生成位置id,(必填)
 * btnId:按钮id,(可选)
 * btnText:按钮名称,(必填)
 * uploadSuccess:上传成功回调(必填)
 * }
 */
FormUtils.createUploadFileBtn=function(config){
	var uploadImgId=new Date().getTime()+"UploadImg";
	FormUtils.uploadSuccess=function(){
		FormUtils.uploadFile(uploadImgId,config.uploadSuccess);
	};
	var uploadFileBtnHtml='<div style="position:relative;display: inline;">';
	uploadFileBtnHtml+='<input id="'+uploadImgId+'" type="file"  name="file" onchange="FormUtils.uploadSuccess()" style="width:80px;opacity: 0;filter: alpha(opacity=0);position: absolute;z-index: 2;cursor: pointer;" value="浏览文件"/>';
	uploadFileBtnHtml+='<a class="easyui-linkbutton" id="'+config.btnId+'">'+config.btnText+'</a>';
	uploadFileBtnHtml+='</div>';
	var positionId=config.positionId;
	$("#"+positionId).html(uploadFileBtnHtml);
};

FormUtils.uploadFile=function(fileElementId,callBackFn){
	$.ajaxFileUpload({
		  url:'../../file/upload/file',//服务器端程序
		  secureuri:true,
		  fileElementId:fileElementId,//input框的ID
		  dataType: 'text',//返回数据类型
		  success: function (filePath){//上传成功
			  callBackFn($("<div>"+filePath+"</div>").text());
		  }
		}); 	
};
FormUtils.parseImgUrl=function(filePath){
	return ctx+"/ImageUrlServlet?url="+filePath;
};

FormUtils.showContentLoadTip=function(tipPosition){
	tipPosition.children().css("visibility","hidden");	
	var loadingDiv=$("<div></div>");
	tipPosition.prepend(loadingDiv);
	var loadingImg=$("<img src='../../resources/csis/img/loading2.gif'/>");
	loadingDiv.append(loadingImg);
	//var loadingMsg=$("<p>加载中</p>");
	//loadingDiv.append(loadingMsg);
	loadingDiv.css({"position":"absolute",
					"text-align": "center",
					"padding-top":"20px"});
	loadingDiv.height(tipPosition.height()-20);
	loadingDiv.width(tipPosition.width());
	tipPosition.data("loadingDiv",loadingDiv);
};
FormUtils.hideContentLoadTip=function(tipPosition){
	tipPosition.children().css("visibility","visible");
	var loadingDiv=tipPosition.data("loadingDiv");
	if(loadingDiv&&loadingDiv!=null){
		loadingDiv.remove();
	}
};
FormUtils.stringOverMaxDeal=function(str,maxLength){
	if(str==""||str==null||str==undefined){
	    return "";
	 }else{
		 if(str.length>maxLength){
			   str=str.substring(0,maxLength)+"..."; 
		 }
		 return str;
	 }
};
FormUtils.setEditorContent=function(editor,content){
	   if(editor.isReady==1){
			  editor.setContent(content);
	      }else{
	    	  editor.addListener('ready', function() {
			      editor.setContent(content);
		      });   
	      }
}
FormUtils.registerInputEnterQuery=function(inputJquery,queryFn){
	inputJquery.val("可按确定键查询");
	inputJquery.css("color","#AFAFAF");
	inputJquery.focus(function(){
		var val=$(this).val();
		if(val==enterQueryMsg){
			$(this).val("");
			$(this).css("color","black");
		}
	});
	inputJquery.blur(function(){
		var val=$(this).val();
		if(val==""){
			$(this).val(enterQueryMsg);
			$(this).css("color","#AFAFAF");
		}
	});
	inputJquery.keydown(function(event){
		var enterKey=13;
		var keyCode=getKeyCode(event);
	    if(keyCode==enterKey){
	    	queryFn();
	    }
	});
}

FormUtils.ajaxSubmit=function(config){
	var params={};
	var form=config.form;
	var gridDiv=config.gridDiv;
	FormUtils.form2Entity(config.form.attr("id"),params);
    $.ajax({
		 url:form.attr("action"),
		 type:"post",
		 dataType:"html",
		 data:params,
		 cache:false,
		 success: function(content){
			 gridDiv.html(content);
			 if(config.loadSuccess){
				 config.loadSuccess();
			 }
		 }}
    );
};
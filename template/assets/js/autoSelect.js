;(function($) {
	jQuery.fn.extend( {
		'autoSelect' : function(config) {
			var defalultConfig={
					  type:"input",
					  text:"text",
					  value:"value"
				};
				for(var defaultFn in defalultConfig){
					if(!config[defaultFn]){
						config[defaultFn]=defalultConfig[defaultFn];
					}
				}
			if(!config){
				config={};
			}
			var  shortcutKeys=new Array();
			//向上键
			shortcutKeys.push(38);
			//向下键
			shortcutKeys.push(40);
			//确定键 
			shortcutKeys.push(13);
			//向左键
			shortcutKeys.push(37);
			//向右键
			shortcutKeys.push(39);
			if(!config.shortcutKeys){
				config.shortcutKeys=shortcutKeys;
			}
			 var defaultConfig={
					 currentPage:1,
                     pageSize:1,
                     paramName:"name"};
			   //配置没有的属性用默认配置的。
	         for(var name in defaultConfig){
	              if(!config[name]){
	                 config[name]=defaultConfig[name];
	              }
	          }
	         $(this).attr("autocomplete","off");
			var sel = new Select($(this), config);
			sel.registerEvent();
			return sel;
		}
	});
})(jQuery);
var Select = function(inputSelf, config) {
	var self = this;
	self.isSelected=false;
		inputSelf.blur(function(){
			if(self.isSelectType()){
				if(self.loading==false){
				setTimeout(function(){
					var isSelected=self.isSelected;
					if(isSelected==false){
						if(self.rowCount==0){
							inputSelf.val("");
							 if(config.clearSelect){
					        	  config.clearSelect();
					         }
						}else{
							self.selectRowIndex=0;
							self.selectedEnterFn();
						}
					}
				},100);
				};
			}
		});
	// 创建选择Div
	this.createSelectDiv = function() {
		if (!self.selectDiv) {
			self.selectDiv = $("<div style='overflow:auto' ></div>");
			var selectPosition = self.getSelectPosition();
			self.selectDiv.css('position','absolute');
			self.selectDiv.css('z-index',9999);			
			self.selectDiv.css('top', selectPosition.y);
			self.selectDiv.css('left', selectPosition.x);
			self.selectDiv.css('border',"1px solid #C4D5E9");
			self.selectDiv.css('background-color',"#FAFAFA");
			$('body').append(self.selectDiv);
			self.selectDivId = new Date().getTime() + "Div";
			self.selectDiv.attr("id",self.selectDivId);
			self.selectDiv.width(inputSelf[0].offsetWidth-2);
			self.selectDiv.css("padding","1px;");
			self.selectDiv.css("overflow","hidden");
			//self.selectDiv.height(config.height);
			self.selectDiv.hide();
			//创建table
			self.createSelectTable();
		}
		self.getResultToTr();
	};
	// 获取下拉框的位置
	this.getSelectPosition = function() {
		var top = inputSelf.offset().top + inputSelf[0].offsetHeight;// Y坐标的值
		var left = inputSelf.offset().left;// X坐标的值
		var position = {};
		position.y = top;
		position.x = left;
		return position;
	};
	//创建内容显示的
	this.createSelectTable = function() {
		self.tableId = new Date().getTime() + "Table";
		self.table = $("<table border='0px' style='width:100%' cellpadding='0px' class='autoSelect' cellspacing='0px'  style='border-collapse:collapse'></table>");
		self.table.attr("id", this.tableId);
		self.selectDiv.append(self.table);
		//如果输入框失去焦点,并且鼠标没在下拉框上,就移除下拉框。
		self.overFlag=true;
		self.table.mouseover(function(){
			self.overFlag=true;
		});
		self.table.mouseout(function(){
			self.overFlag=false;
		});
		self.selectDiv.mouseover(function(){
			self.overFlag=true;
		});
		self.selectDiv.mouseout(function(){
			self.overFlag=false;
		});
	};
	//获取结果并且显示。
	this.getResultToTr=function(){
		//在快捷函数会用来判断所以要置空。
		self.isSelected=false;
		self.loading=true;
		var paramName=config.paramName;
		var param={};
		param[paramName]=inputSelf.val();
		var extraParam=self.extraParam;
		if(extraParam){
			for(var extraParamFn in extraParam){
				param[extraParamFn]=extraParam[extraParamFn];
			}
		}
		if(config.beforeLoad){
			config.beforeLoad();
		}
		 $.ajax({ url:config.url,
			 type:"post",
			 data: $.extend({},param,config.params,config.paramsFn()),
			 dataType:"json",
		      success:function(result) {
		    	  if(config.afterLoad){
		  			   config.afterLoad(result);
		  		    }
		    		self.rows=null;
		    		$('#' + self.tableId + ' tr').remove();
		    	  if(self.selectDiv){
		    	    self.selectDiv.show();
		    	    }
		    	      //如果返回的数组结果集
					if(result instanceof Array&&result.length>0){
						self.records=result;
						//生成table行
					    self.generTableColumnTd(self.records);
					    self.tableRowSelectFn();
					    //文本框失去焦点动作
						if(self.isSelectType()){
							if($(inputSelf).is(":focus")!=true){
							setTimeout(function(){
								var isSelected=self.isSelected;
								if(isSelected==false){
									self.selectRowIndex=0;
									self.selectedEnterFn();
									if(self.rowCount==0){
										inputSelf.val("");
										 if(config.clearSelect){
								        	  config.clearSelect();
								         }
									}
								}
							},100);
							};
						}
					}else{
						self.rowCount=0;
						if(self.selectDiv){
				    	    self.selectDiv.hide();
				    	 }
					}
					 self.loading=false;
	       }});
	};
	this.isSelectType=function(){
		return config.type=="select";
	};
    this.getColumnText=function(record){
		var value="";
		if(self.isSelectType()){
			value=record[config.text];
		}else{
			value=record[config.value];
		}
		return value;
    }
	//生成table行
	this.generTableColumnTd=function(records){
			for ( var i = 0; i < records.length; i++) {
				var record = records[i];
				var tr="<tr>";
					tr+="<td>"+self.getColumnText(record)+"</td>";
				tr+="</tr>";
				self.table.append($(tr));
		}
	};
	//生成空数据消息行
	this.generEmptyDataMsgTd=function(){
			var tr="<tr><td >没有查到数据!</td></tr>";
		   self.table.append($(tr));
	};
	//table行选择的函数。
	this.tableRowSelectFn=function(){
		var trs = $('#' + self.tableId + ' tr');
		//行
		self.rows=trs;
		//行数
		self.rowCount = trs.length;
		//选择行索引
		self.selectRowIndex = -1;
		trs.mouseover(function() {
			$(this).addClass('combobox-item-selected').siblings().removeClass();
			self.selectRowIndex = self.rows.index($(this)[0]);
		});
		trs.click(function() {
			self.selectedEnterFn();
		});
	};
	//快捷键函数
	this.shortcutKeyFn=function(event){
		var e = event || window.event;
		if(self.rows&&self.rows!=null){
		//确定键 
		if (e.keyCode == 13) {
				self.selectedEnterFn();
		}
		}
		return self.isShortcutKey(e.keyCode);
	};
	this.isEnterKey=function(event){
		var e = event || window.event;
		if(self.rows&&self.rows!=null){
			//确定键 
			if (e.keyCode == 13) {
					return true;
			}
		}
		return false;
	},
	//是否为快捷键
	this.isShortcutKey=function(keyCode){
		for(var i=0;i<config.shortcutKeys.length;i++){
			var shortcutKey=config.shortcutKeys[i];
			if(shortcutKey==keyCode){
			   return true;	
			}
		}
		return false;
	};
	//获得选择行
    this.getSelectRow=function(){
		return self.rows.filter(':eq(' + self.selectRowIndex + ')');
	};
	//选中或确定处理函数
	this.selectedEnterFn=function(){
      if(self.selectRowIndex>-1&&self.selectRowIndex <= self.rowCount){
    	  var selectRecord=self.records[self.selectRowIndex]; 
    	  var beforeFlag=true;
    	  if(config.beforeSelect){
    		  beforeFlag=config.beforeSelect(selectRecord);
    	  }
    	  if(beforeFlag==false){return ;}
    	  self.isSelected=true;
    	  inputSelf.val(self.getColumnText(selectRecord));
    	  if(config.afterSelect){
        	  config.afterSelect(selectRecord);
           }
    	  self.removeSelectDiv();
      }
	};
	//移除下拉框
    this.removeSelectDiv=function(){
    	if(self.selectDiv){
    	self.selectDiv.remove();
    	//因为在创建selectDiv,有用来判断所以要清空。
    	delete self.selectDiv;
    	}
    };
    //注册触发下拉框事件
	this.registerEvent = function() {
		var autoSelectTimer=null;
		var searchVesselNameInputCurrentValue="";
		inputSelf.keyup(function(event) {
			if(inputSelf.val()==""){
				self.removeSelectDiv();
				return ;
			}
			//是否快捷键
			var isShortcutKey= self.shortcutKeyFn(event);
			if(searchVesselNameInputCurrentValue!=inputSelf.val()){
			if(!isShortcutKey&&event.shiftKey!=true&&event.ctrlKey!=true&&event.altKey!=true){
			if(autoSelectTimer)
			{
					window.clearTimeout(autoSelectTimer);
					autoSelectTimer = null;
			}
			autoSelectTimer=window.setTimeout(function(){
				  self.createSelectDiv();
			  },80);
			}
			}
			return !self.isEnterKey(event);
		 }).keydown(function(event) {
			 if(autoSelectTimer)
				{
						window.clearTimeout(autoSelectTimer);
						autoSelectTimer = null;
				}
			if(self.rows&&self.rows!=null){
				var e=event||window.event;
				//向上键
				if(e.keyCode == 38) {
						if (self.selectRowIndex == 0 || self.selectRowIndex == -1) {
							self.selectRowIndex = self.rowCount;
						}
						self.selectRowIndex--;
						self.getSelectRow().addClass('combobox-item-selected').siblings().removeClass();
						/*var  topTrs=self.rows.filter(':le(' + self.selectRowIndex + ')');
						for(var i=0;i<topTrs.length;i++){
							var topTr=
						}*/
				}
				//向下键
				if (e.keyCode == 40) {
					    self.selectRowIndex++;
						if (self.selectRowIndex == self.rowCount) {
							self.selectRowIndex = 0;
						}
						self.getSelectRow().addClass('combobox-item-selected').siblings().removeClass();
				}
			}
			 searchVesselNameInputCurrentValue=inputSelf.val();
			 return !self.isEnterKey(event);
		});
		inputSelf.blur(function(){
			//if(self.overFlag==false){
			setTimeout(function(){
				self.removeSelectDiv();	
			},500);
			//}
		});
	};
	}
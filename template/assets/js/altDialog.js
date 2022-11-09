/*
 * altDialog
 * 并没什么用的弹出窗口 ㄟ( ▔, ▔ )ㄏ
 * 
 * 
 * 例:
 * 
 * 提示框
 *   $.altDialog({title:'标题',content:'内容'});
 * 对话框
 *	  $.altDialog({
 *				title:"标题",
 *				content:"内容",
 *				style:"confirm",
 *				done:function(){
 *					//回调执行方法
 *				}
 *			});
 * 
 * 	  
 * 	title					标题
 * 	content				消息内容
 * 	style					alert 弹出窗        confirm 对话框
 * 	lock					是否锁定屏幕
 * 	yesText				确定按钮文字
 * 	noText				取消按钮文字
 * 	yesClose			点击确定按钮是否同时关闭对话框.
 *	done					用户点击确定按钮后的回调
 * modal				自己传递的 bootcss modal对象
 * isRecycleModal	是否回收altDialog生成的Modal对象
 */
(function($){
	var altDialog = jQuery.altDialog = function(options){
		var $options = $.extend({
		id:"",//元素id标识
		title: "", //标题
		content: "no messages",//消息内容
		lock:true, //是否鍵盤可作用
		yesText:"确定",
		noText:"取消",
		style:'alert',//alert or confirm
		yesClose:true,//点击确定按钮是否同时关闭对话框.
		isRecycleModal:true,
		hasSetTimeout:true,
		},options);
		
		$options.id = $options.id || "altDialog" + (((1+Math.random())*0x10000)|0).toString(16);
		var modal = $options.modal || $("#"+$options.id);
		if(modal && modal.length == 0){
			modal = $("<div class='modal fade' id='"+$options.id+"' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button><h4 class='modal-title'></h4></div><div class='modal-body'></div><div class='modal-footer'><button type='button' class='btn btn-primary'></button><button type='button' class='btn btn-default' data-dismiss='modal'></button></div></div></div></div>")
			.appendTo($("body"));
			if($options.isRecycleModal && $options.hasSetTimeout)
				modal.unbind("blur").one("blur",function(){if($options.isRecycleModal)setTimeout(function(){modal.remove();},3000);});
		}
			
		modal.find(".modal-title").html($options.title);
		modal.find(".modal-body").html($options.content);
		var noBtn = modal.find(".btn-default");
		if($options.style == 'alert'){
			modal.find(".close").hide();
			noBtn.hide(); 
		} 
		else{
			noBtn.html($options.noText);
			noBtn.show();
		}
		noBtn.unbind("click");
		noBtn.one("click", function(){
			if($options.cancel && typeof($options.cancel)=="function")
				$options.cancel();
			if($options.yesClose) modal.modal('hide');
		});
		
		var yesBtn = modal.find(".btn-primary");
		yesBtn.unbind("click");
		yesBtn.one("click", function(){
			if($options.done && typeof($options.done)=="function")
				$options.done();
			if($options.yesClose) modal.modal('hide');
		});
		yesBtn.html($options.yesText);
		
		//modal 需 bootstrap.js
		modal.modal({backdrop: 'static',keyboard: $options.lock});//		<--- 这里出BUG报 modal 未定义 就是 bootstrap.js 没引用 或精简组件了
	};

}(jQuery));

$(function() {
	// 删除提示
	$('.btn-del').click(function (evt) {
		if (!confirm('确定删除?')) {
			evt.preventDefault();
		}
	});
});
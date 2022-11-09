var TB_opearteTimer=null;
function TB_showMaskLayer(tipContent,progressTime) {
	try {
		if (document.getElementById("TB_HideSelect") == null) {
		    $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div>");		
		}				
		$(window).scroll(TB_position); 		
		TB_overlaySize();	
		if(TB_isEmpty(tipContent)){
			tipContent="数据正在加载，请稍等...";
		};
		$("body").append("<div id='TB_load' valign=middle><div id='TB_loadImg'></div><div  id='TB_tip'>"+tipContent+"</div></div>");
		TB_load_position();		
		$(window).resize(TB_position);
		if(!TB_isEmpty(progressTime)){
			TB_getOpearteStatus();
		}
	} catch(e) {
		alert( e );
	}
}

function TB_isEmpty(value){
	return value==null||value==""||value=='undefined';
}
function TB_getOpearteStatus(progressTime){
	TB_clearOpearteTimer();
	TB_opearteTimer=window.setTimeout(function(){
		$.ajax({
			url:"data/getOperateStatus/operateStatus",
			type:"post",
			cache:false,
			success:function(result){
				if(!TB_isEmpty(result)&&result!="null"){
				var TB_load_width=170;
				if(result.length>10){
					TB_load_width=TB_load_width+(result.length-10)*15;
				}
				$("#TB_load").width(TB_load_width);
				$("#TB_tip").html(result+"....");
			   }
				//alert(result);
				TB_getOpearteStatus(progressTime);
			}
		});
	  },progressTime);
}
function TB_clearOpearteTimer(){
	if(TB_opearteTimer)
	{
			window.clearTimeout(TB_opearteTimer);
			TB_opearteTimer = null;
	}
}
function TB_removeMaskLayer() {	
	$('#TB_overlay,#TB_HideSelect,#TB_load').remove();
	TB_clearOpearteTimer();
	return false;
}
//helper functions below

function TB_position() {
	var pagesize = TB_getPageSize();	
	var arrayPageScroll = TB_getPageScrollTop();
	TB_overlaySize();
}

function TB_overlaySize(){
	if (window.innerHeight && window.scrollMaxY) {	
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		yScroll = document.body.offsetHeight;
  	}
	$("#TB_overlay").css("height",yScroll +"px");
}

function TB_load_position() {
	var pagesize = TB_getPageSize();
	var arrayPageScroll = TB_getPageScrollTop();

	$("#TB_load")
	.css({left: ((pagesize[0] - 100)/2)+"px", top: (arrayPageScroll[1] + ((pagesize[1]-100)/2))+"px" })
	.css({display:"block"});
}

function TB_getPageScrollTop(){
	var yScrolltop;
	if (self.pageYOffset) {
		yScrolltop = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScrolltop = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScrolltop = document.body.scrollTop;
	}
	arrayPageScroll = new Array('',yScrolltop); 
	return arrayPageScroll;
}

function TB_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	
	arrayPageSize = new Array(w,h); 
	return arrayPageSize;
}
function TB_strpos(str, ch) {
for (var i = 0; i < str.length; i++){
  if (str.substring(i, i+1) == ch){
      return i;
  }
}
return -1;
}
function TB_parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) {return Params;} // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}


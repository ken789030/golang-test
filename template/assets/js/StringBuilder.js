 /*
 * StringBuilder
 *
 * append()
 * toString()
 * var sb=new StringBuilder();
 *
 * sb.append("1").append("-").append("2");
 * alert(sb.toString());
 *
 * 话说你们到底是有多喜欢用java啊???  -_-!
 */
 function StringBuilder(){
 
	this._strings_=new Array;
	
	this.append = function(str){
		this._strings_.push(str);
		return this;
	};
	
	this.toString = function(){
		return this._strings_.join("");
	};
}

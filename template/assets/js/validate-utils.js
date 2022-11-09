var validateUtils={
		/**
		 * intPart:整数位数
		 * decimalNum:小数位数
		 * negative:true-允许负数,false-不允许负数(默认不允许)
		 */
		 validateDecimal:function(value,intPart,decimalNum,negative){
			var validateFlag=false;
			// 如果是整数可以直接进行解析
			var regInt = new RegExp("^(([1-9][0-9]{0," + (intPart - 1) + "})|0)$");
			var navRegInt = new RegExp("^((((-)?[1-9])[0-9]{0," + (intPart - 1) + "})|0)$");
			if (negative) {
				if (navRegInt.test(value)) {
					validateFlag=true;
				}
			} else {
				if (regInt.test(value)) {
					validateFlag=true;
				}
			}
			var intParts = value.replace(/\.[0-9]+$/g, "");
			var decimalParts = value.replace(/(-)?[0-9]+\./, "");
			var reg = new RegExp("\^[0-9]{0," + decimalNum + "}$");
			if (intParts.length > 0) {
				if (decimalNum > 0) {
					if (((negative && navRegInt.test(intParts)) || (!negative && regInt.test(intParts))) && reg.test(decimalParts)){
						validateFlag=true;
					}
				} else if (regInt.test(intParts) && value.indexOf(".") < 0){
					validateFlag=true;
				}
			}
			return validateFlag;
		},
		validateInteger:function(value){
		   return	/^[0-9]\d*$/.test(value);
		},
		notZero:function(value){
			return value!=0;
		},
		notContainAngleBrackets:function(value){
		    return !/[<,>]+/.test(value);
		}
}
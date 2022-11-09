/*
 * 
 * 
  	current_page: 1,					//当前页数
    page_count: 1,					//总页数
    button_number: 5,				//quickjump = option 时 有多少个快速跳转页按钮
    select_name: 'curPage',     	//后台获取到的 当前页的name
    quickjump:"option"  "input"	// 是否有快速跳转    没填默认没有   option为下拉框    input为输入跳转
    
    pager_click  						//跳转页面回调	带一个 页码参数 function(page_id){alert(page_id);}
    
    page_size_name:'pageSize'					//后台获取到的 页条数 name
    page_size:15,										//当前一页多少条数据
    page_size_display:false,					//是否显示页面条数选择 "
    page_size_options:[10,20,50,100] 		//条数下拉框数据
    
    page_size_change				//每页条数改变回调  带一个选中的value
    
    total_num							//总数  有填写的话会在最后面输出一个  共 x 条 信息
*/
(function ($) {
	
    $.fn.paginator = function (options) {
        var options = $.extend({}, $.fn.paginator.defaults, options);
        return this.each(function () {
        	var $ul=$(this);
        	var formId=$ul.attr("formId");
        	if(formId){
        		options.current_page=$ul.attr("currentPage");
        		options.page_count=$ul.attr("pageCount");
        		options.pager_click=function(page){
        			$("#"+formId).submit();
        		}
        	}
            
        	$(this).empty();
        	
        	//是否显示每页X条
            if(options.page_size_display)
            	$(this).append(pageSizeSelect(options.page_size_options,parseInt(options.page_size), options.page_size_name, options.page_size_change));
        	
        	$(this).append(renderpager(options.select_name, parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.pager_click).children());
            
            //是否显示快速跳转
            if(options.quickjump == "option"){
            	$(this).append(quickjumpByOption(parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            }else if(options.quickjump == "input"){
            	$(this).append(quickjumpByInput(parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            }else{
            	if(formId){
            		$("#"+formId).append(quickjumpByNone(parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            	}else{
            	 	$(this).append(quickjumpByNone(parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            	}
            }
            
            //是否显示共XX条
            //if(options.total_num)
            	//$(this).append(totalNum(parseInt(options.total_num)));
            
            var total = $('<div style="margin-top:5px;"></div>');
            total.append('<span>共 <big style="font-weight:bold;">'+parseInt(options.total_num)+'</big> 条记录，当前第 <big style="font-weight:bold;">'+parseInt(options.current_page)+'</big> 页，共 <big style="font-weight:bold;">'+parseInt(options.page_count)+'</big> 页 </span>');
            var startDiv = $("<nav id='resultCount' class='pull-left pagination'></nav>").append(total);
            $('#resultCount').remove();
//            $(this).parent().wrap('<div style="margin:0 10px;" />');
            $(this).parent().before(startDiv);
            
            // add bootstrap pagination class
            $(this).addClass('pagination');
        });
    };

    // render and return the pager with the supplied options
    function renderpager(select_name, current_page, page_count, button_number, pager_click) {

        var $pager = $('<ul></ul>');

        // add first & prev
        $pager.append(renderButton(select_name, 'first', current_page, page_count, pager_click)).append(renderButton(select_name, 'prev', current_page, page_count, pager_click));

        //计算最大分页
        var page_min = Math.max(current_page - (button_number - 1) / 2 | 0, 1)
        var page_max = Math.min(page_min + button_number - 1, page_count)

        if (page_max + 1 - page_min < button_number)
            page_min = Math.max(page_max - button_number + 1, 1)

        //添加分页按钮
        for (var page = page_min; page <= page_max; page++) {
            $pager.append(renderButton(select_name, page, current_page, page_count, pager_click));
        }

        // add last & next
        $pager.append(renderButton(select_name, 'next', current_page, page_count, pager_click)).append(renderButton(select_name, 'last', current_page, page_count, pager_click));

        return $pager;
    }

    // add quickjumpByOption
    function quickjumpByOption(current_page, page_count, button_number,select_name, pager_click) {
        var jump = $('<div style="display:inline-block;"></div>');
        var select = $('<select style="display:inline-block;width:auto;"  name="' + select_name + '" class="form-control input-sm"/>');
        for (var i = 1; i <= page_count; i++) {
            if (i == current_page) var attr = "selected";
            else var attr = "";
            select.append('<option ' + attr + ' value="' + i + '">' + i + '</option>');
        }
        select.change(function () {
            pager_click(this.value);
        });
        return jump.append('<span style="margin-left:15px;vertical-align: middle;">\u8df3\u8f6c\u81f3 </span>').append(select);
    }
    
    // add quickjumpByInput
    function quickjumpByInput(current_page, page_count, button_number,select_name, pager_click) {
        var jump = $('<div style="display:inline-block;"></div>');
        var width = current_page.toString().length * 7 + 22;
        var input = $('<input type="text" maxlength="9" style="display:inline-block;width:'+width+'px;"  name="' + select_name + '" class="form-control input-sm" value="'+current_page+'"/>');
        input.bind("keyup","afterpaste",function(){
        	$(this).val($(this).val().replace(/\D/g,''));
        	$(this).css("width",($(this).val().toString().length * 7 + 22)+"px");
        });
        var gobtn = $('<button style="display:inline-block;width:auto;" type="button" data-toggle="tooltip" -title="跳转" class="btn btn-default btn-sm">Go</button>');
        gobtn.click(function () {
            pager_click(input.val());
        });
        return jump.append('<span style="margin-left:15px;vertical-align: middle;">\u8df3\u8f6c\u81f3 </span>').append(input).append(gobtn);
    }
    
    // add quickjumpByNone
    function quickjumpByNone(current_page, page_count, button_number,select_name, pager_click) {
        var input = $('<input type="hidden" value="'+current_page+'"  name="'+select_name+'" />');
        return input;
    }
    
    function pageSizeSelect(pageSizeOptions,current_pageSize,pageSizeName , size_change){
    	var jump = $('<div style="display:inline-block; float: left; margin-right: 15px;"></div>');
    	var select = $('<select style="display:inline-block;width:auto;" name="' + pageSizeName + '" class="form-control input-sm"/>');
        for (var i = 0; i < pageSizeOptions.length; i++) {
        	var attr = "";
            if (pageSizeOptions[i] == current_pageSize) attr = "selected";
            select.append('<option ' + attr + ' value="' + pageSizeOptions[i] + '">' + pageSizeOptions[i] + '</option>');
        }
        select.change(function () {
        	if(size_change && typeof(size_change)=="function")
        	size_change(this.value);
        });
        return jump.append('<span style="margin-left:15px;vertical-align: middle;">每页 </span>').append(select).append('<span style="margin-left:5px;vertical-align: middle;">条 </span>');
    }
    
    function totalNum(total_num){
    	var total = $('<div style="display:inline-block;"></div>');
        return total.append('<span style="margin-left:5px;vertical-align: middle;">共 '+total_num+' 条记录，当前第 </span>');
    }
    
    function renderButton(select_name, link_page, current_page, page_count, pager_click) {
        var link_title, link_content, class_li = ""; 

        switch (link_page) {
            case 'first':
                link_title = "\u9996\u9875";
                link_content = '\u9996\u9875';
                link_page = 1;
                if (current_page <= 1) class_li = "disabled";
                break;
            case 'last':
                link_title = "\u5c3e\u9875";
                link_content = '\u5c3e\u9875';
                link_page = page_count;
                if (current_page >= page_count) class_li = "disabled";
                break;
            case 'prev':
                link_title = "\u4e0a\u4e00\u9875";
                link_content = '&laquo;';
                link_page = current_page - 1;
                if (current_page <= 1) class_li = "disabled";
                break;
            case 'next':
                link_title = "\u4e0b\u4e00\u9875";
                link_content = '&raquo;';
                link_page = current_page + 1;
                if (current_page >= page_count) class_li = "disabled";
                break;
            default:
                link_title = "\u7b2c" + link_page + "\u9875\u0020\u002f\u0020\u5171" + page_count + "\u9875";
                link_content = link_page;
                if (current_page == link_page) class_li = "active";
                break;
        }

        var title = '';
        var callback = function () { };
        if (class_li == '') {
            title = 'data-original-title="' + link_title + '"';
            callback = function () { $("[name='"+select_name+"']").val(link_page); pager_click(link_page); };
        }

        return btn = $('<li class="' + class_li + '"><a data-toggle="tooltip" ' + title + ' href="#">' + link_content + '</a></li>').click(callback);
    }
    
    // pager defaults.
    $.fn.paginator.defaults = {
        current_page: 1,
        page_count: 1,
        button_number: 5,
        select_name:'curPage',
        quickjump:"none",
        page_size_name:"pageSize",
        page_size:15,
        page_size_display:false,
        page_size_options:[15,30,50,100]
    };
    
})(jQuery);

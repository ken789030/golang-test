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
	
    $.fn.paginatorForm = function (config) {
        return this.each(function () {
        	var $ul=$(this);
        	var formId=$ul.attr("formId");
        	var defaultFormOptions={};
        	if(formId){
        		defaultFormOptions.formId=formId;
        		defaultFormOptions.current_page=$ul.attr("currentPage");
        		defaultFormOptions.page_count=$ul.attr("pageCount");
        		defaultFormOptions.total_num=$ul.attr("recordCount");
        		defaultFormOptions.page_size=$ul.attr("pageSize");
        		defaultFormOptions.pager_click=function(page){
        			$("#"+formId).submit();
        		}
        	}
            var options = $.extend({}, $.fn.paginatorForm.defaults,defaultFormOptions, config);
            var form=$("#"+options.formId);
            if(!options.current_page){options.current_page=1;}
            if(!options.page_count){options.current_page=0;}
            if(!options.total_num){options.current_page=0;}
            if(!options.page_size){options.page_size=15;}
            if(!options.page_size_change){
            	options.page_size_change=function(page){
            		options.pager_click(page);
        		};
            }
            // empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(options.formId,parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.pager_click).children());
            $("#bootstrap-paginator-selPage"+formId).remove();
            $("#bootstrap-paginator-pageSize"+formId).remove();
            form.append(quickjumpByNone(options.formId,parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            form.append('<input type="hidden" value="'+parseInt(options.page_size)+'" id="bootstrap-paginator-pageSize'+formId+'" name="'+options.page_size_name+'" />');
            //是否显示快速跳转
            if(options.quickjump == "option"){
            	$(this).append(quickjumpByOption(options.formId,parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            }else if(options.quickjump == "input"){
            	$(this).append(quickjumpByInput(options.formId,parseInt(options.current_page), parseInt(options.page_count), parseInt(options.button_number), options.select_name, options.pager_click));
            }
            //是否显示每页X条
            if(options.page_size_display)
            	$(this).append(pageSizeSelect(options.formId,options.page_size_options,parseInt(options.page_size), options.page_size_name, options.page_size_change));
            
            //是否显示共XX页
            if(options.page_count)
            	$(this).append(pageNum(parseInt(options.page_count)));
            
            //是否显示共XX条
            if(options.total_num)
            	$(this).append(totalNum(parseInt(options.total_num)));
            
            // add bootstrap pagination class
            $(this).addClass('pagination');
        });
    };

    // render and return the pager with the supplied options
    function renderpager(formId,current_page, page_count, button_number, pager_click) {

        var $pager = $('<ul></ul>');

        // add first & prev
        $pager.append(renderButton(formId,'first', current_page, page_count, pager_click)).append(renderButton(formId,'prev', current_page, page_count, pager_click));

        //计算最大分页
        var page_min = Math.max(current_page - (button_number - 1) / 2 | 0, 1)
        var page_max = Math.min(page_min + button_number - 1, page_count)

        if (page_max + 1 - page_min < button_number)
            page_min = Math.max(page_max - button_number + 1, 1)

        //添加分页按钮
        for (var page = page_min; page <= page_max; page++) {
            $pager.append(renderButton(formId,page, current_page, page_count, pager_click));
        }

        // add last & next
        $pager.append(renderButton(formId,'next', current_page, page_count, pager_click)).append(renderButton(formId,'last', current_page, page_count, pager_click));

        return $pager;
    }

    // add quickjumpByOption
    function quickjumpByOption(formId,current_page, page_count, button_number,select_name, pager_click) {
        var jump = $('<div style="display:inline-block;"></div>');
        var select = $('<select style="display:inline-block;width:auto;" id="bootstrap-paginator-selPage" name="' + select_name + '" class="form-control input-sm"/>');
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
    function quickjumpByInput(formId,current_page, page_count, button_number,select_name, pager_click) {
        var jump = $('<div style="display:inline-block;"></div>');
        var width = current_page.toString().length * 7 + 22;
        var input = $('<input type="text" maxlength="9" style="display:inline-block;width:'+width+'px;"  class="form-control input-sm" value="'+current_page+'"/>');
        input.bind("keyup","afterpaste",function(){
        	$(this).val($(this).val().replace(/\D/g,''));
        	$(this).css("width",($(this).val().toString().length * 7 + 22)+"px");
        });
        var gobtn = $('<button style="display:inline-block;width:auto;vertical-align:top" type="button" class="btn btn-default btn-sm">Go</button>');
        //enter可以換頁
        input.keyup(function (e) { 
        	if(e.keyCode == 13){        	
        		$("#bootstrap-paginator-selPage"+formId).val(input.val())
        		pager_click(input.val());
        	}
        })
        gobtn.click(function () {
        	$("#bootstrap-paginator-selPage"+formId).val(input.val())
            pager_click(input.val());
        });
        return jump.append('<span style="margin-left:15px;vertical-align: middle;">\u8df3\u8f6c\u81f3 </span>').append(input).append(gobtn);
    }
    
    // add quickjumpByNone
    function quickjumpByNone(formId,current_page, page_count, button_number,select_name, pager_click) {
        var input = $('<input type="hidden" value="'+current_page+'" id="bootstrap-paginator-selPage'+formId+'" name="'+select_name+'" />');
        return input;
    }
    
    function pageSizeSelect(formId,pageSizeOptions,current_pageSize,pageSizeName , size_change){
    	var jump = $('<div style="display:inline-block;"></div>');
    	var select = $('<select style="display:inline-block;width:auto;" name="' + pageSizeName + '" class="form-control input-sm"/>');
        for (var i = 0; i < pageSizeOptions.length; i++) {
        	var attr = "";
            if (pageSizeOptions[i] == current_pageSize) attr = "selected";
            select.append('<option ' + attr + ' value="' + pageSizeOptions[i] + '">' + pageSizeOptions[i] + '</option>');
        }
        select.change(function () {
        	$("#bootstrap-paginator-pageSize"+formId).val(this.value);
        	if(size_change && typeof(size_change)=="function")
        	size_change(this.value);
        });
        return jump.append('<span style="margin-left:15px;vertical-align: middle;">每页 </span>').append(select).append('<span style="margin-left:5px;vertical-align: middle;">条 </span>');
    }
    
    function pageNum(page_num){
    	var total = $('<div style="display:inline-block;"></div>');
        return total.append('<span style="margin-left:5px;vertical-align: middle;">共 '+page_num+' 页 </span>');
    }
    
    function totalNum(total_num){
    	var total = $('<div style="display:inline-block;"></div>');
        return total.append('<span style="margin-left:5px;vertical-align: middle;">共 '+total_num+' 条 </span>');
    }
    
    function renderButton(formId,link_page, current_page, page_count, pager_click) {
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
            callback = function () { $("#bootstrap-paginator-selPage"+formId).val(link_page); pager_click(link_page); };
        }

        return btn = $('<li class="' + class_li + '"><a data-toggle="tooltip" ' + title + ' href="javascript:void(0);">' + link_content + '</a></li>').click(callback);
    }
    
    // pager defaults.
    $.fn.paginatorForm.defaults = {
        current_page: 1,
        page_count: 1,
        button_number: 5,
        select_name:'curPage',
        quickjump:"input",
        page_size_name:"pageSize",
        page_size:15,
        page_size_display:true,
        page_size_options:[15,30,50,100]
    };
    
})(jQuery);

(function($) {

  // 显示
  window.displayNoticeFrame = function(id) {
    var frame = $('#'+id).html('公告加载中....');
    $.get('/memberCenter/notice/display-notice', function(res) {
      var context = $('<marquee style="width: 800px;" direction="left" />');
      for (var i = 0; i < res.length; i++) {
        context.append('<span style="margin-right: 100px;">' + res[i].content + '</span>');
      }
      frame.html(context);
    });
  };

  var session = window.sessionStorage;

  window.setLogin = function() {

  };

  var winTmpl = '<div  class="modal fade"  role="dialog" style="display: none;">'
    + '<div class="modal-dialog">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
    + '<h4 class="modal-title">公告</h4></div>'
    + '<div class="modal-body"></div>' +
    '</div> </div> </div>';

  /**
   * 显示弹出窗公示
   */
  window.showDialogNotice = function() {

    $.get('/memberCenter/notice/dialog-notice', function(res) {
      res = res.result;
      res = filterNotice(res);
      if (res.length < 1) return;
      // 过滤掉已显示
      var win = $(winTmpl).appendTo(document.body);
      var i = 0;
      showDialog(win, res[i++]);
      win.bind('hidden.bs.modal', function() {
        if (i < res.length) {
          showDialog(win, res[i++]);
        }
      });
    });
  };

  function showDialog(win, res) {
    var body = win.find('.modal-body');
    var title = win.find('.modal-title');
    title.html('公告 -- ' + res.title);
    body.html('<div>' + res.content + '</div>');
    win.modal('show');

  }



  // 显示系统弹出框
  window.showSystemNotice = function(url) {
    $.post('/platform/msg/system-notice?date=' + new Date().getTime() ).done(function(res) {
      if (!res || res.length < 1) return;

      var i = 0;
      var _func = function() {
        if (i < res.length) {
          if(!checkResNoticeData(res[i])){
        	  i++;
        	  _func();
        	  return;
          }
          showSysNotice(res[i++], function(notice) {
            new Image().src = '/platform/msg/system-notice-close/' + notice.id;
            _func();
          });
        }
      }

      _func();
    });
  };
  
  function checkResNoticeData(notice){
	  if(notice == null || typeof notice == "undefined" 
		  || notice.title == null || typeof notice.title == "undefined" || notice.title == "undefined"
			  || notice.content == null || typeof notice.content == "undefined" || notice.content == "undefined"){
		  return false;
	  }else {
		  return true;
	  }
  }
  
  // 显示全站通知
  function showSysNotice(notice, backcall) {
    var win = $('<div class="alert alert-info alert-dismissible" />').css({
      position: 'fixed',
      bottom: '5px',
      right: '5px',
      width: '300px',
      minHeight: '200px',
      margin: '0px',
      display: 'none',
      zIndex: '99999'
    }).appendTo(document.body);

    win.append('<h4>' + notice.title + '</h4>');
    win.append('<div>' + notice.content + '</div>');
    var closeBtn = $('<button type="button" class="close"><span aria-hidden="true">&times;</span></button>').css({
      position: 'absolute',
      top: '5px', right: '5px'
    }).click(function() {
      win.fadeOut(function() {
        backcall && backcall(notice);
      });
    });

    win.append(closeBtn);

    win.fadeIn();
  }
})(jQuery);

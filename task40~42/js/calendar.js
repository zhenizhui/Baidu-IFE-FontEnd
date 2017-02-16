"use strict";

function Win10Calendar(config) {
  var calendarWrapperEl = getEl(config.el);
  var initYear = new Date().getFullYear(); // 2017年
  var initMonth = new Date().getMonth() + 1; // 2月
  var initDate = new Date().getDate(); // 16号
  var initDay = new Date().getDay(); // 星期四

  function _initCalendar() {
    // 2017年2月   上箭头 下箭头  Start
    var calendarHeader = createEl('div');
    calendarHeader.className = 'calendar-header';
    var spanEl = createEl('span');
    spanEl.innerHTML = initYear + '年' + initMonth + '月';
    var iArrowUpEl = createEl('i');
    iArrowUpEl.className = 'icon-arrow-up';
    var iArrowDownEl = createEl('i');
    iArrowDownEl.className = 'icon-arrow-down';
    calendarHeader.appendChild(spanEl);
    calendarHeader.appendChild(iArrowUpEl);
    calendarHeader.appendChild(iArrowDownEl);
    calendarWrapperEl.appendChild(calendarHeader);
    // 2017年2月   上箭头 下箭头 End
    var weekName = ['一','二','三','四','五','六','日'];
    var calendarBody = createEl('div');
    calendarBody.className = 'calendar-body';
    var calendarTableEl = createEl('table');
    calendarTableEl.className = 'calendar-table';
    var calendarTableTheadEl = createEl('thead');
    var calendarTableTheadTrEl = createEl('tr');
    for(var i = 0; i < weekName.length; i++) {
      var td = createEl('td');
      td.innerHTML = weekName[i];
      calendarTableTheadTrEl.appendChild(td);
    }
    calendarTableTheadEl.appendChild(calendarTableTheadTrEl);
    var calendarTableTBodyEl = createEl('tbody');
    var dayInInitMonth = _getDaysInMonth(initYear, initMonth);
    var temp = 0;
    for(var i = 0; i < 6; i++) {
      var tr = createEl('tr');
      for (var j = 0; j < 7; j++) {
        var td = createEl('td');
        td.className = 'clickhook';
        tr.appendChild(td);
        if (temp <= dayInInitMonth) {
          temp++;
          td.innerHTML = temp;
        }
      }
      calendarTableTBodyEl.appendChild(tr);
    }
    calendarWrapperEl.appendChild(calendarBody);
    calendarBody.appendChild(calendarTableEl);
    calendarTableEl.appendChild(calendarTableTheadEl);
    calendarTableEl.appendChild(calendarTableTBodyEl);
    _addEvent();
    _setToday();
  }

  /**
   * @description 添加事件
   * @private
   */
  function _addEvent() {
    calendarWrapperEl.addEventListener('click',function (e) {
      if (e.target.className == 'clickhook') {
        _removeTdSelect();
        e.target.className = 'clickhook select-this-day';
      }
    });
  }

  function _setToday() {

  }

  /**
   * @description 清除选中某一天的样式
   * @private
   */
  function _removeTdSelect() {
    var clickHookArr = document.getElementsByClassName('clickhook');
    for(var i = 0; i < clickHookArr.length;i++) {
      if (clickHookArr[i].className == 'clickhook select-this-day') {
        clickHookArr[i].className = 'clickhook';
      }
    }
  }

  /**
   * @description 获取某年某个月份的天数
   * @param year 年份 eg. 2017
   * @param month 月份 eg. 2
   * @return {number}
   * @private
   */
  function _getDaysInMonth(year, month) {
    var month = parseInt(month,10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
    return new Date(year,month,0).getDate();
  }

  return {
    init: _initCalendar
  }
}




"use strict";

function Win10Calendar(config) {
  var calendarWrapperEl = getEl(config.el);

  function _initCalendar(year, month) {
    if (calendarWrapperEl.innerHTML) {
      calendarWrapperEl.innerHTML = '';
    }
    var initYear = year || new Date().getFullYear() ;
    var initMonth = month || new Date().getMonth() + 1;
    // 2017年2月   上箭头 下箭头  Start
    var calendarHeader = createEl('div');
    calendarHeader.className = 'calendar-header';
    var spanEl = createEl('span');
    spanEl.className = 'year-month';
    spanEl.innerHTML = '<span class="year">' + initYear + '</span>年<span class="month">' + initMonth + '</span>月';
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

    // firstDayWeekName 每个月的第一天是星期几
    var firstDayWeekName = _getWeek(initYear, initMonth, 1);
    var left = firstDayWeekName - 1; // 能显示上个月的td的数目
    // 上一个月的总天数
    var lastMonthDay  = _getDaysInMonth(initYear, initMonth - 1);
    var lastMonthDayCopy = lastMonthDay;
    var lastMonthDayArr = [];
    while (lastMonthDayArr.length < left) {
      lastMonthDayArr.push(lastMonthDayCopy);
      lastMonthDayCopy--;
    }
    var thisMonthDay = _getDaysInMonth(initYear, initMonth);
    var str = "<tr>";
    var count = 0; // 这个count用来控制生成tr
    var allcount = 0;
    var SHOWDAY = 42; // 日历一次显示42（6 * 7）天
    // 循环显示上个月的日子
    while (lastMonthDayArr.length > 0) {
      var day = lastMonthDayArr.pop();
      str += '<td class="not-this-month clickhook">' + day + '</td>';
      lastMonthDay--;
      left--;
      count++;
      allcount++;
    }
    // 循环显示这个月的日子
    for(var i = 1; i <= thisMonthDay; i++) {
      count++;
      allcount++;
      if (i == new Date().getDate()) {
        // 把“今天”标识出来
        str += '<td class="today clickhook">' + i + '</td>';
      } else {
        str += '<td class="clickhook">' + i + '</td>';
      }
      if (count == 7) {
        str += '</tr>';
        str += '<tr>';
        count = 0;
      }
    }
    // 下个月的日子
    // SHOWDAY - allcount 就是剩下来的下个月的日子
    for(var i = 1; i <= SHOWDAY - allcount;i++) {
      str += '<td class="not-this-month">' + i + '</td>';
      count++;
      if (count == 7) {
        str += '</tr>';
        str += '<tr>';
        count = 0;
      }
    }
    calendarTableTBodyEl.innerHTML = str;
    calendarWrapperEl.appendChild(calendarBody);
    calendarBody.appendChild(calendarTableEl);
    calendarTableEl.appendChild(calendarTableTheadEl);
    calendarTableEl.appendChild(calendarTableTBodyEl);
    _addEvent();
  }

  function _setYearAndMonth(year, month) {
    _initCalendar(year, month);
  }

  /**
   * @description 添加事件
   * @private
   */
  function _addEvent() {
    calendarWrapperEl.addEventListener('click',function (e) {
      // debugger;
      if (e.target.className == 'clickhook') {
        _removeTdSelect();
        e.target.className = 'clickhook select-this-day';
      }
    });
    //显示上一个月
    document.querySelector('.icon-arrow-up').addEventListener('click',function () {
      var year = Number(document.getElementsByClassName('year')[0].innerHTML);
      var month = Number(document.getElementsByClassName('month')[0].innerHTML);
      //debugger;
      month--;
      if (month == 0) {
        month = 12;
        year--;
      }
      _setYearAndMonth(year, month);
    })
    //显示下一个月
    document.querySelector('.icon-arrow-down').addEventListener('click',function () {
      var year = Number(document.getElementsByClassName('year')[0].innerHTML);
      var month = Number(document.getElementsByClassName('month')[0].innerHTML);

      month++;
      if (month == 12) {
        month = 1;
        year++;
      }
      _setYearAndMonth(year, month);
    })
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

  /**
   * @description 获取某年某月某日是星期几
   * @param year eg. 2017
   * @param month eg. 2
   * @param date eg. 18
   * @return {number} eg return 6 意思是星期六
   * @private
   */
  function _getWeek(year, month, date) {
    var englishWeekNameObj = {
      '1': 'January',
      '2': 'February',
      '3': 'March',
      '4': 'April',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'August',
      '9': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };
    var result = new Date("" + englishWeekNameObj[month] + " " + date + ", " + year).getDay();
    // 如果result为0 说明是星期天，特殊处理一下，我们返回7
    return (result == 0) ? 7 : result;
  }

  return {
    init: _initCalendar,
    setYearAndMonth: _setYearAndMonth
  }
}




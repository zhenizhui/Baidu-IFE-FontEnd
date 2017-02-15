function SmartTable(config) {
  var tableEl = document.querySelector(config.el);

  /**
   * @description 初始化
   */
  function initTable() {
    // 判断有无配置参数
    if (!config) {
      console.warn('did you forget to pass some config to smartTable.initTable()?');
      return;
    }
    _createTable(config.data);
  };

  /**
   * @description 根据config参数中的data来生成表格,生成<captiopn>，<thead>，<tbody>，<tr>，<td>等元素，并填充数据
   * @private
   */
  function _createTable(configData) {
    // 如果table里面有子元素，先remove所有的子元素再重新渲染数据
    if (tableEl.children.length) {
      var len = tableEl.children.length;
      while (len) {
        tableEl.removeChild(tableEl.children[len - 1]);
        len--;
      }
    }
    // 表格主题的数据 dataArr
    var dataArr = configData;
    var frag = document.createDocumentFragment();
    var captionEl = document.createElement('caption');
    captionEl.innerHTML = config.caption;
    frag.appendChild(captionEl);
    // 表头
    var theadEl = document.createElement('thead');
    var tableHeaderData = config.col;
    var theadTr = document.createElement('tr');
    for (var i = 0; i < tableHeaderData.length; i++) {
      (function () {
        var td = document.createElement('td');
        // 如果配置了排序参数，则还要多创建两个元素，并设置样式，添加事件
        if (tableHeaderData[i].sort) {
          var upEl = document.createElement('i');
          var downEl = document.createElement('i');
          var sortKeyName = tableHeaderData[i].sortKey;
          var sortCallBack = tableHeaderData[i].sortSuccessCallBack;
          upEl.setAttribute('class', 'arrow-up');
          downEl.setAttribute('class', 'arrow-down');
          td.textContent = tableHeaderData[i].name;
          td.appendChild(upEl);
          td.appendChild(downEl);
          td.style.width = tableHeaderData[i].width;
          upEl.addEventListener('click', function () {
            _sort(sortKeyName, 'asc', sortCallBack);
          });
          downEl.addEventListener('click', function () {
            _sort(sortKeyName, 'desc', sortCallBack);
          })
        } else {
          td.innerHTML = tableHeaderData[i].name;
        }
        theadTr.appendChild(td);
      })(i);
    }
    theadEl.appendChild(theadTr);
    frag.appendChild(theadEl);
    var tbodyEl = document.createElement('tbody');
    dataArr.forEach(function (index) {
      var tr = document.createElement('tr');
      for (var i in index) {
        var td = document.createElement('td');
        td.innerHTML = index[i];
        tr.appendChild(td);
      }
      tbodyEl.appendChild(tr);
      frag.appendChild(tbodyEl);
    });
    tableEl.appendChild(frag);
    _addEvent();
  };

  /**
   * @description 排序
   * @param sortKey 排序关键字
   * @param type 升序（asc） 还是 降序（desc）
   * @param cb callback 回调函数
   * @private
   */
  function _sort(sortKey, type, cb) {
    var configData = config.data;
    configData.sort(function (a, b) {
      if (type === 'desc') {
        return Number(b[sortKey]) - Number(a[sortKey]);
      } else if (type === 'asc') {
        return Number(a[sortKey]) - Number(b[sortKey]);
      }
    });
    _createTable(configData);
    if (cb) {
      cb();
    }
  };

  /**
   * @description 添加事件
   * @private
   */
  function _addEvent() {
    var tableElHeader = document.querySelector('.smart-table thead');
    if (config.isFrozen) {
      window.addEventListener('scroll', function () {
        var bodyScrollTopValue = document.body.scrollTop;
        var tableElHeight = tableEl.offsetHeight;
        if (bodyScrollTopValue > tableEl.offsetTop && bodyScrollTopValue < tableEl.offsetTop + tableElHeight) {
          tableElHeader.style.position = 'fixed';
          tableElHeader.style.top = '0px';
          tableElHeader.style.width = '480px';
          tableElHeader.style.zIndex = '22';
        } else {
          tableElHeader.style.position = '';
          tableElHeader.style.top = '';
          tableElHeader.style.width = '';
        }
      });
    }
  }

  return {
    initTable: initTable
  }
}


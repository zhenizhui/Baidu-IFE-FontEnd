function SmartTable(config) {
  var tableEl = document.querySelector(config.el);

  function initTable() {
    // 判断有无配置参数
    if (!config) {
      console.warn('did you forget to pass some config to smartTable.initTable()?');
      return;
    }
    _createTable();
  };

  /**
   * @description 根据config参数中的data来生成表格,生成<captiopn>，<thead>，<tbody>，<tr>，<td>等元素，并填充数据
   * @private
   */
  function _createTable() {
    // 表格主题的数据 dataArr
    var dataArr = config.data;
    var frag = document.createDocumentFragment();
    var captionEl = document.createElement('caption');
    captionEl.innerHTML = config.caption;
    frag.appendChild(captionEl);
    // 表头
    var theadEl = document.createElement('thead');
    var tableHeaderData = config.col;
    var theadTr = document.createElement('tr');
    for(var i = 0; i < tableHeaderData.length; i++) {
      var td = document.createElement('td');
      // 如果配置了排序参数，则还要多创建两个元素，并设置样式，添加事件
      if (tableHeaderData[i].sort) {
        var upEl = document.createElement('i');
        var downEl = document.createElement('i');
        var sortKeyName = tableHeaderData[i].name;
        var sortCallBack = tableHeaderData[i].sortCallBack;
        upEl.setAttribute('class', 'arrow-up');
        downEl.setAttribute('class', 'arrow-down');
        td.textContent = tableHeaderData[i].name;
        td.appendChild(upEl);
        td.appendChild(downEl);
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
  };

  function _sort(sortKey, type, cb) {
    console.log(config.data[0].company);
  }

  return {
    initTable: initTable
  }
}


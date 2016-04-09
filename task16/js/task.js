/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};//对象字面量

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city_name = document.getElementById("aqi-city-input").value.trim();
    var quality = document.getElementById("aqi-value-input").value.trim();

    if (!city_name.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中文字符或者英文字符");
        return;
    }
    if (!quality.match(/^\d+$/)) {
        alert("空气质量指数必须为整数");
        return;
    }

    aqiData[city_name] = quality;

    document.getElementById("aqi-city-input").value = '';
    document.getElementById("aqi-value-input").value = '';
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var _table = document.getElementById("aqi-table");
    _table.innerHTML = "";
    for (var city_name in aqiData) {
        if (_table.children.length === 0) {
            _table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }

        var _tr = document.createElement("tr");
        var td_city = document.createElement("td");
        var td_quality = document.createElement("td");
        var button = document.createElement("Button");
        var td_oper = document.createElement("td");


        button.innerHTML = "删除";

        td_city.innerHTML = city_name;

        td_quality.innerHTML = aqiData[city_name];

        _tr.appendChild(td_city);
        _tr.appendChild(td_quality);
        td_oper.appendChild(button);
        _tr.appendChild(td_oper);
        _table.appendChild(_tr);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr = target.parentElement.parentElement;
    var city_name = tr.children[0].innerHTML;
    delete aqiData[city_name];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();

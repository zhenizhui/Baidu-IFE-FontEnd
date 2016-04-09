/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

console.log(aqiSourceData);

// 用于渲染图表的数据
var chartData = {};
// 获取选择的类型,数组
var radio_type = document.getElementsByName("gra-time");
// 获取选择的城市
var city_select = document.getElementById("city-select");
// 表格
var chart = document.getElementById("aqi-chart-wrap");
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(city, _type) {
    console.log(pageState.nowSelectCity + "/" + pageState.nowGraTime);
    console.log(chartData);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数

    for (var i = 0; i < radio_type.length; i++) {
        //确定选中的radio，然后修改pageState.nowGraTime的值
        if (radio_type[i].checked) {
            pageState.nowGraTime = radio_type[i].value;
        }
    }

    initAqiChartData(pageState.nowSelectCity, pageState.nowGraTime);

    renderChart(pageState.nowSelectCity, pageState.nowGraTime);
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 

    //把当前选中的值赋给pageState.nowSelectCity
    pageState.nowSelectCity = city_select.value;

    // 设置对应数据
    initAqiChartData(pageState.nowSelectCity, pageState.nowGraTime);

    // 调用图表渲染函数
    renderChart(pageState.nowSelectCity, pageState.nowGraTime);
}


function initGraTimeForm() {
    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    for (var i = 0; i < radio_type.length; i++) {
        radio_type[i].addEventListener("change", graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var str = "";
    for (var city in aqiSourceData) {
        str += "<option value='" + city + "'>" + city + "</option>";
    }
    city_select.innerHTML = str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.addEventListener("change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(city, _type) {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    if (_type == "day") {
        chartData = [];
        chartData = aqiSourceData[city];
        //console.log(chartData);
    }

    if (_type == "week") {
        chartData = [];
        var date, count = 0,
            sum = 0,
            week = 1;
        for (var d in aqiSourceData[city]) {
            //遍历每天的空气质量指数
            date = new Date(d);
            weekday = date.getDay();
            if (weekday == 6) {
                count++;
                sum += aqiSourceData[city][d];
                chartData["第" + week + "周"] = Math.round(sum / count);
                //console.log("一周结束");
                count = 0;
                sum = 0;
                week++;
            } else {
                count++;
                sum += aqiSourceData[city][d];
                //console.log(sum);
            }
        }
        //console.log(chartData);
    }

    if (_type == "month") {
        chartData = [];
        var date, month = 0,
            count = 0,
            sum = 0;
        for (var m in aqiSourceData[city]) {
            count++;
            date = new Date(m);
            month = date.getMonth() + 1;
            sum += aqiSourceData[city][m];
            chartData[month + "月"] = Math.round(sum / count);
            //console.log(month); //获得当前月份
            //console.log("这个月有" + count + "天"); //获得当前月份有多少天
        }
        //console.log(chartData);
    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();

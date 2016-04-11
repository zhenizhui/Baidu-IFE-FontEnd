var queue = new Array();
var number = document.getElementsByClassName("number");
var number_box = document.getElementById("number-box");
var input_data = document.getElementById("data");
var left_insert_btn = document.getElementById("left-insert");
var right_insert_btn = document.getElementById("right-insert");
var left_out_btn = document.getElementById("left-out");
var right_out_btn = document.getElementById("right-out");
var bubble_sort_btn = document.getElementById("sort");
var str = "";

function addData() {
    //添加一些初始的数据
    for (var i = 0; i <= 5; i++) {
        queue[i] = getRandomData(10, 100);
        str += "<div class='number' style='height:" + queue[i] + "px'" + ">" + queue[i] + "</div>";
    }
    console.log("添加数据完成=" + queue);
    console.log("queue.length=" + queue.length);
}

function getRandomData(lowValue, highValue) {
    //获取指定范围的随机数
    var choice = highValue - lowValue + 1;
    return Math.floor(Math.random() * choice + lowValue);
}

function paint() {
    //显示初始数据
    number_box.innerHTML = str;
}

function validate(num) {
    //数据校验
    if (queue.length >= 60) {
        alert("queue'length is over 60!");
        return false;
    }

    if (num >= 10 && num <= 100) {
        return num;
    } else {
        alert("data must be in 10~100");
        return false;
    }
}

function newElement(data) {
    //创建新元素并赋值   
    var _div = document.createElement("div");
    _div.className = "number";
    _div.innerHTML = data;
    _div.style.height = data + 'px';
    _div.addEventListener("click", function() {
        number_box.removeChild(this);
        //删除页面元素的时候要同步queue队列
        for (var q = 0; q < queue.length; q++) {
            if (queue[q] == this.innerHTML.trim()) {
                queue.splice(q, 1);
                console.log("点击div后删除,当前队列：" + queue);
            }
        }
    });
    return _div;
}

function addEventListener() {
    //绑定事件
    var number = document.getElementsByClassName("number");
    console.log(number.length + "个");
    //console.log("随便来一个"+number[3].innerHTML);
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function() {
            var number = document.getElementsByClassName("number");
            number_box.removeChild(this);
            alert("you delete a div");
            for (var i = 0; i < queue.length; i++) {
                if (queue[i] == this.innerHTML.trim()) {
                	//queue.splice(a,b);a-索引，b多少个，b=1就是删除本身
                    queue.splice(queue.indexOf(parseInt(this.innerHTML.trim())), 1);
                    console.log("点击div后删除,当前队列：" + queue);
                }
            }
        });
    }

    left_insert_btn.addEventListener("click", left_insert);

    right_insert_btn.addEventListener("click", right_insert);

    left_out_btn.addEventListener("click", left_out);

    right_out_btn.addEventListener("click", right_out);

    bubble_sort_btn.addEventListener("click", bubble_sort_in_queue);
}

function left_insert() {
    //1. 数据校验
    var data = validate(input_data.value);
    if (data) {
        //2. 数据进入队列
        queue.unshift(data);
        console.log(queue);
        //3. 创建元素插入到指定的div中
        number_box.insertBefore(newElement(data), number_box.firstChild);
    }
}

function right_insert() {
    //1. 数据校验
    var data = validate(input_data.value);
    if (data) {
        //2. 数据进入队列
        queue.push(data);
        console.log(queue);
        //3. 创建元素插入到指定的div中
        number_box.appendChild(newElement(data));
    }
}

function left_out() {
    if (queue.length <= 0) {
        alert("no data to delete");
    } else {
        //1. 从左边删除数据
        var testdata = queue.shift();
        console.log("删除的数据" + testdata);
        //2. 删除视图
        var number_box = document.getElementById("number-box");
        number_box.removeChild(number_box.firstChild);
        console.log("左边删除后：" + queue);
    }
}

function right_out() {
    if (queue.length <= 0) {
        alert("no data to delete");
    } else {
        //1. 从右边删除数据
        var testdata = queue.pop();
        console.log("删除的数据" + testdata);
        //2. 删除视图
        var number_box = document.getElementById("number-box");

        number_box.removeChild(number_box.lastChild);

        console.log("右边删除后：" + queue);
    }
}

function bubble_sort_in_queue() {
    var i = queue.length,
        j;
    var temp;
    console.log("排序前的queue:" + queue);
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (queue[j] > queue[j + 1]) {
                temp = queue[j];
                queue[j] = queue[j + 1];
                queue[j + 1] = temp;
            }
        }
        i--;
    }
    console.log("排序后的queue:" + queue);
    sort_div();
}

function sort_div() {
    str = "";
    var number = document.getElementsByClassName("number");
    for (var i = 0; i < queue.length; i++) {
        number[i].style.height = queue[i] + 'px';
        number[i].innerHTML = queue[i];
    }
}

function init() {
	//1. 添加一下初始的数据
    addData();
    //2. 把初始的数据表现在dom上
    paint();
    //3. 添加事件监听
    addEventListener();
}

init();

var queue = new Array();
var number = document.getElementsByClassName("number");
var number_box = document.getElementById("number-box");
var input_data = document.getElementById("data");
var left_insert_btn = document.getElementById("left-insert");
var right_insert_btn = document.getElementById("right-insert");
var left_out_btn = document.getElementById("left-out");
var right_out_btn = document.getElementById("right-out");
var bubble_sort_btn = document.getElementById("sort");
var search_btn = document.getElementById("search");
var str = "";
var accept = []; //接受已经匹配成功的关键字数组

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

function newElement(data) {
    //创建新元素并赋值   
    var _div = document.createElement("div");
    _div.className = "number";
    _div.innerHTML = data;
    _div.style.height = data + 'px';
    _div.addEventListener("click", function() {
        number_box.removeChild(this);
        //新添加的元素要绑定监听事件
        //直接点击页面上的元素来删除的时候要同步queue队列
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
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function() {
            var number = document.getElementsByClassName("number");
            number_box.removeChild(this);
            console.log("you delete a div");
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

    search_btn.addEventListener('click', search);
}

function left_insert() {

    var data = input_data.value;
    console.log(typeof data + "内容是：" + data);
    var array = [];
    array = data.split(","); //分隔符是英文逗号
    for (var i = 0; i < array.length; i++) {
        queue.unshift(array[i]);
        data = array[i];
        number_box.insertBefore(newElement(data), number_box.firstChild);
    }
    console.log("更新后的队列" + queue);


}

function right_insert() {
    var data = input_data.value;
    console.log(typeof data + "内容是：" + data);
    var array = [];
    array = data.split(",");
    for (var i = 0; i < array.length; i++) {
        queue.push(array[i]);
        data = array[i];
        number_box.appendChild(newElement(data));
    }
    console.log("更新后的队列" + queue);
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
    //冒泡排序
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
    /*
     * 排序页面上的元素，对比number数组和queue数组，使得number数组的顺序和
     * queue的一致
     */
    str = "";
    var number = document.getElementsByClassName("number");
    for (var i = 0; i < queue.length; i++) {
        number[i].style.height = queue[i] + 'px';
        number[i].innerHTML = queue[i];
    }
}


function search() {
    /**
     * 查找关键字，模糊查找，
     * 思路：先把数组里面每个元素单独拿出来，然后用关键字去匹配这个元素
     *       例如关键字是ab，单独的元素是fabf，使用ab去匹配fabf
     *       第一次匹配的是fa，第二次是ab，第三次bf，匹配的次数是fabf长度减一       
     * @type {Array}
     */
    accept = [];
    var search_key_value = document.getElementById("search-key").value;
    console.log(typeof search_key_value);
    var value_length = search_key_value.length;
    console.log("value_length=" + value_length);
    arrlength = queue.length;
    console.log(queue);
    console.log("typeof queuep[4]=" + typeof queue[4]);
    for (var i = 0; i < arrlength; i++) {
        var str = queue[i] + "";
        var str_length = str.length;
        console.log("arr[i]" + str);
        console.log("str_length=" + str_length);

        for (var j = 0; j < str_length; j++) {
            console.log("当前字符串=" + str + "当前长度=" + str_length);
            var match;
            var high = j + value_length;
            if (high <= str_length) {
                match = str.substring(j, high);
                console.log("match=" + match);
                if (match == search_key_value) {
                    //count++;
                    accept.push(str);

                }
            }
        }
    }
    console.log(accept);
    showsearch(accept);
}

function showsearch(accept) {
    console.log("--" + accept);
    var number = document.getElementsByClassName("number");
    if (accept.length < 2) {
        //当查找的关键字只有一个的时候
        for (var i = 0; i < number.length; i++) {
            if (number[i].innerHTML == accept[0]) {
                number[i].className += ' active';
            }
        }
    } else {
        //当查找的关键字有多个的时候
        for (var i = 0; i < number.length; i++) {
            for (var j = 0; j < accept.length; j++) {
                console.log(number[i].innerHTML + "." + typeof number[i].innerHTML + "&" + accept[j] + "." + typeof accept[j])
                if (number[i].innerHTML.trim() == accept[j]) {
                    number[i].className += ' active';
                    console.log("have found and set");
                }
            }
        }
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

任务详情：http://ife.baidu.com/task/detail?taskId=15

### 改进

重新实现render函数，避免频繁操作dom影响性能

看了评分榜上的同学写的代码，大概有这些写法

+ 第一种方法
```
function render(data) {
    var str = "";
    data.forEach(function(element, index, array) {
    str += ("<li>"+element[0] + "空气质量:<b>" + element[1] + "</b></li>");
    });
    var resort_ul = document.getElementById("resort");
    resort_ul.innerHTML = str;
}
```

+ 第二种方法
```
function render(data) {
    var newlist = [];
    for (var i = 0; i < data.length; i++) {
        var text = "<li>"+data[i][0] +"空气质量：<b>" + data[i][1] + "</b></li>";
        newlist.push(text);
    }
    document.getElementById('resort').innerHTML = newlist.join("");
}
```
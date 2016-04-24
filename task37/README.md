### Popup弹出层

+ 参数
    + type，抽奖的种类，"黄金星辰" or "钻石星辰"
    + number，多少个
    + ic_src，图片路径"
    + kind，"皮肤 ",还是"英雄"
    + kind_name: "名称"

    例如:
    　　Popup.alert(function(e) {}, {
    　　　　type: "黄金星辰",
    　　　　number: "1个",
    　　　　pic_src: "img/2_64003.jpg",
    　　　　kind: "皮肤 ",
    　　　　kind_name: "龙的传人 李青"
    　　})

+ 功能
    + alert
    + comfirm(continue ...)
    + ...
    + ...
    + ...

### 注册一个对象到window上

```
if (typeof module != 'undefined' && module.exports) {
        module.exports = Popup;
    } else if (typeof define === 'function' && define.amd) {
        define('Popup', [], function() {
            return Popup;
        });
    } else {
        this.Popup = Popup;//把封装的好的对象注册到window上
    }
```
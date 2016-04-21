
### 计算长度的函数

``` 
function getLength(str) {
    var length = 0;
    for (var i = 0; i < str.length; i++) {
      var countCode = str.charCodeAt(i);
      if (countCode >= 0 && countCode <= 128) {
        length += 1;//每个英文字母、数字、英文符号长度为1
      } else {
        length += 2;//每个汉字，中文符号长度为2
      }
    }
    return length;
  }
```



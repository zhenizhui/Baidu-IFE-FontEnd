### 资源
+ [Delegating the focus and blur events](http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html)

### 我

+ 我写了一个奇葩的事件代理,但是在提交的时候有一个bug，全部正确填写之后，修改一个输入框让其变成错误的，再点击提交，居然能提交。
```
form.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName === "INPUT") {
            Tips.init(target);
            target.addEventListener('blur', function(target) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.tagName === "INPUT") {
                    Validate.init(target);
                }
            })
        } else if (target.tagName === ("BUTTON")) {
            Validate.submit_form()
        }
    })
```
(function() {
    var form = document.getElementById("myform");

    form.addEventListener('keypress', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName === "INPUT") {
            target.addEventListener('blur', function(target) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.tagName === "INPUT") {
                    Validate.init(target);
                }
            })
        }
    })
})()

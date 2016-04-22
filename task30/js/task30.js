(function() {
    var myform = document.getElementById("myform");
    var submit_btn = document.getElementById("submit-btn");
    /*myform.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName === "INPUT") {
            Tips.init(target);       
        }
    })

    myform.addEventListener('blur', function(e) {

        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName === "INPUT") {
            alert("blur");
            Validate.init(target);
        }
    })*/

    myform.addEventListener('click', function(e) {
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
            Validate.submit_form();
        }
    })

})()

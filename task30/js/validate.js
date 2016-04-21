var Validate = {
    checkPhone: function(input_obj) {
        var reg = /^\d{11}$/;
        if (reg.test(input_obj.value)) {
            input_obj.nextElementSibling.className = "correct-tips";
            input_obj.nextElementSibling.innerHTML = "手机号码输入正确";
        } else {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "手机号码输入错误";
        }
    },

    checkEmail: function(input_obj) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // I will figure it out
        if (reg.test(input_obj.value)) {
            input_obj.nextElementSibling.className = "correct-tips";
            input_obj.nextElementSibling.innerHTML = "邮箱格式正确";
        } else {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "邮箱格式错误";
        }
    },

    checkPwd: function(input_obj) {
        if (input_obj.value.length >= 8 && input_obj.value.length <= 20) {
            input_obj.nextElementSibling.className = "correct-tips";
            input_obj.nextElementSibling.innerHTML = "密码格式正确";
        } else {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "密码格式不正确 8~20位";
        }
    },

    checkPwdAgain: function(input_obj) {
        var pwd = document.getElementById("input-pwd").value.trim();
        if (!(input_obj.value.length >= 8 && input_obj.value.length <= 20)) {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "密码格式不正确 8~20位";
        } else if (pwd === input_obj.value.trim()) {
            input_obj.nextElementSibling.className = "correct-tips";
            input_obj.nextElementSibling.innerHTML = "两次密码一致";
        } else {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "两次密码不一致";
        }
        //如果先输入确认密码，再输入密码，确认密码的提示还是提示密码不一致，虽然这种假设很奇葩
    },

    checkName: function(input_obj) {
        if (input_obj.value == "") {
            input_obj.nextElementSibling.className = "wrong-tips";
            input_obj.nextElementSibling.innerHTML = "用户名格式不正确";
        } else {
            input_obj.nextElementSibling.className = "correct-tips";
            input_obj.nextElementSibling.innerHTML = "用户名格式正确";
        }
    },

    init: function(obj) {
        switch (obj.id) {
            //根据输入框的id来匹配值
            case "input-name":
                //发现一个问题，这里函数的调用不加this.会报错，找不到
                this.checkName(obj);
                break;
            case "input-pwd":
                this.checkPwd(obj);
                break;
            case "input-pwd-again":
                this.checkPwdAgain(obj);
                break;
            case "input-email":
                this.checkEmail(obj);
                break;
            case "input-phone":
                this.checkPhone(obj);
                break;
            default:
                break;
        }
    }
}

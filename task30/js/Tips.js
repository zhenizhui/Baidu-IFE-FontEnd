var Tips = {
    tipsPhone: function(input_obj) {
        input_obj.nextElementSibling.innerHTML = "请输入您的手机号码";
    },

    tipsEmail: function(input_obj) {
        input_obj.nextElementSibling.innerHTML = "请输入您的邮箱";
    },

    tipsPwd: function(input_obj) {
        input_obj.nextElementSibling.innerHTML = "请输入您的密码";
    },

    tipsPwdAgain: function(input_obj) {
        input_obj.nextElementSibling.innerHTML = "请再次输入您的密码";
    },

    tipsName: function(input_obj) {
        input_obj.nextElementSibling.innerHTML = "请输入您的用户名";
    },

    init: function(obj) {
        switch (obj.id) {
            //根据输入框的id来匹配值
            case "input-name":
                //发现一个问题，这里函数的调用不加this.会报错，找不到
                this.tipsName(obj);
                break;
            case "input-pwd":
                this.tipsPwd(obj);
                break;
            case "input-pwd-again":
                this.tipsPwdAgain(obj);
                break;
            case "input-email":
                this.tipsEmail(obj);
                break;
            case "input-phone":
                this.tipsPhone(obj);
                break;
            default:
                break;
        }
    }
}

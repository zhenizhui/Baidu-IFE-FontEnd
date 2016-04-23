var body = document.getElementsByTagName("body")[0];

function Popup() {
    this.option = {
        /**
         * type--黄金星辰，钻石星辰
         * pic_src-- 图片路径
         * kind--皮肤or英雄
         * kind_name--名字
         */
        type: "",
        pic_src: "",
        kind: "",
        kind_name: ""
    }
}

Popup.prototype.render = function() {
    //渲染DOM
    /*  <div id="mask"></div>
		    <div class="hero-get-area">
        		<h2 class="hero-title">您的运气不错，采集黄金星辰后发现：</h2>
        		<div class="hero-you-get">
            		<div class="close"><img src="img/close.png" alt="" width="50px" height="50px"></div>
            		<div class="hero-pic"><img src="img/2_64003.jpg" alt="" class="hero-pic-inner"></div>
            		<h3 class="hero-name">皮肤 龙的传人 李青</h3>
            		<div class="operation">
                		<button class="comfirm">确定</button>
                		<button class="share">立即分享</button>
            		</div>
        		</div>
    		</div>
		 */

    //创建元素
    this.mask = document.createElement('div');
    this.hero_get_area = document.createElement('div');
    this.h_2 = document.createElement('h2');
    this.hero_you_get = document.createElement('div');
    this.close = document.createElement('div');
    this.close_img = document.createElement('img');
    this.hero_pic = document.createElement('div');
    this.hero_pic_img = document.createElement('img');
    this.h_3 = document.createElement('h3');
    this.operation = document.createElement('div');
    this.comfirm_btn = document.createElement('button');
    this.share_btn = document.createElement('button');

    //元素添加样式
    this.mask.className = "mask";
    this.hero_get_area.id = "hero-get-area";
    this.hero_get_area.className = "hero-get-area";
    this.h_2.className = "hero-title";
    this.hero_you_get.className = "hero-you-get";
    this.close.className = "close";
    this.close.id = "close";
    this.close_img.src = "img/close.png";
    this.close_img.width = 50;
    this.close_img.height = 50;
    this.hero_pic.className = "hero-pic";
    this.hero_pic_img.width = 166;
    this.hero_pic_img.height = 221;
    this.h_3.className = "hero-name";
    this.operation.className = "operation";
    this.comfirm_btn.className = "comfirm";
    this.share_btn.className = "share";

    //设置给定的参数
    this.h_2.innerHTML = "您的运气不错，采集" + this.option.type + "后发现：";
    console.log(this.option.pic_src);
    this.hero_pic_img.src = this.option.pic_src;
    this.h_3.innerHTML = this.option.kind + this.option.kind_name;
    this.comfirm_btn.innerHTML = "确定";
    this.share_btn.innerHTML = "立即分享";

    //各个div的包含关系   
    this.hero_get_area.appendChild(this.h_2);
    this.hero_get_area.appendChild(this.hero_you_get);
    this.hero_you_get.appendChild(this.close);
    this.close.appendChild(this.close_img);
    this.hero_you_get.appendChild(this.hero_pic);
    this.hero_pic.appendChild(this.hero_pic_img);
    this.hero_you_get.appendChild(this.h_3);
    this.hero_you_get.appendChild(this.operation);
    this.operation.appendChild(this.comfirm_btn);
    this.operation.appendChild(this.share_btn);

    //最后把这个弹出层加入到body中
    body.appendChild(this.mask);
    body.appendChild(this.hero_get_area);

}

Popup.prototype.close = function() {
    var that = this;
    var close = document.getElementById("close");
    var mask = document.getElementById("mask");
    var hero_you_get = document.getElementById()
    if (close) {
        /*close.addEventListener('click', function() {
            if (this.mask) {
                body.removeChild(that.mask);
                body.removeChild(that.hero_get_area);
            } else {
                console.log("fail");
            }

        })*/
        close.onclick = function(){
        	document.body.removeChild(mask);
        	document.body.removeChild(hero_you_get);
        }
    } else {
        console.log("no close");
    }

}

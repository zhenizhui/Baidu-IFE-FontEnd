;
(function(window, document) {

    var Popup = {

        mask: function() {
            //创建遮罩层
            var mask_div = document.createElement('div');
            mask_div.id = "mask";
            mask_div.className = "mask";
            document.body.appendChild(mask_div);
        },

        create: function(e, p) {
            //创建需要的元素
            var component = "";

            component = '<h2 class="hero-title">' + '您的运气不错，采集' + p.params.type + '发现：' + '</h2>' +
                '<div class="hero-you-get">' +
                '<div class="close" id="close">' + '<img src="img/close.png" width="50px" height="50px">' + '</div>' +

                '<div class="hero-pic">' + '<img src="' + p.params.pic_src + '" width="166px" height="221px">' + '</div>' +

                '<h3 class="hero-name">' + p.params.kind + '' + p.params.kind_name + '</h3>' +
                '<div class="operation">' +
                '<button class="comfirm" id="comfirm">确定</button>' +
                '<button class="share" id="share">立即分享</button>' +
                '</div>' +
                '</div>';
            Popup.afterCreate(e, p, component);
        },

        afterCreate: function(e, f, comp) {
            //添加事件和样式
            var hero_get_area = document.createElement('div');
            hero_get_area.id = 'hero-get-area';
            hero_get_area.innerHTML = comp;
            hero_get_area.className = "hero-get-area";
            document.body.appendChild(hero_get_area);

            Popup.listen(document.getElementById('close'),'click',function(){
                Popup.destroy();
            })

            Popup.listen(document.getElementById('comfirm'),'click',function(){
                Popup.destroy();
            })
        },

        destroy : function(){
            //移除弹出层
            var comfirm_btn = document.getElementById('comfirm');
            var close_btn = document.getElementById('close');
            var hero_get_area = document.getElementById('hero-get-area');
            var mask = document.getElementById('mask');
            document.body.removeChild(hero_get_area);
            document.body.removeChild(mask);
            Popup.stoplistening(close_btn,'click',function(){});
            Popup.stoplistening(comfirm_btn,'click',function(){})
        },

        alert: function(e, argu) {
            /**
             * Popup.alert(function(){},{
                type: "黄金星辰",
                pic_src: "img/2_64003.jpg",
                kind: "皮肤 ",
                kind_name: "龙的传人 李青"
              })
             */
            Popup.mask();

            Popup.create(e, {
                type: "alert",
                params: argu
            });
        },

        listen: function(e, f, g) {
            if (e.addEventListener) {
                return e.addEventListener(f, g, false);
            }
            if (e.attachEvent) {
                return e.attachEvent('on' + f, g);
            }
            return false;
        },

        stoplistening: function(e, f, g) {
            if (e.removeEventListener) {
                return e.removeEventListener(f, g, false);
            }

            if (e.detachEvent) {
                return e.detachEvent('on' + f, g);
            }

            return false;
        }
    }
    
    this.Popup = Popup;//把封装的好的对象注册到window上

})(window, document);

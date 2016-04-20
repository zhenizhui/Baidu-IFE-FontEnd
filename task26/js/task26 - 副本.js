(function() {

  var Flight = function(flight, which_track) {
    var flight_obj = flight;

    var track_obj = which_track;

    //飞船id
    var id;
    //能源储备
    var energy = 100;
    //信息
    var message;
    //是否飞行
    var is_fly = false;
    //飞行速度
    var speed;

    var move = function() {
      console.log(flight_obj.id + " moving");

      var trackX = track_obj.offsetLeft; //轨道的高度
      var trackY = track_obj.offsetTop; //轨道的宽度
      console.log("track_obj.offsetTop,trackY=" + track_obj.offsetTop);
      console.log("track_obj.offsetLeft,trackX=" + track_obj.offsetLeft);
      var r = track_obj.offsetWidth / 2;
      console.log("r=" + r);
      console.log("track_obj.offsetWidth=" + track_obj.offsetWidth);
      var x = trackX + r / 2 - flight_obj.offsetWidth / 2; // 园的中心点 x 坐标
      var y = trackY + r / 2 - flight_obj.offsetWidth / 2; // 园的中心点 y 坐标  
      console.log("x= " + x + ",y= " + y);
      console.log("flight_obj.offsetWidth=" + flight_obj.offsetWidth);
      console.log("flight_obj.offsetHight=" + flight_obj.offsetHight);
      var deg = 0;
      setInterval(function() {
        deg++
        //Math.sin( deg*Math.PI/180 ) = a/r;
        //Math.cos( deg*Math.PI/180 ) = b/r;
        // 算出圆周上每一个点的 x,y 轴
        var a = Math.sin(deg * Math.PI / 180) * r;
        var b = Math.cos(deg * Math.PI / 180) * r;

        // 算出 圆周上每一个点的坐标
        flight_obj.style.left = x + b + 'px';
        flight_obj.style.top = y + a + 'px';
        flight_obj.style.transform = 'rotate(' + deg + 'deg)';
      }, 20);


      //获取元素的纵坐标 
      function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
      }
      //获取元素的横坐标 
      function getLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
      }

    }

    var getOrder = function() {
      //接受指令
    }

    var destoryFlight = function() {
      //飞船自毁
    }

    return {
      flight_move: move
    }
  }

  var commander = function() {
      //指挥官

    }
    /*
      var flight_2 = document.getElementById("flight-2");
      var flight_track_4 = document.getElementById("flight_track_4");
      var f2 = new Flight(flight_2, flight_track_4);
      f2.flight_move();
      console.log("-----------------");
      */
  var flight_3 = document.getElementById("flight-3");
  var flight_track_3 = document.getElementById("flight_track_3");
  var f3 = new Flight(flight_3, flight_track_3);
  f3.flight_move();
})()

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
      var flight_obj_width = flight_obj.offsetWidth; //获取飞船的宽度
      var flight_obj_hight = flight_obj.offsetHeight; //获取飞船的高度

      var track_obj_width = track_obj.offsetWidth; //获取轨道的宽度
      var track_obj_height = track_obj.offsetHeight; //获取轨道的高度

      var r = track_obj_height / 2; //圆的半径

      var track_center = r - flight_obj_width / 2; //圆心的坐标,没有px

      var deg = 0;

      var timer;
      timer = setInterval(function() {
        deg++;

        var a = Math.sin(deg * Math.PI / 180) * r;
        var b = Math.cos(deg * Math.PI / 180) * r;

        flight_obj.style.left = track_center + b + 'px';
        flight_obj.style.top = track_center + a + 'px';
        flight_obj.style.transform = 'rotate(' + deg + 'deg)';
        energy = energy - 1;
        flight_obj.innerHTML = energy + "%";
        
        if (energy <= 0){
          clearInterval(timer);
        }
      }, 30);
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

/*  var flight_2 = document.getElementById("flight-2");
  var flight_track_2 = document.getElementById("flight_track_2");
  var f2 = new Flight(flight_2, flight_track_2);
  f2.flight_move();
  console.log("-----------------");

  var flight_3 = document.getElementById("flight-3");
  var flight_track_3 = document.getElementById("flight_track_3");
  var f3 = new Flight(flight_3, flight_track_3);
  f3.flight_move();
  var flight_5 = document.getElementById("flight-5");
  var flight_track_5 = document.getElementById("flight_track_5");
  var f4 = new Flight(flight_5, flight_track_5);
  f4.flight_move();*/
  var flight_4 = document.getElementById("flight-4");
  var flight_track_4 = document.getElementById("flight_track_4");
  var f4 = new Flight(flight_4, flight_track_4);
  f4.flight_move();
  
})()

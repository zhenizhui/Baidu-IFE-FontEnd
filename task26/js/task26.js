(function() {

  var Flight = function(flight) {
    var obj = flight;

    var track_radius;

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

      var timer;

      var deg = 0;
      //飞船飞行
      console.log(obj.id + " is moving!");

      timer = setInterval(function() {
        deg = deg + 2;
        obj.style.transformOrigin = "0 0";
        obj.style.transform = 'rotate(' + deg + 'deg)';
        energy--;
        obj.innerHTML = energy + "%";
        if (energy <= 0){
        	clearInterval(timer);
        }

      }, 1000)

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

  var flight = document.getElementById("flight-outer");
  var f2 = new Flight(flight);
  f2.flight_move();
})()

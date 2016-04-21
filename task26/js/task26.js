(function() {

  var Flight_NUMBER_MAX = 4; //空间中飞船数量的最大值

  var Flight_ARRAY = []; //飞船数组


  var Flight = function(flight, flight_track) {
    var flight_obj = flight;

    var track_obj = flight_track;

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

      var deg = 0; //角度

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

        if (energy <= 0) {
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

  var Commander = {
    //指挥官
    getOrder: function() {
      //获取命令
      var command_list = document.getElementById("command-list").value;
      var command_input = document.getElementById("command-input").value;
      command_list.appendChild("<p>" + getCurrenTime() + " " + command_input + "</p>");
      analyOrder(command_list);
    },
    getCurrenTime: function() {
      //获取命令发送的时间
      var date = new Date();
      return date;
    },
    analyOrder: function(order) {
      //命令分析
      console.log("has get order" + order);
      /**
       * 输入：
       * flight-1 fly
       * flight-1 stop
       * 处理结果
       * {
       *   id:1,
       *   command:fly
       * }
       */
      var array = [];
      var flight_id, type;
      array = order.split("");
      if (array.length > 2) {
        console.log("illegal command");
      } else {
        flight_id = array[0];
        type = array[1];
      }
      return {
        id: flight_id,
        command: type
      }
    },
    executeCommand: function() {
      //执行命令
    }
  }


  var Mediator = {
    //信息传播介质

    //丢包率
    packet_loss_rate: 0.3,

    broadcast: function(id, command) {
      if (Math.random() <= this.packet_loss_rate) {
        //如果丢包了就返回
        var command_list = document.getElementById("command-list").value;
        command_list.appendChild("<p>Mediator:命令丢失</p>")
        return;
      } else {
        setTimeout(function() {
          
        }, 1000)
      }
    }
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
  Flight_ARRAY.push(f4);
  f4.flight_move();

})()

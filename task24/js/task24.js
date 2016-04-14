(function() {
  var pre_order_btn = document.getElementById("pre-order");
  var middle_order_btn = document.getElementById("middle-order");
  var post_order_btn = document.getElementById("post-order");
  var _root = document.getElementById("root");
  var array = [];
  var target = null;
  var delete_btn = document.getElementById("delete-btn");
  var add_btn = document.getElementById("add-node");

  pre_order_btn.addEventListener("click", function() {
    preOrder(_root);
  });
  middle_order_btn.addEventListener("click", function() {
    middleOrder(_root);
  });
  post_order_btn.addEventListener("click", function() {
    postOrder(_root);
  });



  _root.addEventListener("click", function() {
    select_node(event);
  })

  delete_btn.addEventListener("click", delete_node);

  add_btn.addEventListener("click", add_node);


  function preOrder(node) {
    //前序遍历
    if (node != null) {
      array.push(node);
      if (node.firstElementChild != null)
        preOrder(node.firstElementChild);
      if (node.lastElementChild != null)
        preOrder(node.lastElementChild);
    }
    console.log(array);
    render();
  }

  function middleOrder(node) {
    //中序遍历
    if (node != null) {
      if (node.firstElementChild) {
        middleOrder(node.firstElementChild);
      }
      array.push(node);
      if (node.lastElementChild) {
        middleOrder(node.lastElementChild);
      }
    }
    console.log(array);
    render();
  }

  function postOrder(node) {
    //后序遍历
    if (node.firstElementChild) {
      postOrder(node.firstElementChild);
    }
    if (node.lastElementChild) {
      postOrder(node.lastElementChild);
    }
    array.push(node);
    console.log(array);
    render();
  }

  function render() {
    var islooping = false;
    var iter = 0;
    var timer;
    var self = this;
    var speed = document.getElementById("speed").value.trim();
    var key_value = document.getElementById("search-key").value.trim();

    if (!speed.match(/^\d+(\.\d+)?$/)) {
      //如果不是数字，默认是1s
      speed = 1000;
    } else {
      speed *= 1000;
    }

    if (key_value == "A") {
      key_value = "root";
    }

    if (!self.islooping) {
      self.islooping = true;
      array[iter].style.border = "1px solid red";
      timer = setInterval(function() {
        if (iter == array.length - 1) {
          //array的最后一个元素拿出来单独判断
          //针对后序遍历的判断,没这个if-else会出现查找A找不到的情况
          if (array[iter].id == key_value) {
            alert("found");
          } else {
            if (key_value == "") {
              clear_Border_style();
              return;
            } else {
              alert("not found" + key_value);
            }

          }
          array[iter].style.border = "1px solid black"; //#FFEB3B
          self.islooping = false;
          array = []; //动画完成之后要清空全局数组
          clearInterval(timer);
        } else {
          console.log("iter = " + iter);
          console.log("array[iter].id = " + array[iter].id);
          if (array[iter].id == key_value) {
            //在渲染的时候，同时查找元素，找到就alert
            alert("found");
          }
          ++iter;
          array[iter - 1].style.border = "1px solid black";
          array[iter].style.border = "1px solid red";
        }
      }, speed);
    }
  }

  function clear_Border_style() {
    root.style.border = "1px solid black";
    var elements = root.getElementsByTagName("div");
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].style.border = "1px solid black";
    }
  }

  //选择节点
  function select_node(event) {
    var ev = event || window.event;
    target = event.target || event.srcElement;
    target.style.border = "1px solid red";
  }

  //删除节点
  function delete_node() {
    if (target === null) {
      alert("请选择节点");
      return;
    }
    target.parentNode.removeChild(target);
  }

  //增加节点
  function add_node() {
    if (target === null) {
      alert("请选择节点");
      return;
    }
    var node_content = document.getElementById("node-content").value;
    var _div = document.createElement("div");
    _div.id = node_content;
    _div.innerHTML = node_content;
    _div.className = "son-3";
    target.appendChild(_div);
  }

})()

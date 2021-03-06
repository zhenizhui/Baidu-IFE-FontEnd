(function() {
  var pre_order_btn = document.getElementById("pre-order");
  var middle_order_btn = document.getElementById("middle-order");
  var post_order_btn = document.getElementById("post-order");
  var _root = document.getElementById("root");
  var array = [];

  pre_order_btn.addEventListener("click", function() {
    preOrder(_root);
  });
  middle_order_btn.addEventListener("click", function() {
    middleOrder(_root);
  });
  post_order_btn.addEventListener("click", function() {
    postOrder(_root);
  });

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
    console.log("before"+speed);
    if (!speed.match(/^\d+(\.\d+)?$/)){
      //如果不是数字，默认是1s
      speed = 1000;
    }else{
      speed *= 1000; 
    }
    console.log("after"+speed);
    if (!self.islooping) {
      self.islooping = true;
      array[iter].style.border = "1px solid red";
      timer = setInterval(function() {
        if (iter == array.length - 1) {
          array[iter].style.border = "1px solid black";
          self.islooping = false;
          array = [];//动画完成之后要清空全局数组
          clearInterval(timer);
        } else {
          ++iter;
          array[iter - 1].style.border = "1px solid black";
          array[iter].style.border = "1px solid red";
        }
      }, speed);
    }
  }
})()

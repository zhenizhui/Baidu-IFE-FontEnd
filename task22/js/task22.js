(function() {
  var pre_order_btn = document.getElementById("pre-order");
  var middle_order_btn = document.getElementById("middle-order");
  var post_order_btn = document.getElementById("post-order");
  var _root = document.getElementById("root");
  var array = [];
  var middle_array = [];
  var post_array = [];

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
        arguments.callee(node.firstElementChild);
      if (node.lastElementChild != null)
        arguments.callee(node.lastElementChild);
    }
    console.log(array);
    render(array);
  }

  function middleOrder(node) {
    //中序遍历
    if (node != null) {
      if (node.firstElementChild) {
        middleOrder(node.firstElementChild);
      }
      middle_array.push(node);
      if (node.lastElementChild) {
        middleOrder(node.lastElementChild);
      }
    }
    console.log(array);
    render(middle_array);
  }

  function postOrder(node) {
    //后序遍历
    if (node.firstElementChild) {
      postOrder(node.firstElementChild);
    }
    if (node.lastElementChild) {
      postOrder(node.lastElementChild);
    }
    post_array.push(node);
    console.log(array);
    render(post_array);
  }

  function render(array) {
    var islooping = false;
    var iter = 0;
    var timer;
    var self = this;
    if (!self.islooping) {
      self.islooping = true;
      array[iter].style.border = "1px solid red";
      timer = setInterval(function() {
        if (iter == array.length - 1) {
          array[iter].style.border = "1px solid black";
          self.islooping = false;
          clearInterval(timer);
        } else {
          ++iter;
          array[iter - 1].style.border = "1px solid black";
          array[iter].style.border = "1px solid red";
        }
      }, 1000);
    }
  }
})()

(function() {
  var tree_father = document.getElementById("tree-father-0");
  var target = null;
  var _tree_son_is_switch = 1;
  var _switch = document.getElementById("switch-off-0");

  tree_father.addEventListener("click", function(e) {
    select_father_node(e);
  })



  _switch.addEventListener("click", show_son_area);

  function select_father_node(event) {
    if (event.target.className == "switch-off") {
      target = event.target || event.srcElement;
    }
    return target;
  }

  function show_son_area() {
    //console.log("target.parentNode.lastElementChild="+target.parentNode.lastElementChild);
    console.log("全局target对象=" + target);
    if (target != null) {
      console.log("target.parentNode.lastElementChild=" + target.parentNode.lastElementChild);
      target.parentNode.lastElementChild.style.display = "none";
    } else {
      console.log("fail");
    }

  }
})()

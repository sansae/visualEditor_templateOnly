var cell;
var layoutTarget;
var currentLayout = {cell1: "", cell2: "", cell3: "", layoutName: ""};
var savedLayouts = [];
var opt;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  //clone img
  var data = ev.dataTransfer.getData("text");
  //get the image being dragged
  var img = document.getElementById(data);
  //clone the image that is dragged
  var cloneImg = img.cloneNode(true);
  //appendChild() inserts the cloned node to the document
  ev.target.appendChild(cloneImg);

  //display alert message after drop
  // alert("drop was successful! " + data + " " + ev.target.id);

  if (ev.target.id === "div1") {
    // alert("target equals div1")
    // alert(data + " was dropped into " + ev.target.id);
    currentLayout.cell1 = data;
  } else if (ev.target.id === "div2") {
    currentLayout.cell2 = data;
  } else {
    currentLayout.cell3 = data;
  }
}

function addCell() {
  cell = document.createElement("div");
  document.getElementById("newCell").appendChild(cell);
}

function removeCell() {
  cell = document.getElementById("newCell");
  cell.removeChild(cell.childNodes[0]);
}

function updateDropdownMenu() {
  var myDropDownMenu = document.getElementById("dropDown");

  //now, populate the dropdown with the saved layouts
  opt = document.createElement("option");
  for (var i = 0; i < savedLayouts.length; i++) {
    opt.innerHTML = savedLayouts[i].layoutName;
    opt.value = savedLayouts[i].layoutName;
    myDropDownMenu.appendChild(opt);
  }
}

function clearLayout() {
  currentLayout = {cell1: "", layoutName: ""};
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
}

function save() {
  if (currentLayout.cell1 === "") {
    alert("You didn't drag and drop an image onto a cell. Please do that first before saving a layout.");
  } else {
    currentLayout.layoutName = "layout" + (savedLayouts.length + 1);

    savedLayouts.push(currentLayout);

    updateDropdownMenu();
    clearLayout();
  }
}

function load() {
  // alert(document.getElementById(savedLayouts[0].cell1));

  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  // // alert("hi " + currentLayout.layoutName);
  if (document.getElementById("dropDown").length === 0) {
    alert("Oops. there is nothing to load. Try saving a layout first.");
  }

  var dropDownValue = document.getElementById("dropDown").value;

  for (var i = 0; i < savedLayouts.length; i++) {
    if (dropDownValue == savedLayouts[i].layoutName) {
      //append clones to dom
      //if document.getElementById(savedLayouts[0].cellx) != null, do append
      if (document.getElementById(savedLayouts[0].cell1) != null) {
        //get image
        var image1 = document.getElementById(savedLayouts[i].cell1);
        //clone image
        var cloneImg1 = image1.cloneNode(true);
        //append to DOM
        document.getElementById("div1").appendChild(cloneImg1);
      }

      if (document.getElementById(savedLayouts[0].cell2) != null) {
        var image2 = document.getElementById(savedLayouts[i].cell2);
        var cloneImg2 = image2.cloneNode(true);
        document.getElementById("div2").appendChild(cloneImg2);
      }

      if (document.getElementById(savedLayouts[0].cell3) != null) {
        var image3 = document.getElementById(savedLayouts[i].cell3);
        var cloneImg3 = image3.cloneNode(true);
        document.getElementById("div3").appendChild(cloneImg3);
      }
    }
  }
}

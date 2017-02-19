var cell;
var layoutTarget;
var currentLayout = {cell1: "", layoutName: ""};
var savedLayouts = [];

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

/*works, but the cloned img can also be cloned*/
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
    alert(data + " was dropped into " + ev.target.id);
    currentLayout.cell1 = data;
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
  //clear contents of the dropDown
  // myDropDownMenu.options.length = 0;

  //now, populate the dropdown with the saved layouts
  var opt = document.createElement("option");
  opt.innerHTML = savedLayouts[0].layoutName;
  opt.value = savedLayouts[0].layoutName;
  myDropDownMenu.appendChild(opt);
}

function clearLayout() {
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  document.getElementById("div4").innerHTML = "";
}

function save() {
  currentLayout.layoutName = "layout" + (savedLayouts.length + 1);

  savedLayouts.push(currentLayout);

  updateDropdownMenu();
  clearLayout();
}

function load() {
  alert("you clicked on the load button " + savedLayouts[0].layoutName + " " + currentLayout.cell1);

  document.getElementById("div1").appendChild(currentLayout.cell1);
}

// function load() {
  // alert("you clicked on the load button");
  // var image1 = document.getElementById("img1");
  // var image2 = document.getElementById("img2");
  // var image3 = document.getElementById("img3");
  // document.getElementById("div1").appendChild(image1);
  // document.getElementById("div2").appendChild(image2);
  // document.getElementById("div3").appendChild(image3);
// }

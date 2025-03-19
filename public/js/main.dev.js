"use strict";

var windowSize = 0;
var menuOpen = false;
var headerNav = document.getElementById("headerNav");
var headerNavMenuButton = document.getElementById("headerNavMenuButton");

function openMenu() {
  if (menuOpen) {
    hideHaederNav();
  } else {
    showHaederNav();
  }
}

function showHaederNav() {
  headerNav.classList.add("w-full");
  headerNavMenuButton.classList.add("active"); // onclick="this.classList.toggle('active')"

  menuOpen = true;
}

function hideHaederNav() {
  headerNav.classList.remove("w-full");
  headerNavMenuButton.classList.remove("active");
  menuOpen = false;
}

function bodyResize() {
  if (windowSize != getWindowSize()) {
    windowSize = getWindowSize();

    if (windowSize < 3) {
      hideHaederNav();
    }

    if (windowSize >= 3) {
      showHaederNav();
    }
  }
}

function getWindowSize(params) {
  var newWindowSize = "0";
  windowWidth = window.innerWidth;

  if (windowWidth >= 640) {
    // sm
    newWindowSize = "1";
  }

  if (windowWidth >= 768) {
    // md
    newWindowSize = "2";
  }

  if (windowWidth >= 1024) {
    // lg
    newWindowSize = "3";
  }

  if (windowWidth >= 1280) {
    // xl
    newWindowSize = "4";
  }

  if (windowWidth >= 1536) {
    // 2 xl
    newWindowSize = "5";
  }

  return newWindowSize;
}

window.onload = function (event) {
  headerNav.classList.remove('hidden');
  bodyResize();
  windowSize = getWindowSize();

  if (windowSize < 3) {
    hideHaederNav();
  }

  if (windowSize >= 3) {
    showHaederNav();
  }

  document.addEventListener("click", function (evt) {
    var targetEl = evt.target; // clicked element      

    do {
      if (targetEl == headerNav || targetEl == headerNavMenuButton) {
        // This is a click inside, does nothing, just return.
        return;
      } // Go up the DOM


      targetEl = targetEl.parentNode;
    } while (targetEl); // This is a click outside.


    if (menuOpen && getWindowSize() < 3) {
      hideHaederNav();
    }
  });
};

document.getelementByTagName("Body")[0].addEventListener;
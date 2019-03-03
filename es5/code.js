"use strict";

var controller = {
  openSidebar: function openSidebar() {
    menuButton.press();
    body.preventScroll();
  },
  closeSidebar: function closeSidebar() {
    menuButton.release();
    body.allowScroll();
  },
  init: function init() {
    body.init();
    menuButton.init();
    sidebarOverlay.init();
  }
};
var body = {
  init: function init() {
    this.element = document.body;
  },
  preventScroll: function preventScroll() {
    this.element.setAttribute('data-noscroll', 'true');
  },
  allowScroll: function allowScroll() {
    this.element.setAttribute('data-noscroll', 'false');
  }
};
var menuButton = {
  init: function init() {
    this.element = document.querySelector('.menuButton');
    this.element.addEventListener('click', controller.openSidebar);
  },
  press: function press() {
    this.element.setAttribute('aria-pressed', true);
    this.element.setAttribute('aria-expanded', true);
  },
  release: function release() {
    this.element.setAttribute('aria-pressed', 'false');
    this.element.setAttribute('aria-expanded', 'false');
  }
};
var sidebarOverlay = {
  init: function init() {
    this.element = document.querySelector('.sidebarOverlay');
    this.element.addEventListener('click', controller.closeSidebar);
  }
};
controller.init();
"use strict";

var controller = {
  openSidebar: function openSidebar() {
    menuButton.press();
    body.preventScroll();
    sidebar.makeTabTargetsFocusable();
    sidebar.focusFirstTabTarget();
  },
  closeSidebar: function closeSidebar() {
    menuButton.release();
    sidebar.makeTabTargetsUnfocusable();
    menuButton.focus();
    body.allowScroll();
  },
  init: function init() {
    body.init();
    menuButton.init();
    sidebar.init();
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
  },
  focus: function focus() {
    this.element.focus();
  }
};
var sidebar = {
  init: function init() {
    var _this = this;

    this.element = document.querySelector('.sidebar');
    this.tabTargets = document.querySelectorAll('.mobileNavMenu__link, .sidebar__callToActionButton');
    this.firstTabTarget = this.tabTargets[0];
    this.lastTabTarget = this.tabTargets[5];
    this.element.addEventListener('keydown', function (e) {
      return _this.trapFocus(e);
    });
  },
  makeTabTargetsFocusable: function makeTabTargetsFocusable() {
    this.tabTargets.forEach(function (tabTarget) {
      return tabTarget.setAttribute('tabindex', '0');
    });
  },
  makeTabTargetsUnfocusable: function makeTabTargetsUnfocusable() {
    this.tabTargets.forEach(function (tabTarget) {
      return tabTarget.setAttribute('tabindex', '-1');
    });
  },
  focusFirstTabTarget: function focusFirstTabTarget() {
    this.firstTabTarget.focus();
  },
  trapFocus: function trapFocus(e) {
    var firstTabTarget = this.firstTabTarget,
        lastTabTarget = this.lastTabTarget;
    var esc = e.keyCode === 27;
    var tab = e.keyCode === 9;

    if (esc) {
      controller.closeSidebar();
    } else if (tab && e.shiftKey && e.target === firstTabTarget) {
      e.preventDefault();
      lastTabTarget.focus();
    } else if (tab && !e.shiftKey && e.target === lastTabTarget) {
      e.preventDefault();
      firstTabTarget.focus();
    }
  }
};
var sidebarOverlay = {
  init: function init() {
    this.element = document.querySelector('.sidebarOverlay');
    this.element.addEventListener('click', controller.closeSidebar);
  }
};
controller.init();
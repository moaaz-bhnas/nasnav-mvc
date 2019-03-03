const controller = {
  openSidebar() {
    menuButton.press();
    body.preventScroll();
  },
  closeSidebar() {
    menuButton.release();
    body.allowScroll();
  },
  init() {
    body.init();
    menuButton.init();
    sidebarOverlay.init();
  }
}

const body = {
  init() {
    this.element = document.body;
  },
  preventScroll() {
    this.element.setAttribute('data-noscroll', 'true');
  },
  allowScroll() {
    this.element.setAttribute('data-noscroll', 'false');
  }
}

const menuButton = {
  init() {
    this.element = document.querySelector('.menuButton');
    this.element.addEventListener('click', controller.openSidebar);
  },
  press() {
    this.element.setAttribute('aria-pressed', true);
    this.element.setAttribute('aria-expanded', true);
  },
  release() {
    this.element.setAttribute('aria-pressed', 'false');
    this.element.setAttribute('aria-expanded', 'false');
  }
}

const sidebarOverlay = {
  init() {
    this.element = document.querySelector('.sidebarOverlay');
    this.element.addEventListener('click', controller.closeSidebar);
  }
}

controller.init()
const controller = {
  openSidebar() {
    menuButton.press();
    body.preventScroll();
    sidebar.makeTabTargetsFocusable();
    sidebar.focusFirstTabTarget();
  },
  closeSidebar() {
    menuButton.release();
    sidebar.makeTabTargetsUnfocusable();
    menuButton.focus();
    body.allowScroll();
  },
  init() {
    body.init();
    menuButton.init();
    sidebar.init();
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
  },
  focus() {
    this.element.focus();
  }
}

const sidebar = {
  init() {
    this.element = document.querySelector('.sidebar');
    this.tabTargets = document.querySelectorAll('.mobileNavMenu__link, .sidebar__callToActionButton');
    this.firstTabTarget = this.tabTargets[0];
    this.lastTabTarget = this.tabTargets[5];
    this.element.addEventListener('keydown', (e) => this.trapFocus(e));
  },
  makeTabTargetsFocusable() {
    this.tabTargets.forEach(tabTarget => tabTarget.setAttribute('tabindex', '0'));
  },
  makeTabTargetsUnfocusable() {
    this.tabTargets.forEach(tabTarget => tabTarget.setAttribute('tabindex', '-1'));
  },
  focusFirstTabTarget() {
    this.firstTabTarget.focus();
  },
  trapFocus(e) {
    const {firstTabTarget, lastTabTarget} = this;
    const esc = e.keyCode === 27;
    const tab = e.keyCode === 9;
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
}

const sidebarOverlay = {
  init() {
    this.element = document.querySelector('.sidebarOverlay');
    this.element.addEventListener('click', controller.closeSidebar);
  }
}

controller.init();
import {Navigation} from "../vendor/@meom/index.esm.min.js";
const meomNavigation = ( () => {
    const e = document.querySelector(".js-wvu-site-nav-items")
      , s = document.querySelector(".js-wvu-site-nav-toggle")
      , t = s.querySelector(".js-wvu-site-nav-toggle-text")
      , u = s.querySelector(".js-wvu-hamburger")
      , n = s.querySelectorAll(".js-wvu-hamburger__line--top, .js-wvu-hamburger__line--bottom");
    if (!e || !s || !t)
        return;
    new Navigation(e,s,{
        action: "hover",
        subNavClass: ".wvu-site-nav__sub-menu",
        subNavAnchors: ".js-wvu-site-nav-items > .wvu-site-nav__menu-item-has-children > a",
        subSubNavAnchors: ".js-wvu-site-nav-items .wvu-site-nav__sub-menu > .wvu-site-nav__menu-item-has-children > a",
        subToggleButtonClasses: "wvu-site-nav__sub-toggle ms-auto p-1 p-lg-0 text-muted",
        subSubToggleButtonClasses: "wvu-site-nav__sub-sub-toggle p-1 p-lg-0 ms-lg-auto me-lg-2 text-muted",
        visuallyHiddenClass: "visually-hidden",
        onOpenNav: () => {
            if (t.innerText = "Close Menu",
            u) {
                u.classList.add("js-wvu-hamburger--is-open");
                for (const e of n)
                    e.classList.add("js-wvu-hamburger__transition")
            }
        }
        ,
        onCloseNav: () => {
            t.innerText = "Open Menu",
            u && u.classList.remove("js-wvu-hamburger--is-open")
        }
    })
}
)();

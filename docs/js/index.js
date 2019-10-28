"use strict";
const showMenuButton = document.querySelector("#bandeau");

showMenuButton.addEventListener("click", () => {
  showMenuButton.classList.toggle("show-menu");
});

const collaps = document.querySelectorAll(".collapse-menu");

collaps.forEach(collap => {
  collap.addEventListener("click", () => {
    let collapMenu = collap.querySelector(".menu");
    let collapMenuWrapper = collap.querySelector(".menu-wrapper");

    if (collap.classList.contains("open")) {
      collapMenuWrapper.style.height = 0;
      collap.classList.remove("open");
    } else {
      collapMenuWrapper.style.height = collapMenu.clientHeight + "px";
      collap.classList.add("open");
    }
  });
});

const formFields = document.querySelectorAll("input, textarea");
if (formFields.length > 0) {
  formFields.forEach(field => {
    field.addEventListener("click", () => {
      field.focus();
    });
    field.addEventListener("touchend", () => {
      field.focus();
    });
  });
}

const textAreas = document.querySelectorAll("textarea");

if (textAreas) {
  textAreas.forEach(textarea => {
    textarea.addEventListener("input", event => {
      let textAreaCounter = textarea.parentNode.querySelector(
        ".textarea-counter"
      );
      textAreaCounter.innerText = `${textarea.value.length} / 1000`;

      let charsLeft = 999 - textarea.value.length;
      if (charsLeft < 0) {
        textarea.value = textarea.value.slice(0, 999);
      }
    });
  });
}

const anchors = document.querySelector(".anchors");
const frag = document.createDocumentFragment();
anchors.firstElementChild.appendChild(frag);
const anchorsLinks = document.querySelectorAll(".anchors ul li");

anchorsLinks.forEach(anchor => {
  let link = anchor.querySelector("a");
  link.addEventListener("click", (e)=> {

    anchorsLinks.forEach(el =>{
      el.querySelector("a").classList.remove("active");
    });
    
    e.currentTarget.classList.add("active")
  })
});


if (window.innerWidth >= 768) {
  const pageable = new Pageable("main", {
    interval: 400,
    delay: 300,
    events: {
      touch: false
    },

    // orientation: "horizontal",
    // easing: easings.easeOutBounce,
    onInit: function() {
      this.pages.forEach((page, i) => {
        const id = page.id;
        const text = `${id.charAt(0).toUpperCase()}${id.substr(1)}`;

        // generate top menu
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `#${page.id}`;

        a.textContent = text.replace("-", " ");

        if (i === 0) {
          a.classList.add("active");
        }

        li.appendChild(a);
        frag.appendChild(li);
      });
    },
    onBeforeStart: function(x, y) {
      this.pages.forEach((page, i) => {
        page.firstElementChild.classList.remove("active");
      });
    },
    onScroll: function(y) {},
    onFinish: function(data) {
      this.pages.forEach((page, i) => {
        page.firstElementChild.classList.toggle("active", i === this.index);

        anchors.firstElementChild.children[
          i
        ].firstElementChild.classList.toggle("active", i === this.index);
      });
    }
  });
}

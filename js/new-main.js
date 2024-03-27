// ---------- scene update
let screens = document.querySelectorAll(".primary");
let randonScreenBtn = document.querySelector(".randonScreen");

function randonScreen() {
  var random = Math.floor(Math.random() * screens.length) + 0;
  var randomScreen = screens[random];

  screens.forEach((screen) => {
    if (screen.classList.contains("show")) {
      screen.classList.remove("show");
    }
  });

  randomScreen.classList.add("show");
}
window.addEventListener("load", () => {
  randonScreen();
});

// // ---------- Animation
// механіка колекції пачок на descktop версії

const states = {
  start: "start",
  up: "up",
  click: "click",
  box: "box",
};

function desktopAnimation(collections) {
  collections.forEach(function (collection) {
    const gif = collection.querySelector(".animation-state1");
    gif.classList.add("animation-state_pc");

    const animation1 = new Image();
    const animation2 = new Image();
    const animation3 = new Image();
    const animation4 = new Image();

    const taste = gif.getAttribute("data-taste");
    const animName = gif.getAttribute("data-anim-name");
    animation1.src = `images/${animName}start.gif`;
    animation2.src = `images/${animName}up.gif`;
    animation3.src = `images/${animName}click.gif`;
    animation4.src = `images/${taste}-box.gif`;
    gif.src = animation1.src;

    function onEnter() {
      requestAnimationFrame(() => {
        gif.classList.add("animation-state2");
        gif.classList.remove("animation-state1");
        gif.src = animation2.src;
      })
    }
    
    function onLeave() {
      requestAnimationFrame(() => {
        gif.classList.add("animation-state1");
        gif.classList.remove("animation-state2");
        gif.src = animation1.src;
      })
    }
    
    gif.addEventListener("mouseenter", onEnter);
    gif.addEventListener("mouseleave", onLeave);
    
    gif.addEventListener("click", function () {
      gif.removeEventListener("mouseenter", onEnter);
      gif.removeEventListener("mouseleave", onLeave);
      
      gif.src = animation3.src;
      requestAnimationFrame(() => {
        gif.classList.add("animation-state3");
        gif.classList.remove("animation-state2");
        gif.classList.remove("animation-state1");
      })
      
      setTimeout(function () {
        requestAnimationFrame(() => {
          gif.classList.add("animation-state4");
          gif.classList.remove("animation-state3");
          gif.src = animation4.src;
        })
      }, 2000);
    });
  });
}

function mobileAnimation(collections) {
  collections.forEach(function (collection) {
    const gif = collection.querySelector(".animation-state1");
    gif.classList.add("animation-state_mob");

    const animation1 = new Image();
    const animation2 = new Image();
    const animation3 = new Image();
    const animation4 = new Image();

    const taste = gif.getAttribute("data-taste");
    const animName = gif.getAttribute("data-anim-name-mob");
    animation1.src = `images/${animName}start.gif`;
    animation2.src = `images/${animName}up.gif`;
    animation3.src = `images/${animName}click.gif`;

    animation4.src = `images/${taste}Mob-box.gif`;

    gif.src = animation1.src;

    let currentAnimation = 0
    const animations = [animation1, animation2, animation3, animation4]

    function nextAnimation() {
      gif.classList.remove(`animation-state${currentAnimation + 1}`);
      currentAnimation++
      gif.classList.add(`animation-state${currentAnimation + 1}`);
      gif.src = animations[currentAnimation].src;
    }

    function onTouch() {
      nextAnimation()

      if (currentAnimation === 2) {
        gif.removeEventListener("touchstart", onTouch);
        setTimeout(() => {
          nextAnimation()
        }, 2000)
      }
    }
    
    gif.addEventListener("touchstart", onTouch);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let gifCollections = document.querySelectorAll(".primary__animation-items");
  var mediaQuery = window.matchMedia("(min-width: 501px)");
  
  if (mediaQuery.matches) {
    desktopAnimation(gifCollections);
  } else {
    mobileAnimation(gifCollections);
  }
});

// mobile menu

let menuBtn = document.querySelector(".header__burgerIcon");
let menu = document.querySelector(".nav__menuMobile");
let menuLinks = document.querySelectorAll("li");

menuBtn.addEventListener("click", function (event) {
  event.preventDefault();
  toggleMenu();
});
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu();
  });
});
function toggleMenu() {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
  document.body.classList.toggle("lock");
}
window.addEventListener("scroll", () => {
  document.body.classList.remove("lock");
});

// ---------- show page content 

let allState4 = document.querySelectorAll(".animation-state4");
let primary = document.querySelector(".primary");

function checkAllElementsDisplayBlock(sectionClass, elementClass) {
  var sections = document.getElementsByClassName(sectionClass);
  let pageContent = document.querySelector(".page-content");

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var allBlocks = false;
    var elements = section.getElementsByClassName(elementClass);
    var blockCount = 0;

    for (var j = 0; j < elements.length; j++) {
      var computedStyle = window.getComputedStyle(elements[j]);
      if (computedStyle.getPropertyValue("display") === "block") {
        blockCount++;
        if (blockCount >= 3) {
          allBlocks = true;
          break;
        }
      }
    }

    // Додамо обробник події для мобільних пристроїв
    section.addEventListener("touchstart", function () {
      checkBlocks();
    });

    // Перевірка наявності блоків
    function checkBlocks() {
      if (allBlocks) {
        section.classList.add("fill-back");
        document.body.style.overflow = "inherit";
        setTimeout(function () {
          section.classList.add("hidden");
          setTimeout(function () {
            graduallyShowBlock(pageContent);
          }, 200);
        }, 500);
      }
    }

    checkBlocks();
  }
}

function graduallyShowBlock(block) {

  if (block.style.display != "block") { 
    startMyVideo();
  };

  block.style.display = "block"; // Показуємо блок

  // Збільшуємо прозорість блоку поетапно
  var opacity = 0;
  var interval = setInterval(function () {
    opacity += 0.3; // Збільшуємо прозорість на 0.1 кожні 100 мілісекунд
    block.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(interval); // Зупиняємо інтервал, коли прозорість досягає 1
    }
  }, 50);
}

document.addEventListener("click", () => {
  setTimeout(function () {
    checkAllElementsDisplayBlock("show", "animation-state4");
  }, 3000);
});

var mediaQuery = window.matchMedia("(max-width: 499px)");
document.addEventListener("touchstart", () => {
  if (mediaQuery.matches) {
    setTimeout(function () {
      checkAllElementsDisplayBlock("show", "animation-state4");
    }, 3000);
  }
});


function creatVideoBlock() {
  document.getElementById("videoPlay").innerHTML = "<div id='player'> </div>";

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player = document.getElementById("player");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "QhcLUbHvOto",
    playerVars: {
      controls: 1,
      autoplay: 1,
      mute: 1,
    },
  });
}

function startMyVideo () { 
  creatVideoBlock();
  onYouTubeIframeAPIReady();
}
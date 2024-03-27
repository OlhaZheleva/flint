// ---------- scene update
const screens = document.querySelectorAll(".primary");
const screensClasses = ["primary__beauty", "primary__gym", "primary__movers"];
const imagesSrc = {
  primary__beauty: {
    desktop: "images/primary-layer.webp",
    mobile: "images/beauty-layermob.webp",
  },
  primary__gym: {
    desktop: "images/primary-layer2.webp",
    mobile: "images/gym-layermob.webp",
  },
  primary__movers: {
    desktop: "images/primary-layer3.webp",
    mobile: "images/movers-layermob.webp",
  },
};

const imagesCache = {
  primary__beauty: {
    desktop: new Image(),
    mobile: new Image(),
  },
  primary__gym: {
    desktop: new Image(),
    mobile: new Image(),
  },
  primary__movers: {
    desktop: new Image(),
    mobile: new Image(),
  },
};

const BG_KEY = "flint_current-bg";

const defaultScreen = Math.floor(Math.random() * screens.length);

function randonScreen() {
  const prevIndex = JSON.parse(localStorage.getItem(BG_KEY)) ?? defaultScreen;
  const nextIndex = (prevIndex + 1) % screens.length;
  localStorage.setItem(BG_KEY, nextIndex);

  const nextScreenEl = screens[nextIndex];
  const NEXT_SCREEN_CLASS = screensClasses[nextIndex];

  screens.forEach((screen) => {
    if (screen.classList.contains("show")) {
      screen.classList.remove("show");
    }
  });
  nextScreenEl.classList.add("show");

  const pcImageEl = nextScreenEl.querySelector(`.${NEXT_SCREEN_CLASS}_pc`);
  const mobileImageEl = nextScreenEl.querySelector(
    `.${NEXT_SCREEN_CLASS}_mobile`
  );

  if (!pcImageEl.src && !mobileImageEl.src) {
    imagesCache[NEXT_SCREEN_CLASS].desktop.src =
      imagesSrc[NEXT_SCREEN_CLASS].desktop;
    imagesCache[NEXT_SCREEN_CLASS].mobile.src =
      imagesSrc[NEXT_SCREEN_CLASS].mobile;

    pcImageEl.src = imagesCache[NEXT_SCREEN_CLASS].desktop.src;
    mobileImageEl.src = imagesCache[NEXT_SCREEN_CLASS].mobile.src;
  }

  return nextIndex;
}

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
      });
    }

    function onLeave() {
      requestAnimationFrame(() => {
        gif.classList.add("animation-state1");
        gif.classList.remove("animation-state2");
        gif.src = animation1.src;
      });
    }

    function onClick() {
      gif.removeEventListener("click", onClick);
      gif.removeEventListener("mouseenter", onEnter);
      gif.removeEventListener("mouseleave", onLeave);

      gif.src = animation3.src;
      requestAnimationFrame(() => {
        gif.classList.add("animation-state3");
        gif.classList.remove("animation-state2");
        gif.classList.remove("animation-state1");
      });

      setTimeout(function () {
        requestAnimationFrame(() => {
          gif.classList.add("animation-state4");
          gif.classList.remove("animation-state3");
          gif.src = animation4.src;
        });
      }, 2000);
    }

    gif.addEventListener("mouseenter", onEnter);
    gif.addEventListener("mouseleave", onLeave);

    gif.addEventListener("click", onClick);
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

    let currentAnimation = 0;
    const animations = [animation1, animation2, animation3, animation4];

    function nextAnimation() {
      gif.classList.remove(`animation-state${currentAnimation + 1}`);
      currentAnimation++;
      gif.classList.add(`animation-state${currentAnimation + 1}`);
      gif.src = animations[currentAnimation].src;
    }

    function onTouch() {
      nextAnimation();

      if (currentAnimation === 2) {
        gif.removeEventListener("touchstart", onTouch);
        setTimeout(() => {
          nextAnimation();
        }, 2000);
      }
    }

    gif.addEventListener("touchstart", onTouch);
  });
}

function initAnimation(currentScreenIndex) {
  const currentScreen = screens[currentScreenIndex];

  const gifCollections = currentScreen.querySelectorAll(
    ".primary__animation-items"
  );
  const mediaQuery = window.matchMedia("(min-width: 501px)");

  if (mediaQuery.matches) {
    desktopAnimation(gifCollections);
  } else {
    mobileAnimation(gifCollections);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentScreenIndex = randonScreen();
  initAnimation(currentScreenIndex);
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
  }, 4000);
});

var mediaQuery = window.matchMedia("(max-width: 499px)");
document.addEventListener("touchstart", () => {
  if (mediaQuery.matches) {
    setTimeout(function () {
      checkAllElementsDisplayBlock("show", "animation-state4");
    }, 4000);
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
  let primary1 = document.querySelector(".primary1");
  let primary2 = document.querySelector(".primary2");

  if (primary1.classList.contains("show")) {
    player = new YT.Player("player", {
      videoId: "zBXh7alvNuE",
      playerVars: {
        controls: 1,
        autoplay: 1,
        mute: 1,
      },
    });
  } else if (primary2.classList.contains("show")) {
    player = new YT.Player("player", {
      videoId: "s6VeoH6mPuY",
      playerVars: {
        controls: 1,
        autoplay: 1,
        mute: 1,
      },
    });
  } else {
    player = new YT.Player("player", {
      videoId: "QhcLUbHvOto",
      playerVars: {
        controls: 1,
        autoplay: 1,
        mute: 1,
      },
    });
  }
}

function startMyVideo() {
  creatVideoBlock();
  onYouTubeIframeAPIReady();
}

window.addEventListener("scroll", function () {
  if (window.pageYOffset >= 300) {
    if (!document.getElementById("player")) {
      startMyVideo();
    }
  }
});


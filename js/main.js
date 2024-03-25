// ---------- scene update
let screens = document.querySelectorAll(".primary");
let randonScreenBtn = document.querySelector(".randonScreen");

function randonScreen() {
  var random = Math.floor(Math.random() * screens.length);
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
randonScreenBtn.addEventListener('click', function(event) { 
  event.preventDefault();
  location.reload();
})
// // ---------- Animation
// механіка колекції пачок на descktop версії

document.addEventListener("DOMContentLoaded", function () {
  var mediaQueryPC = window.matchMedia("(min-width: 501px)");
  var mediaQueryMob = window.matchMedia("(max-width: 499px)");
  let gifCollections = document.querySelectorAll(".primary__animation-items");

  if (mediaQueryPC.matches) {
    gifCollections.forEach(function (collection) {
      let gif1 = collection.querySelector(".animation-state1");
      let gif2 = collection.querySelector(".animation-state2");
      let gif3 = collection.querySelector(".animation-state3");
      let gif4 = collection.querySelector(".animation-state4");

      gif2.style.display = "none";
      gif3.style.display = "none";
      gif4.style.display = "none";

      gif1.addEventListener("mouseenter", function () {
        gif1.style.display = "none";
        gif2.style.display = "block";
      });

      gif2.addEventListener("click", function () {
        gif2.style.display = "none";
        gif3.style.display = "block";

        setTimeout(function () {
          gif3.style.display = "none";
          gif4.style.display = "block";
        }, 2000);
      });
    });
  }
  if (mediaQueryMob.matches) {
    gifCollections.forEach(function (collection) {
      let gifs = collection.querySelectorAll(".animation-state_mob");
      let gif1 = collection.querySelector(".animation-state1");
      let gif2 = collection.querySelector(".animation-state2");
      let gif3 = collection.querySelector(".animation-state3");
      let gif4 = collection.querySelector(".animation-state4");
      let currentStateIndex = 0;
    
      gifs.forEach(function (gif, index) {
        if (index !== currentStateIndex) {
          gif.style.display = "none";
        }
    
        gif.addEventListener("touchstart", function (event) {
          event.preventDefault();
          gifs[currentStateIndex].style.display = "none"; // Приховуємо поточний стан
    
          // Змінюємо індекс поточного стану на наступний
          currentStateIndex = (currentStateIndex + 1) % gifs.length;
    
          // Показуємо наступний стан
          gifs[currentStateIndex].style.display = "block";
    
          // Перевіряємо, чи досягнуто кінця анімації, якщо так, то показуємо наступний стан gif4
          if (currentStateIndex === 2) {
            setTimeout(function () {
              gifs[2].style.display = "none";
              gif4.style.display = "block";
            }, 2000);
          }
        });
      });
    });
    
  }
});


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

// ---------- scene update end

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
    section.addEventListener("touchstart", function (event) {
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
          }, 500);
        }, 500);
      }
    }

    // Виклик функції перевірки при завантаженні сторінки
    checkBlocks();
  }
}

function graduallyShowBlock(block) {
  block.style.display = "block"; // Показуємо блок

  // Збільшуємо прозорість блоку поетапно
  var opacity = 0;
  var interval = setInterval(function () {
    opacity += 0.25; // Збільшуємо прозорість на 0.1 кожні 100 мілісекунд
    block.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(interval); // Зупиняємо інтервал, коли прозорість досягає 1
    }
  }, 100);
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
    }, 4000);
  }
});

// відкладене завантаження відео

document.addEventListener("DOMContentLoaded", function () {
  var lazyLoadedVideo = document.getElementById("lazy-loaded-video");
  if (lazyLoadedVideo) {
    var src = lazyLoadedVideo.getAttribute("data-src");
    lazyLoadedVideo.setAttribute("src", src);
  }
});

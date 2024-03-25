// ---------- Animation

// document.addEventListener("DOMContentLoaded", function () {
//   let gifCollections = document.querySelectorAll(".primary__animation-items");

//   gifCollections.forEach(function (collection) {
//     let gif1 = collection.querySelector(".animation-state1");
//     let gif2 = collection.querySelector(".animation-state2");
//     let gif3 = collection.querySelector(".animation-state3");
//     let gif4 = collection.querySelector(".animation-state4");

//     gif2.style.display = "none";
//     gif3.style.display = "none";
//     gif4.style.display = "none";

//     gif1.addEventListener("mouseenter", function () {
//       gif1.style.display = "none";
//       gif2.style.display = "block";
//     });

//     gif2.addEventListener("click", function () {
//       gif2.style.display = "none";
//       gif3.style.display = "block";

//       setTimeout(function () {
//         gif3.style.display = "none";
//         gif4.style.display = "block";
//       }, 2000);
//     });
//   });
// });


// ---------- Animation

document.addEventListener("DOMContentLoaded", function() {

    let gifCollections = document.querySelectorAll(".primary__animation-items");

    gifCollections.forEach(function(collection) {
        let gif1 = collection.querySelector(".animation-state1");
        let gif2 = collection.querySelector(".animation-state2");
        let gif3 = collection.querySelector(".animation-state3");
        let gif4 = collection.querySelector(".animation-state4");

        gif2.style.display = "none";
        gif3.style.display = "none";
        gif4.style.display = "none";

        gif1.addEventListener("mouseenter", function() {
            gif1.style.display = "none";
            gif2.style.display = "block";
        });

        gif2.addEventListener("click", function() {
            gif2.style.display = "none";
            gif3.style.display = "block";
            
            setTimeout(function() {
                gif3.style.display = "none";
                gif4.style.display = "block";
            }, 2000);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let gifCollections = document.querySelectorAll(".primary__animation-items");

    gifCollections.forEach(function(collection) {
        let gifs = collection.querySelectorAll(".animation-state_mob");
        let gif1 = collection.querySelector(".animation-state1");
        let gif2 = collection.querySelector(".animation-state2");
        let gif3 = collection.querySelector(".animation-state3");
        let gif4 = collection.querySelector(".animation-state4");

        gif2.style.display = "none";
        gif3.style.display = "none";
        gif4.style.display = "none";

        gifs.forEach(function(gif, index) {
            if (index !== 0) {
                gif.style.display = "none";
            }

            gif.addEventListener("touchstart", function(event) {
                event.preventDefault(); 
                gif.style.display = "none"; 

                let nextIndex = (index + 1) % gifs.length;
                gifs[nextIndex].style.display = "block";

                
                if (gif === gif2) {
                    setTimeout(function() {
                        gif3.style.display = "none";
                        gif4.style.display = "block";
                    }, 2000);
                }
            });
        });
    });
});

// ---------------------mobile menu

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

// ---------- scene update
let screens = document.querySelectorAll(".primary");
let randonScreenBtn = document.querySelector(".randonScreen");

function randonScreen() {
  var random = Math.floor(Math.random() * screens.length) + 0;
  var randomScreen = screens[random];

  screens.forEach((screen) => {
    screen.classList.remove("show");
  });
  randomScreen.classList.add("show");
}
window.addEventListener("load", () => {
  randonScreen();
});

randonScreenBtn.addEventListener("click", randonScreen());

// ---------- scene update end

let allState4 = document.querySelectorAll(".animation-state4");
let primary = document.querySelector(".primary");


function checkAllElementsDisplayBlock(sectionClass, elementClass) {
    var sections = document.getElementsByClassName(sectionClass);
    let pageContent = document.querySelector(".page-content");

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var allBlocks = false; // Значення allBlocks повинно бути початково встановлено як false
        var elements = section.getElementsByClassName(elementClass);
        var blockCount = 0;

        for (var j = 0; j < elements.length; j++) {
            var computedStyle = window.getComputedStyle(elements[j]);
            if (computedStyle.getPropertyValue("display") === "block") { // Перевірка, чи елемент має стиль block
                blockCount++;
                if (blockCount >= 3) {
                    allBlocks = true;
                    break;
                }
            }
        }

        if (allBlocks) {
            section.classList.add("fill-back");
            setTimeout(function () {
                section.classList.add("hidden");
                setTimeout(function() {
                    graduallyShowBlock(pageContent);
                }, 500); // Функція graduallyShowBlock повинна бути передана у setTimeout без виклику
            }, 500);
        }
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
  }, 6500);
});

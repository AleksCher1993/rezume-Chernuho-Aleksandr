function configWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    configWebP(function (support) {
    
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });;
const nav = () => {
  let navBurgerBtn = document.getElementById("nav__burder__button");
  let navLink = document.getElementById("nav__link");
  let isNavOpen = false;

  navLink.addEventListener("click", (e) => {
    let t = e.target;
    let a = navLink.querySelectorAll("a");

    if (t.closest("a")) {
      a.forEach((elem) => {
        elem.classList.remove("active");
      });
      t.classList.add("active");
    }
  });

  navBurgerBtn.addEventListener("click", () => {
    isNavOpen ? (isNavOpen = false) : (isNavOpen = true);

    if (isNavOpen) {
      navLink.style.display = "flex";
      // navLink.classList.remove("animate__up__navbar");
      // navLink.classList.add("animate__down__navbar");
      navLink.classList.remove("pullUp");
      navLink.classList.add("pullDown");
    } else {
      //   navLink.classList.remove("animate__down__navbar");
      //   navLink.classList.add("animate__up__navbar");
      navLink.classList.remove("pullDown");
      navLink.classList.add("pullUp");
      setTimeout(() => {
        navLink.style.display = "";
      }, 450);
    }
  });
};
nav();
;
let getYear = () => {
  const getYear = document.querySelector("#getYear");
  getYear.innerHTML = new Date().getFullYear();
};
getYear();
;
const animation = () => {
  const sectionSkills = document.querySelector(".section__skills");
  const sectionWorks = document.querySelector("#section_works");

  window.addEventListener("scroll", function () {
    if (this.window.outerWidth < 576) {
      sectionSkills.style.display = "block";
      sectionWorks.style.display = "block";
    } else {
      if (this.scrollY >= 180) {
        sectionSkills.style.display = "block";
      }
      if (this.scrollY >= 400) {
        console.log(this.pageYOffset);
        sectionWorks.style.display = "block";
      }
    }
  });
};
animation();
;
const chatbot = () => {
  const chatbotButton = document.querySelector(".chatbot__button");
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector("#close");
  const modalTextarea = modal.querySelector("#modal__textarea");
  const modalMess = modal.querySelector(".modal__textarea__mess");
  const modalSendBrn = modal.querySelector(".modal__textarea__btn>button");
  const setting = { color: "blue", paddingLeft: "10%", value: "" };
  const arrayQuestion = [
    "Привет, меня зовут Александр. Как тебя зовут?",
    "Здорово!",
    "Тебе понравился мой чат бот?",
    "Спасибо за отзыв...",
    "Я буду благодарен, если ты оставишь мне свой комментарий...)",
    "Этот чат бот очень примитивный т.к. я создал небольшой массив с вопросами и возмодными ответами). За появлением бот ответов я отслеживал ответы пользователя => записывал ответы пользователя в session storage => следил за длинной массива modal в session storage и при условиях выводит ответы бота)) простенькое общение со мной)) Надеюсь тебе понравилось)",
    "Спасибо за общение. Хочешь повторить? удали session storage по ключу modal или открой в новой вкладке мой сайт)",
  ];

  const chatbotAnim = () => {
    window.timeId = setInterval(() => {
      console.log(2);
      chatbotButton.classList.toggle("hatch");
    }, 2500);
  };
  const getModal = () => {
    chatbotButton.addEventListener("click", () => {
      modalTextarea.innerHTML = "";
      modal.classList.add("show");
      clearInterval(window.timeId);
      let textWindow = sessionStorage.getItem("modal")
        ? JSON.parse(sessionStorage.getItem("modal"))
        : [];
      if (textWindow.length == 0) {
        modalTextarea.insertAdjacentHTML(
          "beforeend",
          `<p style='padding-left:5%;'>${arrayQuestion[0]}</p>`
        );
      } else {
        creater();
      }
      if (textWindow.length >= 3) {
        modalMess.disabled = "true";
        modalMess.placeholder = "Спасибо за общение.";
      }
    });
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
      chatbotAnim();
    });
  };
  modalSendBrn.addEventListener("click", function modalSend(event) {
    creater();
  });
  const creater = () => {
    modalTextarea.innerHTML = "";
    let textWindow = sessionStorage.getItem("modal")
      ? JSON.parse(sessionStorage.getItem("modal"))
      : [];
    setting.value = modalMess.value;
    switch (textWindow.length) {
      case 0:
        textWindow.push(
          arrayQuestion[0],
          setting,
          arrayQuestion[1],
          arrayQuestion[2]
        );

        break;
      case 4:
        textWindow.push(setting, arrayQuestion[3], arrayQuestion[4]);

        break;
      case 7:
        textWindow.push(setting, arrayQuestion[5]);

        break;
      case 9:
        textWindow.push(setting, arrayQuestion[6]);

        break;
      default:
        modalMess.disabled = true;
        modalMess.placeholder = "Спасибо за общение";
        break;
    }
    sessionStorage.setItem("modal", JSON.stringify(textWindow));

    textWindow.forEach((element) => {
      if (typeof element == "object") {
        modalTextarea.insertAdjacentHTML(
          "beforeend",
          `
          <p style='color:${element.color};padding-left:${element.paddingLeft}'>${element.value}</p>
          `
        );
      } else {
        modalTextarea.insertAdjacentHTML(
          "beforeend",
          `
          <p>${element}</p>
          `
        );
      }
    });
    modalTextarea.scrollTop = modalTextarea.scrollHeight;
    modalMess.value = "";
  };
  // -------------------------
  chatbotAnim();
  getModal();
};
chatbot();
;


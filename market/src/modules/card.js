import postDate from "./postDate";
import renderCard from "./renderCard";
import renderCounter from "./renderCounter";
const cart = () => {
  let openModal = document.getElementById("cart");
  let counter = openModal.querySelector(".counter");
  let modal = document.querySelector(".cart");
  let cartClose = modal.querySelector(".cart-close");
  let cartConfirm = modal.querySelector(".cart-confirm");
  let goodsBtn = document.querySelector(".goods");
  let cartWrapper = document.querySelector(".cart-wrapper");
  let cartTotal = document.querySelector(".cart-total>span");

  openModal.addEventListener("click", () => {
    modal.style.display = "flex";
    const card = localStorage.getItem("card")
      ? JSON.parse(localStorage.getItem("card"))
      : [];

    renderCard(card);
    cartTotal.innerHTML = card.reduce((res, elem) => {
      return res + elem.price;
    }, 0);
  });

  cartClose.addEventListener("click", () => {
    modal.style.display = "";
  });

  goodsBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary")) {
      const cardId = e.target.closest(".card").dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      const card = localStorage.getItem("card")
        ? JSON.parse(localStorage.getItem("card"))
        : [];
      console.log(card.length + 1);
      const goodsItem = goods.find((elem) => {
        return elem.id == cardId;
      });
      card.push(goodsItem);
      localStorage.setItem("card", JSON.stringify(card));
      renderCounter();
    }
  });
  cartWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const card = localStorage.getItem("card")
        ? JSON.parse(localStorage.getItem("card"))
        : [];
      const cardId = event.target.closest(".card").dataset.key;
      const index = card.findIndex((elem) => {
        return elem.id === +cardId;
      });
      card.splice(index, 1);
      renderCard(card);
      cartTotal.innerHTML = card.reduce((res, elem) => {
        return res + elem.price;
      }, 0);
      localStorage.setItem("card", JSON.stringify(card));
      renderCounter();
    }
  });

  cartConfirm.addEventListener("click", () => {
    const card = localStorage.getItem("card")
      ? JSON.parse(localStorage.getItem("card"))
      : [];
    postDate(card).then(() => {
      localStorage.removeItem("card");
    });
    renderCard([]);
    cartTotal.innerHTML = 0;
    counter.innerHTML = 0;
  });
};
export default cart;

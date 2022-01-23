const category = () => {
  let catalogButton = document.querySelector(".catalog-button");
  let catalog = document.querySelector(".catalog");
  let isOpen = false;
  catalogButton.addEventListener("click", () => {
    isOpen = !isOpen;
    isOpen ? (catalog.style.display = "flex") : (catalog.style.display = "");
  });
};
export default category;

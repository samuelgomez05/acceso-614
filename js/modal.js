const modal = document.querySelector("#modal");
const openModal = document.querySelectorAll(".open-modal");
const closeModal = document.querySelector("#close-modal");

openModal.forEach(element => {
  element.addEventListener("click", function() {
    modal.showModal();
  });
});

closeModal.addEventListener("click", function() {
  modal.close();
})
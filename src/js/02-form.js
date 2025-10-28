// feedback.js
const STORAGE_KEY = "feedback-form-state";

// form elementini seçiyoruz
const form = document.querySelector(".feedback-form");

// form verilerini tutacak obje
let formData = {};

// Sayfa yüklendiğinde localStorage'dan veri varsa formu doldur
window.addEventListener("load", () => {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  }
});

// input olayını dinleyip localStorage’a kaydet.
form.addEventListener("input", (event) => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// submit olayında formu temizle ve console’a yazdır
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { email, message } = form.elements;

  // Konsola nesne olarak yazdır
  console.log({
    email: email.value.trim(),
    message: message.value.trim(),
  });

  // localStorage ve form temizleme
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = {};
});

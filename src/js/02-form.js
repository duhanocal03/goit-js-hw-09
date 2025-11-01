const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");
let formData = {};

if (!form) {
  console.warn("Form element not found!");
} else {
  // Sayfa yüklendiğinde localStorage'dan veri varsa formu doldur
  window.addEventListener("load", () => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      formData = JSON.parse(savedData);
      form.elements.email.value = formData.email || "";
      form.elements.message.value = formData.message || "";
    }
  });

  // input olayını dinleyip localStorage’a kaydet
  form.addEventListener("input", (event) => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  // submit olayında formu kontrol et, gerekirse uyarı göster
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const { email, message } = form.elements;
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    // ⚠️ Boş kontrolü
    if (!emailValue || !messageValue) {
      alert("Lütfen e-posta ve mesaj alanlarını doldurun.");
      return; // gönderme işlemini iptal et
    }

    // Konsola nesne olarak yazdır
    console.log({
      email: emailValue,
      message: messageValue,
    });

    // localStorage ve form temizleme
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = {};
  });
}

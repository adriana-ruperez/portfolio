const reveals = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const galleryItems = document.querySelectorAll("[data-gallery-item]");
const lightbox = document.getElementById("lightbox");
const lightboxGrid = document.getElementById("lightbox-grid");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((element) => revealObserver.observe(element));

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const galleryMap = {
  campusride: [
    "./assets/campusride/IMG_4748.JPG",
    "./assets/campusride/Captura%202026-05-21%20a%20las%2023.22.48.png",
    "./assets/campusride/Captura%20de%20pantalla%202026-02-01%20a%20las%2018.24.04.png",
  ],
  "sandoz-rag": [
    "./assets/sandoz-rag/Captura%202026-05-21%20a%20las%2023.04.52.png",
    "./assets/sandoz-rag/IMG_3607.HEIC.png",
    "./assets/sandoz-rag/IMG_4506.HEIC.png",
  ],
  "milanes-transport": [
    "./assets/milanes-transport/IMG_4887%202.PNG",
    "./assets/milanes-transport/WhatsApp%20Image%202026-05-06%20at%2022.57.47.jpeg",
  ],
  "open-uc3m": [
    "./assets/open-uc3m/Captura%202026-05-21%20a%20las%2022.57.51.png",
    "./assets/open-uc3m/Captura%202026-05-21%20a%20las%2023.01.35.png",
    "./assets/open-uc3m/Captura%202026-05-21%20a%20las%2023.01.56.png",
  ],
  "ski-instructor": [
    "./assets/ski-instructor/IMG_4171.JPG",
    "./assets/ski-instructor/de858ffb-c141-43f8-9d7d-7023de47a5f3.JPG",
    "./assets/ski-instructor/IMG_8266.jpg",
    "./assets/ski-instructor/IMG_9922.jpg",
  ],
};

function openLightbox(key) {
  const images = galleryMap[key] ?? [];
  lightboxGrid.innerHTML = images.map((src) => `<img src="${src}" alt="Gallery image" />`).join("");
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxGrid.innerHTML = "";
  document.body.style.overflow = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item.dataset.galleryItem));
});

lightbox.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.closeLightbox === "true") {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

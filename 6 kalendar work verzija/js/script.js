///////////////////////////////////////////////////////////
// Azuriranje godine u copyrightu
const godinaEl = document.querySelector(".godina");
const trenutnaGodina = new Date().getFullYear();
godinaEl.textContent = trenutnaGodina;

///////////////////////////////////////////////////////////
// Navigacija za telefone
const btnNavEl = document.querySelector(".btn-mob-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Zatvaranje navigacije za telefone nakon sto se klikne link

const allLinks = document.querySelectorAll(".navigation-main-link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// STICKY NAVIGACIJA

const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// KALENDAR

///////////////////////////////////////////////////////////
// APLIKACIJA ZA VREMENSKU PROGNOZU API

///////////////////////////////////////////////////////////
// LIGHTBOX GALERIJA (dve odvojene: kuća i priroda)

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");

let aktivnaGalerija = [];
let trenutniIndeks = 0;

function prikaziSliku(indeks) {
  trenutniIndeks = indeks;
  lightboxImg.src = aktivnaGalerija[indeks].src;
  lightboxImg.alt = aktivnaGalerija[indeks].alt;
  lightboxCounter.textContent = `${indeks + 1} / ${aktivnaGalerija.length}`;
}

function openLightbox(galerija, indeks) {
  aktivnaGalerija = galerija;
  prikaziSliku(indeks);
  lightbox.classList.add("lightbox--open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("lightbox--open");
  document.body.style.overflow = "";
}

function prevSlika() {
  prikaziSliku((trenutniIndeks - 1 + aktivnaGalerija.length) % aktivnaGalerija.length);
}

function nextSlika() {
  prikaziSliku((trenutniIndeks + 1) % aktivnaGalerija.length);
}

// Galerija prirode (sve slike, uključujući skrivene > 12 — dostupne u lightbox-u)
const galerijaPriroda = Array.from(document.querySelectorAll(".galerija-priroda-img"));
galerijaPriroda.forEach(function (slika, i) {
  slika.addEventListener("click", function () { openLightbox(galerijaPriroda, i); });
});

// Galerija kuće (sve slike, uključujući skrivene > 12)
const galerijaKuca = Array.from(document.querySelectorAll(".galerija-kuca-img"));
galerijaKuca.forEach(function (slika, i) {
  slika.addEventListener("click", function () { openLightbox(galerijaKuca, i); });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevSlika);
lightboxNext.addEventListener("click", nextSlika);

// Klik na tamnu pozadinu zatvara lightbox
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) closeLightbox();
});

///////////////////////////////////////////////////////////
// POPUP: DOMAĆIN

const popupDomacin = document.getElementById("popup-domacin");
const popupDomacinClose = document.getElementById("popup-domacin-close");

function openPopupDomacin(e) {
  e.preventDefault();
  popupDomacin.classList.add("popup--open");
  document.body.style.overflow = "hidden";
}

function closePopupDomacin() {
  popupDomacin.classList.remove("popup--open");
  document.body.style.overflow = "";
}

// Trigger: KORAK 02 (slika + tekst)
document.querySelectorAll(".korak-02-trigger").forEach(function (el) {
  el.addEventListener("click", openPopupDomacin);
});

// Trigger: "u korpu" dugmad
document.querySelectorAll(".btn--buy").forEach(function (btn) {
  btn.addEventListener("click", openPopupDomacin);
});

// Trigger: "Rezervišite" dugmad u cenovniku
document.querySelectorAll(".cenovnik-rezervisi .btn--full").forEach(function (btn) {
  btn.addEventListener("click", openPopupDomacin);
});

popupDomacinClose.addEventListener("click", closePopupDomacin);
popupDomacin.addEventListener("click", function (e) {
  if (e.target === popupDomacin) closePopupDomacin();
});

///////////////////////////////////////////////////////////
// POPUP: JELOVNIK

const popupJelovnik = document.getElementById("popup-jelovnik");
const popupJelovnikClose = document.getElementById("popup-jelovnik-close");
const jelovnikLink = document.getElementById("jelovnik-link");

function openPopupJelovnik(e) {
  e.preventDefault();
  popupJelovnik.classList.add("popup--open");
  document.body.style.overflow = "hidden";
}

function closePopupJelovnik() {
  popupJelovnik.classList.remove("popup--open");
  document.body.style.overflow = "";
}

jelovnikLink.addEventListener("click", openPopupJelovnik);
popupJelovnikClose.addEventListener("click", closePopupJelovnik);
popupJelovnik.addEventListener("click", function (e) {
  if (e.target === popupJelovnik) closePopupJelovnik();
});

// Escape zatvara koji god popup/lightbox je otvoren; strelice listaju lightbox
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
    closePopupDomacin();
    closePopupJelovnik();
  }
  if (lightbox.classList.contains("lightbox--open")) {
    if (e.key === "ArrowLeft") prevSlika();
    if (e.key === "ArrowRight") nextSlika();
  }
});

///////////////////////////////////////////////////////////
// POPUP: ŠIFRA + LOKACIJA (KORAK 03)

const TACNA_SIFRA = "studenac031";

const popupSifra    = document.getElementById("popup-sifra");
const popupSifraClose = document.getElementById("popup-sifra-close");
const sifraInput    = document.getElementById("sifra-input");
const sifraGreska   = document.getElementById("sifra-greska");
const sifraPotvrdi  = document.getElementById("sifra-potvrdi");

const popupLokacija      = document.getElementById("popup-lokacija");
const popupLokacijaClose = document.getElementById("popup-lokacija-close");

function openPopupSifra(e) {
  e.preventDefault();
  sifraInput.value = "";
  sifraGreska.classList.remove("greska--vidljiva");
  sifraInput.classList.remove("input-error");
  popupSifra.classList.add("popup--open");
  document.body.style.overflow = "hidden";
  setTimeout(() => sifraInput.focus(), 250);
}

function closePopupSifra() {
  popupSifra.classList.remove("popup--open");
  document.body.style.overflow = "";
}

function openPopupLokacija() {
  closePopupSifra();
  setTimeout(() => {
    popupLokacija.classList.add("popup--open");
    document.body.style.overflow = "hidden";
  }, 200);
}

function closePopupLokacija() {
  popupLokacija.classList.remove("popup--open");
  document.body.style.overflow = "";
}

function proveriSifru() {
  const vrednost = sifraInput.value.trim();
  if (vrednost === TACNA_SIFRA) {
    openPopupLokacija();
  } else {
    sifraInput.classList.add("input-error");
    sifraGreska.classList.add("greska--vidljiva");
    sifraInput.select();
    setTimeout(() => {
      sifraInput.classList.remove("input-error");
    }, 600);
  }
}

document.querySelectorAll(".korak-03-trigger").forEach(function (el) {
  el.addEventListener("click", openPopupSifra);
});

sifraPotvrdi.addEventListener("click", proveriSifru);
sifraInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") proveriSifru();
});

popupSifraClose.addEventListener("click", closePopupSifra);
popupSifra.addEventListener("click", function (e) {
  if (e.target === popupSifra) closePopupSifra();
});

popupLokacijaClose.addEventListener("click", closePopupLokacija);
popupLokacija.addEventListener("click", function (e) {
  if (e.target === popupLokacija) closePopupLokacija();
});

// Escape zatvara i ove popup-e (nadovezuje se na prethodni keydown)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopupSifra();
    closePopupLokacija();
  }
});

///////////////////////////////////////////////////////////
// SCROLL ANIMACIJE

function initScrollReveal() {
  // Elementi koji se animiraju individualno (fade up)
  const fadeUp = [
    ".heading-featured",
    ".logos",
    ".ceo-jelovnik",
    ".testimonials-box .subheading",
    ".testimonials-box .heading-secondary",
    ".section-uputstvo .subheading",
    ".section-uputstvo .heading-secondary",
    ".section-proizvodi .subheading",
    ".section-proizvodi .heading-secondary",
    ".section-cenovnik .subheading",
    ".section-cenovnik .heading-secondary",
    ".cta",
    ".logo-col",
    ".adresa-col",
    ".footer-heading",
    ".cenovnik-detalji",
  ];

  // Elementi koji se animiraju u grupi sa stagger efektom
  const staggerGroups = [
    ".uputstvo-text-box",
    ".uputstvo-img-box",
    ".proizvod-kartica",
    ".testimonial",
    ".galerija-item",
    ".cenovnik-kartica",
    ".specifikacije",
    ".nav-col",
  ];

  fadeUp.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("scroll-reveal");
    });
  });

  staggerGroups.forEach(function (sel) {
    // Grupišemo elemente po parentu da stagger bude lokalan
    const mapa = new Map();
    document.querySelectorAll(sel).forEach(function (el) {
      const parent = el.parentElement;
      if (!mapa.has(parent)) mapa.set(parent, []);
      mapa.get(parent).push(el);
    });
    mapa.forEach(function (deca) {
      deca.forEach(function (el, i) {
        el.classList.add("scroll-reveal");
        el.style.transitionDelay = i * 0.1 + "s";
      });
    });
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
          // Uklanjamo scroll-reveal klasu nakon animacije da hover efekti
          // (npr. zoom na karticama) rade normalno sa originalnom tranzicijom
          entry.target.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "transform") {
              entry.target.classList.remove("scroll-reveal");
              entry.target.style.transitionDelay = "";
              entry.target.removeEventListener("transitionend", handler);
            }
          });
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".scroll-reveal").forEach(function (el) {
    observer.observe(el);
  });
}

// Pokrenuti tek nakon što je stranica u potpunosti učitana
if (document.readyState === "complete") {
  initScrollReveal();
} else {
  window.addEventListener("load", initScrollReveal);
}

///////////////////////////////////////////////////////////
// KALENDAR DOSTUPNOSTI — 3 meseca

const KALENDAR_API = "https://script.google.com/macros/s/AKfycbzu5YjX3RfvlM6QimkOoDfi-z7YvIGcYe8BuhKkGMm1sRgXHXoGyHlUGkHiuhE5hBiDrg/exec";

const MESECI = [
  "Januar","Februar","Mart","April","Maj","Jun",
  "Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"
];

let zauzetiDatumi = new Set();
let kalMesec = new Date().getMonth();
let kalGodina = new Date().getFullYear();

function formatDatum(god, mes, dan) {
  return `${god}-${String(mes + 1).padStart(2, "0")}-${String(dan).padStart(2, "0")}`;
}

function renderMesec(offset, gridId, naslovId) {
  let mes = kalMesec + offset;
  let god = kalGodina;
  while (mes > 11) { mes -= 12; god++; }
  while (mes < 0)  { mes += 12; god--; }

  document.getElementById(naslovId).textContent = `${MESECI[mes]} ${god}`;

  const danas = new Date();
  danas.setHours(0, 0, 0, 0);

  const prvogMeseca  = new Date(god, mes, 1);
  const poslednjiDan = new Date(god, mes + 1, 0).getDate();

  let pocetniDan = prvogMeseca.getDay();
  pocetniDan = pocetniDan === 0 ? 6 : pocetniDan - 1;

  const grid = document.getElementById(gridId);
  grid.innerHTML = "";

  for (let i = 0; i < pocetniDan; i++) {
    const el = document.createElement("div");
    el.classList.add("dan");
    grid.appendChild(el);
  }

  for (let d = 1; d <= poslednjiDan; d++) {
    const datumDan = new Date(god, mes, d);
    datumDan.setHours(0, 0, 0, 0);
    const kljuc = formatDatum(god, mes, d);

    const el = document.createElement("div");
    el.classList.add("dan");
    el.textContent = d;

    if (datumDan < danas) {
      el.classList.add("dan--proslo");
    } else if (datumDan.getTime() === danas.getTime()) {
      el.classList.add("dan--danas");
      if (zauzetiDatumi.has(kljuc)) el.classList.add("dan--zauzet");
    } else if (zauzetiDatumi.has(kljuc)) {
      el.classList.add("dan--zauzet");
    } else {
      el.classList.add("dan--slobodan");
    }

    grid.appendChild(el);
  }
}

function renderKalendar() {
  renderMesec(0, "grid-0", "naslov-0");
  renderMesec(1, "grid-1", "naslov-1");
  renderMesec(2, "grid-2", "naslov-2");
}

async function ucitajKalendar() {
  try {
    const res  = await fetch(KALENDAR_API);
    const data = await res.json();
    zauzetiDatumi = new Set(
      data.datumi.map(function(d) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
        const dt = new Date(d);
        return formatDatum(dt.getFullYear(), dt.getMonth(), dt.getDate());
      })
    );
  } catch (e) {
    console.warn("Kalendar: nije moguće učitati zauzete datume.", e);
  }
  renderKalendar();
  document.getElementById("kalendar-loading").style.display = "none";
  document.getElementById("kalendar-sadrzaj").classList.add("je-ucitan");
}

document.getElementById("btn-prev").addEventListener("click", function () {
  kalMesec--;
  if (kalMesec < 0) { kalMesec = 11; kalGodina--; }
  renderKalendar();
});

document.getElementById("btn-next").addEventListener("click", function () {
  kalMesec++;
  if (kalMesec > 11) { kalMesec = 0; kalGodina++; }
  renderKalendar();
});

ucitajKalendar();

// Dugme "Rezerviši" ispod kalendara otvara domaćin popup
document.getElementById("btn-kal-rezervisi").addEventListener("click", openPopupDomacin);

// KORAK 01 klik → skroluje do kalendara
document.querySelectorAll(".korak-01-trigger").forEach(function (el) {
  el.addEventListener("click", function () {
    document.getElementById("dostupnost").scrollIntoView({ behavior: "smooth" });
  });
});

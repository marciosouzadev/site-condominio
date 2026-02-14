// MENU MOBILE
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isActive = nav.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isActive);
});

// Fechar menu ao clicar em um link
const navLinks = nav.querySelectorAll("a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", false);
  });
});

// AVISOS DINÂMICOS
const avisos = [
  {
    data: "10/02/2026",
    titulo: "Manutenção da Caixa d’Água",
    texto: "Interrupção no abastecimento das 8h às 12h."
  },
  {
    data: "05/02/2026",
    titulo: "Revisão do Elevador",
    texto: "Serviço será realizado na próxima terça-feira."
  },
  {
    data: "01/02/2026",
    titulo: "Assembleia Geral",
    texto: "Dia 15/03 às 19h no salão de festas."
  }
];

const container = document.getElementById("avisos-container");

avisos.forEach((aviso, index) => {
  const card = document.createElement("article");
  card.classList.add("aviso-card");

  card.innerHTML = `
    <small>${aviso.data}</small>
    <h3>${aviso.titulo}</h3>
    <p>${aviso.texto}</p>
  `;

  container.appendChild(card);
});

// ANIMAÇÃO AO SCROLL (Fade-in)
const observerOptions = {
  threshold: 0.1, // Dispara quando 10% do elemento estiver visível
  rootMargin: "0px 0px -50px 0px" // Ajuste fino para disparar um pouco antes
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // Efeito cascata (delay progressivo)
      observer.unobserve(entry.target); // Para de observar após animar
    }
  });
}, observerOptions);

// Observar elementos (Avisos, Documentos, Regras)
document.querySelectorAll('.aviso-card, .doc-card, .rule, .talento-card, .phone-card').forEach(el => {
  observer.observe(el);
});

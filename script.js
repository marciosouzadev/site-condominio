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

// Observar elementos (Avisos, Documentos, Regras, Telefones, Atenção, Vídeo)
document.querySelectorAll('.aviso-card, .doc-card, .rule, .phone-card, .attention-box, .video-container').forEach(el => {
  observer.observe(el);
});

// BOTÃO VOLTAR AO TOPO
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// HIGHLIGHT MENU ATIVO (SCROLL SPY)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current) && current !== '') {
      a.classList.add('active');
    }
  });
});

// FORMULÁRIO WIZARD (INDICAÇÕES)
const formSteps = document.querySelectorAll(".form-step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progressBar");
let currentStep = 0;

if (formSteps.length > 0) {
  updateFormSteps();

  nextBtn.addEventListener("click", () => {
    if (validateStep()) {
      currentStep++;
      updateFormSteps();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateFormSteps();
    }
  });
}

function updateFormSteps() {
  // Mostrar etapa atual
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  // Atualizar botões
  prevBtn.disabled = currentStep === 0;
  
  if (currentStep === formSteps.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }

  // Atualizar barra de progresso
  const progress = ((currentStep + 1) / formSteps.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function validateStep() {
  const currentStepEl = formSteps[currentStep];
  const inputs = currentStepEl.querySelectorAll("input[required], select[required], textarea[required]");
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value || (input.type === "radio" && !currentStepEl.querySelector(`input[name="${input.name}"]:checked`)) || (input.type === "checkbox" && !input.checked && input.name === "declaracao")) {
      isValid = false;
      input.style.borderColor = "#ef4444"; // Vermelho erro
    } else {
      input.style.borderColor = "#d1d5db"; // Normal
    }
  });

  if (!isValid) alert("Por favor, preencha os campos obrigatórios.");
  return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("modalArte");
    const titulo = overlay.querySelector(".modalTitulo");
    const imagemFeed = overlay.querySelector(".modalImagem--feed");
    const imagemStory = overlay.querySelector(".modalImagem--story");
    const botaoFechar = overlay.querySelector(".modalFechar");
    const botoesArte = document.querySelectorAll(".arteItem");

    function abrirModal(botao) {
        titulo.textContent = botao.dataset.titulo;
        imagemFeed.src = botao.dataset.feed || "";
        imagemStory.src = botao.dataset.story || "";
        imagemStory.style.display = botao.dataset.story ? "" : "none";
        overlay.classList.add("aberto");
        document.body.style.overflow = "hidden";
    }

    function fecharModal() {
        overlay.classList.remove("aberto");
        document.body.style.overflow = "";
    }

    botoesArte.forEach((botao) => {
        botao.addEventListener("click", () => {
            abrirModal(botao);
        });
    });

    botaoFechar.addEventListener("click", fecharModal);

    overlay.addEventListener("click", (evento) => {
        if (evento.target === overlay) {
            fecharModal();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && overlay.classList.contains("aberto")) {
            fecharModal();
        }
    });

    const menuToggle = document.querySelector(".menuToggle");
    const nav = document.querySelector("header nav");

    function fecharMenu() {
        nav.classList.remove("aberto");
        menuToggle.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const aberto = nav.classList.toggle("aberto");
        menuToggle.classList.toggle("aberto", aberto);
        menuToggle.setAttribute("aria-expanded", String(aberto));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });
    const modalCase = document.getElementById("modalCase");
    const botaoFecharCase = modalCase.querySelector(".modalFechar");

    function abrirModalCase() {
        modalCase.classList.add("aberto");
        document.body.style.overflow = "hidden";
    }

    function fecharModalCase() {
        modalCase.classList.remove("aberto");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".btnVerCase").forEach((botao) => {
        botao.addEventListener("click", abrirModalCase);
    });

    botaoFecharCase.addEventListener("click", fecharModalCase);

    modalCase.addEventListener("click", (evento) => {
        if (evento.target === modalCase) {
            fecharModalCase();
        }
    });

    function iniciarCarrossel(carrossel) {
        const faixa = carrossel.querySelector(".carrosselFaixa");
        const pontos = carrossel.querySelectorAll(".ponto");
        const nome = carrossel.querySelector(".carrosselNome");
        const slides = carrossel.querySelectorAll(".carrosselSlide");
        const largura = Number(carrossel.dataset.largura) || 100;
        const temPeek = carrossel.dataset.peek === "true";
        let indexAtual = 0;

        function irPara(index) {
            indexAtual = index;
            if (temPeek) {
                const slideWidth = slides[0].offsetWidth;
                const gap = parseFloat(getComputedStyle(faixa).gap) || 0;
                const viewportWidth = carrossel.offsetWidth;
                const posicaoSlide = index * (slideWidth + gap);

                let deslocamento;
                
                if (index === 0) {
                    deslocamento = 0;
                } else if (index === slides.length - 1) {
                    deslocamento = posicaoSlide + slideWidth - viewportWidth;
                } else {
                    deslocamento = posicaoSlide - (viewportWidth - slideWidth) / 2;
                }

                faixa.style.transform = `translateX(-${deslocamento}px)`;
            } else {
                faixa.style.transform = `translateX(-${index * largura}%)`;
            }
            pontos.forEach((p, i) => p.classList.toggle("ativo", i === index));
            nome.textContent = slides[index].dataset.nome;
        }

        pontos.forEach((ponto) => {
            ponto.addEventListener("click", () => {
                irPara(Number(ponto.dataset.index));
            });
        });
    }

    document.querySelectorAll(".carrossel").forEach(iniciarCarrossel);

    document.querySelectorAll(".btnContraste").forEach((botao) => {
        botao.addEventListener("click", () => {
            const alvo = document.getElementById(botao.dataset.alvo);
            const ativo = botao.classList.toggle("ativo");

            alvo.querySelectorAll(".slideContraste").forEach((img) => {
                img.hidden = !ativo;
            });

            alvo.querySelectorAll("img:not(.slideContraste)").forEach((img) => {
                img.hidden = ativo;
            });
        });
    });
    window.addEventListener('resize', function () {
        console.log('largura da janela:', window.innerWidth);
        document.querySelectorAll('.carrossel').forEach(function (carrossel) {
            const pontoAtivo = carrossel.querySelector('.ponto.ativo');
            if (pontoAtivo) {
                pontoAtivo.click();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("modalArte");
    const titulo = overlay.querySelector(".modalTitulo");
    const imagemFeed = overlay.querySelector(".modalImagem--feed");
    const imagemStory = overlay.querySelector(".modalImagem--story");
    const botaoFechar = overlay.querySelector(".modalFechar");
    const botoesArte = document.querySelectorAll(".arteItem");

    function abrirModal(botao) {
        titulo.textContent = botao.dataset.titulo;
        imagemFeed.style.backgroundImage = botao.dataset.feed ? `url('${botao.dataset.feed}')` : "";
        imagemStory.style.backgroundImage = botao.dataset.story ? `url('${botao.dataset.story}')` : "";
        imagemFeed.classList.toggle("modalImagem--feed-portrait", botao.dataset.feedPortrait === "true");
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
});

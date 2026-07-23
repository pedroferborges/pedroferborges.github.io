

if (window.lucide) {
  lucide.createIcons();
}





const cabecalho = document.querySelector(".cabecalho");

const menuMobile = document.querySelector("#menuMobile");

const menu = document.querySelector("#menu");

const linksMenu = document.querySelectorAll(".menu a");

const voltarTopo = document.querySelector("#voltarTopo");





window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    cabecalho.classList.add("ativo");
  } else {
    cabecalho.classList.remove("ativo");
  }
});





window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    voltarTopo.classList.add("aparecer");
  } else {
    voltarTopo.classList.remove("aparecer");
  }
});


voltarTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});





menuMobile.addEventListener("click", () => {
  menu.classList.toggle("aberto");
});





linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
  });
});





const skillBoxes = document.querySelectorAll(".skill-box");

skillBoxes.forEach((box) => {
  const botao = box.querySelector(".skill-header");
  const conteudo = box.querySelector(".skill-body");
  const textoAcao = box.querySelector(".skill-acao");

  if (!botao || !conteudo) {
    return;
  }

  botao.setAttribute("aria-expanded", "false");
  conteudo.setAttribute("aria-hidden", "true");

  botao.addEventListener("click", () => {
    const estaAberto = box.classList.toggle("is-open");

    botao.setAttribute("aria-expanded", String(estaAberto));
    conteudo.setAttribute("aria-hidden", String(!estaAberto));

    if (textoAcao) {
      textoAcao.textContent = estaAberto
        ? "Clique para recolher"
        : "Clique para visualizar";
    }
  });
});




const carrosselCertificados = document.querySelector(
  ".certificados-carousel"
);


if (carrosselCertificados) {

  const trilhaCertificados = carrosselCertificados.querySelector(
    ".certificados-track"
  );

  const certificados = Array.from(
    carrosselCertificados.querySelectorAll(".certificado-card")
  );

  const botaoAnteriorCertificados =
    carrosselCertificados.querySelector(".carousel-anterior");

  const botaoProximoCertificados =
    carrosselCertificados.querySelector(".carousel-proximo");

  const indicadoresCertificados =
    carrosselCertificados.querySelector(".carousel-indicadores");


  let indiceCertificadoAtual = 0;

  let animacaoRedimensionamento;


  function quantidadeCertificadosVisiveis() {

    if (window.innerWidth <= 540) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 3;
  }


  function indiceMaximoCertificados() {

    const quantidadeVisivel =
      quantidadeCertificadosVisiveis();

    return Math.max(
      0,
      certificados.length - quantidadeVisivel
    );
  }


  function criarIndicadoresCertificados() {

    if (!indicadoresCertificados) {
      return;
    }

    indicadoresCertificados.innerHTML = "";

    const quantidadePosicoes =
      indiceMaximoCertificados() + 1;


    for (
      let indice = 0;
      indice < quantidadePosicoes;
      indice += 1
    ) {

      const indicador = document.createElement("button");

      indicador.type = "button";
      indicador.className = "carousel-indicador";

      indicador.setAttribute(
        "aria-label",
        `Mostrar posição ${indice + 1} dos certificados`
      );


      indicador.addEventListener("click", () => {

        indiceCertificadoAtual = indice;

        atualizarCarrosselCertificados();

      });


      indicadoresCertificados.appendChild(indicador);
    }

  }


  function atualizarIndicadoresCertificados() {

    if (!indicadoresCertificados) {
      return;
    }

    const indicadores = indicadoresCertificados.querySelectorAll(
      ".carousel-indicador"
    );


    indicadores.forEach((indicador, indice) => {

      const estaAtivo =
        indice === indiceCertificadoAtual;

      indicador.classList.toggle(
        "ativo",
        estaAtivo
      );

      indicador.setAttribute(
        "aria-current",
        estaAtivo ? "true" : "false"
      );

    });

  }


  function atualizarCarrosselCertificados() {

    if (
      !trilhaCertificados ||
      certificados.length === 0
    ) {
      return;
    }


    const indiceMaximo =
      indiceMaximoCertificados();


    indiceCertificadoAtual = Math.max(
      0,
      Math.min(indiceCertificadoAtual, indiceMaximo)
    );


    const primeiroCertificado = certificados[0];

    const larguraCertificado =
      primeiroCertificado.getBoundingClientRect().width;


    const estilosTrilha =
      window.getComputedStyle(trilhaCertificados);


    const espacoEntreCards =
      parseFloat(estilosTrilha.columnGap) ||
      parseFloat(estilosTrilha.gap) ||
      0;


    const deslocamento =
      indiceCertificadoAtual *
      (larguraCertificado + espacoEntreCards);


    trilhaCertificados.style.transform =
      `translateX(-${deslocamento}px)`;


    if (botaoAnteriorCertificados) {

      botaoAnteriorCertificados.disabled =
        indiceCertificadoAtual === 0;

    }


    if (botaoProximoCertificados) {

      botaoProximoCertificados.disabled =
        indiceCertificadoAtual === indiceMaximo;

    }


    atualizarIndicadoresCertificados();

  }


  if (botaoAnteriorCertificados) {

    botaoAnteriorCertificados.addEventListener(
      "click",
      () => {

        if (indiceCertificadoAtual > 0) {

          indiceCertificadoAtual -= 1;

          atualizarCarrosselCertificados();

        }

      }
    );

  }


  if (botaoProximoCertificados) {

    botaoProximoCertificados.addEventListener(
      "click",
      () => {

        const indiceMaximo =
          indiceMaximoCertificados();


        if (indiceCertificadoAtual < indiceMaximo) {

          indiceCertificadoAtual += 1;

          atualizarCarrosselCertificados();

        }

      }
    );

  }


  carrosselCertificados.addEventListener(
    "keydown",
    (evento) => {

      if (evento.key === "ArrowLeft") {

        evento.preventDefault();

        botaoAnteriorCertificados?.click();

      }


      if (evento.key === "ArrowRight") {

        evento.preventDefault();

        botaoProximoCertificados?.click();

      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      cancelAnimationFrame(
        animacaoRedimensionamento
      );


      animacaoRedimensionamento =
        requestAnimationFrame(() => {

          indiceCertificadoAtual = Math.min(
            indiceCertificadoAtual,
            indiceMaximoCertificados()
          );

          criarIndicadoresCertificados();

          atualizarCarrosselCertificados();

        });

    }
  );


  criarIndicadoresCertificados();

  atualizarCarrosselCertificados();

}



const elementosReveal = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("aparecer");
    }
  });
}, {
  threshold: 0.15
});


elementosReveal.forEach((elemento) => {
  observer.observe(elemento);
});





const secoes = document.querySelectorAll("section[id]");


function destacarLinkAtivo() {
  let secaoAtual = "";

  secoes.forEach((secao) => {
    const topoSecao = secao.offsetTop - 160;
    const alturaSecao = secao.offsetHeight;

    if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
      secaoAtual = secao.getAttribute("id");
    }
  });


  linksMenu.forEach((link) => {
    link.classList.remove("ativo");

    if (link.getAttribute("href") === `#${secaoAtual}`) {
      link.classList.add("ativo");
    }
  });
}


window.addEventListener("scroll", destacarLinkAtivo);





console.log("Portfólio carregado com sucesso!");

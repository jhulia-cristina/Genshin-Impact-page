const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const questionQtd = document.querySelector(".questionQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnFinalizar = document.querySelector(".finish button");

import questions from "./questions.js";

var FkUsuario = Number(sessionStorage.ID_USUARIO);
console.log(sessionStorage.ID_USUARIO)
var nickname = sessionStorage.NICKNAME_USUARIO;
let respostasUsuario = []
let questaoAtual = 0;
let questoesAcertos = 0;
let pontuacao = 0;


document.addEventListener('DOMContentLoaded', function () {
  startQuiz();
});

function startQuiz() {
  let tempoRestante = 30;
  document.getElementById('timer').innerHTML = tempoRestante;

  for (let i = tempoRestante; i >= 0; i--) {
    setTimeout(function () {
      document.getElementById('timer').innerHTML = i;
      if (i === 0) {
        finishQuiz();
      }
    }, (tempoRestante - i) * 1000);
  }
}

function finishQuiz() {
  textFinish.innerHTML = `<b>Tempo esgotado!</b> <br> Você acertou <b>${questoesAcertos}</b> de ${questions.length} <br> Pontuação total: <b>${pontuacao}</b>`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

btnFinalizar.onclick = () => {
  fetch("/usuarios/pontos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.j
        idUsuarioServer: sessionStorage.ID_USUARIO,
        pontuacaoServer: pontuacao
    })
}).then(function (resposta) {

    console.log("resposta: ", resposta);

    if (resposta.ok) {
        console.log(resposta)
            
            setTimeout(function () {
                window.location = "./score.html";
            }, 1000);
    } else {
        throw ("Houve um erro ao tentar realizar o cadastro!");
    }
}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
});

return false;
};

function ProximaQuestao(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questoesAcertos++;
    pontuacao += 100;
  }

  if (questaoAtual < questions.length - 1) {
    questaoAtual++;
    CarregarQuestao();
  } else {
    finishQuiz();
  }
}

function CarregarQuestao() {
  questionQtd.innerHTML = `${questaoAtual + 1}/${questions.length}`;
  const item = questions[questaoAtual];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);

    respostasUsuario.push(answer);

  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", ProximaQuestao);
  });

}

CarregarQuestao();
addEventListener("DOMContentLoaded", () => {
    fetch("/usuarios/obterRanking", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                json.forEach(linha => {
                    addEventListener()
                })
            })
        }
    });
});

// Obtenha uma referência para o elemento canvas
var ctx = document.getElementById('myChart').getContext('2d');

// Crie o gráfico
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Ranking',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

console.log('----------------------------------------------')
console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
console.log(resposta)

// Inserindo valores recebidos em estrutura para plotar o gráfico
for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    labels.push(registro.TotalPontuacao);
    dados.datasets[0].data.push(registro.pontos);
    // dados.datasets[1].data.push(registro.qntPet);
}

console.log('----------------------------------------------')
console.log('O gráfico será plotado com os respectivos valores:')
console.log('Labels:')
console.log(labels)
console.log('Dados:')
console.log(dados.datasets)
console.log('----------------------------------------------')

// Criando estrutura para plotar gráfico - config
const config = {
    type: 'bar',
    data: dados,
};

// Adicionando gráfico criado em div na tela
let Rankingchart = new Chart(
    document.getElementById(`RankingChart`),
    config
);
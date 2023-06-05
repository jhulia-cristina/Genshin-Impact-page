var database = require("../database/config");

function buscarUltimasMedidas(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(fkPersonagem) AS qtdEscolhido, personagens.Nome AS NomePersonagem FROM usuario JOIN personagens ON fkPersonagem = idPersonagem GROUP BY fkPersonagem;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(fkPersonagem) AS qtdEscolhido, personagens.Nome AS NomePersonagem FROM usuario JOIN personagens ON fkPersonagem = idPersonagem GROUP BY fkPersonagem;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarPrimeirasMedidas(idUsuario, limite_linhas) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Electro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Geo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Anemo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Hydro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Pyro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Cryo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Dendro' GROUP BY elemento;`;
//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Electro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Geo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Anemo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Hydro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Pyro' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Cryo' GROUP BY elemento;
//         SELECT COUNT(elemento) FROM personagens WHERE elemento = 'Dendro' GROUP BY elemento;`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoReal(idUsuario) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top 1
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         CONVERT(varchar, momento, 108) as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idUsuario} 
//                     order by id desc`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idUsuario} 
//                     order by id desc limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasMedidas
    // buscarPrimeirasMedidas,
    // buscarMedidasEmTempoReal
}

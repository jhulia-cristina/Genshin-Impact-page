function calcularDano() {
    var ataque = parseFloat(document.getElementById("ataque").value);
    var bonusDano = parseFloat(document.getElementById("bonusDano").value);
    var danoTalento = parseFloat(document.getElementById("danoTalento").value);
    var danoCritico = parseFloat(document.getElementById("danoCritico").value);
    var resistencia = parseFloat(document.getElementById("resistencia").value);
    var reducaoDano = parseFloat(document.getElementById("reducaoDano").value);
    var danoReacao = parseFloat(document.getElementById("danoReacao").value);
    var EM = parseFloat(document.getElementById("EM").value);
    
    var danoFinal = ataque * (1 + bonusDano / 100) * danoTalento / 100 * (1 + danoCritico / 100) * (1 - resistencia / 100) * (1 - reducaoDano / 100) * (danoReacao * (1 + EM / 100));
    
    document.getElementById("output").textContent = "Dano Final: " + danoFinal.toFixed(2);
}
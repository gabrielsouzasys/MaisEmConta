function validaOption() {

    for (let i = 0; i < 4; i++) {
        var selector = document.getElementById('select_' + i);

        var option_value = selector[selector.selectedIndex].value;

        if (option_value == "null") {

            selector.style.color = "#ADADAD";


        } else {
            selector.style.color = "#000000";
        }

    }

    //var txtSelect = selector[selector.selectedIndex].innerHTML;
    //var option = document.getElementsByName("option_first").values;

    /*
        if (option_value == "null") {
           
            selector.style.color = "#ADADAD";
            
            
        } else {
            selector.style.color = "#000000";
        }
    */

    /*
    switch (option_value) {
        case "Kg":
           // preco_x2 = calcular(preco2, embalagem2);
            break;
        case "Gr":
          //  preco_x2 = converter(preco2, embalagem2, medida2);
            break;
        case "Lt":
            selector[selector.selectedIndex].innerHTML = option_value
            break;
        case "Ml":
            txtSelect = option_value
            break;
        case "Mt":
         //   preco_x2 = calcular(preco2, embalagem2);
            break;
        case "Cm":
         //   preco_x2 = converter(preco2, embalagem2, medida2);
            break;
        case "pcs":
          //  preco_x2 = calcular(preco2, embalagem2);
            break
        default:
           // validacao2 = false;
    }
    
*/



};

function limparExecucao() {
    document.getElementById("bloco_msg").style.display = "none";
    for (var i = 0; i < 4;i++){

        document.getElementById('row_' + i).className = "w3-row w3-panel w3-card ";

        document.getElementById("desc_"   + i).className = "w3-input w3-border w3-border-white";
        document.getElementById("select_" + i).className = "w3-input w3-border w3-border-white";
        document.getElementById("qtd_"    + i).className = "w3-input w3-border w3-border-white";
        document.getElementById("vlr_"    + i).className = "w3-input w3-border w3-border-white";


    }
}
function startProcess() {

    limparExecucao();

    //busca o objeto com os preços calculados 
    var data = getData();

    if (typeof(data) === 'object'){

    //Ordena pela unidade de medida (para buscar erros de escolhas)
    data.sort(ordenaUm);

    //Função para validar se sao dos mesmos tipos - entregar mensagem de eross   
    var dados_a_calcular = data; // validaDadosCalculo(data);

    //ordena e define quais os itens que são mais em conta (retorna os id's que deverão ser marcados)   
    dados_a_calcular.sort(ordenaPreco);

    //altera o DOM para exibir em verde os itens mais em conta 
    return setToScreen(dados_a_calcular);

    }else if (typeof(data) === 'string'){
        alert("gerar erro")

        document.getElementById("bloco_msg").style.display = "block"
        //  document.getElementById("bloco_msg").style.display = "none"

    }


};

function setModelo() {
debugger;
    document.getElementById("desc_0").value = "CocaCola";
    document.getElementById("select_0").value = "Lt";
    document.getElementById("qtd_0").value = "1";
    document.getElementById("vlr_0").value = "2";

    document.getElementById("desc_1").value = "CocaCola";
    document.getElementById("select_1").value = "Lt";
    document.getElementById("qtd_1").value = "1";
    document.getElementById("vlr_1").value = "3";

    document.getElementById("desc_2").value = "Coca Cola";
    document.getElementById("select_2").value = "Lt";
    document.getElementById("qtd_2").value = "1";
    document.getElementById("vlr_2").value = "4";

    document.getElementById("desc_3").value = "Coca Cola";
    document.getElementById("select_3").value = "Lt";
    document.getElementById("qtd_3").value = "1";
    document.getElementById("vlr_3").value = "2";
    validaOption();
    limparExecucao();
}

//valida linha preenchida (Lê a linha e verifica quais parametros estão vazios )
function checkVazio(p_id, p_um, p_qtd, p_vlr) {

    var linha = [];//O vetor será preenchido com true ou false para cada campo da linha

    if (p_um != 'null') {
        //   valida.um = true;
        linha.push(true);
    } else {
        // valida.um = false;
        linha.push(false);
    }

    if (!p_qtd) {

        linha.push(false);
        // valida.qtd = false;
    } else {
        // valida.qtd = true;
        linha.push(true);
    }

    if (!p_vlr) {
        // valida.vlr = false;
        linha.push(false);
    } else {
        // valida.vlr = true;
        linha.push(true);

    }

    let valida = true;//inicio validado

    for (let i = 0; i <= linha.length; i++) {

        if (linha[i] === false) {
            valida = false;
        }
    }
    return valida;//Caso algum dos campos estiverem vazios retornar false (interrompe o processo)
};



function getData() {
    var objData = [{id: "0", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: ""},
        {id: "1", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: ""},
        {id: "2", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: ""},
        {id: "3", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: ""}
    ];

    var objLenght = objData.length;
    var lv_existe;
    var count = 0;

    for (let i = 0; i < objLenght; i++) {

        objData[i].desc = document.getElementById("desc_" + i).value;
        objData[i].um = document.getElementById("select_" + i).value;
        objData[i].qtd = document.getElementById("qtd_" + i).value;
        objData[i].vlr = parseFloat(document.getElementById("vlr_" + i).value.replace(",", "."));

        lv_existe = checkVazio(objData[i].id, objData[i].um, objData[i].qtd, objData[i].vlr);

        //realiza os calculos se a linha estiver preenchida
        if (lv_existe) {
            count++;
            objData[i].tipo = defineTipo(objData[i].um);
            objData[i].preco_calc = convertUm(objData[i].um, objData[i].vlr, objData[i].qtd);
        }else{
           objData[i].preco_calc = 1000000;
        }
    }


    if (count > 1) {
        return objData;
    } else if (count === 0) {
        return "As linhas estão vazias!"

    } else if (count === 1) {
        return "Apenas uma linha preenchida!"
    }


 /*   {
       document.getElementById("bloco_msg").style.display = "block"
        //  document.getElementById("bloco_msg").style.display = "none"
        ////////////////////////////////////  alert("testes de validação! \n linha  vazia");

        //pegar esse erro e encaminhar para o return desta funcao
        //mandar a mensagem de erro para a linha vazia ou que só tem uma linha e é necessário 2 linhas ou mais para se comparar
    }
*/


}


//funcao que retrona o valor do preço pela unidade (preço por ML por exemplo)
function convertUm(un_med, preco, embalagem) {

    var preco_calc;

    switch (un_med) {
        case "Kg":
            preco_calc = calcular(preco, embalagem);
            break;
        case "Gr":
            preco_calc = converter(preco, embalagem, un_med);
            break;
        case "Lt":
            preco_calc = calcular(preco, embalagem);
            break;
        case "Ml":
            preco_calc = converter(preco, embalagem, un_med);
            break;
        case "Mt":
            preco_calc = calcular(preco, embalagem);
            break;
        case "Cm":
            preco_calc = converter(preco, embalagem, un_med);
            break;
        case "pcs":
            preco_calc = calcular(preco, embalagem);
            break
        default:

    }

    return preco_calc;

};

//Converter a embalagem
function converter(prec, emb, um) {
    var emb_convertida;

    if (um == "Ml" || um == "Gr") {
        emb_convertida = emb / 1000;

    } else {

        if (um == "cm") {
            //  alert("u cm = " + um);
            emb_convertida = emb / 100;
        }
    }
    return calcular(prec, emb_convertida);
};


//Calular valores fracionados
function calcular(prec, emb) {
    prec = parseFloat(prec);
    emb = parseFloat(emb);


    if (emb == 0) {
        emb = 1;
    }
    //Retorna valor por Unidade de Medida
    return prec / emb;
};

function defineTipo(unidade_med) {
    var tipo;

    switch (unidade_med) {
        case "Kg":
            tipo = "peso"
            break;
        case "Gr":
            tipo = "peso"
            break;
        case "Lt":
            tipo = "volume"
            break;
        case "Ml":
            tipo = "volume"
            break;
        case "Mt":
            tipo = "comprimento"
            break;
        case "Cm":
            tipo = "comprimento"
            break;
        case "pcs":
            tipo = "unidade"
            break
        default:
    }
    return tipo;
};

function validaDadosCalculo(dados) {
    let tipo_unidade_medida;
    debugger;
    for (let i = 0; i <= dados.length; i++) {

        tipo_unidade_medida = dados[i].tipo;

        for (let j = 1; j <= dados.length; j++) {

            if (dados[j].tipo != tipo_unidade_medida) {
                // dados.shift();
                debugger;
            } else {
                debugger;

            }
        }
    }
};


function ordenaPreco(a, b) {
    return a.preco_calc - b.preco_calc;
};


function ordenaUm(a, b) {
    return a.um - b.um;
};


function setToScreen(data) {
    var count = data.length - 1;
    var linha = "";
    var controle = "";//A variavel controle é para validação de igualdades

    limparExecucao();

    debugger;
    for (var i = 0; i < count; i++) {

        if (data[i].preco_calc === data[i + 1].preco_calc && controle != "X" ) {

            linha = document.getElementById('row_' + data[i].id);
            linha.className = "w3-row w3-panel w3-card-4 w3-border w3-border-green w3-green ";

            document.getElementById("desc_"   + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("select_" + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("qtd_"    + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("vlr_"    + data[i].id).className = "w3-input w3-border w3-border-green w3-green";


            linha = document.getElementById('row_' + data[i+1].id);
            linha.className = "w3-row w3-panel w3-card-4 w3-border w3-border-green w3-green";

            document.getElementById("desc_"   + data[i+1].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("select_" + data[i+1].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("qtd_"    + data[i+1].id).className = "w3-input w3-border w3-border-green w3-green";
            document.getElementById("vlr_"    + data[i+1].id).className = "w3-input w3-border w3-border-green w3-green";

        } else {

          if (controle != "X") {


              linha = document.getElementById('row_' + data[0].id);
              linha.className = "w3-row w3-panel w3-card-4 w3-border w3-border-green w3-green"; //w3-leftbar w3-border-red

              document.getElementById("desc_" + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
              document.getElementById("select_" + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
              document.getElementById("qtd_" + data[i].id).className = "w3-input w3-border w3-border-green w3-green";
              document.getElementById("vlr_" + data[i].id).className = "w3-input w3-border w3-border-green w3-green";

              if (i != 0 && controle == "X") {
                  linha = document.getElementById('row_' + data[i].id);
                  linha.className = "w3-row w3-panel w3-border w3-border-red"

                  //Set class para o ultimo indice caso ele nao seja Verde
                  linha = document.getElementById('row_' + data[3].id);
                  linha.className = "w3-row w3-panel w3-border w3-border-red"
              }
          }else{
              if (i != 0) {
                  linha = document.getElementById('row_' + data[i].id);
                  linha.className = "w3-row w3-panel w3-border w3-border-red"

                  //Set class para o ultimo indice caso ele nao seja Verde
                  linha = document.getElementById('row_' + data[3].id);
                  linha.className = "w3-row w3-panel w3-border w3-border-red"
              }
          }
          controle = "X";
        }
    }
}
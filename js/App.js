function startProcess() {
    limparExecucao();

    //busca o objeto com os preços calculados 
    var data = getData();

    //Ordena pela unidade de medida (para buscar erros de escolhas)
    data.sort(ordenaUm);

    //Função para validar se sao dos mesmos tipos - entregar mensagem de eross   
    var dados_a_calcular = data; // validaDadosCalculo(data);

    //ordena e define quais os itens que são mais em conta (retorna os id's que deverão ser marcados)   
    dados_a_calcular.pop();
    dados_a_calcular.pop();
    dados_a_calcular.sort(ordenaPreco);

    //altera o DOM para exibir em verde os itens mais em conta 
    return setToScreen(dados_a_calcular);

};

function setModelo() {
    document.getElementById("desc_0").value = "Coca Lata";
    document.getElementById("select_0").value = "Ml";
    document.getElementById("qtd_0").value = "600";
    document.getElementById("vlr_0").value = "4.00";

    document.getElementById("desc_1").value = "Coca 1LT";
    document.getElementById("select_1").value = "Lt";
    document.getElementById("qtd_1").value = "1";
    document.getElementById("vlr_1").value = "6.50";

    validaOption();
    limparExecucao();
}

function getData() {
    var objData = [{ id: "1", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: "" },
        { id: "2", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: "" },
        { id: "3", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: "" },
        { id: "4", desc: "", um: "", qtd: "", vlr: "", tipo: "", preco_calc: "" }
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

        } else {

            document.getElementById("bloco_msg").style.display = "block"
                //  document.getElementById("bloco_msg").style.display = "none"
                ////////////////////////////////////  alert("testes de validação! \n linha  vazia");

            //pegar esse erro e encaminhar para o return desta funcao 
            //mandar a mensagem de erro para a linha vazia ou que só tem uma linha e é necessário 2 linhas ou mais para se comparar
        }
    }

    if (count > 0) {

        return objData;
    } else {
        return "Apenas uma linha preenchida!"
    };

};

//valida linha preenchida
function checkVazio(p_id, p_um, p_qtd, p_vlr) {

    var linha = [];

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

    let valida = true;

    for (let i = 0; i <= linha.length; i++) {

        if (linha[i] === false) {
            valida = false;
        }
    }
    return valida;
};







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



    var id_modify = data[0].id;

    var linha = document.getElementById('tr_' + id_modify);

    linha.className = "w3-leftbar  w3-green ";


    /*
       var linha = document.getElementById('tr_' + 2);

       linha.className="w3-leftbar w3-border-red ";
    */
}
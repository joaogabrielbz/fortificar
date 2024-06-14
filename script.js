// João Gabriel Bolzan Louzada 

function setTipoUsuario(tipo) {
    sessionStorage.setItem('tipoUsuario', tipo);
    window.location.href = 'login.html';
}

function validarForm() {
    var nome = document.getElementById("txtNome").value;
    var senha = document.getElementById("txtSenha").value;
    var lblRetorno = document.getElementById("lblRetorno");
    var tipoUsuario = sessionStorage.getItem('tipoUsuario');
    var form = document.getElementById("formLogin");
    var validacao = true;


    if (tipoUsuario) {
        if (tipoUsuario === 'adm') {
            if (nome !== "Administrador" || senha !== "adm123") {
                lblRetorno.innerText = "Usuário ou senha incorretos.";
                validacao = false;
            } else {
                lblRetorno.innerText = "";
                sessionStorage.setItem('auth', tipoUsuario);
                form.action = "./pags-adm/";
            }
        }

        if (tipoUsuario === 'dona') {
            if (nome !== "Donatario01" || senha !== "dona123") {
                lblRetorno.innerText = "Usuário ou senha incorretos.";
                validacao = false;
            } else {
                lblRetorno.innerText = "";
                sessionStorage.setItem('auth', tipoUsuario);
                form.action = "./pags-dona/";
            }
        }
    }

    return validacao;
}


function sair() {
    sessionStorage.setItem('auth', "");
}



// Crud de solicitações


class Solicitacao {
    constructor(titulo, texto) {
        this.titulo = titulo;
        this.texto = texto;
    }
}

const solicitacoes = [];
const lis = [];
var qtd = 0;
var selecionado = 0;

function criarSolicitacao() {
    document.getElementById('bt-rem').style.display = "none";
    document.getElementById('titulo').value = "";
    document.getElementById('texto').value = "";
    document.getElementById('h1').innerHTML = "Nova Solicitação";
    var bt = document.getElementById('bt').textContent = "Enviar";

    const lista = document.getElementById('listSolicitacoes');
    var liElements = lista.getElementsByTagName('li');
    var quantidadeLi = liElements.length;

    console.log(qtd + " " + quantidadeLi);

    if (qtd + 1 == quantidadeLi) {
        document.getElementById('form').style.display = 'flex';
        const novoLi = document.createElement('li');
        novoLi.innerHTML = '<i class="fa-solid fa-square"></i><p class="bt-normal" style="text-decoration:underline;">Nova solicitação</p>';

        novoLi.addEventListener('click', function () {
            if (document.getElementById('form').style.display == 'none') {
                document.getElementById('form').style.display = 'flex';

                for (let i = 0; i < lis.length; i++) {
                    if (lis[i] === novoLi) {
                        selecionado = i;
                        break;
                    }
                }

                document.getElementById('titulo').value = solicitacoes[selecionado].titulo;
                document.getElementById('texto').value = solicitacoes[selecionado].texto;
                document.getElementById('h1').innerHTML = solicitacoes[selecionado].titulo;
                document.getElementById('bt-rem').style.display = "block";
                document.getElementById('bt').textContent = "Alterar";

            }
        });


        lista.appendChild(novoLi);
        lis.push(novoLi)
    }

}

function salvarEAlterarSolicitacao() {

    var titulo = document.getElementById('titulo');
    var texto = document.getElementById('texto');
    var retorno = document.getElementById('retorno');

    var bt = document.getElementById('bt');

    if (titulo.value != "" && texto.value != "") {
        if (bt.textContent == "Enviar") {

            const s = new Solicitacao(titulo.value, texto.value);
            solicitacoes.push(s);
            lis[qtd].innerHTML = '<i class="fa-solid fa-square"></i><p class="bt-normal;">' + titulo.value + '</p>';
            qtd++;


        }
        else if (bt.textContent == "Alterar") {
            solicitacoes[selecionado].titulo = titulo.value;
            solicitacoes[selecionado].texto = texto.value;
            lis[selecionado].innerHTML = '<i class="fa-solid fa-square"></i><p class="bt-normal;">' + titulo.value + '</p>';
        }
        document.getElementById('form').style.display = 'none';
        titulo.value = "";
        texto.value = "";
    }
    else {
        retorno.innerText = "Preencha todos os campos...";
    }



}

function excluirSolicitacao() {
    solicitacoes.splice(selecionado, 1);
    lis[selecionado].remove();
    lis.splice(selecionado, 1);
    qtd = qtd - 1;
    document.getElementById('form').style.display = 'none';
    document.getElementById('bt-rem').style.display = "none";
}


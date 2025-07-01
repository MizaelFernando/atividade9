let contatos = [];
let indiceAtual = -1;
let editando = false;

function verificarLogin() {
  if (sessionStorage.getItem("logado") !== "sim") {
    alert("Você precisa fazer login!");
    window.location.href = "index.html";
  }
}

function logar() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  if (usuario === "admin" && senha === "admin") {
    sessionStorage.setItem("logado", "sim");
    window.location.href = "cadastro.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function salvarLocalStorage() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem("contatos");
  if (dados) {
    contatos = JSON.parse(dados);
    if (contatos.length > 0) {
      indiceAtual = 0;
      preencherCampos(contatos[0]);
    }
  }
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("telefone").value = "";
}

function preencherCampos(contato) {
  document.getElementById("nome").value = contato.nome;
  document.getElementById("sobrenome").value = contato.sobrenome;
  document.getElementById("endereco").value = contato.endereco;
  document.getElementById("telefone").value = contato.telefone;
}

function incluir() {
  const contato = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    endereco: document.getElementById("endereco").value,
    telefone: document.getElementById("telefone").value,
  };

  if (!contato.nome || !contato.sobrenome || !contato.telefone) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  contatos.push(contato);
  indiceAtual = contatos.length - 1;
  salvarLocalStorage();
  limparCampos();
  alert("Contato incluído com sucesso!");
}

function editar() {
  if (indiceAtual >= 0) {
    editando = true;
    alert("Edição ativada. Faça alterações e clique em SALVAR.");
  } else {
    alert("Nenhum contato selecionado.");
  }
}

function salvar() {
  if (!editando || indiceAtual < 0) {
    alert("Você precisa clicar em EDITAR antes.");
    return;
  }

  const contato = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    endereco: document.getElementById("endereco").value,
    telefone: document.getElementById("telefone").value,
  };

  contatos[indiceAtual] = contato;
  editando = false;
  salvarLocalStorage();
  alert("Contato editado com sucesso!");
}

function cancelar() {
  if (indiceAtual >= 0) {
    preencherCampos(contatos[indiceAtual]);
  } else {
    limparCampos();
  }
  editando = false;
}

function excluir() {
  if (indiceAtual >= 0) {
    if (confirm("Deseja realmente excluir este contato?")) {
      contatos.splice(indiceAtual, 1);
      if (contatos.length === 0) {
        limparCampos();
        indiceAtual = -1;
      } else {
        indiceAtual = Math.max(0, indiceAtual - 1);
        preencherCampos(contatos[indiceAtual]);
      }
      salvarLocalStorage();
    }
  } else {
    alert("Nenhum contato selecionado.");
  }
}

function navegar(acao) {
  if (contatos.length === 0) {
    alert("Nenhum contato cadastrado.");
    return;
  }

  if (acao === "primeiro") indiceAtual = 0;
  if (acao === "anterior" && indiceAtual > 0) indiceAtual--;
  if (acao === "proximo" && indiceAtual < contatos.length - 1) indiceAtual++;
  if (acao === "ultimo") indiceAtual = contatos.length - 1;

  preencherCampos(contatos[indiceAtual]);
}

window.onload = function () {
  carregarLocalStorage();
};
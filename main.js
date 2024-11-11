document.addEventListener("DOMContentLoaded", function () {
  // Carregar opções de estradas
  fetch("estradas.json")
    .then((response) => response.json())
    .then((estradas) => {
      const selectEstrada = document.getElementById("estrada");
      estradas.forEach((estrada) => {
        const option = document.createElement("option");
        option.value = estrada.id;
        option.textContent = estrada.nome;
        selectEstrada.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar estradas:", error));

  // Função de submissão do formulário e cálculo da multa
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const idade = parseFloat(document.getElementById("idade").value);
    if (idade < 18 || idade > 89) {
      window.alert("Idade de indivíduo inválida para este formulário!");
      return;
    }

    const velocidade = parseInt(document.getElementById("velocidade").value);
    const estradaSelecionada = document.getElementById("estrada").value;
    const veiculoSelecionado = document.getElementById("veiculo").value;

    fetch("estradas.json")
      .then((response) => response.json())
      .then((estradas) => {
        const estrada = estradas.find((e) => e.id === estradaSelecionada);
        if (estrada) {
          // Define o limite de velocidade com base no tipo de estrada e no tipo de veículo selecionado
          let limiteVelocidade;

          // Verifica se é uma autoestrada (usando limites sem "1") ou estrada nacional (usando limites com "1")
          if (estrada.limitevelocidadligeiros && estrada.limitevelocidadepesados) {
            limiteVelocidade = veiculoSelecionado === "ligeiro" ? estrada.limitevelocidadligeiros : estrada.limitevelocidadepesados;
          } else if (estrada.limitevelocidadligeiros1 && estrada.limitevelocidadepesados1) {
            limiteVelocidade = veiculoSelecionado === "ligeiro" ? estrada.limitevelocidadligeiros1 : estrada.limitevelocidadepesados1;
          } else {
            alert("Estrada inválida.");
            return;
          }

          const excesso = velocidade - limiteVelocidade;
          const multa = excesso > 0 ? excesso * 10 : 0;

          document.getElementById("resultado").value = multa > 0 ? `Multa a pagar: ${multa}€.` : "Nenhuma multa. Dentro do limite de velocidade.";
        } else {
          alert("Estrada inválida.");
        }
      })
      .catch((error) => console.error("Erro ao buscar estradas:", error));
  });
});

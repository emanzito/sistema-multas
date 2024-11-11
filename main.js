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

  // Carregar opções de veículos
  fetch("veiculos.json")
    .then((response) => response.json())
    .then((veiculos) => {
      const selectVeiculo = document.getElementById("veiculo");
      veiculos.forEach((veiculo) => {
        const option = document.createElement("option");
        option.value = veiculo.id;
        option.textContent = veiculo.nome;
        selectVeiculo.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar veículos:", error));
  //ADICIONAR LIMITE DE IDADE///////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de submissão do formulário e cálculo da multa
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const velocidade = parseInt(document.getElementById("velocidade").value);
    const estradaSelecionada = document.getElementById("estrada").value;

    fetch("estradas.json")
      .then((response) => response.json())
      .then((estradas) => {
        const estrada = estradas.find((e) => e.id === estradaSelecionada);
        if (estrada) {
          const limiteVelocidade = estrada.limiteVelocidade;
          const excesso = velocidade - limiteVelocidade;
          const multa = excesso > 0 ? excesso * 10 : 0;

          document.getElementById("resultado").value =
            multa > 0 ? `Multa a pagar: ${multa} unidades monetárias.` : "Nenhuma multa. Dentro do limite de velocidade.";
        } else {
          alert("Estrada inválida.");
        }
      })
      .catch((error) => console.error("Erro ao buscar estradas:", error));
  });
});

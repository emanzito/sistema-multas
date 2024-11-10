document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar as estradas do arquivo JSON
  fetch("estradas.json")
    .then((response) => response.json())
    .then((estradas) => {
      // Preencher o select de estradas com as opções do JSON
      const selectEstrada = document.getElementById("estrada");
      estradas.forEach((estrada) => {
        const option = document.createElement("option");
        option.value = estrada.id;
        option.textContent = estrada.nome;
        selectEstrada.appendChild(option);
      });

      // Função para calcular a multa
      function calcularMulta(velocidade, limiteVelocidade) {
        const excesso = velocidade - limiteVelocidade;
        if (excesso > 0) {
          return excesso * 10; // Por exemplo, 10 unidades monetárias por km/h acima do limite
        }
        return 0; // Se não houver excesso, a multa é 0
      }

      // Evento de submissão do formulário
      const form = document.getElementById("form");
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne o envio do formulário (não recarregar a página)

        // Obter os valores dos campos
        const nome = document.getElementById("Nome").value;
        const idade = document.getElementById("idade").value;
        const estradaSelecionada = document.getElementById("estrada").value;
        const velocidade = parseInt(document.getElementById("velocidade").value);

        // Validar se todos os campos foram preenchidos
        if (!nome || !idade || !estradaSelecionada || !velocidade) {
          alert("Por favor, preencha todos os campos.");
          return;
        }

        // Encontrar o limite de velocidade da estrada selecionada
        const estrada = estradas.find((e) => e.id === estradaSelecionada);
        if (!estrada) {
          alert("Estrada inválida.");
          return;
        }

        // Calcular a multa
        const multa = calcularMulta(velocidade, estrada.limiteVelocidade);

        // Exibir o valor da multa
        const resultado = document.getElementById("resultado");
        resultado.value = `Multa a pagar: ${multa} unidades monetárias.`;
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));
});

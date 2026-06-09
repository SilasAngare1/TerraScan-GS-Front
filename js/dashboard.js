// Espera a página carregar
document.addEventListener("DOMContentLoaded", function () {

    criarGraficoBarras();
    criarGraficoPizza();

});

// Gráfico de barras
function criarGraficoBarras() {

    const ctx = document.getElementById("barChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
            datasets: [
                {
                    label: "Alertas Críticos",
                    data: [15, 22, 28, 35, 42, 38],
                    backgroundColor: "red"
                },
                {
                    label: "Alertas Altos",
                    data: [10, 16, 14, 20, 21, 18],
                    backgroundColor: "orange"
                },
                {
                    label: "Alertas Médios",
                    data: [5, 8, 7, 10, 12, 10],
                    backgroundColor: "blue"
                }
            ]
        },
        options: {
            responsive: true
        }
    });

}

// Gráfico de pizza
function criarGraficoPizza() {

    const ctx = document.getElementById("pieChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: [
                "Queimadas",
                "Desmatamento",
                "Poluição",
                "Outros"
            ],
            datasets: [{
                data: [127, 64, 19, 12],
                backgroundColor: [
                    "red",
                    "orange",
                    "blue",
                    "green"
                ]
            }]
        },
        options: {
            responsive: true
        }
    });

}
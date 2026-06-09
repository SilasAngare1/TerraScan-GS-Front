// Lista de eventos
const events = [
    {
        id: 1,
        type: "Queimada",
        state: "Amazonas",
        date: "10/06/2026",
        status: "Crítico"
    },
    {
        id: 2,
        type: "Desmatamento",
        state: "Pará",
        date: "08/06/2026",
        status: "Alto"
    },
    {
        id: 3,
        type: "Poluição",
        state: "Mato Grosso",
        date: "06/06/2026",
        status: "Médio"
    },
    {
        id: 4,
        type: "Queimada",
        state: "Rondônia",
        date: "05/06/2026",
        status: "Baixo"
    }
];

// Quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
    carregarEstatisticas();
    carregarTabela(events);
});

// Estatísticas
function carregarEstatisticas() {
    let queimadas = events.filter(e => e.type === "Queimada").length;
    let desmatamentos = events.filter(e => e.type === "Desmatamento").length;
    let poluicoes = events.filter(e => e.type === "Poluição").length;

    document.querySelector("#fire-count").textContent = queimadas;
    document.querySelector("#deforestation-count").textContent = desmatamentos;
    document.querySelector("#pollution-count").textContent = poluicoes;
}

// Carrega a tabela
function carregarTabela(lista) {
    let tbody = document.querySelector(".table tbody");

    tbody.innerHTML = "";

    lista.forEach(function (evento) {
        tbody.innerHTML += `
            <tr>
                <td>${evento.id}</td>
                <td>${evento.type}</td>
                <td>${evento.state}</td>
                <td>${evento.date}</td>
                <td>${evento.status}</td>
                <td>
                    <button onclick="verDetalhes(${evento.id})">
                        Ver
                    </button>
                </td>
            </tr>
        `;
    });
}

// Mostra detalhes do evento
function verDetalhes(id) {
    let evento = events.find(e => e.id === id);

    let detalhes = document.querySelector("#event-details");

    detalhes.innerHTML = `
        <h3>${evento.type}</h3>
        <p><strong>ID:</strong> ${evento.id}</p>
        <p><strong>Estado:</strong> ${evento.state}</p>
        <p><strong>Data:</strong> ${evento.date}</p>
        <p><strong>Status:</strong> ${evento.status}</p>
    `;
}
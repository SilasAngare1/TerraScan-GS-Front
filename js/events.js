/**
 * Script de gerenciamento de eventos ambientais
 */

// Dados dos eventos
const events = [
    {
        id: 1,
        type: "Queimada",
        state: "Amazonas",
        date: "10/06/2026",
        status: "Crítico",
        description: "Foco de incêndio detectado por satélite.",
        severity: 95,
        location: "Rio Branco, AC"
    },
    {
        id: 2,
        type: "Desmatamento",
        state: "Pará",
        date: "08/06/2026",
        status: "Alto",
        description: "Área de floresta removida.",
        severity: 75,
        location: "Altamira, PA"
    },
    {
        id: 3,
        type: "Poluição",
        state: "Mato Grosso",
        date: "06/06/2026",
        status: "Médio",
        description: "Alteração na qualidade da água.",
        severity: 50,
        location: "Cuiabá, MT"
    },
    {
        id: 4,
        type: "Queimada",
        state: "Rondônia",
        date: "05/06/2026",
        status: "Baixo",
        description: "Pequeno foco controlado.",
        severity: 25,
        location: "Porto Velho, RO"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    initializeEvents();
});

function initializeEvents() {
    loadStatistics();
    loadTable(events);
    initializeFilters();
}

/**
 * Carrega e exibe estatísticas dos eventos
 */
function loadStatistics() {
    const fire = events.filter(e => e.type === "Queimada").length;
    const deforestation = events.filter(e => e.type === "Desmatamento").length;
    const pollution = events.filter(e => e.type === "Poluição").length;

    updateElement("#fire-count", fire);
    updateElement("#deforestation-count", deforestation);
    updateElement("#pollution-count", pollution);
}

/**
 * Atualiza elemento de forma segura
 */
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}

/**
 * Carrega tabela de eventos
 * @param {array} data - Array de eventos
 */
function loadTable(data) {
    const tbody = document.querySelector(".table tbody");
    if (!tbody) return;

    // Usar fragment para melhor performance
    const fragment = document.createDocumentFragment();
    
    data.forEach(event => {
        const tr = createEventRow(event);
        fragment.appendChild(tr);
    });

    tbody.innerHTML = "";
    tbody.appendChild(fragment);
    
    initializeButtons();
}

/**
 * Cria linha da tabela para um evento
 * @param {object} event - Objeto do evento
 * @returns {HTMLElement} - Elemento tr
 */
function createEventRow(event) {
    const tr = document.createElement("tr");
    tr.dataset.id = event.id;

    const statusClass = `status-${event.status.toLowerCase()}`;
    
    tr.innerHTML = `
        <td>${event.id}</td>
        <td><strong>${event.type}</strong></td>
        <td>${event.state}</td>
        <td>${event.date}</td>
        <td>
            <span class="status ${statusClass}">
                ${event.status}
            </span>
        </td>
        <td>
            <button class="button button-small button-primary view-button" 
                    aria-label="Ver detalhes do evento ${event.id}">
                <i class="fa-solid fa-eye"></i> Ver
            </button>
        </td>
    `;

    return tr;
}

/**
 * Inicializa listeners dos botões Ver
 */
function initializeButtons() {
    const buttons = document.querySelectorAll(".view-button");
    
    buttons.forEach(button => {
        button.removeEventListener("click", handleViewButton);
        button.addEventListener("click", handleViewButton);
    });
}

/**
 * Handler para botão Ver
 */
function handleViewButton(e) {
    e.preventDefault();
    const row = this.closest("tr");
    const id = row.dataset.id;
    showDetails(id);
    
    // Scroll para detalhes
    const details = document.querySelector("#event-details");
    if (details) {
        details.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

/**
 * Exibe detalhes do evento
 * @param {number} id - ID do evento
 */
function showDetails(id) {
    const details = document.querySelector("#event-details");
    if (!details) return;

    const event = events.find(e => e.id == id);
    if (!event) return;

    const statusIcon = getStatusIcon(event.status);
    const severityBar = createSeverityBar(event.severity);

    details.innerHTML = `
        <div class="event-details-content">
            <div class="event-details-header">
                <div class="event-title">
                    <i class="fa-solid ${getEventIcon(event.type)}" aria-hidden="true"></i>
                    <div>
                        <h3>${event.type} #${event.id}</h3>
                        <p class="event-location">${event.location}</p>
                    </div>
                </div>
                <span class="status status-${event.status.toLowerCase()}">
                    ${statusIcon} ${event.status}
                </span>
            </div>

            <div class="event-details-grid">
                <div class="detail-item">
                    <label>Estado</label>
                    <p>${event.state}</p>
                </div>
                <div class="detail-item">
                    <label>Data</label>
                    <p>${event.date}</p>
                </div>
                <div class="detail-item">
                    <label>Gravidade</label>
                    ${severityBar}
                </div>
            </div>

            <div class="event-description">
                <label>Descrição</label>
                <p>${event.description}</p>
            </div>

            <div class="event-actions">
                <button class="button button-primary" onclick="editEvent(${event.id})">
                    <i class="fa-solid fa-edit"></i> Editar
                </button>
                <button class="button button-secondary" onclick="reportEvent(${event.id})">
                    <i class="fa-solid fa-flag"></i> Reportar
                </button>
            </div>
        </div>
    `;
}

/**
 * Retorna ícone baseado no tipo de evento
 */
function getEventIcon(type) {
    const icons = {
        "Queimada": "fa-fire",
        "Desmatamento": "fa-tree",
        "Poluição": "fa-water"
    };
    return icons[type] || "fa-alert";
}

/**
 * Retorna ícone baseado no status
 */
function getStatusIcon(status) {
    const icons = {
        "Crítico": "🔴",
        "Alto": "🟠",
        "Médio": "🟡",
        "Baixo": "🟢"
    };
    return icons[status] || "⚪";
}

/**
 * Cria barra de severidade
 */
function createSeverityBar(severity) {
    const color = severity > 75 ? "#ff5d5d" : 
                  severity > 50 ? "#ffc14d" : 
                  severity > 25 ? "#56b6ff" : "#5eff8f";
    
    return `
        <div class="severity-bar" style="background: linear-gradient(to right, ${color}, transparent); 
             width: 100%; height: 6px; border-radius: 3px; margin-top: 4px;"></div>
        <p style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 4px;">${severity}% de gravidade</p>
    `;
}

/**
 * Inicializa filtros
 */
function initializeFilters() {
    const selects = document.querySelectorAll("select");
    
    selects.forEach(select => {
        select.removeEventListener("change", handleFilterChange);
        select.addEventListener("change", handleFilterChange);
    });
}

/**
 * Handler para mudança de filtros
 */
function handleFilterChange() {
    filterEvents();
}

/**
 * Filtra eventos conforme critérios
 */
function filterEvents() {
    const selects = document.querySelectorAll("select");
    const type = selects[0]?.value || "";
    const state = selects[1]?.value || "";
    const status = selects[2]?.value || "";

    let filtered = events.filter(event => {
        let matches = true;
        if (type && event.type !== type) matches = false;
        if (state && event.state !== state) matches = false;
        if (status && event.status !== status) matches = false;
        return matches;
    });

    loadTable(filtered);
    
    // Feedback visual
    showNotification(`${filtered.length} evento(s) encontrado(s)`, "info", 2000);
}

/**
 * Funções simuladas para ações
 */
function editEvent(id) {
    showNotification(`Editando evento #${id}`, "info");
    console.log("Editar evento:", id);
}

function reportEvent(id) {
    showNotification(`Evento #${id} reportado com sucesso!`, "success");
    console.log("Reportar evento:", id);
}

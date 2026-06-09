/**
 * Script do Dashboard - Gráficos e estatísticas
 * Requer Chart.js: https://cdn.jsdelivr.net/npm/chart.js
 */

document.addEventListener("DOMContentLoaded", () => {
    if (typeof Chart === "undefined") {
        console.warn("Chart.js não está carregado. Pulando gráficos.");
        return;
    }
    
    createBarChart();
    createPieChart();
    initializeDashboard();
});

/**
 * Cria gráfico de barras com alertas
 */
function createBarChart() {
    const ctx = document.getElementById("barChart");
    if (!ctx) return;

    const chartContext = ctx.getContext("2d");
    
    new Chart(chartContext, {
        type: "bar",
        data: {
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
            datasets: [
                {
                    label: "Alertas Críticos",
                    data: [15, 22, 28, 35, 42, 38],
                    backgroundColor: "#D32F2F",
                    borderRadius: 8,
                    borderSkipped: false,
                    tension: 0.4
                },
                {
                    label: "Alertas Altos",
                    data: [10, 16, 14, 20, 21, 18],
                    backgroundColor: "#F9A825",
                    borderRadius: 8,
                    borderSkipped: false,
                    tension: 0.4
                },
                {
                    label: "Alertas Médios",
                    data: [5, 8, 7, 10, 12, 10],
                    backgroundColor: "#1976D2",
                    borderRadius: 8,
                    borderSkipped: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        color: "rgba(255,255,255,0.7)",
                        font: { size: 13 },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.7)",
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    borderColor: "rgba(255,255,255,0.2)",
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(255,255,255,0.08)",
                        drawBorder: false
                    },
                    ticks: {
                        color: "rgba(255,255,255,0.5)",
                        font: { size: 12 }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: "rgba(255,255,255,0.5)",
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

/**
 * Cria gráfico de pizza com distribuição de eventos
 */
function createPieChart() {
    const ctx = document.getElementById("pieChart");
    if (!ctx) return;

    const chartContext = ctx.getContext("2d");
    
    new Chart(chartContext, {
        type: "doughnut",
        data: {
            labels: ["Queimadas", "Desmatamento", "Poluição Hídrica", "Outros"],
            datasets: [
                {
                    data: [127, 64, 19, 12],
                    backgroundColor: [
                        "#D32F2F",
                        "#F9A825",
                        "#1976D2",
                        "#43A047"
                    ],
                    borderColor: "rgba(255,255,255,0.1)",
                    borderWidth: 2,
                    hoverOffset: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "rgba(255,255,255,0.7)",
                        font: { size: 13 },
                        padding: 15,
                        usePointStyle: true,
                        generateLabels: (chart) => {
                            const data = chart.data;
                            const datasets = data.datasets;
                            return data.labels.map((label, i) => ({
                                text: `${label}: ${datasets[0].data[i]}`,
                                fillStyle: datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.7)",
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    borderColor: "rgba(255,255,255,0.2)",
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.parsed;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value} eventos (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Inicializa funcionalidades do dashboard
 */
function initializeDashboard() {
    // Carregar dados do usuário
    loadUserProfile();
    
    // Animar cards de estatísticas
    animateStatCards();
    
    // Inicializar refresh automático (opcional)
    // setInterval(refreshDashboard, 30000); // A cada 30 segundos
}

/**
 * Anima cards de estatísticas
 */
function animateStatCards() {
    const cards = document.querySelectorAll(".stat-card");
    
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 100);
    });
}

/**
 * Atualiza dashboard com novos dados (simulado)
 */
function refreshDashboard() {
    console.log("Atualizando dashboard...");
    // Aqui você pode fazer uma requisição para atualizar os dados
    showNotification("Dashboard atualizado!", "success", 2000);
}

/**
 * Exporta dados do dashboard
 */
function exportDashboardData() {
    const data = {
        timestamp: new Date().toISOString(),
        alerts: {
            critical: 42,
            high: 29,
            medium: 12
        },
        events: {
            fires: 127,
            deforestation: 64,
            pollution: 19,
            other: 12
        }
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification("Dados exportados com sucesso!", "success");
}

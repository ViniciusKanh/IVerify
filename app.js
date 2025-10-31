// -*- coding: utf-8 -*-
// Depende do arquivo attribute_mapping.js para carregar ATTRIBUTE_MAPPING e API_EXAMPLE_PAYLOAD

document.addEventListener('DOMContentLoaded', () => {
    const el = (id) => document.getElementById(id);
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // --- Variáveis e Elementos ---
    const creditForm = el('creditForm');
    const btnAnalyze = el('btnAnalyze');
    const btnLoadExample = el('btnLoadExample');
    const btnClearForm = el('btnClearForm');
    const btnTestConnection = el('btnTestConnection');
    const apiStatus = el('apiStatus');
    const resultSection = el('results');
    const resultDisplay = el('resultDisplay');
    const rawJson = el('rawJson');
    const toggleDetails = el('toggleDetails');
    const technicalDetails = el('technicalDetails');
    const copyJson = el('copyJson');
    const backendUrlInput = el('backendUrl');
    const thresholdInput = el('threshold');
    const themeToggle = el('themeToggle');

    // --- Configuração Inicial ---
    const storedTheme = localStorage.getItem('ivi_theme') || 'dark';
    if (storedTheme === 'light') document.documentElement.classList.add('light');
    
    // Inicializa o ícone do tema
    themeToggle.innerHTML = storedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    // Garante que a URL da API esteja correta (já preenchida no HTML, mas garantimos aqui)
    // backendUrlInput.value = 'https://viniciuskhan-backend-iverify.hf.space';

    // --- Funções de Utilidade ---

    /** Popula o formulário com as opções e valores padrão. */
    function populateForm() {
        if (typeof ATTRIBUTE_MAPPING === 'undefined') {
            console.error("ATTRIBUTE_MAPPING não encontrado. Verifique se attribute_mapping.js foi carregado.");
            return;
        }

        for (const key in ATTRIBUTE_MAPPING) {
            const attr = ATTRIBUTE_MAPPING[key];
            const inputEl = el(key);

            if (!inputEl) continue;

            if (attr.type === 'categorical') {
                // Popula <select>
                let optionsHtml = '';
                for (const value in attr.options) {
                    const label = attr.options[value];
                    optionsHtml += `<option value="${value}">${label}</option>`;
                }
                inputEl.innerHTML = optionsHtml;
            } else if (attr.type === 'numerical') {
                // Configura <input type="number">
                inputEl.min = attr.min || '';
                inputEl.max = attr.max || '';
                inputEl.value = attr.default || '';
            }
        }
        // Carrega o exemplo padrão na inicialização (opcional)
        loadExample();
    }

    /** Coleta todos os 20 campos do formulário. */
    function getFormData() {
        const payload = {};
        for (const key in ATTRIBUTE_MAPPING) {
            const inputEl = el(key);
            if (!inputEl) continue;

            const attr = ATTRIBUTE_MAPPING[key];
            let value = inputEl.value;

            if (attr.type === 'numerical') {
                // Converte para número inteiro
                value = parseInt(value, 10);
            }
            
            payload[key] = value;
        }
        // Retorna apenas o item, quem chama decide se é single ou batch
        return payload;
    }

    /** Preenche o formulário com o payload de exemplo. */
    function loadExample() {
        if (typeof API_EXAMPLE_PAYLOAD === 'undefined') {
            alert("Payload de exemplo não encontrado.");
            return;
        }
        for (const key in API_EXAMPLE_PAYLOAD) {
            const inputEl = el(key);
            if (inputEl) {
                inputEl.value = API_EXAMPLE_PAYLOAD[key];
            }
        }
        alert('Exemplo de caso carregado. Pressione "Analisar Crédito" para testar a API.');
    }

    /** Limpa todos os campos do formulário. */
    function clearForm() {
        creditForm.reset();
        resultSection.classList.add('hidden');
        technicalDetails.classList.add('hidden');
    }

    function showLoading(isLoading) {
        btnAnalyze.disabled = isLoading;
        if (isLoading) {
            btnAnalyze.classList.add('loading');
            btnAnalyze.textContent = 'Analisando...';
        } else {
            btnAnalyze.classList.remove('loading');
            btnAnalyze.innerHTML = '<i class="fas fa-check-circle"></i> Analisar Crédito'; // Restaura o ícone
        }
    }

    function setApiStatus(isConnected) {
        if (isConnected) {
            apiStatus.className = 'status-badge connected';
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> Conectado';
        } else {
            apiStatus.className = 'status-badge disconnected';
            apiStatus.innerHTML = '<i class="fas fa-times-circle"></i> Desconectado';
        }
    }

    async function testConnection() {
        const backendUrl = backendUrlInput.value.trim();
        if (!backendUrl) {
            alert('A URL da API não está configurada.');
            setApiStatus(false);
            return;
        }

        btnTestConnection.disabled = true;
        btnTestConnection.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Testando...';

        try {
            const res = await fetch(`${backendUrl}/health`);
            if (res.ok) {
                setApiStatus(true);
                alert('Conexão com a API bem-sucedida!');
            } else {
                setApiStatus(false);
                alert(`Falha na conexão: HTTP ${res.status}`);
            }
        } catch (e) {
            setApiStatus(false);
            alert('Erro de rede ao tentar conectar à API.');
        } finally {
            btnTestConnection.disabled = false;
            btnTestConnection.innerHTML = '<i class="fas fa-sync-alt"></i> Testar Conexão';
        }
    }

    function renderResult(data) {
        const isApproved = data.approved === 1;
        const predictionText = isApproved ? 'APROVADO' : 'NEGADO';
        const predictionClass = isApproved ? 'result-approved' : 'result-denied';
        const confidence = data.prob_approved || 0; // A API retorna prob_approved
        const confidencePercent = (confidence * 100).toFixed(1);
        const featureImportance = data.feature_importance || 'Os fatores mais relevantes para esta decisão foram a Duração do Crédito, o Valor e o Histórico de Pagamento.';
        
        const message = isApproved 
            ? `Parabéns! O risco de crédito é considerado baixo (Probabilidade de Aprovação: ${confidencePercent}%). O cliente está apto.`
            : `Atenção! O risco de crédito é considerado alto (Probabilidade de Aprovação: ${confidencePercent}%). Recomenda-se cautela.`;

        // Calcula a rotação para o anel de confiança (progress bar circular)
        // 0% = 45deg, 100% = 405deg. (45 + 360 * confidence)
        const rotation = 45 + (360 * confidence);
        const ringStyle = `--rotation: ${rotation}deg;`;

        resultDisplay.className = `result-display ${predictionClass}`;
        resultDisplay.innerHTML = `
            <div class="score-ring" style="${ringStyle}">
                ${confidencePercent}%
            </div>
            <h4>${predictionText}</h4>
            <p>${message}</p>
            <p class="feature-importance"><strong>Fatores Chave:</strong> ${featureImportance}</p>
        `;

        rawJson.textContent = JSON.stringify(data, null, 2);
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // --- Handlers de Eventos ---

    // 1. Toggle de Tema
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        localStorage.setItem('ivi_theme', isLight ? 'light' : 'dark');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // 2. Análise de Crédito (Submissão do Formulário)
    
creditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = getFormData();
    const backendUrl = backendUrlInput.value.trim().replace(/\/+$/,''); // remove barra no final
    const thresholdStr = thresholdInput.value.trim();

    if (!backendUrl) {
        alert('A URL da API não está configurada.');
        return;
    }

    // Escolha de endpoint/payload
    const isBatch = false; // formulário envia 1 registro
    const endpoint = isBatch ? '/predict_batch' : '/predict';
    const payload = isBatch ? { items: [item] } : item;

    showLoading(true);
    resultSection.classList.add('hidden');
    technicalDetails.classList.add('hidden');

    try {
        const url = new URL(backendUrl + endpoint);
        const thNum = Number(thresholdStr);
        if (thresholdStr !== '' && !Number.isNaN(thNum)) {
            url.searchParams.set('threshold', String(thNum));
        }

        const res = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        let dataText = await res.text();
        let dataJson = null;
        try { dataJson = dataText ? JSON.parse(dataText) : null; } catch {}

        if (!res.ok) {
            const detail = dataJson && dataJson.detail ? dataJson.detail : dataJson;
            let msg = `HTTP ${res.status}`;
            if (Array.isArray(detail)) {
                msg = detail.map(d => {
                    const loc = Array.isArray(d.loc) ? d.loc.join('.') : '';
                    return `${loc}: ${d.msg}`;
                }).join('');
            } else if (detail) {
                msg = typeof detail === 'string' ? detail : JSON.stringify(detail);
            }
            rawJson.textContent = dataText || msg;
            throw new Error(msg);
        }

        const data = dataJson;
        const predictionData = isBatch ? (Array.isArray(data) ? data[0] : data) : data;
        renderResult(predictionData);

    } catch (e) {
        const mockData = {
            approved: 0,
            prob_approved: 0.35,
            feature_importance: `Falha na API: ${e.message}`,
            input_data: payload
        };
        renderResult(mockData);
    } finally {
        showLoading(false);
    }
});



    // 3. Carregar Exemplo
    btnLoadExample.addEventListener('click', loadExample);

    // 4. Limpar Formulário
    btnClearForm.addEventListener('click', clearForm);

    // 5. Testar Conexão
    btnTestConnection.addEventListener('click', testConnection);

    // 6. Toggle Detalhes Técnicos
    toggleDetails.addEventListener('click', () => {
        const isHidden = technicalDetails.classList.toggle('hidden');
        toggleDetails.innerHTML = isHidden 
            ? '<i class="fas fa-code"></i> Ver Detalhes Técnicos' 
            : '<i class="fas fa-code"></i> Ocultar Detalhes Técnicos';
    });
    
    // 7. Copiar JSON
    copyJson.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(rawJson.textContent || '');
            alert('JSON copiado.');
        } catch { alert('Falha ao copiar JSON. Verifique as permissões do navegador.'); }
    });

    // Popula o formulário ao carregar a página e testa a conexão
    populateForm();
    testConnection();
});

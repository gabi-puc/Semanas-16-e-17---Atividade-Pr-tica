const API_URL = 'http://localhost:3000';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showAlert(message, type) {
    const container = document.getElementById('alert-container');
    container.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

function clearAlerts() {
    document.getElementById('alert-container').innerHTML = '';
}

function validateForm() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const localizacao = document.getElementById('localizacao').value.trim();

    if (!nome || !descricao || !localizacao) {
        showAlert('Os campos Nome, Descrição e Localização são obrigatórios.', 'warning');
        return false;
    }
    return true;
}

function buildPayload() {
    return {
        nome: document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        conteudo: document.getElementById('conteudo').value.trim(),
        localizacao: document.getElementById('localizacao').value.trim(),
        categoria: document.getElementById('categoria').value,
        destaque: document.getElementById('destaque').checked,
        data: document.getElementById('data').value,
        imagemPrincipal: document.getElementById('imagemPrincipal').value.trim(),
    };
}

async function preencherFormulario(id) {
    try {
        const response = await fetch(`${API_URL}/lugares/${id}`);
        if (!response.ok) throw new Error('Lugar não encontrado');
        const lugar = await response.json();

        document.getElementById('form-title').textContent = 'Editar Lugar';
        document.getElementById('nome').value = lugar.nome || '';
        document.getElementById('descricao').value = lugar.descricao || '';
        document.getElementById('conteudo').value = lugar.conteudo || '';
        document.getElementById('localizacao').value = lugar.localizacao || '';
        document.getElementById('categoria').value = lugar.categoria || 'Natureza';
        document.getElementById('destaque').checked = lugar.destaque === true;
        document.getElementById('data').value = lugar.data || '';
        document.getElementById('imagemPrincipal').value = lugar.imagemPrincipal || '';
    } catch (error) {
        showAlert('Erro ao carregar dados do lugar. Verifique se o servidor está online.', 'danger');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const id = getQueryParam('id');

    if (id) {
        await preencherFormulario(id);
    }

    document.getElementById('form-lugar').addEventListener('submit', async (event) => {
        event.preventDefault();
        clearAlerts();

        if (!validateForm()) return;

        const payload = buildPayload();
        const url = id ? `${API_URL}/lugares/${id}` : `${API_URL}/lugares`;
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`Erro ${response.status}`);

            window.location.href = 'index.html';
        } catch (error) {
            showAlert('Erro ao salvar o lugar. Verifique se o servidor está online.', 'danger');
        }
    });
});

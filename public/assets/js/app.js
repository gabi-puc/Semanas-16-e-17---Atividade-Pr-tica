const API_URL = 'http://localhost:3000';

async function fetchLugares() {
    try {
        const response = await fetch(`${API_URL}/lugares`);
        const lugares = await response.json();
        return lugares;
    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
}

async function fetchLugarById(id) {
    try {
        const response = await fetch(`${API_URL}/lugares/${id}`);
        const lugar = await response.json();
        return lugar;
    } catch (error) {
        console.error('Error fetching place:', error);
        return null;
    }
}

async function fetchExperienciasByLugar(lugarId) {
    try {
        const response = await fetch(`${API_URL}/experiencias?lugarId=${lugarId}`);
        const experiencias = await response.json();
        return experiencias;
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
}

function buildCarousel(lugares) {
    const destaques = lugares.filter(lugar => lugar.destaque === true);
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicators = document.getElementById('carousel-indicators');

    if (!carouselInner || !carouselIndicators) return;

    destaques.forEach((lugar, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#carouselDestaques';
        indicator.dataset.bsSlideTo = index;
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicator);

        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <img src="${lugar.imagemPrincipal}" class="d-block w-100" alt="${lugar.nome}">
            <div class="carousel-caption d-none d-md-block">
                <h3>${lugar.nome}</h3>
                <p>${lugar.descricao}</p>
                <a href="detalhes.html?id=${lugar.id}" class="btn btn-light btn-sm">Ver Detalhes</a>
            </div>
        `;
        carouselInner.appendChild(item);
    });
}

async function deleteLugar(id, colElement) {
    try {
        const response = await fetch(`${API_URL}/lugares/${id}`, { method: 'DELETE' });
        if (response.ok) {
            colElement.remove();
        } else {
            showDeleteError();
        }
    } catch (error) {
        showDeleteError();
    }
}

function showDeleteError() {
    const section = document.getElementById('lugares');
    if (!section) return;
    if (section.querySelector('.delete-error-alert')) return;
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger delete-error-alert mt-2';
    alert.textContent = 'Erro ao excluir o lugar. Verifique se o servidor está online.';
    section.querySelector('.container').prepend(alert);
}

function buildCards(lugares) {
    const container = document.getElementById('cards-container');

    if (!container) return;

    lugares.forEach(lugar => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${lugar.imagemPrincipal}" class="card-img-top" alt="${lugar.nome}">
                <div class="card-body">
                    <h5 class="card-title">${lugar.nome}</h5>
                    <p class="card-text">${lugar.descricao}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <small class="text-muted"><i class="bi bi-geo-alt"></i> ${lugar.localizacao}</small>
                    <div>
                        <a href="detalhes.html?id=${lugar.id}" class="btn btn-primary btn-sm">Ver Detalhes</a>
                        <button class="btn btn-warning btn-sm" onclick="window.location.href='cadastro_lugar.html?id=${lugar.id}'">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteLugar(${lugar.id}, this.closest('.col'))">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function buildLugarDetalhes(lugar) {
    const container = document.getElementById('detalhes-lugar');

    if (!container) return;

    container.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${lugar.imagemPrincipal}" class="img-fluid rounded" alt="${lugar.nome}">
            </div>
            <div class="col-md-6">
                <h1>${lugar.nome}</h1>
                <p class="lead">${lugar.descricao}</p>
                <hr>
                <p><strong><i class="bi bi-geo-alt"></i> Localização:</strong> ${lugar.localizacao}</p>
                <p><strong><i class="bi bi-tag"></i> Categoria:</strong> ${lugar.categoria}</p>
                <p><strong><i class="bi bi-calendar"></i> Data de publicação:</strong> ${formatDate(lugar.data)}</p>
                <p><strong><i class="bi bi-star"></i> Destaque:</strong> ${lugar.destaque ? 'Sim' : 'Não'}</p>
                <p><strong><i class="bi bi-info-circle"></i> Sobre:</strong></p>
                <p>${lugar.conteudo}</p>
            </div>
        </div>
    `;
}

function buildExperiencias(experiencias) {
    const container = document.getElementById('experiencias-container');

    if (!container) return;

    if (experiencias.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhuma experiência cadastrada para este lugar.</p>';
        return;
    }

    experiencias.forEach(exp => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${exp.imagem}" class="card-img-top" alt="${exp.nome}">
                <div class="card-body">
                    <h5 class="card-title">${exp.nome}</h5>
                    <p class="card-text">${exp.descricao}</p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function formatDate(dateString) {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes('detalhes.html')) {
        const lugarId = getQueryParam('id');

        if (!lugarId) {
            document.getElementById('detalhes-lugar').innerHTML =
                '<p class="text-center text-danger">Nenhum lugar selecionado. Volte para a página inicial.</p>';
            return;
        }

        const lugar = await fetchLugarById(lugarId);

        if (lugar) {
            document.title = `Mundo Tour - ${lugar.nome}`;
            buildLugarDetalhes(lugar);

            const experiencias = await fetchExperienciasByLugar(lugarId);
            buildExperiencias(experiencias);
        } else {
            document.getElementById('detalhes-lugar').innerHTML =
                '<p class="text-center text-danger">Lugar não encontrado.</p>';
        }
    } else {
        const lugares = await fetchLugares();
        buildCarousel(lugares);
        buildCards(lugares);
    }
});

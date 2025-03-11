// Função para carregar e exibir a lista de denúncias
async function loadDenuncias() {
    const response = await fetch('http://localhost:8000/denuncias/');
    const denuncias = await response.json();
    const listaDenuncias = document.getElementById('lista-denuncias');
    listaDenuncias.innerHTML = '';

    denuncias.forEach(denuncia => {
        const div = document.createElement('div');
        div.className = 'denuncia-item';
        div.innerHTML = `
            <h3>Denúncia</h3>
            <p>Localização: ${denuncia.localizacao}</p>
            <p>Descrição: ${denuncia.descricao}</p>
            <p>Anônimo: ${denuncia.anonimo ? 'Sim' : 'Não'}</p>
        `;
        listaDenuncias.appendChild(div);
    });
}

// Fazer Denúncia
document.getElementById('form-denuncia').addEventListener('submit', async function(event) {
    event.preventDefault();

    const denuncia = {
        localizacao: document.getElementById('localizacao').value,
        descricao: document.getElementById('descricao').value,
        fotos: document.getElementById('fotos').value,
        anonimo: document.getElementById('anonimo').checked
    };

    const response = await fetch('http://localhost:8000/denuncias/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(denuncia)
    });

    if (response.ok) {
        alert('Denúncia registrada com sucesso!');
        loadDenuncias();
    } else {
        alert('Erro ao registrar denúncia.');
    }
});

// Carregar denúncias ao abrir a página
document.addEventListener('DOMContentLoaded', loadDenuncias);
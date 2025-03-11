// Função para carregar e exibir a lista de voluntários
async function loadVoluntarios() {
    const response = await fetch('http://localhost:8000/voluntarios/');
    const voluntarios = await response.json();
    const listaVoluntarios = document.getElementById('lista-voluntarios');
    listaVoluntarios.innerHTML = '';

    voluntarios.forEach(voluntario => {
        const div = document.createElement('div');
        div.className = 'voluntario-item';
        div.innerHTML = `
            <h3>${voluntario.nome}</h3>
            <p>Endereço: ${voluntario.endereco}</p>
            <p>Disponibilidade: ${voluntario.disponibilidade}</p>
            <p>Experiência: ${voluntario.experiencia}</p>
        `;
        listaVoluntarios.appendChild(div);
    });
}

// Cadastrar Voluntário
document.getElementById('form-voluntario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const voluntario = {
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        disponibilidade: document.getElementById('disponibilidade').value,
        experiencia: document.getElementById('experiencia').value
    };

    const response = await fetch('http://localhost:8000/voluntarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voluntario)
    });

    if (response.ok) {
        alert('Voluntário cadastrado com sucesso!');
        loadVoluntarios();
    } else {
        alert('Erro ao cadastrar voluntário.');
    }
});

// Carregar voluntários ao abrir a página
document.addEventListener('DOMContentLoaded', loadVoluntarios);
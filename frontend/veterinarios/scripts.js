// Função para carregar e exibir a lista de veterinários
async function loadVeterinarios() {
    const response = await fetch('http://localhost:8000/veterinarios/');
    const veterinarios = await response.json();
    const listaVeterinarios = document.getElementById('lista-veterinarios');
    listaVeterinarios.innerHTML = '';

    veterinarios.forEach(veterinario => {
        const div = document.createElement('div');
        div.className = 'veterinario-item';
        div.innerHTML = `
            <h3>${veterinario.nome}</h3>
            <p>Especialidade: ${veterinario.especialidade}</p>
            <p>Disponibilidade: ${veterinario.disponibilidade}</p>
            <p>Localização: ${veterinario.localizacao}</p>
        `;
        listaVeterinarios.appendChild(div);
    });
}

// Cadastrar Veterinário
document.getElementById('form-veterinario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const veterinario = {
        nome: document.getElementById('nome').value,
        especialidade: document.getElementById('especialidade').value,
        disponibilidade: document.getElementById('disponibilidade').value,
        localizacao: document.getElementById('localizacao').value
    };

    const response = await fetch('http://localhost:8000/veterinarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veterinario)
    });

    if (response.ok) {
        alert('Veterinário cadastrado com sucesso!');
        loadVeterinarios();
    } else {
        alert('Erro ao cadastrar veterinário.');
    }
});

// Carregar veterinários ao abrir a página
document.addEventListener('DOMContentLoaded', loadVeterinarios);
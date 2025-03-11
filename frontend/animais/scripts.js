// Função para carregar e exibir a lista de animais
async function loadAnimais() {
    const response = await fetch('http://localhost:8000/animais/');
    const animais = await response.json();
    const listaAnimais = document.getElementById('lista-animais');
    listaAnimais.innerHTML = '';

    animais.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'animal-item';
        div.innerHTML = `
            <h3>${animal.nome}</h3>
            <p>Idade: ${animal.idade}</p>
            <p>Raça: ${animal.raca}</p>
            <p>Porte: ${animal.porte}</p>
            <p>Características: ${animal.caracteristicas_fisicas}</p>
            <p>Comportamento: ${animal.comportamento}</p>
            <p>Requisitos: ${animal.requisitos_adoção}</p>
        `;
        listaAnimais.appendChild(div);
    });
}

// Cadastrar Animal
document.getElementById('form-animal').addEventListener('submit', async function(event) {
    event.preventDefault();

    const animal = {
        nome: document.getElementById('nome').value,
        idade: parseInt(document.getElementById('idade').value),
        raca: document.getElementById('raca').value,
        porte: document.getElementById('porte').value,
        caracteristicas_fisicas: document.getElementById('caracteristicas').value,
        historico_saude: document.getElementById('historico').value,
        fotos: document.getElementById('fotos').value,
        comportamento: document.getElementById('comportamento').value,
        requisitos_adoção: document.getElementById('requisitos').value
    };

    const response = await fetch('http://localhost:8000/animais/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    });

    if (response.ok) {
        alert('Animal cadastrado com sucesso!');
        loadAnimais();
    } else {
        alert('Erro ao cadastrar animal.');
    }
});

// Carregar animais ao abrir a página
document.addEventListener('DOMContentLoaded', loadAnimais);
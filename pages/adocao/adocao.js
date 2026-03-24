function addImage() {
    const image = localStorage.getItem('image');
    let petAvatar = document.getElementById('pet-avatar');
    
    if (image && petAvatar) {
        petAvatar.innerHTML = `<img src="${image}" alt="Foto do Pet" class="pet-avatar">`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            nomeCompleto: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            tipoMoradia: document.getElementById('moradia').value,
            condicaoImovel: document.getElementById('condicao').value,
            numeroResidentes: parseInt(document.getElementById('pessoas').value, 10),
            motivoAdocao: document.getElementById('motivacao').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/adoptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const modal = document.getElementById('sucesso-modal');
                modal.classList.remove('hidden');
                
                form.reset();

                document.getElementById('fechar-modal').addEventListener('click', () => {
                    modal.classList.add('hidden');
                    window.location.href = '../pets/pets.html';
                });

            } else {
                alert('Ocorreu um erro ao enviar a solicitação. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            alert('Não foi possível conectar com o servidor.');
        }
    });
});

addImage();
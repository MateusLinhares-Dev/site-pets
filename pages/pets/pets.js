function createPetCard(pet) {
    console.log(pet)
  return `
    <div class="pet-card" data-category="${pet.tipo}" data-id="${pet.id}">
      <div class="pet-image">
        <img src="${pet.imagem}" alt="${pet.nome}">
      </div>
      <div class="pet-info">
        <h3 class="pet-name">${pet.nome}</h3>
        <p class="pet-breed">${pet.raca} • ${pet.idade} • ${pet.sexo}</p>
        <p class="pet-description">${pet.descricao}</p>
        <div class="pet-details">
          <span class="detail-item">📏 ${pet.porte}</span>
          <span class="detail-item">🎨 ${pet.cor}</span>
          <span class="detail-item">${pet.vacinado ? '💉 Vacinado' : '💉 Não vacinado'}</span>
          <span class="detail-item">${pet.castrado ? '✂️ Castrado' : '✂️ Não castrado'}</span>
        </div>
        <a href="../adocao/adocao.html" class="btn-view-pet" onclick="saveStorage('${pet.imagem}')">Quero Adotar</a>
      </div>
    </div>
  `;
}

const saveStorage = (imagem) => {
  localStorage.setItem('image', imagem)
}

async function fetchPets(tipo = 'todos') {
    const container = document.getElementById('pets-container');
    
    let url = 'http://localhost:3000/api/pets';
    
    if (tipo !== 'todos') {
        url = `http://localhost:3000/api/pets?tipo=${tipo}`;
    }

    try {
        const response = await fetch(url);
        const pets = await response.json();

        container.innerHTML = "";

        if (pets.length === 0) {
            container.innerHTML = "<p>Nenhum pet encontrado para esta categoria.</p>";
            return;
        }

        container.innerHTML = pets.map(pet => createPetCard(pet)).join('');

    } catch (error) {
        container.innerHTML = "";
        const errorMsg = document.createElement('p');
        errorMsg.classList.add('error-message');
        errorMsg.textContent = "Ops! Erro ao carregar a lista de pets.";
        container.appendChild(errorMsg);
        console.error("Erro na requisição:", error);
    }
}


function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            

            const typeSelect = button.getAttribute('data-filter');
            
            fetchPets(typeSelect);
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

fetchPets();
setupFilters();
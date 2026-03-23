async function loadHeader() {
    const headerElement = document.getElementById('main-header');
    
    try {
        const response = await fetch('../components/header.html'); 
        const data = await response.text();
        headerElement.innerHTML = data;

        const path = window.location.pathname;
        if (path.includes('pets.html')) {
            document.getElementById('link-pets').classList.add('active');
        } else {
            document.getElementById('link-home').classList.add('active');
        }
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}


loadHeader()
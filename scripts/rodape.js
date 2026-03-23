async function loadRodape() {
     const headerElement = document.getElementById('footer');
    
    try {
        console.log('header element ', headerElement)
        const response = await fetch('../components/footer.html');
        const data = await response.text();
        headerElement.innerHTML = data;
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}


loadRodape()
async function get_info() {
    try{ 
        const url = 'http://localhost:3000/api/info'
        const result = await fetch(url)
        const data = await result.json()

        html_index(data)
    } catch (error) {
        console.error('Houve um problema com o fetch:', error);
        document.getElementById('stats-about').innerText = 'Dados indisponiveis!';
    }
}


function html_index(data) {
    const html = `<div class="stat-about-item">
              <div class="stat-about-number">${data.adotados}</div>
              <div class="stat-about-label">Pets Adotados</div>
            </div>
            <div class="stat-about-item">
              <div class="stat-about-number">${data.familias_felizes}</div>
              <div class="stat-about-label">Pets Disponíveis</div>
            </div>
            <div class="stat-about-item">
              <div class="stat-about-number">${data.parceiros}</div>
              <div class="stat-about-label">Famílias Felizes</div>
            </div>
            <div class="stat-about-item">
              <div class="stat-about-number">${data.disponiveis}</div>
              <div class="stat-about-label">Parceiros</div>
    </div>`

    const div_stats_bot = document.getElementById('stats-about')
    div_stats_bot. innerHTML = html
}


get_info();
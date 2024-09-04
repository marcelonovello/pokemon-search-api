document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;

    // Clear previous data
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('sprite').src = '';

    if (!searchInput) {
        alert('Por favor, insira o nome ou ID do Pokémon.');
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = `#${data.id}`;
            document.getElementById('weight').textContent = `Weight: ${data.weight}`;
            document.getElementById('height').textContent = `Height: ${data.height}`;
            document.getElementById('hp').textContent = `${data.stats[0].base_stat}`;
            document.getElementById('attack').textContent = `${data.stats[1].base_stat}`;
            document.getElementById('defense').textContent = `${data.stats[2].base_stat}`;
            document.getElementById('special-attack').textContent = `${data.stats[3].base_stat}`;
            document.getElementById('special-defense').textContent = `${data.stats[4].base_stat}`;
            document.getElementById('speed').textContent = `${data.stats[5].base_stat}`;

            const typesElement = document.getElementById('types');
            data.types.forEach(typeInfo => {
                const type = document.createElement('div');
                type.textContent = typeInfo.type.name.toUpperCase();
                typesElement.appendChild(type);
            });

            const spriteElement = document.getElementById('sprite');
            spriteElement.src = data.sprites.front_default;
        })
        .catch(error => {
            if (error.message === 'Pokémon not found') {
                alert('Pokémon not found');
            } else {
                console.error('Unexpected error:', error);
            }
        });
});
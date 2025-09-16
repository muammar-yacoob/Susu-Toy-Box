async function getPokemon() {
    const result = document.getElementById('result');
    const button = document.querySelector('button');

    button.innerHTML = '<span class="loading loading-spinner"></span>';
    button.disabled = true;

    const randomNumber = Math.floor(Math.random() * 1010) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
    const pokemon = await response.json();

    const name = pokemon.name;
    const id = pokemon.id;
    const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    const types = pokemon.types.map(type => type.type.name).join(', ');

    result.innerHTML = `
        <img src="${image}" alt="${name}" width="150" class="mx-auto"/>
        <div class="bg-gray-700 p-4 rounded-lg text-white mt-4">
            <h2 class="text-xl font-bold">#${id} ${name}</h2>
            <p>Type: ${types}</p>
        </div>
    `;

    button.innerHTML = 'Get Random Pokemon!';
    button.disabled = false;
}
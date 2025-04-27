async function getPokemonData(id) {
    try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonResponse.ok) {
            throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
        }
        const pokemonData = await pokemonResponse.json();
        

        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok) {
            throw new Error(`HTTP error! status: ${speciesResponse.status}`);
        }
        const speciesData = await speciesResponse.json();

        const flavorText = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        )?.flavor_text || 'No flavor text available';

        const fixedFlavorText = flavorText.replace(/\n/g, ' ').replace(/\s/g, ' ').trim();

        return {
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map(type => type.type.name),
            flavorText: fixedFlavorText,
            habitat: speciesData.habitat?.name || 'Unknown',
            isLegendary: speciesData.is_legendary
        };
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
    }
}

async function assignmentTask() {
    try {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const pokemonData = await getPokemonData(randomId);
        
        console.log('Pokemon Data:', pokemonData);
        
        return pokemonData;

    } catch (error) {
        console.error('Error in assignment task:', error);
        throw error;
    }
}


assignmentTask()
    
const axios = require('axios');
const { CHARACTERS, MAX_PER_PAGE, ORIGIN } = require('./enums');


export async function getAppData() {
    try {
        let charactersCount = await getCharactersCount();
        let characters = await getAllCharacters(charactersCount)

        let task1 = await getTask1Data(characters)
        let task2 = getTask2Data(characters)

        task1 = { characters: task1, pages: Math.ceil(task1.length / MAX_PER_PAGE) }
        task2 = { characters: task2 }
        return { task1, task2 }
    } catch(error) {
        console.error("~ file: apiHandler.js ~ line 18 ~ getAppData ~ error", error)
        return null;
    }
}

async function getTask1Data(characters) {
    let { characters: charactersTask1, dimension } = await exportCharactersByOrigin(characters)

    let characterMinShows = Math.min(...charactersTask1.map((chr) => chr.popularity))
    charactersTask1 = charactersTask1.filter(chr => {
        return chr.popularity === characterMinShows
    })
    charactersTask1 = charactersTask1.map((chr) => { return { dimension, ...chr } })
    return charactersTask1
}

async function exportCharactersByOrigin(characters) {
    let originURL = null
    if (!characters?.length) throw new Error('Origin or Characters are invalid')
    characters = characters.filter((chr) => chr.origin.name.includes(ORIGIN)).map((chr) => {
        if (!originURL) originURL = chr.origin.url
        return {
            name: chr.name, origin: chr.origin.name, popularity: chr.episode.length
        }
    })
    if(!originURL) throw new Error('Failed to export origin URL from characters')
    let { data: location } = await axios.get(originURL);
    return { characters, dimension: location.dimension }
}

async function getCharactersCount() {
    let { data } = await axios.get('https://rickandmortyapi.com/api/character');
    let {count} = data?.info;
    if(!count) {
        throw new Error('Failed to retrieve characters count')
    }
    return count;
}

async function getAllCharacters(count) {
    let { data: characters } = await axios.get(`https://rickandmortyapi.com/api/character/${Array(count).fill(1).map((n, i) => n + i).join(',')}`)

    if(!characters || !characters.length || characters.length !== count) throw new Error('Failed to retrieve characters')
    return characters;
}


function getTask2Data(characters) {

    let charactersDict = {}
    characters.filter(chr => CHARACTERS.includes(chr.name))
        .map((chr) => { return { name: chr.name, origin: chr.origin.name, dimension: chr.origin.dimension, popularity: chr.episode.length } }).forEach((chr) => {
            charactersDict[chr.name] = charactersDict[chr.name] ? charactersDict[chr.name] + chr.popularity : chr.popularity
        })

    let charactersTask2 = Object.entries(charactersDict).map(([name, popularity]) => { return { name, popularity } });;
    return charactersTask2
}
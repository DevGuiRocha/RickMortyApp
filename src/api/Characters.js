import api from "./RickMortyApi";

export const fetchCharacters = async ({
    page = 1,
    name,
    status,
    species,
    type, 
    gender
    } = {}) => {
        const params = { page, name, status, species, type, gender }
        const { data } = await api.get('/character', { params })
        return data
    }

export const fetchCharacterById = async (id) => {
    const { data } = await api.get(`/character/${id}`)
    return data
}

export const fetchCharacterByIds = async (ids) => {
    const { data } = await api.get(`/character/${ids.join(',')}`)
    return data
}
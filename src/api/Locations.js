import api from "./RickMortyApi";

export const fetchLocations = async ({
    page = 1,
    name,
    type, 
    dimension
    } = {}) => {
        const params = { page, name, type, dimension }
        const { data } = await api.get('/location', { params })
        return data
    }

export const fetchLocationsById = async (id) => {
    const { data } = await api.get(`/location/${id}`)
    return data
}

export const fetchLocationsByIds = async (ids) => {
    const { data } = await api.get(`/location/${ids.join(',')}`)
    return data
}
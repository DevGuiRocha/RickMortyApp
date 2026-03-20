import api from "./RickMortyApi";

export const fetchEpisodes = async ({
    page = 1,
    name,
    episode
    } = {}) => {
        const params = { page, name, episode }
        const { data } = await api.get('/episode', { params })
        return data
    }

export const fetchEpisodesById = async (id) => {
    const { data } = await api.get(`/episode/${id}`)
    return data
}

export const fetchEpisodesByIds = async (ids) => {
    const { data } = await api.get(`/episode/${ids.join(',')}`)
    return data
}
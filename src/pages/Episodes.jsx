import React, { useState, useEffect, useLayoutEffect } from 'react';
import { fetchEpisodes } from '../api/Episodes';
import { Link } from "react-router-dom";
import Pagination from '../components/Pagination';
import styles from './Episodes.module.css';

export default function Episodes() {
    useLayoutEffect(() => window.scrollTo(0, 0))

    const [episodes, setEpisodes] = useState([])
    const [info, setInfo] = useState({ pages: 1, next: null, prev: null })
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [searchName, setSearchName] = useState('')
    const [searchCode, setSearchCode] = useState('')

    const [appliedFilters, setAppliedFilters] = useState({
        name: '',
        episode: ''
    })

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchEpisodes({ 
                    page,
                    name: appliedFilters.name,
                    episode: appliedFilters.episode
                })
                setEpisodes(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Nenhum episódio encontrado com os filtros aplicados.')
                setEpisodes([])
                setInfo({ pages: 1, next: null, prev: null })
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page, appliedFilters])

    const handleSearch = (e) => {
        e.preventDefault()
        setAppliedFilters({
            name: searchName,
            episode: searchCode
        })
        setPage(1)
    }

    const handleClearFilters = () => {
        setSearchName('')
        setSearchCode('')
        setAppliedFilters({
            name: '',
            episode: ''
        })
        setPage(1)
    }

    const hasActiveFilters = appliedFilters.name || appliedFilters.episode

    return (
        <div className={styles.container}>
            <h1>Página de episódios</h1>

            <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Buscar por nome do episódio..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className={styles.searchInput}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por código (ex: S01E01)..."
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.buttonSection}>
                    <button type="submit" className={styles.applyButton}>
                        🔍 Buscar
                    </button>
                    {hasActiveFilters && (
                        <button 
                            type="button" 
                            onClick={handleClearFilters}
                            className={styles.clearButton}
                        >
                            ✖ Limpar Busca
                        </button>
                    )}
                </div>
            </form>

            {hasActiveFilters && (
                <div className={styles.activeFilters}>
                    <span className={styles.activeFiltersLabel}>Busca ativa:</span>
                    {appliedFilters.name && (
                        <span className={styles.filterTag}>Nome: {appliedFilters.name}</span>
                    )}
                    {appliedFilters.episode && (
                        <span className={styles.filterTag}>Código: {appliedFilters.episode}</span>
                    )}
                </div>
            )}

            {loading && <p className={styles.loading}>Carregando episódios...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && episodes.length === 0 && !error && (
                <p className={styles.noResults}>Nenhum episódio encontrado.</p>
            )}

            <div className={styles.grid}>
                {episodes.map((episode) => (
                    <Link to={`/episodes/${episode.id}`} key={episode.id}>
                        <div className={styles.card}>
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{episode.name}</h2>
                                <p className={styles.cardInfo}>
                                    <strong>Episódio:</strong> {episode.episode}
                                </p>
                                <p className={styles.cardInfo}>
                                    <strong>Data de Lançamento:</strong> {episode.air_date}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {episodes.length > 0 && (
                <Pagination info={info} page={page} setPage={setPage} />
            )}
        </div>
    )
}
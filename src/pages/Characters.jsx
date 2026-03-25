import React, { useState, useEffect, useLayoutEffect } from 'react';
import { fetchCharacters } from '../api/Characters';
import { Link } from "react-router-dom";
import Pagination from '../components/Pagination';
import styles from './Characters.module.css';

export default function Characters() {
    useLayoutEffect(() => window.scrollTo(0, 0))

    const [characters, setCharacters] = useState([])
    const [info, setInfo] = useState({ pages: 1, next: null, prev: null })
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [searchName, setSearchName] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [filterSpecies, setFilterSpecies] = useState('')
    const [filterGender, setFilterGender] = useState('')

    const [appliedFilters, setAppliedFilters] = useState({
        name: '',
        status: '',
        species: '',
        gender: ''
    })

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchCharacters({ 
                    page,
                    name: appliedFilters.name,
                    status: appliedFilters.status,
                    species: appliedFilters.species,
                    gender: appliedFilters.gender
                })
                setCharacters(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Nenhum personagem encontrado com os filtros aplicados.')
                setCharacters([])
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
            status: filterStatus,
            species: filterSpecies,
            gender: filterGender
        })
        setPage(1)
    }

    const handleClearFilters = () => {
        setSearchName('')
        setFilterStatus('')
        setFilterSpecies('')
        setFilterGender('')
        setAppliedFilters({
            name: '',
            status: '',
            species: '',
            gender: ''
        })
        setPage(1)
    }

    const hasActiveFilters = appliedFilters.name || appliedFilters.status || appliedFilters.species || appliedFilters.gender

    return (
        <div className={styles.container}>
            <h1>Página de personagens</h1>

            <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filtersSection}>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todos os Status</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>

                    <select
                        value={filterSpecies}
                        onChange={(e) => setFilterSpecies(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todas as Espécies</option>
                        <option value="Human">Human</option>
                        <option value="Alien">Alien</option>
                        <option value="Humanoid">Humanoid</option>
                        <option value="Robot">Robot</option>
                        <option value="Cronenberg">Cronenberg</option>
                        <option value="Animal">Animal</option>
                    </select>

                    <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todos os Gêneros</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>

                <div className={styles.buttonSection}>
                    <button type="submit" className={styles.applyButton}>
                        🔍 Aplicar Filtros
                    </button>
                    {hasActiveFilters && (
                        <button 
                            type="button" 
                            onClick={handleClearFilters}
                            className={styles.clearButton}
                        >
                            ✖ Limpar Filtros
                        </button>
                    )}
                </div>
            </form>

            {hasActiveFilters && (
                <div className={styles.activeFilters}>
                    <span className={styles.activeFiltersLabel}>Filtros ativos:</span>
                    {appliedFilters.name && (
                        <span className={styles.filterTag}>Nome: {appliedFilters.name}</span>
                    )}
                    {appliedFilters.status && (
                        <span className={styles.filterTag}>Status: {appliedFilters.status}</span>
                    )}
                    {appliedFilters.species && (
                        <span className={styles.filterTag}>Espécie: {appliedFilters.species}</span>
                    )}
                    {appliedFilters.gender && (
                        <span className={styles.filterTag}>Gênero: {appliedFilters.gender}</span>
                    )}
                </div>
            )}

            {loading && <p className={styles.loading}>Carregando personagens...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && characters.length === 0 && !error && (
                <p className={styles.noResults}>Nenhum personagem encontrado.</p>
            )}

            <div className={styles.grid}>
                {characters.map((char) => (
                    <Link to={`/characters/${char.id}`} key={char.id}>
                        <div className={styles.card}>
                            <img src={char.image} alt={char.name} className={styles.cardImage} />
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{char.name}</h2>
                                <p className={styles.cardInfo}>
                                    <strong>Status:</strong> {char.status}
                                </p>
                                <p className={styles.cardInfo}>
                                    <strong>Espécie:</strong> {char.species}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {characters.length > 0 && (
                <Pagination info={info} page={page} setPage={setPage} />
            )}
        </div>
    )
}

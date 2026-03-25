import React, { useState, useEffect, useLayoutEffect } from 'react';
import { fetchLocations } from '../api/Locations';
import { Link } from "react-router-dom";
import Pagination from '../components/Pagination';
import styles from './Locations.module.css';

export default function Locations() {
    useLayoutEffect(() => window.scrollTo(0, 0))

    const [locations, setLocations] = useState([])
    const [info, setInfo] = useState({ pages: 1, next: null, prev: null })
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [searchName, setSearchName] = useState('')
    const [filterType, setFilterType] = useState('')
    const [searchDimension, setSearchDimension] = useState('')

    const [appliedFilters, setAppliedFilters] = useState({
        name: '',
        type: '',
        dimension: ''
    })

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchLocations({ 
                    page,
                    name: appliedFilters.name,
                    type: appliedFilters.type,
                    dimension: appliedFilters.dimension
                })
                setLocations(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Nenhuma localidade encontrada com os filtros aplicados.')
                setLocations([])
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
            type: filterType,
            dimension: searchDimension
        })
        setPage(1)
    }

    const handleClearFilters = () => {
        setSearchName('')
        setFilterType('')
        setSearchDimension('')
        setAppliedFilters({
            name: '',
            type: '',
            dimension: ''
        })
        setPage(1)
    }

    const hasActiveFilters = appliedFilters.name || appliedFilters.type || appliedFilters.dimension

    return (
        <div className={styles.container}>
            <h1>Página de localidades</h1>

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
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Todos os Tipos</option>
                        <option value="Planet">Planet</option>
                        <option value="Space station">Space Station</option>
                        <option value="Microverse">Microverse</option>
                        <option value="TV">TV</option>
                        <option value="Resort">Resort</option>
                        <option value="Fantasy town">Fantasy Town</option>
                        <option value="Dream">Dream</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Buscar por dimensão..."
                        value={searchDimension}
                        onChange={(e) => setSearchDimension(e.target.value)}
                        className={styles.searchInput}
                    />
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
                    {appliedFilters.type && (
                        <span className={styles.filterTag}>Tipo: {appliedFilters.type}</span>
                    )}
                    {appliedFilters.dimension && (
                        <span className={styles.filterTag}>Dimensão: {appliedFilters.dimension}</span>
                    )}
                </div>
            )}

            {loading && <p className={styles.loading}>Carregando localidades...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && locations.length === 0 && !error && (
                <p className={styles.noResults}>Nenhuma localidade encontrada.</p>
            )}

            <div className={styles.grid}>
                {locations.map((location) => (
                    <Link to={`/locations/${location.id}`} key={location.id}>
                        <div className={styles.card}>
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{location.name}</h2>
                                <p className={styles.cardInfo}>
                                    <strong>Tipo:</strong> {location.type}
                                </p>
                                <p className={styles.cardInfo}>
                                    <strong>Dimensão:</strong> {location.dimension}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {locations.length > 0 && (
                <Pagination info={info} page={page} setPage={setPage} />
            )}
        </div>
    )
}
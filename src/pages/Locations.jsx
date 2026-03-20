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

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchLocations({ page })
                setLocations(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Não foi possível carregar as localidades. Tente novamente mais tarde')
                setLocations([])
                setInfo({ pages: 1, next: null, prev: null })
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page])

    return (
        <div className={styles.container}>
            <h1>Página de localidades</h1>

            {loading && <p>Carregando localidades...</p>}
            {error && <p className={styles.error}>{error}</p>}

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

            <Pagination info={info} page={page} setPage={setPage} />
        </div>
    )
}
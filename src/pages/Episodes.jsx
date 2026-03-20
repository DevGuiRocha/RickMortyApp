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

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchEpisodes({ page })
                setEpisodes(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Não foi possível carregar os episódios. Tente novamente mais tarde')
                setEpisodes([])
                setInfo({ pages: 1, next: null, prev: null })
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page])

    return (
        <div className={styles.container}>
            <h1>Página de episódios</h1>

            {loading && <p>Carregando episódios...</p>}
            {error && <p className={styles.error}>{error}</p>}

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

            <Pagination info={info} page={page} setPage={setPage} />
        </div>
    )
}
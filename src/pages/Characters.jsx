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

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const data = await fetchCharacters({ page })
                setCharacters(data.results)
                setInfo(data.info)
                setError(null)
            } catch {
                setError('Não foi possível carregar os personagens. Tente novamente mais tarde')
                setCharacters([])
                setInfo({ pages: 1, next: null, prev: null })
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page])

    return (
        <div className={styles.container}>
            <h1>Página de personagens</h1>

            {loading && <p>Carregando personagens...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.grid}>
                {characters.map((char) => (
                    <Link to={`/characters/${char.id}`}>
                        <div key={char.id} className={styles.card}>
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

            <Pagination info={info} page={page} setPage={setPage} />
        </div>
    )
}

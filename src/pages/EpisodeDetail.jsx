import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchEpisodesById } from "../api/Episodes";
import { fetchCharacterByIds } from "../api/Characters";
import styles from './EpisodeDetail.module.css';

export default function EpisodeDetail() {
    useLayoutEffect(() => window.scrollTo(0, 0), []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchEpisodesById(id);
                setEpisode(data);
                
                const characterIds = data.characters.map((url) => url.split('/').pop());
                const charactersData = await fetchCharacterByIds(characterIds);
                
                setCharacters(Array.isArray(charactersData) ? charactersData : [charactersData]);
                setError(null);
            } catch {
                setError('Não foi possível carregar os detalhes do episódio consultado.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <p className={styles.loading}>Carregando...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (!episode) return null;

    return (
        <div className={styles.container}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ← Voltar
            </button>

            <h1 className={styles.title}>{episode.name}</h1>

            <div className={styles.detail}>
                <div className={styles.info}>
                    <p>
                        <strong>Episódio:</strong> {episode.episode}
                    </p>
                    <p>
                        <strong>Data de Lançamento:</strong> {episode.air_date}
                    </p>
                    <p>
                        <strong>Personagens:</strong> {episode.characters.length}
                    </p>
                </div>
            </div>

            <div className={styles.characters}>
                <h2>Personagens neste episódio</h2>
                <div className={styles.characterGrid}>
                    {characters.map((char) => (
                        <Link 
                            to={`/characters/${char.id}`} 
                            key={char.id}
                            className={styles.characterCard}
                        >
                            <img 
                                src={char.image} 
                                alt={char.name}
                                className={styles.characterImage}
                            />
                            <div className={styles.characterInfo}>
                                <h3 className={styles.characterName}>{char.name}</h3>
                                <p className={styles.characterStatus}>{char.status}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

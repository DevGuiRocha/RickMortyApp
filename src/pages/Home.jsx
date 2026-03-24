import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCharacters } from "../api/Characters";
import { fetchEpisodes } from "../api/Episodes";
import { fetchLocations } from "../api/Locations";
import styles from './Home.module.css';

export default function Home() {
    const [stats, setStats] = useState({
        characters: 0,
        episodes: 0,
        locations: 0
    });
    const [featuredCharacters, setFeaturedCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [charactersData, episodesData, locationsData] = await Promise.all([
                    fetchCharacters({ page: 1 }),
                    fetchEpisodes({ page: 1 }),
                    fetchLocations({ page: 1 })
                ]);

                setStats({
                    characters: charactersData.info.count,
                    episodes: episodesData.info.count,
                    locations: locationsData.info.count
                });

                setFeaturedCharacters(charactersData.results.slice(0, 6));
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Bem-vindo ao <span className={styles.highlight}>Rick & Morty Space</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        Explore o multiverso de Rick and Morty! Descubra personagens icônicos, 
                        episódios épicos e as dimensões mais insanas da série.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link to="/characters" className={styles.ctaPrimary}>
                            Explorar Personagens
                        </Link>
                        <Link to="/episodes" className={styles.ctaSecondary}>
                            Ver Episódios
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.stats}>
                <h2 className={styles.sectionTitle}>Universo em Números</h2>
                {loading ? (
                    <p className={styles.loading}>Carregando estatísticas...</p>
                ) : (
                    <div className={styles.statsGrid}>
                        <Link to="/characters" className={styles.statCard}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statNumber}>{stats.characters}</div>
                            <div className={styles.statLabel}>Personagens</div>
                        </Link>
                        <Link to="/episodes" className={styles.statCard}>
                            <div className={styles.statIcon}>📺</div>
                            <div className={styles.statNumber}>{stats.episodes}</div>
                            <div className={styles.statLabel}>Episódios</div>
                        </Link>
                        <Link to="/locations" className={styles.statCard}>
                            <div className={styles.statIcon}>🌍</div>
                            <div className={styles.statNumber}>{stats.locations}</div>
                            <div className={styles.statLabel}>Localidades</div>
                        </Link>
                    </div>
                )}
            </section>

            {featuredCharacters.length > 0 && (
                <section className={styles.featured}>
                    <h2 className={styles.sectionTitle}>Personagens em Destaque</h2>
                    <div className={styles.featuredGrid}>
                        {featuredCharacters.map((char) => (
                            <Link 
                                to={`/characters/${char.id}`} 
                                key={char.id}
                                className={styles.featuredCard}
                            >
                                <img 
                                    src={char.image} 
                                    alt={char.name}
                                    className={styles.featuredImage}
                                />
                                <div className={styles.featuredInfo}>
                                    <h3 className={styles.featuredName}>{char.name}</h3>
                                    <p className={styles.featuredStatus}>{char.status}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className={styles.viewMore}>
                        <Link to="/characters" className={styles.viewMoreButton}>
                            Ver Todos os Personagens →
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
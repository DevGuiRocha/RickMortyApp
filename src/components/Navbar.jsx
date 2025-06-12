import React from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';
import logoImg from '../assets/RickMortyLogo.png';

export default function Navbar() {
    return(
        <nav className={styles.nav}>
            <div className={styles.brand}>
                <img src={logoImg} alt="Logo" className={styles.logo} />
                <Link to="/" className={styles.title}>Rick & Morty Space</Link>
            </div>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/characters" className={styles.link}>Personagens</Link>
                <Link to="/episodes" className={styles.link}>Episódios</Link>
                <Link to="/locations" className={styles.link}>Localidades</Link>
            </div>
        </nav>
    )
}
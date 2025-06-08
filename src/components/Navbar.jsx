import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <nav>
            <div>
                <span>Rick & Morty Space</span>
            </div>
            <div>
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}
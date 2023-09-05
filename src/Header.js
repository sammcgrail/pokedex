import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src="/ball.png" alt="Pokéball" className="pokeball-icon" />
      </Link>

      <Link to="/">
        <h1>Pokédex</h1>
      </Link>
    </div>
  );
}

export default Header;

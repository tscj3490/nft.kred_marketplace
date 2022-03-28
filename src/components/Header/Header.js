import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item mr-2">
                            <a className="nav-link" href="/">All NFTs</a>
                        </li>
                        <li className="nav-item ml-2">
                            <a className="nav-link" href="/hidden">Hidden NFTs</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
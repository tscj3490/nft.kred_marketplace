import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Slick from '../components/Slick/Slick';
import HiddenCollections from '../components/Explore/Hidden';

export const HiddenCollectionsPage = () => {
    return (
        <div className="main">
            <Header />
            <Slick />
            <HiddenCollections />
        </div>
    );
}
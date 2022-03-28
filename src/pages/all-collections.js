import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Slick from '../components/Slick/Slick';
import AllCollections from '../components/Explore/All';

export const AllCollectionsPage = () => {
    return (
        <div className="main">
            <Header />
            <Slick />
            <AllCollections />
        </div>
    );
}
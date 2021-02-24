import React from 'react'
import Countries from '../components/Countries'
import Loogo from '../components/Logo'
import Navigation from '../components/Navigation'

const Home = () => {
    return (
        <div className="home">
            < Navigation />
            < Loogo />
            < Countries />

        </div>
    )
}

export default Home

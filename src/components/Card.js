import React from 'react';

const Card = (props) => {
    // déstructuring de props
    const { country } = props 

    //fonction -> tout les 3 caractères met un espace vide(regex)
    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    
    return (
        <li className="card">
            <img src={country.flag} alt="drapeau"/>
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li> Pop. {numberFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;
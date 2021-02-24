import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([])   // se trouve toute les pays du monde dans data
    const [sorteData, setSorteData] = useState([]) // permet de trier toute ces donées
    const [playOnce, setPlayOnce] = useState(true) // permet de lancer qu'une fois le then sur l'api
    const [rangeValue, setRangeValue] = useState(40)  // valeur dynamique pour le nombre de paays
    const [selectedRadio, setSelectedRadio] = useState('') // permet de faire les selected via li ranger (filter par rapport au continant)
    const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'] 


    // useEffect pour eviter la boucle infini. On récupere via axios les données de l'api
    useEffect(() => {
        if (playOnce) {
            axios.get("https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag")
            .then((res) => {
                setData(res.data)
                setPlayOnce(false)
            })
        }
        
        //trier les pays par leurs population
        const sortedCountry = () => {
            //transforme notre array data en objet
            const contryObj = Object.keys(data).map ( (i) => data[i])
            //trie la population des pays en décroissant
            const sortedArray = contryObj.sort( (a,b) => {
                return b.population - a.population
            })
            // avec rangeValue, c'est une valeur qui va permettre d'evoluer le nbr de pays dynamique
            sortedArray.length = rangeValue
            setSorteData(sortedArray)
            // console.log(sortedArray);
        }
        sortedCountry()

    }, [data, rangeValue])


    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min={1} max={250} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                <ul>
                    {radios.map( (el) => {
                        return (
                            <li key={el}>
                                <input type='radio' value={el} id={el} checked={el === selectedRadio} onChange={ (e) => setSelectedRadio(e.target.value)}/>
                                <label htmlFor={el}>{el}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={ () => setSelectedRadio("")}>Annuler recherche</h5>}
            </div>
            <ul className="countries-list">
                {sorteData
                .filter( (el) => el.region.includes(selectedRadio))
                .map( (el, i) => (
                    < Card key={i} country={el}/>
                ))}
            </ul>
        </div>
    );
};

export default Countries;
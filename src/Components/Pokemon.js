import './Pokemon.css'
import {useState} from 'react'
import axios from 'axios'
import Child from './Child'
import Header from './Header'

export default function Pokemon() {
    const [name, setname] = useState();
    const [dataset, setdataset] = useState();
    // const [dataset, setdataset] = useState({sprites : {other : {dream_world : { front_default : " "}}, home : {front_default : '', front_shiny : ''}}, front_default : '', back_default : '', front_shiny : '', back_shiny : ''}); // okay listen to me properly, its amazing
    // firstly i was getting error when i was not using all the stuf in dataset usestate // because the dataset was empty and i was using its properties in child.js so it was throwing error
    // so what i did // i made a dummy dataset with empty values and now it is not giving any error, if i click on submit then original dataset will be replaced by my dummy dataset and application will work fine

    // now again listen to me, firstly whatever i told was foolish :)
    // what you have to do is to set dataset empty and make a condition of ?: in return statement like below
    // { dataset && <Child dataset = {dataset}/>} // this means if dataset exists then pass it otherwise pass null

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const submithandler = (e)=>{
        e.preventDefault();
        axios.get(url)
        .then(res=>{
            setdataset(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const reloadclicked = ()=>{
        const random = Math.floor(Math.random() * 750);
        setname(random);
        axios.get(url)
        .then(res=>{
            setdataset(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className='pokemon'>
            <Header/>
            <form onSubmit={submithandler}>
                <i className='fa-solid fa-magnifying-glass'></i>
                <input className='search' type="text" value={name} onChange={e=>setname(e.target.value)} placeholder="Enter Pokemon Name or Id"/>
                <input className='btn' type="submit" value="Search"/>
            </form>
            { dataset && <Child dataset = {dataset}/>}
            <div className='reload'>
                <i className="fa-solid fa-arrow-rotate-right" onClick={reloadclicked}></i>
            </div>
        </div>
    );
}

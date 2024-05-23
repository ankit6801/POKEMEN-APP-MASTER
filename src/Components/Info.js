import React, {useState, useEffect} from 'react'
import './Info.css'
import axios from 'axios'

export default function Info(props) {
  const [moves, setmoves] = useState(props.dataset.moves);
  const [spawnlocation, setspawnlocation] = useState([{location_area : {name : " "}},{location_area : {name : " "}},{location_area : {name : " "}}]);
  // initially it was giving error that cannot access undefined, then i make a dummy dataset in the above array and no error encountered
  const [stats, setstats] = useState(props.dataset.stats);
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.dataset.name}/encounters`)
        .then(res=>{
            setspawnlocation(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    setstats(props.dataset.stats);
    setmoves(props.dataset.moves);
  }, [props.dataset.name])     // write here as well so that when i change the value of name then the value of moves and stats will also get updated

  return (
    <div className='info'>
        <div onClick={()=>{props.closemodel(false)}} className="infobtn"><i class="fa-solid fa-xmark"></i></div>
        
        <div className="main">
{/* _______________________________________________ left side i.e image__________________________________________________________________________________________________________ */}
          <div className="infoimage">
            <div className="number">
              {props.dataset.id<=99 ? <span>#0</span> :<span>#</span>}{props.dataset.id}
            </div>
            <div className="image"><img src={props.dataset.sprites.other.dream_world.front_default} alt="photoshoot is still pending"/></div>
            <div className="name">{props.dataset.name.charAt(0).toUpperCase() + props.dataset.name.slice(1)}</div>
          </div>
{/* _______________________________________________ right side containing bio, training, stats__________________________________________________________________________________________________________ */}
          <div className="inforight">
            {/* ______________________________ bio _______________________________ */}

            <div className="infobio">
              <span className='infospan'>Bio</span>
              <p className='biospan'>Lorem ipsum dolor sit amet consecteus quisquam consectetur non quis aperiam a eum, omnis autem provident repellendus? Dolor iure debitis sint magnam aspernatur. Facilis a eligendi!</p>
              <div className="basicinfo">
                <div className="genus b">
                 <span className='smallspans'>Genus :</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  {props.dataset.types[0].type.name.charAt(0).toUpperCase() + props.dataset.types[0].type.name.slice(1)}
                </div>
                <div className="height b">
                 <span className='smallspans'>Height : </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  {props.dataset.height}m
                </div>
                <div className="weight b">
                 <span className='smallspans'>Weight :</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  {props.dataset.weight}Kg
                </div>
                <div className="ability b">
                 <span className='smallspans'>Abilities : </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  {props.dataset.abilities[0].ability.name.charAt(0).toUpperCase() + props.dataset.abilities[0].ability.name.slice(1)}
                </div>
              </div>
            </div>

            {/* ______________________________ training _______________________________ */}

            <div className="infotraining">
              <span className='trainingspan'>Training</span> <br />
              <div className="exp trainingparts">
                <span className=''>Base-exp :</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                {props.dataset.base_experience}
              </div>
              <div className="moves trainingparts">
                <span className=''>Moves :</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                {
                  moves.slice(0, 2).map(a=>{
                    return (<>{a.move.name.charAt(0).toUpperCase() + a.move.name.slice(1)} <br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</>)
                  })
                }
              </div>
              <div className="location trainingparts">
                      <span className=''>Location :</span>
                      {
                        spawnlocation.slice(0,1).map(a=>{
                          return <p key={a.location_area.name}>{a.location_area.name.charAt(0).toUpperCase() + a.location_area.name.slice(1)}</p>// i got stuck here for long. I want to print only 2 lacations and without map method it was giving error, so solution is to use slice in array to limit it to 2 and then run map method
                        })
                      }
              </div>
            </div>

            {/* ______________________________ stats _______________________________ */}

            <div className="infostats">
              <span className='statsspan'>Stats</span>
              <div className="allstats">
                <div className="instat">
                  <div className="namestat">HP</div>
                  <div className="base_stat">{stats[0].base_stat}</div>
                </div>
                <div className="instat">
                  <div className="namestat">Atk</div>
                  <div className="base_stat">{stats[1].base_stat}</div>
                </div>
                <div className="instat">
                  <div className="namestat">Def</div>
                  <div className="base_stat">{stats[2].base_stat}</div>
                </div>
                <div className="instat invisible">
                  <div className="namestat">Sp.Atk</div>
                  <div className="base_stat">{stats[3].base_stat}</div>
                </div>
                <div className="instat invisible">
                  <div className="namestat">Sp.Def</div>
                  <div className="base_stat">{stats[4].base_stat}</div>
                </div>
                <div className="instat invisible">
                  <div className="namestat">Speed</div>
                  <div className="base_stat">{stats[5].base_stat}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}


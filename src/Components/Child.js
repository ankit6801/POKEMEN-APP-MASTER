import React, {useState} from 'react'
import './Child.css'
import Info from './Info';

export default function Child(props) {
  const [ibutton, setibutton] = useState(false);

  return (
    <div className='child'>
      <div className="number">
        {props.dataset.id<=99 ? <span>#0</span> :<span>#</span>}{props.dataset.id}
        <span  onClick={()=>{setibutton(true)}} className='moreinfo'>
          <i>i</i>
        </span>
      </div>
      <div className="image"><img src={props.dataset.sprites.other.dream_world.front_default} alt="photoshoot is still pending"/></div>
      <div className="name">{props.dataset.name.charAt(0).toUpperCase() + props.dataset.name.slice(1)}</div>
      {/* the below is the model for card in react, it will be a popup, i am using and operator asternearh operator so that if the variable ibutton is true only then the info.js will be displayed and in info.js i set a close button and onclick of thar button i set ibutton as false, passed via props */}
      { ibutton && <Info closemodel={setibutton} dataset = {props.dataset}/>}
    </div>
  )
}



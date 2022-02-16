import React from 'react';
import './Hatinfo.css'
import { ReactComponent as Hanger } from '../img/옷걸이.svg'


export default function Hatinfo() {
  function getColor(color) {
    switch (color) {
      case 'RED':
        return '../img/모자2.png'
      case 'GREEN':
        return '../img/모자3.png'
      case 'BLUE':
        return '../img/모자4.png'
      case 'WHITE':
        return '../img/모자5.png'
      case 'BLACK':
        return '../img/모자0.png'
      case 'YELLOW':
        return '../img/모자1.png'
      default:
        return false
    }
  }
  return (
    <div className="hat-info">
      <Hanger className='hanger-image' width='70%'></Hanger>
      <div className='hat-box'>
        {getColor() ? <img className='hat' src={require(getColor())} alt='모자'/> : null}
      </div>
    </div>
  );

};

import React from 'react';
import './Hatinfo.css'
import { ReactComponent as Hanger } from '../img/옷걸이.svg'


export default function Hatinfo(props) {

  return (
    <div className="hat-info">
      <Hanger className='hanger-image' width='70%'></Hanger>
      {props !== "NORMAL" ? <div className='hat-box'><img className='hat' src={require('./img/' + props + '.png')} alt='모자'/></div> : null}
      <div className='info-box'>
        
      </div>
    </div>
  );

};

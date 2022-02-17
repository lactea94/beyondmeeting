import React from 'react';
import './Hatinfo.css'
import { ReactComponent as Hanger } from '../img/옷걸이.svg'


export default function Hatinfo(props) {
  // const [img, setImg] = useState('')

  // useEffect(() => {
  //   switch (props) {
  //     case 'RED':
  //       setImg('./img/모자2.png')
  //       break; 
  //     case 'GREEN':
  //       setImg('./img/모자3.png')
  //       break; 
  //     case 'BLUE':
  //       setImg('./img/모자4.png')
  //       break; 
  //     case 'WHITE':
  //       setImg('./img/모자5.png')
  //       break;
  //     case 'BLACK':
  //       setImg('./img/모자0.png')
  //       break;
  //     case 'YELLOW':
  //       setImg('./img/모자1.png')
  //       break;
  //     default:
  //       setImg(false)
  //       break;
  //   }
  // }, [])
  
  return (
    <div className="hat-info">
      <Hanger className='hanger-image' width='70%'></Hanger>
      {props !== "NORMAL" ? <div className='hat-box'><img className='hat' src={require('./img/' + props + '.png')} alt='모자'/></div> : null}
      <div className='info-box'>
        
      </div>
    </div>
  );

};

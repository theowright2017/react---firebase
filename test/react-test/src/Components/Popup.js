import React from 'react';
import Popup from "reactjs-popup";




const PopupExample = (props) => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
    <button onClick={props.closeModal1}> close </button>
  </Popup>
);



export default PopupExample

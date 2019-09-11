import React from 'react';



const accountComponent = (props) => {
  const style = {
    display: 'block',
  padding: '20px',
  margin: '30px 16px',
  border: '1px solid black',
  textAlign: 'center',
  listStyleType: 'none',
  boxShadow: '0 10px 8px #ccc',
  backgroundColor: '#FFEFD5'
};

  return (
    <div style={style} onClick={props.clicked}>
      <li key={props.eachObject.id}> <b>{props.eachObject.id}</b> --- {props.eachObject.name}
        --- {props.eachObject.title}</li>
    </div>
  )
}

export default accountComponent;

  // <li key={each.id}>{each.id} --- {each.name} --- {each.title}</li>

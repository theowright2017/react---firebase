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

  const size = {
    width: "4em"
  }

  return (
    <div style={style} >
      <li key={props.eachObject.id}> <b>{props.eachObject.id}</b> --- {props.eachObject.name}
        --- {props.eachObject.title} ---
      <form>
      <input style={size} type="number"
        min="1" max="5" name="rating"
        onChange={(event) => props.changeRating(event.target.value)}
        />


      <button onClick="this.form.reset()"  onClick={props.addRating}  > Add Rating </button>
      </form>

    </li>
    </div>
  )
}

export default accountComponent;

  // <li key={each.id}>{each.id} --- {each.name} --- {each.title}</li>

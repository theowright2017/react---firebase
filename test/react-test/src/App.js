import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase/app';
import Firebase from './firebase/firebase.js';
import 'firebase/database';







class App extends Component {

  state = {
    item: "",
    films: []
  }

  writeToDatabase = (title) => {
    const newData = firebase.database().ref('ratings').push();
    newData.set({
      title: "this one",
      rating: 5
    },  function(error) {
      if (error) {
        console.log("Didn't Save");
      } else {
        console.log("Data Saved!");
      }
    });
  }
  //
  // readFromDatabase = () => {
  //   ref.once('value', (function(snapshot) {
  //     let childKey = childSnapshot.key;
  //     let childData = childSnapshot.val();
  //   }));
  // };



  componentDidMount = () => {
    this.writeToDatabase();


    const filmRef = firebase.database().ref('films');
    filmRef.on('value', (snapshot) => {
      let films = snapshot.val();
      let newState = [];
      for (let film in films) {
        newState.push({
          title: film
        });
      }
      this.setState({
        films: newState
      });
    });

  }

  render() {


    const firebase = require('firebase')
    // require('firebase/firestore')
    require('firebase/database')

    const db = firebase.database();


    // import CORS
    // const cors = require('cors')({origin: true});









  return (
    <div className="App">


        <p>hello</p>

        <p>{this.state.item}</p>


        <p>Films</p>
        {this.state.films.map((film) => {
          return (
            <h3>{film.film}</h3>
          )
        })}















        <script>
                  firebase.initializeApp(firebaseConfig);
                  <script defer src="https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js">
                  </script>
                  <script defer src="https://www.gstatic.com/firebasejs/6.6.0/firebase-auth.js">
                  </script>
                  <script defer src="https://www.gstatic.com/firebasejs/6.6.0/firebase-firestore.js">
                  </script>
                  </script>
                  <script src="https://www.gstatic.com/firebasejs/      ${JSCORE_VERSION}/firebase.js">
                  </script>
                  <script>
                    firebase.initializeApp(firebaseConfig);
        </script>

    </div>
  );
}
}

export default App;

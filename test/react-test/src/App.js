/* eslint no-undef: 0 */ // --> OFF

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase/app';
import Firebase from './firebase/firebase.js';
import 'firebase/database';
import AccountComponent from './Accounts/AccountComponent'





class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ratings: [],
                   accounts: [],
                   users: [],
                   fullObject: []

    };

  }


  componentDidMount() {
    //Create reference to collections in Firebase Database
    let ratingsRef = firebase.database().ref('ratings');
    let accountsRef = firebase.database().ref('accounts');
    let usersRef = firebase.database().ref('users');

    //for each element of collection, update when a new element is found, provide a snapshot of each, and perform action on each element


    ratingsRef.on('child_added', snapshot => {
      // Update React state when element is added to Firebase Database

      let rating = {
        rating: snapshot.val(),
        id: snapshot.key
      };
      this.setState({
        ratings: [rating].concat(this.state.ratings) });
      })




    usersRef.on('child_added', snapshot => {
      // console.log(snapshot.val());
      let user = {
        id: snapshot.key,
        name: snapshot.val().name,
        account: snapshot.val().account,

      };
      this.setState({
        users: [user].concat(this.state.users) });
      })



    accountsRef.on('child_added', snapshot => {
      // obj gives lower case title object, containing the title
      // title takes the first value of that object
      let obj = snapshot.val().apps
      let title = Object.values(obj)[0]
      let rating = snapshot.val().apps.rating
      let account = {
        id: snapshot.key,
        apps: obj,
        title: title,
        rating: rating
      };

      this.setState({
        accounts: [account].concat(this.state.accounts)
      });


    // this.renderUserAccount()
    this.resolveAsync()

})}






  addRating(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    firebase.database().ref('ratings').push(
      'TITLE: ' + this.titleInput.value +
      ' RATING: ' + this.scoreInput.value);

    this.titleInput.value = ''; // <- clear the input
    this.scoreInput.value = '';
  }



  // async renderUserAccount() {
  //
  //   let result = await this.resolveAsync();
  //   // console.log(result);
  // }



  resolveAsync() {
    // wait for pull from database for ? seconds
    return new Promise(resolve => {
      setTimeout(() => {

          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////
          // merge correct account title with its relevant user
          let objectArray = []
          let object = {}
          // use nested for loop to check every instance of accounts against each individual instance of users.  if any account id matches that user id, assign that account title to object.title and push to array
          for ( let i = 0; i < this.state.users.length; i++) {
            for ( let c = 0; c < this.state.users.length; c++) {
              object = {
                id: this.state.users[i].account,
                name: this.state.users[i].name,
                title: ""
              }

              if ( this.state.users[i].account === this.state.accounts[c].id){
                // console.log(this.state.users[i].account + this.state.accounts[c].id + "yes");
                object.title = this.state.accounts[c].title.title
              }

              if (object.title !== ""){
                objectArray.push(object)

              }

            }



          }

          this.setState( {
            fullObject: objectArray
          })

          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////


        }, 1)

      })

  }

  handleAddRating(index) {
    console.log("clicked " + index);
    let rating = window.prompt("Enter your rating")
    console.log(index + " " + rating);
    console.log(this.state.fullObject[index].title);
  }


  render() {

    const accountList = this.state.fullObject.map( (each, index) => {
      return <AccountComponent
              eachObject={each}
              key={index}
              clicked={() =>
                this.handleAddRating(index)}
              />
    });



    return (
      <div>
        <form onSubmit={this.addRating.bind(this)}>
          <input type="text"
                 ref={ el => this.titleInput = el }
                 placeholder="title"/>

          <input type="text"
                 ref={ element => this.scoreInput = element }
                 placeholder="rating"/>

          <input type="submit"/>

        </form>

        {accountList}






      </div>
    )

  }
}


export default App;
//
// <ul>
//   {
//     this.state.fullObject.map( each =>
//     <li key={each.id}>{each.id} --- {each.name} --- {each.title}</li>)
//   }
//
// </ul>

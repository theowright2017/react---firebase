/* eslint no-undef: 0 */ // --> OFF

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase/app';
import Firebase from './firebase/firebase.js';
import 'firebase/database';
import AccountComponent from './Components/AccountComponent';
import Popup from './Components/Popup';






class App extends Component {
  constructor(props) {
    super(props);
    this.state = { accounts: [],
                   users: [],
                   fullObject: [],
                   loaded: false,
                   showModal: false

    };

  }


  componentDidMount() {
    //Create reference to collections in Firebase Database
    let ratingsRef = firebase.database().ref('ratings');
    let accountsRef = firebase.database().ref('accounts');
    let usersRef = firebase.database().ref('users');

    //for each element of collection, update when a new element is found, provide a snapshot of each, and perform action on each element


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
      let rating = Object.values(obj)[1]
      let account = {
        id: snapshot.key,
        apps: obj,
        title: title,
        rating: rating
      };


      this.setState({
        accounts: [account].concat(this.state.accounts)
      });
      console.log(this.state.accounts);


      this.setState({
        loaded: true
      })
    // this.renderUserAccount()
    this.mergeAccountAndUser()

})}


  // async renderUserAccount() {
  //
  //   let result = await this.resolveAsync();
  //   // console.log(result);
  // }



  mergeAccountAndUser() {
    // wait for pull from database for ? seconds
    return new Promise(resolve => {
      setTimeout(() => {

          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////
          // merge correct account title with its relevant user
          let objectArray = []
          let object = {}
          let userArray = this.state.users
          let accountArray = this.state.accounts

          // let userObject = {...userArray}
          // let accountObject = {...accountArray}

          // use nested for loop to check every instance of accounts against each individual instance of users.  if any account id matches that user id, assign that account title to object.title and push to array
          for ( let i = 0, j = userArray.length; i < j; i++) {
            for ( let c = 0, d = accountArray.length; c < d; c++) {
              object = {
                id: userArray[i].account,
                name: userArray[i].name,
                title: "",
                rating: ""
              }

              if ( userArray[i].account === accountArray[c].id) {
                // console.log(this.state.users[i].account + this.state.accounts[c].id + "yes");
                object.title = accountArray[c].title.title

              }

              if (object.title !== ""){
                objectArray.push(object)

              }

            }

          }

          this.setState( {
            fullObject: objectArray
          })
          // console.log(this.state.accounts);
          // console.log(this.state.users);

          console.log(this.state.fullObject);
          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////
          ////////////////////////////////////////////////////


        }, 1)

      })

  }

  handleAddRating(index, e) {
    e.preventDefault();

    let rating = window.prompt("Enter your rating")
    this.handleShowModal()



      firebase.database().ref('accounts')
      .child(this.state.fullObject[index].id)
      .child('apps')
      .child('zz_rating')
      .update(
          {'rating': rating});


}

  handleShowModal() {
    this.setState( { showModal: !this.state.showModal } )
  }
  handleCloseModal(e) {
    this.setState( { showModal: !this.state.showModal } )
    console.log(this.state.showModal);
  }



  render() {

    const accountList = this.state.fullObject.map( (each, index) => {
      return <AccountComponent
              eachObject={each}
              key={index}
              openModal={(e) =>
                this.handleAddRating(index, e)}
              closeModal={(e) =>
                this.handleCloseModal(e)}
              />
    });

    // const Modal = () => {
    //   return <Popup
    //           closeModal1={(e) =>
    //           this.handleCloseModal(e)}
    //           >
    //           <span> content</span>
    //         </Popup>
    // }




    if (this.state.loaded === true) {
      return (
        <div>

          {accountList}



        </div>
      )
    } else {

      return (

        <h3 className="loading"> Loading......</h3>

      )
    }

  }
}


export default App;

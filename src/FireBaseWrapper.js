import firebase from 'firebase';
import PropTypes from 'prop-types';

let keys = [];

export default class FireBaseWrapper {


    constructor( props ) {

        this.state = {
            fireBaseAuth: false,
            uid: '',
            userName:'',
        };

        const config = {
            apiKey: "AIzaSyAGrGOH-af69MhOq-MqTGyCB6p1hU-SRtc",
            authDomain: "tania-rest-api.firebaseapp.com",
            databaseURL: "https://tania-rest-api.firebaseio.com",
            projectId: "tania-rest-api",
            storageBucket: "tania-rest-api.appspot.com",
            messagingSenderId: "354174890528"
        };

        firebase.initializeApp(config);

        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            /*    let errorCode = error.code;
             let errorMessage = error.message;*/
            console.log(error);
        });

        let _this = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.state.fireBaseAuth = true;
                _this.state.uid = user.uid;
            } else {
                // User is signed out.
                _this.state.fireBaseAuth = false;
                _this.state.uid = '';
            }
        });

    }

    setUserName(userName){
        this.state.userName = userName;
        let recentHistoryRef = firebase.database().ref('users/' + this.state.userName);

        console.log( this.state.userName );
        recentHistoryRef.limitToFirst(100).on("value", function( snap ){
            keys = Object.keys(snap.val());
        });
    }

    clearUserName(){
        this.state.userName = '';
    }

    getFireBaseData(parent){
        let recentHistoryRef = firebase.database().ref('users/' + this.state.userName);
        let history = [];

        recentHistoryRef.once("value")
            .then(function(snapshot){
                console.log( snapshot.numChildren() );
                snapshot.forEach(function(childSnapshot){
                    let childData = childSnapshot.val();
                    history.push(childData.value);
                });
                parent.setState({
                    navigationHistory: history,
                })
            });
    }

    pushFireBaseData(componentState){
        let date = new Date();
        let dateJSON = date.toJSON();

        let recentHistoryRef = firebase.database().ref('users/' + this.state.userName);

        recentHistoryRef.once("value")
            .then(function(snapshot){
                if ( snapshot.numChildren() > 10 ){
                    recentHistoryRef.child( keys.shift() ).remove();
                }
            });

        let keyRef = recentHistoryRef.push({
            value : {
                componentState : componentState,
                date: dateJSON
            }
            }, function(err){
                if (err){
                    console.log(err);
                }
            }
        ).key;

        console.log(keyRef);
        keys.push(keyRef);

    }

    postFireBaseData(componentState){
        let date = new Date();

        let dateJSON = date.toJSON();

        firebase.database().ref('users/' + this.state.userName).set({
            value: {
                componentState : componentState,
                date: dateJSON
            }
        }, function(err){
            if (err){
                console.log(err);
            }
        });
    }
}

FireBaseWrapper.propTypes = {
    userName: PropTypes.string.isRequired,
};
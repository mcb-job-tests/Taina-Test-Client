import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import './App.css';
/*import axios from 'axios';*/
import firebase from './FireBaseWrapper';
import Page from './Page';
import LoginPage from './LoginPage';

import ControlPanel from './ControlPanel';

import {cyan500, orange500, purple500} from 'material-ui/styles/colors';

injectTapEventPlugin();


export default class App extends Component {

    constructor( props ) {
        super(props);

        this.state = {
            userName : '',
            pageNumber : 0,
            fireBase : new firebase(),
            navigationHistory: [],
        };
    }

    componentDidMount(){
        let isUserLogged = sessionStorage.getItem("isUserLogged");
        console.log(isUserLogged);
        if (isUserLogged === "true"){
            let userName = sessionStorage.getItem("userName");
            let pageNumber = sessionStorage.getItem("pageNumber");
            this.state.fireBase.setUserName(userName);
            console.log(pageNumber);
            console.log(userName);
            this.setState({
                userName: userName,
                pageNumber: parseInt(pageNumber, 10),
            })
        }
    }

    handleNavStateChange(pageIncrement){
        console.log("handleNavStateChange: " + pageIncrement);

        if ( pageIncrement === -1 ){
            if (this.state.pageNumber > 1) {
                this.setState({
                    pageNumber: this.state.pageNumber - 1
                }, function(){
                    sessionStorage.setItem("pageNumber", this.state.pageNumber);
                });
            }
        } else if ( pageIncrement === 1 ){
            if (this.state.pageNumber < 7 ) {
                this.setState({
                    pageNumber: this.state.pageNumber + 1
                }, function(){
                    sessionStorage.setItem("pageNumber", this.state.pageNumber);
                });
            }
        }
    }

    handleUpdatePageNumber( pageSelected ){
        sessionStorage.setItem("pageNumber", pageSelected);
        this.setState({
            pageNumber: pageSelected
        });
    }

    updateNavHistory( componentState ){
        this.state.fireBase.pushFireBaseData( componentState );
    }

    handleNavHistoryView(){
        this.state.fireBase.getFireBaseData(this);
    }

    handleLogin(userName){
        sessionStorage.setItem("isUserLogged", true);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("pageNumber", 1);
        this.state.fireBase.setUserName(userName);

        this.setState({
            userName: userName,
            pageNumber: 1,

        });

        console.log(sessionStorage.getItem("userName"));
    }

    handleLogout(e){
        e.preventDefault();
        sessionStorage.setItem("isUserLogged", false);
        sessionStorage.removeItem("pageNumber");
        sessionStorage.removeItem("userName");
        this.setState({
            userName: '',
            pageNumber: 0,
        });
        this.state.fireBase.clearUserName();
    }


    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <ControlPanel
                        disabled={ this.state.userName === '' }
                        pageNumber={ this.state.pageNumber }
                        navigationHistory={ this.state.navigationHistory }
                        handleUpdatePageNumber={ this.handleUpdatePageNumber.bind( this ) }
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                        handleNavHistoryView={ this.handleNavHistoryView.bind( this ) }
                        handleLogout={ this.handleLogout.bind( this ) }
                        handleNavStateChange={ this.handleNavStateChange.bind( this ) }
                    />
                    <p
                        style={{ color : cyan500 }}
                    > { this.state.userName !== '' ? 'Welcome ' + this.state.userName : '' } </p>
                </div>
                {
                this.state.pageNumber === 0 ?
                    <LoginPage
                        handleLoginButton={ this.handleLogin.bind( this ) }
                    />
                : this.state.pageNumber === 1 ?
                    <Page
                        id={ 1 }
                        title={"Page One"}
                        color={"Red"}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 2 ?
                    <Page
                        id={ 2 }
                        title={"Page Two"}
                        color={orange500}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 3 ?
                    <Page
                        id={ 3 }
                        title={"Page Three"}
                        color={"Yellow"}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 4 ?
                    <Page
                        id={ 4 }
                        title={"Page Four"}
                        color={"Green"}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 5 ?
                    <Page
                        id={ 5 }
                        title={"Page Five"}
                        color={cyan500}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 6 ?
                    <Page
                        id={ 6 }
                        title={"Page Six"}
                        color={"Blue"}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : this.state.pageNumber === 7 ?
                    <Page
                        id={ 7 }
                        title={"Page Seven"}
                        color={purple500}
                        handleUpdateNavHistory={ this.updateNavHistory.bind( this ) }
                    />
                : ''
            }
            </div>
        );
    }
}

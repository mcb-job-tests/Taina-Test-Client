import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
        }

    }

    componentWillReceiveProps( nextProps ) {
    }

    handleLoginButton(){
        this.props.handleLoginButton( this.state.userName );
    }

    handleChange( event ){
        this.setState({
            userName: event.target.value,
        });
    };

    render(){

        const style = {
            margin: 6,
        };

        return(
            <div className="Page background-image"
                 style={{
                     minHeight:"500px",
                     height: "100vh",
                     width: "100vw",
                     backgroundColor: 'MidnightBlue',
                 }}>
                <div className="center-div">
                    <div style={style}>
                        <TextField
                            className="text-input-field"
                            underlineStyle={{
                                maxWidth:"90%",
                                textAlign: "center"
                            }}
                            floatingLabelText="Enter User Name"
                            id="text-field-controlled"
                            value={this.state.userName}
                            onChange={ this.handleChange.bind( this ) }
                        />
                    </div>
                    <RaisedButton
                        label="Login"
                        primary={true}
                        style={style}
                        onTouchTap={ this.handleLoginButton.bind( this ) }
                        disabled={ this.state.userName === '' }
                    />
                </div>
            </div>
        )
    }
}

LoginPage.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

LoginPage.propTypes = {
    handleLoginButton: PropTypes.func.isRequired,
};
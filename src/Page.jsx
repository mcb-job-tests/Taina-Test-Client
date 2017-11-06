import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import {cyan500} from 'material-ui/styles/colors';*/

export default class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            title: this.props.title,
            color: this.props.color,
        };

    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps);
        console.log(this.state.id);
        if (nextProps.id === this.state.id){
            return false;
        } else {
            return true;
        }
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            id: nextProps.id,
        });
        this.setState({
            color: nextProps.color,
        });
        this.setState({
            title: nextProps.title,
        });
    }

    render(){

        this.props.handleUpdateNavHistory(this.state);

        return(
            <div className="Page"
                 style={{
                     minHeight:"500px",
                     height: "100vh",
                     width: "100vw",
                     backgroundColor: this.state.color,
                 }}>
                <div className="center-div">
                    <h1>
                        { this.state.title }
                    </h1>
                </div>
            </div>
        )
    }
}

Page.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

Page.propTypes = {
    id : PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    handleUpdateNavHistory: PropTypes.func.isRequired,
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class NavButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled
        }
    }


    componentWillReceiveProps( nextProps ) {
        this.setState({
            disabled: nextProps.disabled,
        });
    }

    handlePreviousPageButton(){
        this.props.handleUpdateNavState(-1);
    }

    handleNextPageButton(){
        this.props.handleUpdateNavState(1);
    }

    render(){
        const style = {
            margin: 6,
        };
        return(
            <div>
                <RaisedButton
                    label="Previous"
                    primary={true}
                    style={style}
                    onTouchTap={ this.handlePreviousPageButton.bind( this ) }
                    disabled={ this.state.disabled }
                />
                <RaisedButton
                    label="Next"
                    primary={true}
                    style={style}
                    onTouchTap={ this.handleNextPageButton.bind( this ) }
                    disabled={ this.state.disabled }
                />
            </div>
        );
    };
}

NavButtons.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

NavButtons.propTypes = {
    /*pageNumber: PropTypes.number.isRequired,*/
    handleUpdateNavState: PropTypes.func.isRequired,
    handleViewNavHistory: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};
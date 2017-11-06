import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';

export default class NavigationEvents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navEvents: this.props.navEvents
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            navEvents: nextProps.navEvents,
        });
    }

    renderNavigationEvents(navEvents){
        console.log(navEvents);
        const style = {
            textIndent: "20px"
        }

        return navEvents.map((event, i) => (
            <Paper
                key={ i }
            >
                <p> DATE: { new Date(event.date).toUTCString() }</p>
                <p style={style}> ID: { event.componentState.id }</p>
                <p style={style}> TITLE: { event.componentState.title }</p>
                <p style={style}> COLOR: { event.componentState.color }</p>
            </Paper>
        ));
    }

    render (){
        return(
            <div>
                <List>
                    { this.renderNavigationEvents( this.state.navEvents ) }
                </List>
            </div>
        );
    }
}

NavigationEvents.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

NavigationEvents.propTypes = {
    navEvents: PropTypes.array.isRequired,
};
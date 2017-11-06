import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationEvents from './NavigationEvents';
import List from 'material-ui/List';

export default class HistoryDialog extends Component {

    constructor( props ){
        super( props );
        this.state = {
            pageMeta:{
                id : 8,
                title: "History Dialog",
                color: null
            },
            open: false,
            disabled: this.props.disabled,
            navigationHistory: this.props.navigationHistory,
        }
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            disabled: nextProps.disabled,
        });
        this.setState({
            navigationHistory: nextProps.navigationHistory,
        })
    }

    handleClose(){
        this.setState({
            open: false,
        });
    };

    handleOpen(e){
        e.preventDefault();
        this.props.handleUpdateNavHistory(this.state.pageMeta);
        this.props.handleNavHistoryView();
        this.setState({
            open: true,
        });

    }

    render() {
        const style = {
            margin: 6,
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />
        ];

        return(
            <div>
                <RaisedButton
                    label="History"
                    secondary={true}
                    style={style}
                    onTouchTap={ this.handleOpen.bind(this) }
                    disabled={ this.state.disabled }
                />
                <Dialog
                    title="User Navigation History"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={ this.handleClose.bind( this ) }
                    autoScrollBodyContent={true}
                >
                    <NavigationEvents
                        navEvents={ this.state.navigationHistory  }
                    />
                </Dialog>
            </div>
        );
    };

}

HistoryDialog.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

HistoryDialog.propTypes = {
    disabled: PropTypes.bool.isRequired,
    navigationHistory: PropTypes.array.isRequired,
    handleNavHistoryView: PropTypes.func.isRequired,
    handleUpdateNavHistory: PropTypes.func.isRequired
};
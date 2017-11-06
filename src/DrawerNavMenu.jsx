import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


export default class DrawerNavMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pageNumber: this.props.pageNumber,
            disabled: this.props.disabled,
        };
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            id: nextProps.id,
        });

        this.setState({
            title: nextProps.title,
        });

        this.setState({
            pageNumber: nextProps.pageNumber,
        });

        this.setState({
            disabled: nextProps.disabled,
        });
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleRequestChange(event, value){
        event.preventDefault();
        this.setState({
            open: false,
        });
        this.props.handleUpdatePageNumber(value);
    }


    render() {
        const style = {
            margin: 6
        };

        return (
            <div>
                <RaisedButton
                    label="Nav Menu"
                    onTouchTap={ this.handleToggle }
                    disabled={ this.state.disabled }
                    secondary={true}
                    style={ style }
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <div>
                        <Menu
                            value={ this.state.pageNumber }
                            onChange={ this.handleRequestChange.bind( this ) }
                        >
                            <MenuItem
                                style={ style }
                                value={ 1 }
                                primaryText="Page One"
                            />
                            <MenuItem
                                style={ style }
                                value={ 2 }
                                primaryText="Page Two"
                            />
                            <MenuItem
                                style={ style }
                                value={ 3 }
                                primaryText="Page Three"
                            />
                            <MenuItem
                                style={ style }
                                value={ 4 }
                                primaryText="Page Four"
                            />
                            <MenuItem
                                style={ style }
                                value={ 5 }
                                primaryText="Page Five"
                            />
                            <MenuItem
                                style={ style }
                                value={ 6 }
                                primaryText="Page Six"
                            />
                            <MenuItem
                                style={ style }
                                value={ 7 }
                                primaryText="Page Seven"
                            />
                        </Menu>
                    </div>
                </Drawer>
            </div>
        );
    }
}

DrawerNavMenu.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

DrawerNavMenu.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    handleUpdatePageNumber: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import NavButtons from './NavButtons';
import DrawerNavMenu from "./DrawerNavMenu";
import HistoryDialog from "./HistoryDialog";

export default class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: this.props.disabled,
            pageNumber: this.props.pageNumber,
            navigationHistory: this.props.navigationHistory,
        }

    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            disabled: nextProps.disabled,
        });
        this.setState({
            pageNumber: nextProps.pageNumber,
        });
        this.setState({
            navigationHistory: nextProps.navigationHistory,
        })
    }

    render() {
        const style = {
            margin: 6,
        };

        return (
            <div>
                <div className="flex-container">
                    <DrawerNavMenu
                        handleUpdatePageNumber={ this.props.handleUpdatePageNumber }
                        pageNumber={ this.state.pageNumber }
                        disabled={ this.state.disabled }
                    />
                    <HistoryDialog
                        disabled={ this.state.disabled }
                        navigationHistory={ this.state.navigationHistory }
                        handleNavHistoryView={ this.props.handleNavHistoryView }
                        handleUpdateNavHistory={ this.props.handleUpdateNavHistory }
                    />
                    <RaisedButton
                        label="Log out"
                        secondary={true}
                        style={style}
                        onTouchTap={ this.props.handleLogout }
                        disabled={ this.state.disabled }
                    />
                </div>
                <NavButtons
                    handleUpdateNavState={ this.props.handleNavStateChange }
                    handleViewNavHistory={ this.props.handleNavHistoryView }
                    disabled={ this.state.disabled }
                />
            </div>
        );
    }
}

ControlPanel.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

ControlPanel.propTypes = {
    disabled: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    navigationHistory: PropTypes.array.isRequired,
    handleUpdatePageNumber: PropTypes.func.isRequired,
    handleUpdateNavHistory: PropTypes.func.isRequired,
    handleNavHistoryView: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleNavStateChange: PropTypes.func.isRequired,
};
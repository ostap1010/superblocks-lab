import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

import { IconUp, IconDown, IconTrash } from '../../icons';

export default class ItemContract extends Component {
    state = {
        showActions: false,
    };

    showActions = () => {
        this.setState({
            showActions: true,
        });
    };

    hideActions = () => {
        this.setState({
            showActions: false,
        });
    };

    render() {
        var { item } = this.props;

        var projectItem = item.props._project;
        var contractIndex = item.props._index;
        return (
            <div
                className={style.projectContractsTitleContainer}
                onClick={e => this.props.openItem(e, item)}
                onMouseEnter={this.showActions}
                onMouseLeave={this.hideActions}
            >
                <div className={style.title}>{item.getTitle()}</div>
                {this.state.showActions ? (
                    <div className={style.buttons}>
                        <div className={style.buttonsMoveContracts}>
                            {(contractIndex > 0 && (
                                <button
                                    className="btnNoBg"
                                    title="Move up"
                                    onClick={e => {
                                        this.props.clickUpContract(
                                            e,
                                            projectItem,
                                            contractIndex
                                        );
                                    }}
                                >
                                    <IconUp />
                                </button>
                            )) || (
                                <button
                                    className="btnNoBg"
                                    style="opacity:0.3; display:inline;"
                                >
                                    <IconUp />
                                </button>
                            )}

                            {(contractIndex < item.props._nrContracts - 1 && (
                                <button
                                    className="btnNoBg"
                                    title="Move down"
                                    onClick={e => {
                                        this.props.clickDownContract(
                                            e,
                                            projectItem,
                                            contractIndex
                                        );
                                    }}
                                >
                                    <IconDown />
                                </button>
                            )) || (
                                <button
                                    className="btnNoBg"
                                    style="opacity:0.3; display:inline;"
                                >
                                    <IconDown />
                                </button>
                            )}
                        </div>
                        <button
                            className="btnNoBg"
                            title="Delete contract"
                            onClick={e => {
                                this.props.clickDeleteContract(
                                    e,
                                    projectItem,
                                    contractIndex
                                );
                            }}
                        >
                            <IconTrash />
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }
}

ItemContract.propTypes = {
    item: PropTypes.object.isRequired,
    openItem: PropTypes.func.isRequired,
    clickUpContract: PropTypes.func.isRequired,
    clickDownContract: PropTypes.func.isRequired,
    clickDeleteContract: PropTypes.func.isRequired,
};

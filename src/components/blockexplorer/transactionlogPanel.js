// Copyright 2018 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import style from './style.less';
import RenderTransactions from './rendertransactions';

export default class TransactionLogPanel extends Component {

    componentDidMount() {
        setInterval(() => this.setState(), 1000);
    }

    _getRender = txlog => {
        if (this.renderTransactions) {
            return this.renderTransactions;
        }
        this.renderTransactions = new RenderTransactions(txlog, true, () => {
            this.setState();
        });
        return this.renderTransactions;
    };

    _getTxLog = () => {
        if (!this.props.router.control) return;
        const project = this.props.router.control.getActiveProject();
        if (!project) return;
        return project.getTxLog();
    };

    render() {
        const txlog = this._getTxLog();
        if (!txlog) return;
        const env = this.props.router.control
            .getActiveProject()
            .getEnvironment();
        const network = env;

        const renderTransactions = this._getRender(txlog);
        const transactions = renderTransactions.renderTransactionsFloat(
            network,
            5,
            0
        );
        return <div className={style.transactionlogPanel}>{transactions}</div>;
    }
}

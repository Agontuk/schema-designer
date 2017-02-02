/**
 * @flow
 */
import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ExportDatabase from './ExportDatabase';

const tableTooltip = (
    <Tooltip id='tooltip'><strong>Create New Table</strong></Tooltip>
);

const trashTooltip = (
    <Tooltip id='tooltip'><strong>Clear Current Schema</strong></Tooltip>
);

class Header extends Component {
    props: Props

    clearSchemaData = () => {
        window.localStorage.removeItem('schema');
        window.location.reload();
    }

    toggleDbModal = () => {
        const editMode = true;
        this.props.onToggleDbModal(editMode);
    }

    render() {
        console.log('Header rendering');
        const { dbName, onToggleTableModal } = this.props;

        return (
            <header>
                <div className='container'>
                    <div className='row'>
                        <div className='title col-xs-5 col-sm-4 text-left'>
                            <strong>Schema Builder</strong>
                            <sub>by <a href='https://github.com/Agontuk'>Agontuk</a></sub>
                        </div>
                        <div className='db-name col-xs-5 col-sm-4 text-center'>
                            <span><i className='fa fa-database'></i> { dbName }</span>
                            { !!dbName &&
                                <sup>
                                    <button
                                        className='fa fa-edit'
                                        onClick={ this.toggleDbModal }
                                    >
                                    </button>
                                </sup>
                            }
                        </div>
                        <div className='menu col-xs-2 col-sm-4 text-right'>
                            <ul className='list-inline'>
                                <li>
                                    <OverlayTrigger placement='bottom' overlay={ tableTooltip }>
                                        <button
                                            className='fa fa-plus'
                                            onClick={ onToggleTableModal }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <OverlayTrigger placement='bottom' overlay={ trashTooltip }>
                                        <button
                                            className='fa fa-trash-o'
                                            onClick={ this.clearSchemaData }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                { typeof window.schema === 'object' &&
                                    window.schema.packageMode &&
                                    <ExportDatabase />
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

type Props = {
    dbName: string,
    onToggleDbModal: (editMode?: boolean) => void,
    onToggleTableModal: () => void
};

export default Header;

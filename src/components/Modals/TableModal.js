/**
 * @flow
 */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import type { TableType } from '../../utils/flowtypes';
import shallowEqual from '../../utils/shallowEqual';

type Props = {
    showTableModal: boolean,
    editMode: boolean,
    editData: TableType,
    tables: Array<TableType>,
    toggleTableModal: () => void,
    saveTable: (data: TableType) => void,
    updateTable: (data: TableType) => void
};

type State = {
    duplicateName: boolean
};

class TableModal extends Component<Props, State> {
    state = {
        duplicateName: false
    }

    // Flow type for refs
    name: any
    color: any
    softdelete: any
    timestamp: any

    focusInput = () => {
        this.name.focus();
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();

        const { saveTable, updateTable, editMode, editData, tables } = this.props;

        const data = {
            id: editMode ? editData.id : Math.random().toString(36).substring(7),
            name: this.name.value.trim().toLowerCase(),
            color: this.color.value.trim(),
            softDelete: this.softdelete.checked,
            timeStamp: this.timestamp.checked
        };

        if (!data.name) {
            return;
        }

        const duplicate = findIndex(tables, (table) => table.name === data.name);

        if (duplicate !== -1 && data.name !== editData.name) {
            // Duplicate table name
            this.setState({ duplicateName: true });
            return;
        }

        if (editMode) {
            // Only update if data is changed
            if (!shallowEqual(data, editData)) {
                updateTable(data);
            }

            this.toggleTableModal();
        } else {
            saveTable(data);
        }

        // Reset state
        this.setState({ duplicateName: false });
    }

    toggleTableModal = () => {
        // Reset state
        this.setState({ duplicateName: false });

        this.props.toggleTableModal();
    }

    render() {
        console.log('TableModal rendering'); // eslint-disable-line no-console
        const { showTableModal, editData, editMode } = this.props;
        const { duplicateName } = this.state;

        return (
            <Modal
                show={ showTableModal }
                onEntered={ this.focusInput }
                onHide={ this.toggleTableModal }
                dialogClassName='modal-sm'
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ this.toggleTableModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>
                        {editMode ? 'Update Table' : 'Create Table'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                        <div className={ classnames('form-group', { 'has-error': duplicateName }) }>
                            <label className='col-xs-2 control-label' htmlFor='name'>Name:</label>
                            <div className='col-xs-10'>
                                <input
                                    type='text'
                                    id='name'
                                    ref={ (name) => {
                                        this.name = name;
                                    } }
                                    className='form-control'
                                    defaultValue={ editData.name }
                                />
                            </div>

                            {duplicateName &&
                            <span className='col-xs-offset-2 col-xs-10 help-block'>
                                Duplicate table name
                            </span>
                            }
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-2 control-label' htmlFor='color'>Color:</label>
                            <div className='col-xs-10'>
                                <select
                                    type='text'
                                    id='color'
                                    ref={ (color) => { this.color = color; } }
                                    className='form-control'
                                    defaultValue={ editData.color }
                                >
                                    <option value='table-header-red'>Red</option>
                                    <option value='table-header-green'>Green</option>
                                    <option value='table-header-blue'>Blue</option>
                                    <option value='table-header-dark-blue'>Dark Blue</option>
                                    <option value='table-header-purple'>Purple</option>
                                </select>
                            </div>
                        </div>

                        <div className='checkbox'>
                            <label htmlFor='softdelete'>
                                <input
                                    type='checkbox'
                                    id='softdelete'
                                    ref={ (softdelete) => {
                                        this.softdelete = softdelete;
                                    } }
                                    defaultChecked={ editData.softDelete }
                                /> Soft Delete
                            </label>
                        </div>
                        <div className='checkbox'>
                            <label htmlFor='timestamp'>
                                <input
                                    type='checkbox'
                                    id='timestamp'
                                    ref={ (timestamp) => {
                                        this.timestamp = timestamp;
                                    } }
                                    defaultChecked={ editData.timeStamp }
                                /> Timestamp
                            </label>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.handleSubmit }
                    >{editMode ? 'Update' : 'Save'}
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.toggleTableModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TableModal;

import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class TableModal extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        const name = this.refs.tableName.value.trim();
        const softDelete = this.refs.softdelete.checked;
        const timeStamp = this.refs.timestamp.checked;

        if (!name) {
            return;
        }

        const { saveTable, updateTable, editMode, editData } = this.props;

        if (editMode) {
            updateTable({
                id: editData.get('id'),
                name, softDelete, timeStamp
            });
        } else {
            saveTable({
                id: Math.random().toString(36).substring(7),
                name, softDelete, timeStamp
            });
        }
    }

    render () {
        const { showTableModal, toggleTableModal, editData, editMode } = this.props;

        return (
            <Modal
                show={ showTableModal }
                onHide={ toggleTableModal }
                dialogClassName='modal-sm'
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ toggleTableModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>
                        { editMode ? 'Update Table' : 'Create Table' }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                        <div className='form-group'>
                            <label className='col-xs-2 control-label'>Name:</label>
                            <div className='col-xs-10'>
                                <input
                                    type='text'
                                    ref='tableName'
                                    className='form-control'
                                    defaultValue={ editData.get('name') }
                                />
                            </div>
                        </div>
                        <div className='checkbox'>
                            <label>
                                <input
                                    type='checkbox'
                                    ref='softdelete'
                                    defaultChecked={ editData.get('softDelete') }
                                /> Soft Delete
                            </label>
                        </div>
                        <div className='checkbox'>
                            <label>
                                <input
                                    type='checkbox'
                                    ref='timestamp'
                                    defaultChecked={ editData.get('timeStamp') }
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
                    >{ editMode ? 'Update' : 'Save' }
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ toggleTableModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

TableModal.propTypes = {
    showTableModal: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    editData: PropTypes.object.isRequired,
    toggleTableModal: PropTypes.func.isRequired,
    saveTable: PropTypes.func.isRequired,
    updateTable: PropTypes.func.isRequired
};

export default TableModal;

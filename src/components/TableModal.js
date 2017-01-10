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

        this.props.saveTable({
            id: Math.random().toString(36).substring(7),
            name, softDelete, timeStamp
        });
    }

    render () {
        const { showTableModal, toggleTableModal } = this.props;

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
                    <Modal.Title>Create Table</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                        <div className='form-group'>
                            <label className='col-xs-2 control-label'>Name:</label>
                            <div className='col-xs-10'>
                                <input type='text' ref='tableName' className='form-control' />
                            </div>
                        </div>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' ref='softdelete' /> Soft Delete
                            </label>
                        </div>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' ref='timestamp' /> Timestamp
                            </label>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.handleSubmit }
                    >Save
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
    toggleTableModal: PropTypes.func.isRequired,
    saveTable: PropTypes.func.isRequired
};

export default TableModal;

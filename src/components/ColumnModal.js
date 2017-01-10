import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class ColumnModal extends Component {
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //
    //     const name = this.refs.tableName.value.trim();
    //     const softDelete = this.refs.softdelete.checked;
    //     const timeStamp = this.refs.timestamp.checked;
    //
    //     if (!name) {
    //         return;
    //     }
    //
    //     const { saveColumn, updateColumn, editMode, editData } = this.props;
    //
    //     if (editMode) {
    //         updateColumn({
    //             id: editData.get('id'),
    //             name, softDelete, timeStamp
    //         });
    //     } else {
    //         saveColumn({
    //             id: Math.random().toString(36).substring(7),
    //             name, softDelete, timeStamp
    //         });
    //     }
    // }

    render () {
        const { showColumnModal, toggleColumnModal, editData, editMode } = this.props;

        return (
            <Modal
                show={ showColumnModal }
                onHide={ toggleColumnModal }
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ toggleColumnModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>
                        { editMode ? 'Update Column' : 'Add Column' }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Name:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    ref='tableName'
                                    className='form-control'
                                    defaultValue={ editData.get('name') }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Type:</label>
                            <div className='col-xs-9'>
                                <select className='form-control'>
                                    <option>INT</option>
                                    <option>BIGINT</option>
                                    <option>String</option>
                                    <option>Text</option>
                                    <option>Long Text</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Length:</label>
                            <div className='col-xs-9'>
                                <input type='text' ref='length' className='form-control' />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Default Value:</label>
                            <div className='col-xs-9'>
                                <input type='text' ref='defValue' className='form-control' />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Comment:</label>
                            <div className='col-xs-9'>
                                <input type='text' ref='comment' className='form-control' />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Misc:</label>
                            <div className='col-xs-9'>
                                <label className='checkbox-inline'>
                                    <input type='checkbox' /> A.I.
                                </label>
                                <label className='checkbox-inline'>
                                    <input type='checkbox' /> Nullable
                                </label>
                                <label className='checkbox-inline'>
                                    <input type='checkbox' /> Unique
                                </label>
                                <label className='checkbox-inline'>
                                    <input type='checkbox' /> Index
                                </label>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    { !editMode ?
                        <button type='button' className='btn btn-primary'>Save &amp; Continue</button> : null
                    }

                    <button type='button' className='btn btn-primary'>
                        { editMode ? 'Update Column' : 'Save & Exit' }
                    </button>
                    <button type='button' className='btn btn-default' onClick={ toggleColumnModal }>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ColumnModal.propTypes = {
    showColumnModal: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    editData: PropTypes.object.isRequired,
    toggleColumnModal: PropTypes.func.isRequired,
    saveColumn: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired
};

export default ColumnModal;

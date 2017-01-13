import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import ForeignKeyForm from './ForeignKeyForm';

class ColumnModal extends Component {
    state = {
        isUnsigned: false,
        foreignKeyEnabled: false
    }

    updateUnsignedValue = (event) => {
        this.setState({
            isUnsigned: event.target.checked,
            foreignKeyEnabled: false
        });
    }

    updateForeignKeyValue = (event) => {
        this.setState({ foreignKeyEnabled: event.target.checked });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    getFormData = () => {
        const name = this.refs.name.value.trim();
        const type = this.refs.type.value;
        const length = this.refs.length.value.trim();
        const defValue = this.refs.defValue.value.trim();
        const comment = this.refs.comment.value.trim();
        const autoInc = this.refs.autoInc.checked;
        const nullable = this.refs.nullable.checked;
        const unique = this.refs.unique.checked;
        const index = this.refs.index.checked;
        const unsigned = this.refs.unsigned.checked;
        let foreignKey = this.refs.foreignKey;

        if (foreignKey) {
            foreignKey = foreignKey.getData();
        }

        if (!name) {
            return false;
        }

        return {
            name, type, length, defValue, comment, autoInc, nullable, unique, index, unsigned, foreignKey
        };
    }

    saveColumnAndContinue = () => {
        const data = this.getFormData();

        if (!data) {
            return;
        }

        const { saveColumn, tableId } = this.props;
        const hideModal = false;

        saveColumn({
            id: Math.random().toString(36).substring(7),
            ...data
        }, tableId, hideModal);

        this.refs.form.reset();
    }

    saveColumnAndExit = () => {
        const data = this.getFormData();

        if (!data) {
            return;
        }

        const { saveColumn, updateColumn, editMode, editData, tableId } = this.props;

        if (editMode) {
            updateColumn({
                id: editData.get('id'),
                ...data
            }, tableId);
        } else {
            saveColumn({
                id: Math.random().toString(36).substring(7),
                ...data
            }, tableId);
        }
    }

    render () {
        const { showColumnModal, toggleColumnModal, editData, editMode, tables, tableId, columns } = this.props;
        const { isUnsigned, foreignKeyEnabled } = this.state;

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
                    <form className='form-horizontal' ref='form' onSubmit={ this.handleSubmit }>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Name:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    ref='name'
                                    className='form-control'
                                    defaultValue={ editData.get('name') }
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Type:</label>
                            <div className='col-xs-9'>
                                <select className='form-control' ref='type' defaultValue={ editData.get('type') }>
                                    <option value='integer'>INT</option>
                                    <option value='bigInteger'>BIGINT</option>
                                    <option value='string'>String</option>
                                    <option value='text'>Text</option>
                                    <option value='longText'>Long Text</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Length:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    ref='length'
                                    className='form-control'
                                    defaultValue={ editData.get('length') }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Default Value:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    ref='defValue'
                                    className='form-control'
                                    defaultValue={ editData.get('defValue') }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Comment:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    ref='comment'
                                    className='form-control'
                                    defaultValue={ editData.get('comment') }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label'>Misc:</label>
                            <div className='col-xs-9'>
                                <label className='checkbox-inline'>
                                    <input
                                        type='checkbox'
                                        ref='autoInc'
                                        defaultChecked={ editData.get('autoInc') }
                                    /> A.I.
                                </label>
                                <label className='checkbox-inline'>
                                    <input
                                        type='checkbox'
                                        ref='nullable'
                                        defaultChecked={ editData.get('nullable') }
                                    /> Nullable
                                </label>
                                <label className='checkbox-inline'>
                                    <input
                                        type='checkbox'
                                        ref='unique'
                                        defaultChecked={ editData.get('unique') }
                                    /> Unique
                                </label>
                                <label className='checkbox-inline'>
                                    <input
                                        type='checkbox'
                                        ref='index'
                                        defaultChecked={ editData.get('index') }
                                    /> Index
                                </label>
                                <label className='checkbox-inline'>
                                    <input
                                        type='checkbox'
                                        ref='unsigned'
                                        checked={ isUnsigned }
                                        onChange={ this.updateUnsignedValue }
                                    /> Unsigned
                                </label>
                            </div>
                            <div className='col-xs-9 col-xs-offset-3'>
                                <label className={ classnames('checkbox-inline', { disabled: !isUnsigned }) }>
                                    <input
                                        type='checkbox'
                                        checked={ foreignKeyEnabled }
                                        disabled={ !isUnsigned }
                                        onChange={ this.updateForeignKeyValue }
                                    /> Foreign Key
                                </label>
                            </div>
                        </div>

                        { foreignKeyEnabled ?
                            <ForeignKeyForm
                                ref='foreignKey'
                                columns={ columns }
                                tables={ tables }
                                tableId={ tableId }
                                editData={ editData }
                            /> : null
                        }
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    { !editMode ?
                        <button type='button' className='btn btn-primary' onClick={ this.saveColumnAndContinue }>
                            Save &amp; Continue
                        </button> : null
                    }

                    <button type='button' className='btn btn-primary' onClick={ this.saveColumnAndExit }>
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
    tableId: PropTypes.string.isRequired,
    tables: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    toggleColumnModal: PropTypes.func.isRequired,
    saveColumn: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired
};

export default ColumnModal;

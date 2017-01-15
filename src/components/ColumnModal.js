import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import ForeignKeyForm from './ForeignKeyForm';

class ColumnModal extends Component {
    state = {
        isUnsigned: false,
        foreignKeyEnabled: false
    }

    getFormData = () => {
        const name = this.name.value.trim();
        const type = this.type.value;
        const length = this.length.value.trim();
        const defValue = this.defValue.value.trim();
        const comment = this.comment.value.trim();
        const autoInc = this.autoInc.checked;
        const nullable = this.nullable.checked;
        const unique = this.unique.checked;
        const index = this.index.checked;
        const unsigned = this.unsigned.checked;
        let foreignKey = this.foreignKey;

        if (foreignKey) {
            foreignKey = foreignKey.getData();
        } else {
            foreignKey = {
                references: {
                    id: '',
                    name: ''
                },
                on: {
                    id: '',
                    name: ''
                }
            };
        }

        if (!name) {
            return false;
        }

        return {
            name, type, length, defValue, comment, autoInc, nullable, unique, index, unsigned, foreignKey
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
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

        this.form.reset();
    }

    saveColumnAndExit = () => {
        const data = this.getFormData();

        if (!data) {
            return;
        }

        const { saveColumn, updateColumn, editMode, editData, tableId } = this.props;

        if (editMode) {
            updateColumn({
                id: editData.id,
                ...data
            }, tableId);
        } else {
            saveColumn({
                id: Math.random().toString(36).substring(7),
                ...data
            }, tableId);
        }
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

    render() {
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
                    <form
                        className='form-horizontal'
                        ref={ (form) => { this.form = form; } }
                        onSubmit={ this.handleSubmit }
                    >
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='name'>Name:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='name'
                                    ref={ (name) => { this.name = name; } }
                                    className='form-control'
                                    defaultValue={ editData.name }
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='type'>Type:</label>
                            <div className='col-xs-9'>
                                <select
                                    className='form-control'
                                    id='type'
                                    ref={ (type) => { this.type = type; } }
                                    defaultValue={ editData.type }
                                >
                                    <option value='integer'>INT</option>
                                    <option value='bigInteger'>BIGINT</option>
                                    <option value='string'>String</option>
                                    <option value='text'>Text</option>
                                    <option value='longText'>Long Text</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='length'>Length:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='length'
                                    ref={ (length) => { this.length = length; } }
                                    className='form-control'
                                    defaultValue={ editData.length }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='defVal'>Default Value:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='defVal'
                                    ref={ (defValue) => { this.defValue = defValue; } }
                                    className='form-control'
                                    defaultValue={ editData.defValue }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='comment'>Comment:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='comment'
                                    ref={ (comment) => { this.comment = comment; } }
                                    className='form-control'
                                    defaultValue={ editData.comment }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <strong className='col-xs-3 control-label'>Misc:</strong>
                            <div className='col-xs-9'>
                                <label className='checkbox-inline' htmlFor='autoInc'>
                                    <input
                                        type='checkbox'
                                        id='autoInc'
                                        ref={ (autoInc) => { this.autoInc = autoInc; } }
                                        defaultChecked={ editData.autoInc }
                                    /> A.I.
                                </label>
                                <label className='checkbox-inline' htmlFor='nullable'>
                                    <input
                                        type='checkbox'
                                        id='nullable'
                                        ref={ (nullable) => { this.nullable = nullable; } }
                                        defaultChecked={ editData.nullable }
                                    /> Nullable
                                </label>
                                <label className='checkbox-inline' htmlFor='unique'>
                                    <input
                                        type='checkbox'
                                        id='unique'
                                        ref={ (unique) => { this.unique = unique; } }
                                        defaultChecked={ editData.unique }
                                    /> Unique
                                </label>
                                <label className='checkbox-inline' htmlFor='index'>
                                    <input
                                        type='checkbox'
                                        id='index'
                                        ref={ (index) => { this.index = index; } }
                                        defaultChecked={ editData.index }
                                    /> Index
                                </label>
                                <label className='checkbox-inline' htmlFor='unsigned'>
                                    <input
                                        type='checkbox'
                                        id='unsigned'
                                        ref={ (unsigned) => { this.unsigned = unsigned; } }
                                        checked={ isUnsigned }
                                        onChange={ this.updateUnsignedValue }
                                    /> Unsigned
                                </label>
                            </div>
                            <div className='col-xs-9 col-xs-offset-3'>
                                <label
                                    className={ classnames('checkbox-inline', { disabled: !isUnsigned }) }
                                    htmlFor='foreign'
                                >
                                    <input
                                        type='checkbox'
                                        id='foreign'
                                        checked={ foreignKeyEnabled }
                                        disabled={ !isUnsigned }
                                        onChange={ this.updateForeignKeyValue }
                                    /> Foreign Key
                                </label>
                            </div>
                        </div>

                        { foreignKeyEnabled ?
                            <ForeignKeyForm
                                ref={ (foreignKey) => { this.foreignKey = foreignKey; } }
                                columns={ columns }
                                tables={ tables }
                                tableId={ tableId }
                                editData={ editData.foreignKey }
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
    editData: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        comment: React.PropTypes.string.isRequired,
        autoInc: React.PropTypes.bool.isRequired,
        unique: React.PropTypes.bool.isRequired,
        index: React.PropTypes.bool.isRequired,
        unsigned: React.PropTypes.bool.isRequired,
        nullable: React.PropTypes.bool.isRequired,
        length: React.PropTypes.string.isRequired,
        defValue: React.PropTypes.string.isRequired
    }).isRequired,
    tableId: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    columns: PropTypes.objectOf(React.PropTypes.array).isRequired,
    toggleColumnModal: PropTypes.func.isRequired,
    saveColumn: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired
};

export default ColumnModal;

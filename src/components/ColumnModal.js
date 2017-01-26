import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import ForeignKeyForm from './ForeignKeyForm';

class ColumnModal extends Component {
    state = {
        isUnsigned: false,
        foreignKeyEnabled: false,
        duplicateName: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isUnsigned: nextProps.editData.unsigned,
            foreignKeyEnabled: !!nextProps.editData.foreignKey.on.id,
            duplicateName: false
        });
    }

    getFormData = () => {
        const data = {
            name: this.name.value.trim(),
            type: this.type.value,
            length: this.length.value.trim(),
            defValue: this.defValue.value.trim(),
            comment: this.comment.value.trim(),
            autoInc: this.autoInc.checked,
            nullable: this.nullable.checked,
            unique: this.unique.checked,
            index: this.index.checked,
            unsigned: this.unsigned.checked
        };

        const foreignKey = this.foreignKey;

        if (foreignKey) {
            data.foreignKey = foreignKey.getData();
        } else {
            data.foreignKey = {
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

        if (!data.name) {
            return false;
        }

        const { tableId, columns, editData } = this.props;

        const duplicate = findIndex(columns[tableId], (column) => column.name === data.name);

        if (duplicate !== -1 && data.name !== editData.name) {
            // Duplicate column name
            this.setState({ duplicateName: true });
            return false;
        }

        this.setState({
            isUnsigned: false,
            foreignKeyEnabled: false,
            duplicateName: false
        });

        return data;
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

    toggleColumnModal = () => {
        // Reset duplicateName state
        this.setState({ duplicateName: false });

        this.props.toggleColumnModal();
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
        const { showColumnModal, editData, editMode, tables, tableId, columns } = this.props;
        const { isUnsigned, foreignKeyEnabled, duplicateName } = this.state;

        return (
            <Modal
                show={ showColumnModal }
                onHide={ this.toggleColumnModal }
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ this.toggleColumnModal }>
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
                        <div className={ classnames('form-group', { 'has-error': duplicateName }) }>
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

                            { duplicateName &&
                                <span className='col-xs-offset-3 col-xs-9 help-block'>
                                    Duplicate column name
                                </span>
                            }
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
                                    <option value='string'>VARCHAR</option>
                                    <option value='text'>TEXT</option>
                                    <option value='date'>DATE</option>
                                    <optgroup label='Numeric'>
                                        <option value='tinyInteger'>TINYINT</option>
                                        <option value='smallInteger'>SMALLINT</option>
                                        <option value='mediumInteger'>MEDIUMINT</option>
                                        <option value='bigInteger'>BIGINT</option>
                                        <option value='boolean'>BOOLEAN</option>
                                    </optgroup>
                                    <optgroup label='Date and time'>
                                        <option value='dateTime'>DATETIME</option>
                                        <option value='timestamp'>TIMESTAMP</option>
                                        <option value='time'>TIME</option>
                                    </optgroup>
                                    <optgroup label='String'>
                                        <option value='char'>CHAR</option>
                                        <option value='tinyText'>TINYTEXT</option>
                                        <option value='mediumText'>MEDIUMTEXT</option>
                                        <option value='longText'>LONGTEXT</option>
                                    </optgroup>
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
                            <label className='col-xs-3 control-label' htmlFor='defVal'>
                                Default Value:
                            </label>
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

                        { foreignKeyEnabled &&
                            <ForeignKeyForm
                                ref={ (foreignKey) => { this.foreignKey = foreignKey; } }
                                columns={ columns }
                                tables={ tables }
                                tableId={ tableId }
                                data={ editData.foreignKey }
                            />
                        }
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    { !editMode &&
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={ this.saveColumnAndContinue }
                        >Save &amp; Continue
                        </button>
                    }

                    <button type='button' className='btn btn-primary' onClick={ this.saveColumnAndExit }>
                        { editMode ? 'Update Column' : 'Save & Exit' }
                    </button>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={ this.toggleColumnModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ColumnModal.propTypes = {
    showColumnModal: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    editData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        autoInc: PropTypes.bool.isRequired,
        unique: PropTypes.bool.isRequired,
        index: PropTypes.bool.isRequired,
        unsigned: PropTypes.bool.isRequired,
        nullable: PropTypes.bool.isRequired,
        length: PropTypes.string.isRequired,
        defValue: PropTypes.string.isRequired,
        foreignKey: PropTypes.shape({
            references: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired,
            on: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    tableId: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.objectOf(PropTypes.array).isRequired,
    toggleColumnModal: PropTypes.func.isRequired,
    saveColumn: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired
};

export default ColumnModal;

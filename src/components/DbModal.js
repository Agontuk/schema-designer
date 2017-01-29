/**
 * @flow
 */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class DbModal extends Component {
    props: Props

    // Flow type for ref
    dbname: any

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const name = this.dbname.value.trim();

        if (!name) {
            return;
        }

        const { editMode, saveDbName } = this.props;

        saveDbName(name, editMode);
    }

    toggleDbModal = () => {
        const { editMode, toggleDbModal } = this.props;

        if (editMode) {
            toggleDbModal();
        }
    }

    render() {
        const { name, showModal } = this.props;

        return (
            <Modal show={ showModal } onHide={ this.toggleDbModal }>
                <Modal.Body>
                    <form onSubmit={ this.handleSubmit }>
                        <input
                            className='form-control input-lg'
                            ref={ (dbname) => { this.dbname = dbname; } }
                            type='text'
                            placeholder='Enter database name'
                            defaultValue={ name }
                            autoFocus
                        />
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

type Props = {
    name: string,
    showModal: boolean,
    editMode: boolean,
    saveDbName: (name: string, editMode: boolean) => void,
    toggleDbModal: () => void
};

export default DbModal;

import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class DbForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const name = this.dbname.value.trim();

        if (!name) {
            return;
        }

        this.props.onSubmit(name);
    }

    render() {
        const { name } = this.props;

        return (
            <Modal show>
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

DbForm.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default DbForm;

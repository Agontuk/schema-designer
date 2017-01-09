import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';

class TableModal extends Component {
    render () {
        const { showTableModal, onHideTableModal } = this.props;

        return (
            <Modal
                show={ showTableModal }
                onHide={ onHideTableModal }
                dialogClassName='modal-sm'
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ onHideTableModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>Create Table</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col className='control-label' sm={ 2 }>Name:</Col>
                            <Col sm={ 10 }>
                                <FormControl type='text' ref='name' />
                            </Col>
                        </FormGroup>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' ref='delete' /> Soft Delete
                            </label>
                        </div>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' ref='timestamp' /> Timestamp
                            </label>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    <button type='button' className='btn btn-primary'>Save</button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ onHideTableModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

TableModal.propTypes = {
    showTableModal: PropTypes.bool.isRequired,
    onHideTableModal: PropTypes.func.isRequired
};

export default TableModal;

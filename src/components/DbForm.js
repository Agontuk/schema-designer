import React, { Component, PropTypes } from 'react';

class DbForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const name = this.refs.dbname.value.trim();

        if (!name) {
            return;
        }

        this.props.onSubmit(name);
    }

    render () {
        const { name } = this.props;

        return (
            <div className='container'>
                <div className='form-group col-xs-6 col-xs-offset-3'>
                    <form onSubmit={ this.handleSubmit }>
                        <input
                            className='form-control input-lg'
                            ref='dbname'
                            type='text'
                            placeholder='Enter database name'
                            defaultValue={ name }
                        />
                    </form>
                </div>
            </div>
        );
    }
}

DbForm.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default DbForm;

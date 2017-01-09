import React, { Component, PropTypes } from 'react';

class DbForm extends Component {
    render () {
        const { name } = this.props;

        return (
            <div className='container'>
                <div className='form-group col-xs-6 col-xs-offset-3'>
                    <input
                        className='form-control input-lg'
                        id='dbname'
                        type='text'
                        placeholder='Enter database name'
                        defaultValue={ name }
                    />
                </div>
            </div>
        );
    }
}

DbForm.propTypes = {
    name: PropTypes.string.isRequired
};

export default DbForm;

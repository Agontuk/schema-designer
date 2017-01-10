import React, { Component, PropTypes } from 'react';

class Column extends Component {
    render () {
        const { data } = this.props;

        return (
            <li className='clearfix'>
                <div className='pull-left'>
                    { data.get('name') }<span>({ data.get('type') })</span>
                </div>
                <div className='pull-right'>
                    <span className='glyphicon glyphicon-pencil'></span>
                    <span className='glyphicon glyphicon-remove'></span>
                </div>
            </li>
        );
    }
}

Column.propTypes = {
    data: PropTypes.object.isRequired
};

export default Column;

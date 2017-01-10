import React, { Component, PropTypes } from 'react';

class Column extends Component {
    removeColumn = () => {
        const { data, onRemoveColumn, tableId } = this.props;
        onRemoveColumn(data.get('id'), tableId);
    }

    render () {
        const { data } = this.props;

        return (
            <li className='clearfix'>
                <div className='pull-left'>
                    { data.get('name') }<span>({ data.get('type') })</span>
                </div>
                <div className='pull-right'>
                    <span className='glyphicon glyphicon-pencil'></span>
                    <span className='glyphicon glyphicon-remove' onClick={ this.removeColumn }></span>
                </div>
            </li>
        );
    }
}

Column.propTypes = {
    data: PropTypes.object.isRequired,
    tableId: PropTypes.string.isRequired,
    onRemoveColumn: PropTypes.func.isRequired
};

export default Column;

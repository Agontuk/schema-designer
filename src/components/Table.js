import React, { Component, PropTypes } from 'react';

class Table extends Component {
    editTable = () => {
        const { data, onEditTable } = this.props;
        onEditTable(data);
    }

    removeTable = () => {
        const { data, onRemoveTable } = this.props;
        onRemoveTable(data.get('id'));
    }

    toggleColumnModal = () => {
        const { data, onToggleColumnModal } = this.props;
        onToggleColumnModal(data.get('id'));
    }

    render () {
        const { data } = this.props;

        return (
            <div className='db-table'>
                <div className='table-header clearfix'>
                    <h4 className='pull-left'>{ data.get('name') }</h4>
                    <div className='pull-right'>
                        <span className='glyphicon glyphicon-plus' onClick={ this.toggleColumnModal }></span>
                        <span className='glyphicon glyphicon-pencil' onClick={ this.editTable }></span>
                        <span className='glyphicon glyphicon-remove' onClick={ this.removeTable }></span>
                    </div>
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    data: PropTypes.object.isRequired,
    onRemoveTable: PropTypes.func.isRequired,
    onEditTable: PropTypes.func.isRequired,
    onToggleColumnModal: PropTypes.func.isRequired
};

export default Table;

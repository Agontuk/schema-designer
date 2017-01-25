import React, { Component, PropTypes } from 'react';
import Columns from '../containers/Columns';

class Table extends Component {
    editTable = () => {
        const { data, onEditTable } = this.props;
        onEditTable(data);
    }

    removeTable = () => {
        const { data, onRemoveTable } = this.props;
        onRemoveTable(data.id);
    }

    toggleColumnModal = () => {
        const { data, onToggleColumnModal } = this.props;
        onToggleColumnModal(data.id);
    }

    render() {
        const { data } = this.props;

        return (
            <div
                className='db-table draggable'
                id={ data.id }
                style={ { left: data.position.x, top: data.position.y } }
            >
                <div className='table-header clearfix'>
                    <h4 className='pull-left'>{ data.name }</h4>
                    <div className='pull-right'>
                        <span className='glyphicon glyphicon-plus' onClick={ this.toggleColumnModal }></span>
                        <span className='glyphicon glyphicon-pencil' onClick={ this.editTable }></span>
                        <span className='glyphicon glyphicon-remove' onClick={ this.removeTable }></span>
                    </div>
                </div>

                <Columns table={ data } />
            </div>
        );
    }
}

Table.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        softDelete: PropTypes.bool.isRequired,
        timeStamp: PropTypes.bool.isRequired
    }).isRequired,
    onRemoveTable: PropTypes.func.isRequired,
    onEditTable: PropTypes.func.isRequired,
    onToggleColumnModal: PropTypes.func.isRequired
};

export default Table;

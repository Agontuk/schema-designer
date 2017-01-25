import React, { Component, PropTypes } from 'react';

class Column extends Component {
    editColumn = () => {
        const { data, onEditColumn, tableId } = this.props;
        onEditColumn(data, tableId);
    }

    removeColumn = () => {
        const { data, onRemoveColumn, tableId } = this.props;
        onRemoveColumn(data, tableId);
    }

    render() {
        const { data } = this.props;

        return (
            <li className='clearfix' id={ data.id }>
                <div className='pull-left'>
                    { data.name }
                    { !!data.foreignKey.references.id && <sup>FK</sup> }
                    <span>({ data.type })</span>
                </div>
                <div className='pull-right'>
                    <span className='glyphicon glyphicon-pencil' onClick={ this.editColumn }></span>
                    <span className='glyphicon glyphicon-remove' onClick={ this.removeColumn }></span>
                </div>
            </li>
        );
    }
}

Column.propTypes = {
    data: PropTypes.shape({
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
    onRemoveColumn: PropTypes.func.isRequired,
    onEditColumn: PropTypes.func.isRequired
};

export default Column;

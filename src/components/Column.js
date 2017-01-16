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
            <li className='clearfix'>
                <div className='pull-left'>
                    { data.name }<span>({ data.type })</span>
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
    data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        comment: React.PropTypes.string.isRequired,
        autoInc: React.PropTypes.bool.isRequired,
        unique: React.PropTypes.bool.isRequired,
        index: React.PropTypes.bool.isRequired,
        unsigned: React.PropTypes.bool.isRequired,
        nullable: React.PropTypes.bool.isRequired,
        length: React.PropTypes.string.isRequired,
        defValue: React.PropTypes.string.isRequired,
        foreignKey: React.PropTypes.shape({
            references: React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            }).isRequired,
            on: React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    tableId: PropTypes.string.isRequired,
    onRemoveColumn: PropTypes.func.isRequired,
    onEditColumn: PropTypes.func.isRequired
};

export default Column;

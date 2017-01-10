import React, { Component, PropTypes } from 'react';
import Column from './Column';

class Columns extends Component {
    render () {
        const { columns } = this.props;

        if (columns.size === 0) {
            return null;
        }

        return (
            <ul className='db-columns'>
                { columns.valueSeq().map((column) => {
                    return (
                        <Column
                            key={ column.get('id') }
                            data={ column }
                        />
                    );
                })}
            </ul>
        );
    }
}

Columns.propTypes = {
    columns: PropTypes.object.isRequired
};

export default Columns;

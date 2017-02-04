/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import type { ColumnType, TableType } from '../utils/flowtypes';

const exportTooltip = (
    <Tooltip id='export-tooltip'><strong>Generate Database Migrations</strong></Tooltip>
);

class ExportDatabase extends Component {
    props: Props

    // Flow type for refs
    form: any

    handleSubmit = () => {
        this.form.submit();
    }

    render() {
        console.log('ExportDatabase rendering'); // eslint-disable-line no-console
        const { data } = this.props;

        return (
            <li>
                <form
                    className='form-inline'
                    method='POST'
                    action=''
                    ref={ (form) => { this.form = form; } }
                >
                    <input type='hidden' name='schema' value={ JSON.stringify(data) } />
                </form>
                <OverlayTrigger
                    placement='bottom'
                    overlay={ exportTooltip }
                    delayShow={ 300 }
                    rootClose
                >
                    <button
                        className='fa fa-download'
                        onClick={ this.handleSubmit }
                        disabled={ !data.tables.length }
                    >
                    </button>
                </OverlayTrigger>
            </li>
        );
    }
}

type Props = {
    data: {
        database: {
            name: string
        },
        tables: Array<TableType>,
        columns: {
            [tableId: string]: Array<ColumnType>
        }
    }
};

const mapStateToProps = (state) => ({
    data: {
        database: state.database,
        tables: state.tables,
        columns: state.columns
    }
});

export default connect(mapStateToProps)(ExportDatabase);

/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import type { ColumnType, RelationType, TableType, UiType } from '../utils/flowtypes';

const exportTooltip = (
    <Tooltip id='tooltip'><strong>Generate Database Migrations</strong></Tooltip>
);

class ExportDatabase extends Component {
    props: Props

    // Flow type for refs
    form: any

    handleSubmit = () => {
        this.form.submit();
    }

    render() {
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
                <OverlayTrigger placement='bottom' overlay={ exportTooltip }>
                    <button
                        className='glyphicon glyphicon-download-alt'
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
        ui: UiType,
        tables: Array<TableType>,
        columns: {
            [x: string]: Array<ColumnType>
        },
        relations: Array<RelationType>
    }
};

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(ExportDatabase);

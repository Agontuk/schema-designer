import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const exportTooltip = (
    <Tooltip id='tooltip'><strong>Generate Database Migrations</strong></Tooltip>
);

class ExportDatabase extends Component {
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

ExportDatabase.propTypes = {
    data: PropTypes.shape({
        database: PropTypes.object.isRequired,
        ui: PropTypes.object.isRequired,
        tables: PropTypes.arrayOf(PropTypes.object).isRequired,
        columns: PropTypes.objectOf(PropTypes.array).isRequired,
        relations: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
};

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(ExportDatabase);

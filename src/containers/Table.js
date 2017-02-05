/**
 * @flow
 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Table from '../components/Table';

const positionSelector = () => (
    createSelector(
        (state, props) => state.ui.positions[props.data.id],
        (position) => position
    )
);

const mapStateToProps = () => {
    // Make new copy of position for each table
    const getPosition = positionSelector();

    return (state, ownProps) => ({
        position: getPosition(state, ownProps)
    });
};

export default connect(mapStateToProps)(Table);

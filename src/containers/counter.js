import { connect } from 'react-redux';
import Counter from 'components/counter';
import { increment } from 'actions';

const mapStateToProps = (state) => {
    return {
        count: state.counter.count
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => {
            dispatch(increment());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

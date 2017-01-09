import { connect } from 'react-redux';
import Schema from 'components/Schema';
// import { increment } from 'actions';

const mapStateToProps = (state) => {
    return {
        dbName: state.database.get('name')
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Schema);

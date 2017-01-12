import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jsPlumb from 'jsPlumb';

class DrawRelationLine extends Component {
    componentDidMount () {
        jsPlumb.Defaults.Connector = [ 'Flowchart', { cornerRadius: 5 } ];
        jsPlumb.Defaults.Anchor = 'Continuous';
        jsPlumb.Defaults.ConnectionsDetachable = false;
        jsPlumb.Defaults.PaintStyle = { strokeWidth: 6, stroke: '#445566' };
        jsPlumb.Defaults.EndpointStyle = { fillStyle: '#445566' };
    }

    componentDidUpdate () {
        const { relations } = this.props;

        jsPlumb.ready(() => {
            // Reset all endpoint & connections first
            jsPlumb.reset();

            relations.forEach((relation) => {
                jsPlumb.connect({
                    source: relation.get('source'),
                    target: relation.get('target'),
                    // overlays: [
                    //     'Arrow',
                    //     ['Label', { label: '1', location: 0.1, cssClass: 'one' }],
                    //     ['Label', { label: '&infin;', location: 0.9, cssClass: 'many' }]
                    // ],
                    paintStyle: { stroke: '#75624e', strokeWidth: 6 },
                    endpointStyle: { fillStyle: '#75624e' },
                });
            });
        });
    }

    render () {
        return null;
    }
}

DrawRelationLine.propTypes = {
    relations: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        relations: state.relations
    };
};

export default connect(mapStateToProps)(DrawRelationLine);

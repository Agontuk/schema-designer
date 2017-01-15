import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class DrawRelationLine extends Component {
    componentDidMount() {
        window.jsPlumb.Defaults.Connector = ['Flowchart', { cornerRadius: 5 }];
        window.jsPlumb.Defaults.Anchor = 'Continuous';
        window.jsPlumb.Defaults.ConnectionsDetachable = false;
        window.jsPlumb.Defaults.PaintStyle = { strokeWidth: 6, stroke: '#445566' };
        window.jsPlumb.Defaults.EndpointStyle = { fillStyle: '#445566' };
    }

    componentDidUpdate() {
        const { relations } = this.props;

        window.jsPlumb.ready(() => {
            // Reset all endpoint & connections first
            window.jsPlumb.reset();

            relations.forEach((relation) => {
                window.jsPlumb.connect({
                    source: relation.get('source'),
                    target: relation.get('target'),
                    // overlays: [
                    //     'Arrow',
                    //     ['Label', { label: '1', location: 0.1, cssClass: 'one' }],
                    //     ['Label', { label: '&infin;', location: 0.9, cssClass: 'many' }]
                    // ],
                    paintStyle: { stroke: '#75624e', strokeWidth: 6 },
                    endpointStyle: { fillStyle: '#75624e' }
                });
            });
        });
    }

    render() {
        return null;
    }
}

DrawRelationLine.propTypes = {
    relations: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

const mapStateToProps = (state) => ({
    relations: state.relations
});

export default connect(mapStateToProps)(DrawRelationLine);

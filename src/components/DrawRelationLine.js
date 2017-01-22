import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jsPlumb from 'jsplumb';

class DrawRelationLine extends Component {
    componentDidMount() {
        jsPlumb.importDefaults({
            Connector: ['Flowchart', { cornerRadius: 5 }],
            Anchor: ['Continuous', { faces: ['left', 'right'] }],
            ConnectionsDetachable: false,
            Container: document.body
        });

        // Needed for initial render from localStorage
        this.drawRelation();
    }

    componentDidUpdate() {
        this.drawRelation();
    }

    drawRelation = () => {
        const { relations } = this.props;

        jsPlumb.ready(() => {
            // Reset all endpoints and connections
            jsPlumb.reset();

            relations.forEach((relation) => {
                jsPlumb.connect({
                    source: relation.source.columnId,
                    target: relation.target.columnId,
                    overlays: [
                        ['Arrow', { location: 1 }]
                    ],
                    endpoints: ['Dot', 'Blank'],
                    paintStyle: { stroke: '#75624e', strokeWidth: 2 },
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

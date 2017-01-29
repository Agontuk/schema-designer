/**
 * @flow
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jsPlumb from 'jsplumb';
import type { RelationType } from '../utils/flowtypes';

class DrawRelationLine extends Component {
    props: {
        relations: Array<RelationType>
    }

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
                        ['Arrow', { location: 1, width: 12, length: 12 }]
                    ],
                    endpoints: [['Dot', { radius: 8 }], 'Blank'],
                    paintStyle: { stroke: '#7f8c8d', strokeWidth: 2 },
                    endpointStyle: { fillStyle: '#7f8c8d' }
                });
            });
        });
    }

    render() {
        return null;
    }
}

DrawRelationLine.propTypes = {
    relations: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state) => ({
    relations: state.relations
});

export default connect(mapStateToProps)(DrawRelationLine);

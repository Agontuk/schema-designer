import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class DrawRelationLine extends Component {
    componentDidMount() {
        window.jsPlumb.importDefaults({
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

        window.jsPlumb.ready(() => {
            relations.forEach((relation) => {
                const isConnected = document.getElementById(relation.source).className.match(/jtk-connected/);

                if (!isConnected) {
                    window.jsPlumb.connect({
                        source: relation.source,
                        target: relation.target,
                        overlays: [
                            ['Arrow', { location: 1 }]
                        ],
                        endpoints: ['Dot', 'Blank'],
                        paintStyle: { stroke: '#75624e', strokeWidth: 2 },
                        endpointStyle: { fillStyle: '#75624e' }
                    });
                }
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

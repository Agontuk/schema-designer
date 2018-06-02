/**
 * @flow
 */
// $FlowFixMe
import React, { Component, SyntheticEvent } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const importTooltip = (
    <Tooltip id='import-tooltip'><strong>Import Schema</strong></Tooltip>
);

class ImportDatabase extends Component<{}> {
    input = null;

    handleFileUpload = (e: SyntheticEvent) => {
        const file = e.target.files[0];
        const extension = file.name.substr(file.name.lastIndexOf('.'));

        if (extension !== '.txt' || file.type !== 'text/plain') {
            alert('Please select the exported schema.txt file'); // eslint-disable-line no-alert
            // Reset the current file input
            e.target.value = null; // eslint-disable-line no-param-reassign
            return;
        }

        if (typeof FileReader === 'function') {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    // $FlowFixMe
                    const jsonData = JSON.parse(reader.result);

                    // Set data to localStorage
                    window.localStorage.setItem('schema', JSON.stringify(jsonData));

                    // Reload the page
                    window.location.reload();
                } catch (error) {
                    console.error(error); // eslint-disable-line no-console
                    alert('Invalid json supplied'); // eslint-disable-line no-alert
                }
            };

            reader.readAsText(file);
        } else {
            alert('Sorry, FileReader API not supported'); // eslint-disable-line no-alert
        }
    }

    openFileSelectionWindow = () => {
        if (this.input) {
            this.input.click();
        }
    }

    render() {
        return (
            <li>
                <OverlayTrigger
                    placement='bottom'
                    overlay={ importTooltip }
                    delayShow={ 300 }
                    rootClose
                >
                    <button className='fa fa-upload' onClick={ this.openFileSelectionWindow }></button>
                </OverlayTrigger>
                <input
                    id='file-upload'
                    ref={ (input) => { this.input = input; } }
                    type='file'
                    accept='.txt'
                    onChange={ this.handleFileUpload }
                />
            </li>
        );
    }
}

export default ImportDatabase;

import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const importTooltip = (
    <Tooltip id='import-tooltip'><strong>Import JSON file</strong></Tooltip>
);

class ImportDatabase extends Component {
    handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file.type !== 'application/json') {
            alert('Please select the exported json file'); // eslint-disable-line no-alert
            return;
        }

        if (typeof FileReader === 'function') {
            const reader = new FileReader();

            reader.onload = (() => (
                (event) => {
                    try {
                        const jsonData = JSON.parse(event.target.result);

                        // Set data to localStorage
                        window.localStorage.setItem('schema', JSON.stringify(jsonData));

                        // Reload the page
                        window.location.reload();
                    } catch (error) {
                        alert('Invalid json supplied'); // eslint-disable-line no-alert
                    }
                }
            ))(file);

            reader.readAsText(file);
        } else {
            alert('Sorry, FileReader API not supported'); // eslint-disable-line no-alert
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
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        <button className='fa fa-upload'></button>
                        <input
                            id='file-upload'
                            type='file'
                            accept='.json'
                            onChange={ this.handleFileUpload }
                        />
                    </label>
                </OverlayTrigger>
            </li>
        );
    }
}

export default ImportDatabase;

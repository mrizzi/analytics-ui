import './upload.scss';
import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
    FolderOpenIcon
} from '@patternfly/react-icons';
import {
    Card,
    CardBody,
    Button,
    Progress,
    ProgressVariant,
    CardFooter
} from '@patternfly/react-core';
import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';

import axios from 'axios';
import Dropzone from 'react-dropzone';
import { uploadFile } from '../../api/upload';

class Upload extends Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            progress: 0,
            files: []
        };
    }

    onDrop(files) {
        this.setState({
            files
        });

        const uploaders = files.map(file => {
            const formData = new FormData();
            formData.append('file', file, file.name);

            return uploadFile('36500629', formData, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    this.setState({
                        progress
                    });
                }
            });
        });

        axios.all(uploaders).then(() => {
            // remove files once they've all been uploaded
            this.setState({ files: []});
        });
    };

    render() {
        const dropzoneRef = createRef();
        const openDialog = () => {
            if (dropzoneRef.current) {
                dropzoneRef.current.open();
            }
        };

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Upload' />
                </PageHeader>
                <Main>
                    <Card>
                        <CardBody>
                            {
                                (this.state.progress === 0) &&
                                <Dropzone
                                    onDrop={ this.onDrop }
                                    ref={ dropzoneRef }
                                    noClick noKeyboard
                                    multiple={ false }
                                    accept={ [ 'application/zip', 'application/json' ] }
                                >
                                    { ({ getRootProps, getInputProps }) => {
                                        return (
                                            <div className="container">
                                                <div { ...getRootProps({ className: 'dropzone' }) }>
                                                    <input { ...getInputProps() } />
                                                    <FolderOpenIcon className="pf-c-title pf-m-4xl" />
                                                    <p className="pf-c-title pf-m-3xl">Drag a file here</p>
                                                    <p className="pf-c-title">- or -</p>
                                                    <Button
                                                        type="button"
                                                        variant="tertiary"
                                                        onClick={ openDialog }>
                                                        Select a file from your computer
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    } }
                                </Dropzone>
                            }
                            { (this.state.progress > 0) &&
                                <div className="progress-upload">
                                    <Progress
                                        value={ this.state.progress }
                                        title="Uploading"
                                        variant={ ProgressVariant.primary } />
                                </div>
                            }
                        </CardBody>
                        <CardFooter>
                            { (this.state.progress !== 100) ?
                                <Link to="/reports">
                                    <Button variant="tertiary">Cancel</Button>
                                </Link> :
                                <Link to="/reports">
                                    <Button variant="primary">Next</Button>
                                </Link>
                            }
                        </CardFooter>
                    </Card>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(Upload);

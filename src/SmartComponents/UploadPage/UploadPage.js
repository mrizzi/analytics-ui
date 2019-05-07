import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import asyncComponent from '../../Utilities/asyncComponent';

import { Main, PageHeader, PageHeaderTitle } from '@red-hat-insights/insights-frontend-components';

class UploadPage extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Upload' />
                </PageHeader>
                <Main>
                    <p>upload file</p>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(UploadPage);

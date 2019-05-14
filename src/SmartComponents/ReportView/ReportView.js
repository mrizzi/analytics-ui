import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button
} from '@patternfly/react-core';
import {
    Spinner
} from '@red-hat-insights/insights-frontend-components';
import { ReportListPage } from '../../PresentationalComponents/ReportListPage/ReportListPage';
import LoadingState from '../../PresentationalComponents/LoadingState/LoadingState';
import { fetchReport } from '../../actions/ReportAction';

class ReportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            report: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let id = this.props.match.params.reportId;
        if (id) {
            this.props.fetchReport(id);
        }
    }

    render() {
        const { report } = this.props;
        let action = this.props.match.params.reportId && report ? report.id : 'Unknown report';

        if (report && !this.props.match.params.reportId) {
            return <Redirect to={ `/reports/${ report.id }` } />;
        }

        return (
            <ReportListPage title={ `Report ${action}` } showBreadcrumb={ false }>
                <LoadingState
                    loading={ this.props.loading }
                    placeholder={ <Spinner centered/> }>
                    <Card>
                        <CardBody>
                            {
                                report ? <Form isHorizontal>
                                    <FormGroup
                                        label="File name"
                                        fieldId="fileName"
                                    >
                                        <TextInput
                                            id="fileName"
                                            value={ report.fileName }
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        label="Number of hosts"
                                        fieldId="numberOfHosts"
                                    >
                                        <TextInput
                                            id="numberOfHosts"
                                            value={ report.numberOfHosts }
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        label="Total disk space"
                                        fieldId="totalDiskSpace"
                                    >
                                        <TextInput
                                            id="totalDiskSpace"
                                            value={ report.totalDiskSpace }
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        label="Total price"
                                        fieldId="totalPrice"
                                    >
                                        <TextInput
                                            id="totalPrice"
                                            value={ report.totalPrice }
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        label="Creation date"
                                        fieldId="creationDate"
                                    >
                                        <TextInput
                                            id="creationDate"
                                            value={ report.creationDate }
                                            type="text"
                                        />
                                    </FormGroup>
                                    <ActionGroup>
                                        <Link to='/reports'>
                                            <Button variant="secondary">Back</Button>
                                        </Link>
                                    </ActionGroup>
                                </Form>
                                    : ''
                            }
                        </CardBody>
                    </Card>
                </LoadingState>
            </ReportListPage>
        );
    }
}

ReportView.propTypes = {
    match: PropTypes.object,
    report: PropTypes.object,
    loading: PropTypes.bool,
    fetchReport: PropTypes.func.isRequired
};

const mapStateToProps = (state)  => {
    let { report, loading } = state.reports;

    return {
        report,
        loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchReport
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReportView));

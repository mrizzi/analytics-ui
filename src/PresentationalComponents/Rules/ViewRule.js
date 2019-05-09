import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button
} from '@patternfly/react-core';
import { getReportById } from '../../api/report';
import { formatValue } from '../../Utilities/formatValue';

class ViewRule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            report: null
        };
    }

    componentDidMount() {
        getReportById(this.state.id).then((res) => {
            this.setState({
                report: res.data
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Report' />
                    <p>This is the result of high analysis. Take a look to the information below</p>
                </PageHeader>
                <Main>
                    { (this.state.report) ?
                        (
                            <Card>
                                <CardHeader>Report { this.state.report.id }</CardHeader>
                                <CardBody>
                                    <Form isHorizontal>
                                        <FormGroup
                                            label="File name"
                                            fieldId="fileName"
                                        >
                                            <TextInput
                                                id="fileName"
                                                value={ this.state.report.fileName }
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            label="Number of hosts"
                                            fieldId="numberOfHosts"
                                        >
                                            <TextInput
                                                id="numberOfHosts"
                                                value={ this.state.report.numberOfHosts }
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            label="Total disk space"
                                            fieldId="totalDiskSpace"
                                        >
                                            <TextInput
                                                id="totalDiskSpace"
                                                value={ formatValue(this.state.report.totalDiskSpace, 'gb') }
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            label="Total price"
                                            fieldId="totalPrice"
                                        >
                                            <TextInput
                                                id="totalPrice"
                                                value={ this.state.report.totalPrice }
                                                type="text"
                                            />
                                        </FormGroup>
                                        <ActionGroup>
                                            <Link to='uploads'>
                                                <Button variant="secondary">Back</Button>
                                            </Link>
                                        </ActionGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        ) : (
                            <Card>
                                <CardBody>Empty</CardBody>
                            </Card>
                        )
                    }
                </Main>
            </React.Fragment>
        );
    }
}

ViewRule.propTypes = {
    match: PropTypes.object
};

export default ViewRule;

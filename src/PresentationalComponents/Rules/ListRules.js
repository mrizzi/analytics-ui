import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';
import { Button } from '@patternfly/react-core';
import {
    Table,
    TableHeader,
    TableBody
} from '@patternfly/react-table';
import { Card, CardHeader, CardBody } from '@patternfly/react-core';

import { getAllReports } from '../../api/report';

class ListRules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Report Id' },
                { title: 'Customer Id' },
                {
                    title: 'File name',
                    props: {
                        className: 'pf-u-text-align-center'
                    }
                },
                ''
            ],
            rows: []
        };
    }

    componentDidMount() {
        getAllReports().then((response) => {
            const rows = response.data.map((item) => {
                return {
                    props: {
                        item
                    },
                    cells: [
                        item.id,
                        item.customerId,
                        item.fileName,
                        {
                            title: <Link to={ `/view/${item.id}` }>
                                <Button variant='primary'>View</Button>
                            </Link>
                        }
                    ]
                };
            });
            this.setState({
                rows
            });
        });
    }

    render() {
        const { columns, rows } = this.state;

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Reports' />
                </PageHeader>
                <Main>
                    <Card>
                        <CardHeader>
                            <Link to="/upload">
                                <Button variant="primary">Upload</Button>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <Table caption="Select one row for more info" cells={ columns } rows={ rows }>
                                <TableHeader />
                                <TableBody />
                            </Table>
                        </CardBody>
                    </Card>
                </Main>
            </React.Fragment>
        );
    }
};

export default ListRules;

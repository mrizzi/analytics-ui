import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';
import { Button } from '@patternfly/react-core';
import {
    Table,
    TableHeader,
    TableBody,
    textCenter
} from '@patternfly/react-table';
import { Card, CardHeader, CardBody } from '@patternfly/react-core';

class ListRules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Repositories' },
                'Branches',
                { title: 'Pull requests' },
                'Workspaces',
                {
                    title: 'Last Commit',
                    transforms: [ textCenter ],
                    cellTransforms: [ textCenter ]
                }
            ],
            rows: [
                [ 'one', 'two', 'three', 'four', 'five' ],
                [
                    {
                        title: <div>one - 2</div>,
                        props: { title: 'hover title', colSpan: 3 }
                    },
                    'four - 2',
                    'five - 2'
                ],
                [
                    'one - 3',
                    'two - 3',
                    'three - 3',
                    'four - 3',
                    {
                        title: 'five - 3 (not centered)',
                        props: { textCenter: false }
                    }
                ]
            ]
        };
    }

    render() {
        const { columns, rows } = this.state;

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Uploads' />
                </PageHeader>
                <Main>
                    <Card>
                        <CardHeader>
                            <Link to="/upload">
                                <Button variant="primary">Upload</Button>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <Table caption="Simple Table" cells={ columns } rows={ rows }>
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

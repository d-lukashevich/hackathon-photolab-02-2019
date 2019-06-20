import React, { useEffect } from 'react';

import appLogic from '../../store/appLogic';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'kea';

import Audio from '../../components/Audio';

import { StyledPage, TableWrapper, StyledChooseLink, StyledTitle } from './units';

const connectedLogic = connect({
    actions: [appLogic, ['getData', 'changeCurrentShow']],
    props: [appLogic, ['data', 'currentShow']]
});

function Index(props) {
    const { actions, data, currentShow } = props;
    useEffect(() => {
        actions.getData();
    }, [actions]);
    return (
        <StyledPage>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Select</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => {
                            const { audio, title } = item;
                            const active = audio === currentShow;
                            return (
                                <TableRow key={audio}>
                                    <TableCell>
                                        <StyledTitle {...{ active }}>{title}</StyledTitle>
                                    </TableCell>
                                    <TableCell>
                                        <StyledChooseLink onClick={() => actions.changeCurrentShow(audio)}>
                                            choose
                                        </StyledChooseLink>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableWrapper>
            <div>{currentShow && <Audio />}</div>
        </StyledPage>
    );
}

export default connectedLogic(Index);

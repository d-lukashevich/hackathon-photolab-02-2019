import { css } from '@emotion/core';
import styled from '@emotion/styled';

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100%;
`;
const TableWrapper = styled.div`
    overflow: auto;
`;

const StyledChooseLink = styled.span`
    display: inline-block;
    font-weight: bold;
    color: #009688;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;

const StyledTitle = styled.span`
    ${({ active }) =>
        active &&
        css`
            font-weight: bold;
            color: #009688;
        `}}
`;

export { StyledPage, TableWrapper, StyledChooseLink, StyledTitle };

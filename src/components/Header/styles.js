import styled from 'styled-components';

const MainHeader = styled.header`
    display: flex;
    margin: 0;
    position: fixed;
    top: 0;
    padding: 10px;
    width: 100%;
    text-align: left;
    background: #081c5c;
    position: relative;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const HeaderText = styled.h1`
    color: white;
    font-size: 20px;
`;

export { MainHeader, HeaderContainer, HeaderText };
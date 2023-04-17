import styled from 'styled-components';

const MainHeader = styled.header`
    display: flex;
    margin: 0;
    position: fixed;
    top: 0;
    padding: 10px;
    width: 100%;
    text-align: left;
    justify-content: space-between;
    align-items: center;
    background: #081c5c;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const HeaderText = styled.h1`
    color: white;
    font-size: 20px;
`;

const LogoutButton = styled.button`
    margin-right: 20px;
`;

export { MainHeader, HeaderContainer, HeaderText, LogoutButton };
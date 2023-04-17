import React from 'react';

import { AiFillControl } from 'react-icons/ai';
import { useNavigate, useLocation } from "react-router-dom";
import { MainHeader, HeaderContainer, HeaderText, LogoutButton } from './styles';

function Header () {
    const navigate = useNavigate();
    const location = useLocation();

    const isRecPage = location.pathname.includes("rec");

    const logout = () => {
        navigate("/");
    };

    return (
        <MainHeader>
            <HeaderContainer>
                <AiFillControl size={'3em'} style={{ color: 'white'}}/>
                <HeaderText>
                    PennCourseRec
                </HeaderText>
            </HeaderContainer>
            {isRecPage &&
            <LogoutButton onClick={logout}>
                Logout
            </LogoutButton>
            }
        </MainHeader>
    );
}

export default Header;
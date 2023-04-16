import React from 'react';

import { AiFillControl } from 'react-icons/ai'
import { MainHeader, HeaderContainer, HeaderText } from './styles';

function Header () {
    return (
        <MainHeader>
            <HeaderContainer>
                <AiFillControl size={'3em'} style={{ color: 'white'}}/>
                <HeaderText>
                    PennCourseRec
                </HeaderText>
            </HeaderContainer>
        </MainHeader>
    );
}

export default Header;
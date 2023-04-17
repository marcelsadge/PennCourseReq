import styled from 'styled-components';
import penn from '../../media/penn.jpg';

const ImageContainer = styled.div`
    display: flex;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${penn});
    justify-content: center;
    align-items: center;
    background-size: cover;
    height: 1140px;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputFieldBox = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
`;

const Title = styled.div`
    display: flex;
    color: white;
    font-size: 36px;
`;

export { ImageContainer, LoginBox, InputFieldBox, Title };
import styled from 'styled-components';
import penn from '../../media/penn.jpg';

const ImageContainer = styled.div`
    display: flex;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${penn});
    justify-content: center;
    align-items: center;
    background-size: cover;
    height: 1240px;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
`;

const GreaterFieldBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    align-items: center;
    flex-direction: column;
`;

const InputFieldBox = styled.div`
    display: flex;
`;

const Title = styled.div`
    display: flex;
    color: white;
    font-size: 36px;
`;

const Button = styled.button`
  background-color: crimson;
  color: white;
  font-size: 16px;
  padding: 10px 60px;
  border-radius: 5px;
  cursor: pointer;
`;

export { ImageContainer, GreaterFieldBox, LoginBox, InputFieldBox, Title, Button };
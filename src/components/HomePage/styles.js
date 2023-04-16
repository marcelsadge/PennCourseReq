import styled from 'styled-components';
import penn from '../../media/penn.jpg';

const ImageContainer = styled.div`
    display: flex;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${penn});
    background-size: cover;
    height: 1000px;
    position: relative;
`;

const PennImage = styled.img`
    width: 100%;
`;

export { ImageContainer, PennImage };
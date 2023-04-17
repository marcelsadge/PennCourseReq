import React from "react";
import styled from 'styled-components';

const FBox = styled.div`
  padding: 1px 10px;
  background: #101c5c;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
   
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`;
   
const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;
   
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(190px, 1fr));
  grid-gap: 20px;
  margin-left: 300px;
`;
   
const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: #e5e5e5;
      transition: 200ms ease-in;
  }
`;
   
const Heading = styled.p`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: bold;
`;

const AuthorHeading = styled.p`
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 275px;
  font-weight: bold;
`;
  
function Footer () {
  return (
    <FBox>
      <Container>
        <Row>
          <Column>
            <Heading>Contact: pennrecbusiness@gmail.com</Heading>
          </Column>
        </Row>
        <AuthorHeading>Created by:{' '}
            <FooterLink href="">
                Ali Krema, 
            </FooterLink>
            <FooterLink href="">
                Sasha Sidach, 
            </FooterLink>
            <FooterLink href="">
                Junhao Zhang
            </FooterLink>
        </AuthorHeading>
      </Container>
    </FBox>
  );
};
export default Footer;
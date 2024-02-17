import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: #fafafa;
`;

const Header = styled.header`
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 16px 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  span {
    color: var(--Black-12, #1a181e);
    font-size: 20px;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid gray;
  color: white;

  a {
    text-decoration: none;
    color: black;
    border-radius: 20px;
    padding: 8px 10px;
  }

  .signup {
    background: #1e2640;
    color: white;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 10px 80px;
`;

const Subheading = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  img {
    width: 600px;
  }
`;

const Section2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
`;

const Section3 = styled.div`
  flex: 1;
  width: 25%;
  display: flex;
  flex-direction: column;
  position: relative;

  div {
    width: 100%;
    color: var(--Black-12, #1a181e);
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;

  div {
    color: var(--Black-12, #1a181e);
    font-size: 55px;
    font-weight: 500;
    height: fit-content;
  }
`;

const Home = () => {
  return (
    <AppContainer>
      <Header>
        <span>Admin Dashboard</span>
        <Buttons>
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/signup" className="signup">
            <div>Signup</div>
          </Link>
        </Buttons>
      </Header>
      <Main>
        <Section>
          <Content>
            <div>It's time to digitalize your business!</div>
          </Content>
          <img src="/assets/transacs.png"></img>
        </Section>
        <Subheading>What's in it for you?</Subheading>
        <Section2>
          <Section3>
            <img src="/assets/4.png"></img>
            <div>Hassle free logins</div>
          </Section3>
          <Section3>
            <div>Manage Orders and transactions with ease</div>
            <img src="/assets/1.png"></img>
          </Section3>
          <Section3>
            <div>Manage store inventory</div>
            <img src="/assets/2.png"></img>
          </Section3>
        </Section2>
        <Section>
          <img src="/assets/charts.png"></img>
          <Content style={{ fontSize: "30px" }}>
            <div>Take decisions efficiently with data visualizations</div>
          </Content>
        </Section>
      </Main>
    </AppContainer>
  );
};

export default Home;

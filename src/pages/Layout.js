import React from "react";
import NavbarContainer from "../components/NavBar";
import { Header } from "../components/Header";
import { styled } from "styled-components";
import { list } from "../constants/navbarItems";
import { useSelector } from "react-redux";
import Toasts from "../components/Toasts";

const Master = styled.div`
  display: flex;
  width: 100%;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fafafa;
`;

const Layout = (props) => {
  const toastState = useSelector((state) => state.toasts);

  return (
    <Master>
      <NavbarContainer navbarItems={list} />
      <RightContent>
        <Header />
        {props.children}
      </RightContent>
      {toastState?.toasts?.length ? (
        <Toasts toasts={toastState?.toasts} />
      ) : null}
    </Master>
  );
};

export default Layout;

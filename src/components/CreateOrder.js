import React, { useState } from "react";
import { styled } from "styled-components";
import OrderForm from "./OrderForm";

const Master = styled.div`
  width: 500px;
  min-height: 600px;
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: 2px 2px 8px gray;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

const Title = styled.div`
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  align-items: center;
  padding: 8px 16px 8px 16px;
  color: var(--Black-12, #1a181e);
  font-size: 18px;
  font-weight: 500;

  .material-symbols-outlined {
    cursor: pointer;
    font-size: 20px;
  }
`;

const Error = styled.div`
  color: red;
  padding: 13px 5px 5px;
  text-align: center;
  font-size: 16px;
`;

const CreateOrder = ({ display, setDisplay, children, type }) => {
  const [error, setError] = useState("");

  // if we need to map through children =>
  // const newChildren= React.Children.map(children, (child)=>{
  // return React.cloneElement(child, props object)
  // })

  const newChildren = React.cloneElement(children, {
    setError: setError,
    setDisplay: setDisplay,
  });

  return display ? (
    <Master>
      <Title>
        <span>Create a new {type === "inventory" ? "item" : "order"}</span>
        <span
          onClick={() => setDisplay(false)}
          class="material-symbols-outlined"
        >
          close
        </span>
      </Title>
      {error ? <Error>{error}</Error> : null}
      {newChildren}
    </Master>
  ) : null;
};

export default CreateOrder;

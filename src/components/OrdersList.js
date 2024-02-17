import CreateOrder from "./CreateOrder";
import TransactionContainer from "./Transactions";
import { styled } from "styled-components";
import { useState } from "react";
import OrderForm from "./OrderForm";
import useOrders from "../hooks/useOrders";

const Master = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  border-radius: 8px;
  margin-top: -4px;
`;

const Container1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const LeftBold = styled.div`
  color: var(--Black-12, #1a181e);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const OrderButton = styled.button`
  background-color: #1e2640;
  color: white;
  border-radius: 4px;
  height: 36px;
  padding: 0px 12px;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

const OrdersList = () => {
  const [display, setDisplay] = useState(false);
  const { data, setData, error, page = 0, setPage = () => {} } = useOrders();

  return (
    <Master>
      <Container1>
        <LeftBold>Orders | This month</LeftBold>
        <OrderButton onClick={() => setDisplay((prev) => !prev)}>
          <span class="material-symbols-outlined">add</span>
          <span>Add order</span>
        </OrderButton>
      </Container1>
      <TransactionContainer
        data={data}
        type={"Order"}
        page={page}
        setPage={setPage}
      />
      <CreateOrder display={display} setDisplay={setDisplay}>
        <OrderForm />
      </CreateOrder>
    </Master>
  );
};

export default OrdersList;

import { styled } from "styled-components";
import CreateOrder from "./CreateOrder";
import { useState } from "react";

const Master = styled.div``;
const Container1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Left = styled.div`
  color: var(--Black-12, #1a181e);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;
const LeftBold = styled.div`
  color: var(--Black-12, #1a181e);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 137px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
`;
const RightText = styled.span`
  margin-right: 16px;
  color: var(--Black-30, #4d4d4d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const AggregateContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
`;
const Item = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(26, 24, 30, 0.04);
  flex: 1;
`;
const Title = styled.div`
  margin-bottom: 16px;
  color: var(--Black-30, #4d4d4d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const Amount = styled.div`
  color: var(--Black-12, #1a181e);
  font-size: 32px;
  font-weight: 500;
  line-height: 38px;
`;

export default function OverviewContainer() {
 
  return (
    <Master>
      <Container1>
        <Left>Overview</Left>
        <Right>
          <RightText>Last Month</RightText>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.27748 5.77748C2.61381 5.44114 3.14013 5.41057 3.511 5.68575L3.61726 5.77748L8 10.1598L12.3827 5.77748C12.7191 5.44114 13.2454 5.41057 13.6163 5.68575L13.7225 5.77748C14.0589 6.11381 14.0894 6.64013 13.8142 7.011L13.7225 7.11726L8.66989 12.1699C8.33355 12.5062 7.80724 12.5368 7.43636 12.2616L7.33011 12.1699L2.27748 7.11726C1.90751 6.74729 1.90751 6.14745 2.27748 5.77748Z"
              fill="#4D4D4D"
            />
          </svg>
        </Right>
      </Container1>
      <AggregateContainer>
        <Item>
          <Title>Online Orders</Title>
          <Amount>231</Amount>
        </Item>
        <Item>
          <Title>Amount received</Title>
          <Amount>&#8377;23,92,312.19</Amount>
        </Item>
      </AggregateContainer>
      <Container1>
        <LeftBold>Transactions | This month</LeftBold>

      </Container1>
    </Master>
  );
}

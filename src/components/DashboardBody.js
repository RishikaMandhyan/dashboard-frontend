import { styled } from "styled-components";

import Overview from "./Overview";
import Transaction from "./Transactions";
import useTransactions from "../hooks/useTransactions";

const Master = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

export function DashboardBody() {
  const { data, setData, error, page = 0, setPage } = useTransactions();
  return (
    <Master>
      <Overview />
      <Transaction
        data={data}
        type={"Transaction"}
        page={page}
        setPage={setPage}
      />
    </Master>
  );
}

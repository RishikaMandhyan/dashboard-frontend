import { styled } from "styled-components";

import Pagination from "./Pagination";

const Master = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 12px 12px 24px 12px;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(26, 24, 30, 0.04);
  margin-top: -4px;
`;
const SearchSortBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 248px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;

  .searchInput {
    border: none;
    width: 100%;
    outline: none;
    &::placeholder {
      color: var(--Black-60, #999);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 12px;
  height: 36px;
`;

const Sort = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 6px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;

  .sort {
    color: var(--Black-30, #4d4d4d);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;
// const Download = styled.div`
//   box-sizing: border-box;
//   width: 36px;
//   height: 36px;
//   border-radius: 4px;
//   border: 1px solid #d9d9d9;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Header = styled.div`
  margin-top: 12px;
  display: flex;
  padding: 10px 12px;
  align-items: center;
  gap: 40px;
  border-radius: 4px;
  background: #f2f2f2;

  color: var(--Black-30, #4d4d4d);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
const Title1 = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 4px;
`;
const Title2 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: 4px;
`;
const Transaction = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 14px 12px;
  align-items: center;
  gap: 40px;
  background: #fff;
  height: 48px;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  .id {
    color: var(--Primary-Blue, #146eb4);
    font-weight: 500;
  }

  .data {
    color: var(--Black-12, #1a181e);
  }
`;
const Border = styled.div`
  height: 1px;
  background: #e6e6e6;
`;

export default function TransactionContainer({ data, type, page, setPage }) {
  return (
    <Master>
      <SearchSortBar>
        <Search>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <g clip-path="url(#clip0_71368_3685)">
              <path
                d="M5.95 10.5263C3.4412 10.5263 1.4 8.48 1.4 5.96491C1.4 3.44982 3.4412 1.40351 5.95 1.40351C8.4588 1.40351 10.5 3.44982 10.5 5.96491C10.5 8.48 8.4588 10.5263 5.95 10.5263ZM10.7443 9.48281C11.4674 8.49474 11.9 7.2814 11.9 5.96491C11.9 2.67579 9.2309 0 5.95 0C2.6691 0 0 2.67579 0 5.96491C0 9.25403 2.6691 11.9298 5.95 11.9298C7.4137 11.9298 8.7542 11.3944 9.7909 10.5116L12.2528 12.9796C12.3893 13.1165 12.5685 13.1853 12.7477 13.1853C12.9269 13.1853 13.1061 13.1165 13.2426 12.9796C13.5163 12.7053 13.5163 12.2618 13.2426 11.9874L10.7443 9.48281Z"
                fill="#999999"
              />
            </g>
            <defs>
              <clipPath id="clip0_71368_3685">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input className="searchInput" placeholder="Search by order ID..." />
        </Search>

        <SortContainer>
          <Sort>
            <span className="sort">Sort</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.62301 9.93375C1.83129 9.72547 2.16897 9.72547 2.37725 9.93375L4.641 12.1975L6.90474 9.93375C7.11302 9.72547 7.45071 9.72547 7.65899 9.93375C7.86727 10.142 7.86727 10.4797 7.65899 10.688L5.01812 13.3289C4.80984 13.5371 4.47215 13.5371 4.26387 13.3289L1.62301 10.688C1.41473 10.4797 1.41473 10.142 1.62301 9.93375Z"
                fill="#4D4D4D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.64095 2.51515C4.9355 2.51515 5.17428 2.75393 5.17428 3.04849L5.17428 12.9517C5.17428 13.2463 4.9355 13.4851 4.64095 13.4851C4.3464 13.4851 4.10762 13.2463 4.10762 12.9517L4.10762 3.04849C4.10762 2.75393 4.3464 2.51515 4.64095 2.51515Z"
                fill="#4D4D4D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.3772 6.06646C14.169 6.27474 13.8313 6.27474 13.623 6.06646L11.3592 3.80272L9.0955 6.06646C8.88722 6.27474 8.54953 6.27474 8.34126 6.06646C8.13298 5.85818 8.13298 5.52049 8.34126 5.31221L10.9821 2.67135C11.1904 2.46307 11.5281 2.46307 11.7364 2.67135L14.3772 5.31221C14.5855 5.52049 14.5855 5.85818 14.3772 6.06646Z"
                fill="#4D4D4D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.3593 13.4851C11.0647 13.4851 10.826 13.2463 10.826 12.9517L10.826 3.04847C10.826 2.75392 11.0647 2.51514 11.3593 2.51514C11.6538 2.51514 11.8926 2.75392 11.8926 3.04847L11.8926 12.9517C11.8926 13.2463 11.6538 13.4851 11.3593 13.4851Z"
                fill="#4D4D4D"
              />
            </svg>
          </Sort>
        </SortContainer>
      </SearchSortBar>

      <Header>
        <Title1>{type} ID</Title1>
        <Title1>
          <span>{type} date</span>
        </Title1>
        <Title2>{type} amount</Title2>
        <Title2>
          <span>{type === "Order" ? "Order buyer" : "Transaction type"}</span>
        </Title2>
      </Header>

      {type === "Order" ? (
        <>
          {data?.list?.map((item, index) => {
            return (
              <div key={`s${index}`}>
                <Transaction>
                  <Title1 className="id">#{item.orderNo}</Title1>
                  <Title1 className="data">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Title1>
                  <Title2 className="data">&#8377;{item.price}</Title2>
                  <Title2 className="data">{item.buyer}</Title2>
                </Transaction>
                <Border />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {data?.list?.map((item, index) => {
            return (
              <div key={`s${index}`}>
                <Transaction>
                  <Title1 className="id">#{item.transactionNo}</Title1>
                  <Title1 className="data">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Title1>
                  <Title2 className="data">&#8377;{item.amount}</Title2>
                  <Title2 className="data">{item.transactionType}</Title2>
                </Transaction>
                <Border />
              </div>
            );
          })}
        </>
      )}
      <Pagination page={page} setPage={setPage} total={data?.total} />
    </Master>
  );
}

import { styled } from "styled-components";

const Master = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
  width: fit-content;
  align-self: center;

  span {
    color: var(--Black-30, #4d4d4d);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;
const Previous = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 6px 12px 6px 6px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: 1px solid var(--Black-85, #d9d9d9);
  background: var(--Black-100, #fff);
  cursor: pointer;
`;
const Next = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 6px 6px 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: 1px solid var(--Black-85, #d9d9d9);
  background: var(--Black-100, #fff);
  cursor: pointer;
`;
const Pages = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 8px;

  .selected {
    color: var(--Black-100, #fff);
    border-radius: 4px;
    background: #1e2640;
  }
`;
const Page = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  padding: 6px 8px;
  cursor: pointer;
  color: var(--Black-30, #4d4d4d);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PaginationContainer({
  page = 0,
  setPage = () => {},
  total = 0,
}) {
  const numPages = Math.ceil(total / 15);
  console.log(numPages);
  const temp = new Array(numPages).fill(1);

  const handleNext = () => {
    if (page + 1 <= numPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page - 1 >= 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Master>
      <Previous onClick={handlePrev}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.7803 3.96967C11.4874 3.67678 11.0126 3.67678 10.7197 3.96967L6.21967 8.46967C6.07902 8.61032 6 8.80109 6 9C6 9.19891 6.07902 9.38968 6.21967 9.53033L10.7197 14.0303C11.0126 14.3232 11.4874 14.3232 11.7803 14.0303C12.0732 13.7374 12.0732 13.2626 11.7803 12.9697L7.81066 9L11.7803 5.03033C12.0732 4.73744 12.0732 4.26256 11.7803 3.96967Z"
            fill="#4D4D4D"
          />
        </svg>
        <span>Previous</span>
      </Previous>
      <Pages>
        {temp.map((item, index) => {
          return (
            <Page
              onClick={() => setPage(index)}
              key={index}
              className={`${index === page ? "selected" : ""}`}
            >
              {index + 1}
            </Page>
          );
        })}
      </Pages>
      <Next onClick={handleNext}>
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.21967 3.96967C6.51256 3.67678 6.98744 3.67678 7.28033 3.96967L11.7803 8.46967C11.921 8.61032 12 8.80109 12 9C12 9.19891 11.921 9.38968 11.7803 9.53033L7.28033 14.0303C6.98744 14.3232 6.51256 14.3232 6.21967 14.0303C5.92678 13.7374 5.92678 13.2626 6.21967 12.9697L10.1893 9L6.21967 5.03033C5.92678 4.73744 5.92678 4.26256 6.21967 3.96967Z"
            fill="#4D4D4D"
          />
        </svg>
      </Next>
    </Master>
  );
}

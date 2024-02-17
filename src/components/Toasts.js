import { styled } from "styled-components";

const Master = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Toast = styled.div`
  min-width: 150px;
  width: fit-content;
  padding: 5px 20px;
  background: #454e6c;
  color: white;
  height: 38px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.type === "success") return `background: #E7F1E8; color: black;`;
    else if (props.type === "failure")
      return `background: #FFD5D4;  color: black;`;
  }}
`;

const Toasts = ({ toasts }) => {
  console.log(toasts);
  return (
    <Master>
      {toasts.map((item) => {
        return <Toast type={item.type}>{item.message}</Toast>;
      })}
    </Master>
  );
};

export default Toasts;

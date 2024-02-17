import { useLocation, useNavigate } from "react-router-dom";
import useInventoryItem from "../hooks/useInventoryItem";
import { useState } from "react";
import { styled } from "styled-components";
import useAxiosPrivateInstance from "../hooks/useAxiosPrivateInstance";
import { useDispatch } from "react-redux";
import { addToast, removeToast } from "../store/toastSlice";

const Master = styled.div`
  box-sizing: border-box;
  display: flex;

  padding: 32px;
  flex-direction: column;
  border-radius: 8px;
  margin-top: -4px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  position: relative;

  input {
    height: 40px;
    padding: 8px;
    margin: 8px 0px 20px 0px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    &::placeholder {
      color: var(--Black-60, #999);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }
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

const Submit = styled.button`
  align-self: center;
  width: 20%;
  background-color: #1e2640;
  color: white;
  border-radius: 4px;
  height: 36px;
  padding: 0px 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;

const Cancel = styled.button`
  align-self: center;
  width: 20%;
  background-color: #fff;
  border-radius: 4px;
  height: 36px;
  padding: 0px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--Black-30, #4d4d4d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border: 1px solid #d9d9d9;

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

const Error = styled.div`
  color: red;
  padding: 13px 5px 5px;
  text-align: center;
  font-size: 16px;
`;

export default function IItem() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [error, setError] = useState("");
  //or const id= location.state.id

  const { data, name, setName, maxQuantity, setMaxQuantity, price, setPrice } =
    useInventoryItem(id);

  console.log(name);

  const axiosPrivateInstance = useAxiosPrivateInstance();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (name === "") {
      setError("All fields are required");
      return;
    }

    if (price < 0 || maxQuantity < 0) {
      setError("Negative values do not make sense");
      return;
    }
    try {
      const res = await axiosPrivateInstance.post(`/inventory/${id}`, {
        name: name,
        maxQuantity: maxQuantity,
        price: price,
      });

      let newToast = {
        id: Date.now(),
        message: "Item updated successfully!",
        type: "success",
      };

      dispatch(addToast(newToast));

      setTimeout(() => {
        dispatch(removeToast({ id: newToast.id }));
      }, 4000);

      navigate("/inventory");
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    navigate("/inventory");
  }

  return (
    <Master>
      <Container1>
        <LeftBold>Update Item #{id}</LeftBold>
      </Container1>
      <Form>
        {error ? <Error>{error}</Error> : null}
        <label>Name</label>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label>Availaibility</label>
        <input
          placeholder="Item availaibility"
          type="number"
          value={maxQuantity}
          onChange={(e) => {
            setMaxQuantity(e.target.value);
          }}
        ></input>
        <label>Price</label>
        <input
          placeholder="Item Price"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Cancel onClick={handleCancel}>
            <span class="material-symbols-outlined">arrow_back</span>
            <span>Cancel</span>
          </Cancel>
          <Submit onClick={handleSubmit}>Submit</Submit>
        </div>
      </Form>
    </Master>
  );
}

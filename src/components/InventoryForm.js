import { useDispatch } from "react-redux";
import { addToast, removeToast } from "../store/toastSlice";
import { useState } from "react";
import { styled } from "styled-components";
import useAxiosPrivateInstance from "../hooks/useAxiosPrivateInstance";

const Form = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  padding: 16px;

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

const InventoryForm = ({ setDisplay, setError }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const axiosPrivateInstance = useAxiosPrivateInstance();

  const dispatch = useDispatch();

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
      const res = await axiosPrivateInstance.post(`/inventory/new`, {
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

      setDisplay(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form>
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
        <Submit onClick={handleSubmit}>Submit</Submit>
      </div>
    </Form>
  );
};

export default InventoryForm;

import { useDispatch } from "react-redux";
import useAxiosPrivateInstance from "../hooks/useAxiosPrivateInstance";
import { styled } from "styled-components";
import React, { useState } from "react";
import useInventory from "../hooks/useInventory";
import { addToast, removeToast } from "../store/toastSlice";

const Form = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  input {
    height: 30px;
    padding: 8px;
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

const ItemsList = styled.div`
  height: fit-content;
  max-height: 200px;
  overflow: auto;
  background: #fafafa;
`;

const ItemsSearchList = styled.div`
  height: fit-content;
  max-height: 150px;
  overflow-y: scroll;
  cursor: pointer;
  border-radius: 8px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    z-index: 1;
  }

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;

const Item = styled.div`
  padding: 6px;
  height: fit-content;
  max-height: 300px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: #f2f2f2;
  }
`;

const ItemIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`;

const OrderTotal = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 36px;
  width: fit-content;
  padding: 8px 20px;
`;

const Submit = styled.div`
  background-color: #1e2640;
  color: white;
  border-radius: 4px;
  height: 36px;
  width: fit-content;
  padding: 8px 20px;
  cursor: pointer;
`;

const OrderForm = ({ setError, setDisplay }) => {
  const [buyer, setBuyer] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const { data, setData } = useInventory(search);

  const dispatch = useDispatch();
  const axiosPrivateInstance = useAxiosPrivateInstance();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleAddItem(item) {
    const index = items?.findIndex((orderItem) => orderItem._id === item._id);
    if (index !== -1) {
      handleIncrease(item._id);
    } else {
      setItems((prev) => {
        return [
          ...prev,
          { ...item, quantity: 1, maxQuantity: item?.maxQuantity - 1 },
        ];
      });

      setOrderTotal((prev) => prev + item.price);
    }
  }

  function handleDecrease(id) {
    const newItems = [];
    items?.forEach((item) => {
      if (item?._id === id && item?.quantity > 1) {
        newItems.push({
          ...item,
          quantity: item?.quantity - 1,
          maxQuantity: item?.maxQuantity + 1,
        });
        setOrderTotal((prev) => prev - item.price);
      } else {
        newItems.push(item);
      }
    });

    setItems(newItems);
  }

  function handleIncrease(id) {
    const newItems = [];

    items?.forEach((item) => {
      if (item?._id === id && 1 <= item?.maxQuantity) {
        newItems.push({
          ...item,
          quantity: item?.quantity + 1,
          maxQuantity: item?.maxQuantity - 1,
        });

        setOrderTotal((prev) => prev + item.price);
      } else {
        newItems.push(item);
      }
    });

    setItems(newItems);
  }

  async function handleSubmit() {
    if (buyer === "" || items?.length === 0) {
      setError("All fields are required");
      return;
    } else setError("");

    try {
      const res = await axiosPrivateInstance.post("/orders", {
        buyer: buyer,
        items: items,
        orderTotal: orderTotal,
      });

      setBuyer("");

      let newToast = {
        id: Date.now(),
        message: "Order created successfully!",
        type: "success",
      };
      dispatch(addToast(newToast));
      setTimeout(() => {
        dispatch(removeToast({ id: newToast.id }));
      }, 4000);

      setItems([]);
      setOrderTotal(0);
      setDisplay(false);
    } catch (err) {
      console.error(err);
      let newToast = {
        id: Date.now(),
        message: "Could not create the order!",
        type: "failure",
      };
      dispatch(addToast(newToast));
      setTimeout(() => {
        dispatch(removeToast({ id: newToast.id }));
      }, 4000);
    }
  }
  return (
    <>
      <Form>
        <input
          placeholder="Add Buyer"
          value={buyer}
          onChange={(e) => {
            setBuyer(e.target.value);
          }}
        ></input>
        <ItemsList>
          {items?.map((item) => {
            return (
              <Item>
                <span>{item?.name}</span>
                <ItemIcons>
                  <span
                    onClick={() => handleDecrease(item?._id)}
                    class="material-symbols-outlined"
                  >
                    remove
                  </span>
                  <span>{item.quantity}</span>
                  <span
                    onClick={() => handleIncrease(item?._id)}
                    class="material-symbols-outlined"
                  >
                    add
                  </span>
                </ItemIcons>
              </Item>
            );
          })}
        </ItemsList>

        <input
          placeholder="Search Items to add"
          onChange={handleChange}
          value={search}
        ></input>

        <ItemsSearchList>
          {data?.map((item) => {
            return (
              <Item onClick={() => handleAddItem(item)}>{item?.name}</Item>
            );
          })}
        </ItemsSearchList>
      </Form>
      <Footer>
        <OrderTotal>Order total: &#8377;{orderTotal}</OrderTotal>
        <Submit onClick={handleSubmit}>Submit</Submit>
      </Footer>
    </>
  );
};

export default OrderForm;

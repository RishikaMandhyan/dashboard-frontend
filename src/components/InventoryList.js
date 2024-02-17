import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateOrder from "./CreateOrder";
import InventoryForm from "./InventoryForm";

import useInventory from "../hooks/useInventory";

const Master = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 32px;
  flex-direction: column;
  border-radius: 8px;
  margin-top: -4px;
`;

const Header = styled.div`
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
  gap: 30px;
`;

const List = styled.div`
  padding: 14px 12px;
  background: #fff;
`;

const Items = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 14px 12px;
  align-items: center;
  gap: 40px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 4px;
  cursor: pointer;

  .id {
    color: var(--Primary-Blue, #146eb4);
    font-weight: 500;
  }

  .data {
    color: var(--Black-12, #1a181e);
  }

  &:hover {
    background: #fafafa;
  }
`;
const Border = styled.div`
  height: 1px;
  background: #e6e6e6;
`;

const ProductButton = styled.button`
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

export default function InventoryList() {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const { data, setData, error } = useInventory(search);
  const navigate = useNavigate();
  console.log(data);

  function handleClick(id) {
    navigate(`/inventory/${id}`, { state: { id: id } }); //passing state object in the options object
  }

  return (
    <Master>
      <Container1>
        <LeftBold>Current Inventory</LeftBold>
        <ProductButton onClick={() => setDisplay((prev) => !prev)}>
          <span class="material-symbols-outlined">add</span>
          <span>Add product</span>
        </ProductButton>
      </Container1>

      <List>
        <Header>
          <Title1>Item ID</Title1>
          <Title1>
            <span>Item name</span>
          </Title1>
          <Title2>Item price</Title2>
          <Title2>
            <span>Quantity available</span>
          </Title2>
        </Header>

        {data?.map((item, index) => {
          return (
            <div key={item?._id}>
              <Items onClick={() => handleClick(item?._id)}>
                <Title1 className="id">#{item._id}</Title1>
                <Title1 className="data">{item.name}</Title1>
                <Title2 className="data">&#8377;{item.price}</Title2>
                <Title2 className="data">
                  {item.maxQuantity}
                  <span class="material-symbols-outlined">more_horiz</span>
                </Title2>
              </Items>
              <Border />
            </div>
          );
        })}
      </List>

      <CreateOrder display={display} setDisplay={setDisplay} type={"inventory"}>
        <InventoryForm />
      </CreateOrder>
    </Master>
  );
}

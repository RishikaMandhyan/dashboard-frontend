import { styled } from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MasterContainer = styled.div`
  box-sizing: border-box;
  background: #1e2640;
  display: flex;
  padding: 8px 10px;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  width: fit-content;
  max-width: 250px;
  overflow: hidden;
  transition: width 5s ease-in-out;
`;
const NavTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1 0 0;
  position: relative;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  color: white;
  padding: 8px 16px;
  border-bottom: 1px solid #d9d9d9;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  // align-self: stretch;
  gap: 4px;

  .storeTitle {
    color: var(--Black-100, #fff);
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const ListItem = styled.div`
  align-self: flex-start;
  color: white;
  background: #1e2640;
  display: flex;
  align-items: center;
  padding: 8px 25px;
  gap: 12px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;

  ${(props) => {
    return props.active
      ? `
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    `
      : ``;
  }}

  .navbarItem {
    color: var(--Black-100, #fff);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    opacity: 0.8;
  }

  .active {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NavBottom = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 6px 12px;
  border-radius: 4px;
  background: #353c53;
  gap: 12px;
`;

const BottomIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
`;
const BottomContent = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;

.credits{

color: var(--Black-100, #FFF);
font-size: 13px;
font-weight: 400;
line-height: 16px;
opacity: 0.8;
}


.creditamount{
 color: var(--Black-100, #FFF);
font-size: 16px;=
font-weight: 500;
line-height: 24px; 
}
`;

export default function NavbarContainer({ navbarItems }) {
  const location = useLocation();

  const [display, setDisplay] = useState(true);
  const [activeTab, setActiveTab] = useState(location.pathname.split("/")[1]);

  return (
    <MasterContainer>
      <NavTop>
        <IconBox>
          <Icon onClick={() => setDisplay((prev) => !prev)}>
            <span class="material-symbols-outlined">menu</span>
          </Icon>
          <Title>
            <span
              className="storeTitle"
              style={{ display: `${display ? "block" : "none"}` }}
            >
              Best Bakery
            </span>
          </Title>
        </IconBox>

        <NavList>
          {navbarItems.map((item) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/${item?.name?.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(item?.name?.toLowerCase());
                }}
              >
                <ListItem
                  active={
                    item?.name?.toLowerCase() === activeTab ? true : false
                  }
                >
                  <span class="material-symbols-outlined">{item.img}</span>
                  <span
                    style={{ display: `${display ? "block" : "none"}` }}
                    lassName="navbarItem"
                  >
                    {item.name}
                  </span>
                </ListItem>
              </Link>
            );
          })}
        </NavList>
      </NavTop>
      {/* <NavBottom>
        <BottomIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.0002 3.79727C2.42343 3.79727 1.8002 4.35527 1.8002 5.24727V18.7473C1.8002 19.6393 2.42343 20.1973 3.0002 20.1973H21.0002C21.577 20.1973 22.2002 19.6393 22.2002 18.7473V15.8473H17.0003C14.874 15.8473 13.1503 14.1236 13.1503 11.9973C13.1503 9.87097 14.874 8.14727 17.0003 8.14727H22.2002V5.24727C22.2002 4.35527 21.577 3.79727 21.0002 3.79727H3.0002ZM23.8002 8.14727V5.24727C23.8002 3.65398 22.6326 2.19727 21.0002 2.19727H3.0002C1.36782 2.19727 0.200195 3.65398 0.200195 5.24727V18.7473C0.200195 20.3405 1.36782 21.7973 3.0002 21.7973H21.0002C22.6326 21.7973 23.8002 20.3405 23.8002 18.7473V15.8473H23.8503V8.14727H23.8002ZM16.0002 11.9473C16.0002 11.4778 16.3808 11.0973 16.8502 11.0973H18.1502C18.6197 11.0973 19.0002 11.4778 19.0002 11.9473C19.0002 12.4167 18.6197 12.7973 18.1502 12.7973H16.8502C16.3808 12.7973 16.0002 12.4167 16.0002 11.9473ZM14.8503 11.9973C14.8503 10.8099 15.8129 9.84727 17.0003 9.84727H22.1503V14.1473H17.0003C15.8129 14.1473 14.8503 13.1847 14.8503 11.9973Z"
              fill="white"
            />
          </svg> */}
      {/* </BottomIcon> */}
      {/* <BottomContent style={{ display: `${display ? "block" : "none"}` }}>
          <span className="credits">Current Credits</span>
          <span className="creditamount">222.10</span>
        </BottomContent> */}
      {/* </NavBottom> */}
    </MasterContainer>
  );
}

import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";

import useGraphs from "../hooks/useGraphs";
import { months } from "../constants/months";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Master = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Overview = styled.span`
  color: var(--Black-12, #1a181e);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const Month = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px;
  height: 36px;
  width: 80px;
  gap: 16px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: var(--Black-30, #4d4d4d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
  position: relative;
`;

const MonthSub = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Calendar = styled.div`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  position: absolute;
  top: 120%;
  width: 216px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin-right: 105px;
  cursor: pointer;
`;

const CalendarItem = styled.span`
  width: 50px;
  text-align: center;
  &:hover {
    background: #f2f2f2;
  }
`;

const AnalyticsOverview = styled.div`
  display: flex;
  padding: 15px;
  gap: 15px;
  width: 100%;
  height: 175px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: var(--Black-30, #4d4d4d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const OverviewItem = styled.div`
  height: 100%;
  border-radius: 16px;
  padding: 20px;

  ${(props) => {
    return `flex: ${props.flex};
    background-color: ${props.bgColor};
    `;
  }}
`;

const OverviewTitle = styled.div`
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

const Graphs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const GraphItem = styled.div`
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 15px 25px 55px 25px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${(props) => {
    return `flex: ${props.flex};
    `;
  }}
`;
const GraphTitle = styled.div`
  color: var(--Black-12, #1a181e);
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },

  plugins: {
    legend: {
      position: "left",
      display: true,
    },

    title: {},
  },
};

let newOptions = {};

const AnalyticsBody = () => {
  const currMonth = new Date().getMonth();
  const [display, setDisplay] = useState(false);
  const [month, setMonth] = useState(currMonth);

  const { data, setData } = useGraphs(month);

  function generateData(type, temp) {
    const labels = temp?.map((item) => item.label);
    const generatedData = {
      labels: labels,
      datasets: [
        {
          data: temp?.map((item) => item.value),
          borderColor: "#454e6c",
          backgroundColor: "#454e6c",
        },
      ],
    };

    if (type === "Pie") {
      generatedData.datasets[0].backgroundColor = [
        "#d8dff9",
        "#aebbe2",
        "#7c87aa",
        "#616a8b",
        "#454e6c",
      ];
      generatedData.datasets[0].borderColor = undefined;
    }
    if (type === "Line") {
      newOptions = {
        ...options,
        plugins: {
          ...options.plugins,
          legend: {
            ...options.plugins.legend,
            display: false,
          },
        },
      };
    }
    return generatedData;
  }

  function generateDataBar(temp) {
    console.log(temp);
    const labels = temp?.sweets?.dataPoints?.map((item) => item.label);
    const generatedData = {
      labels: labels,
      datasets: [
        {
          label: "Sweets",
          data: temp?.sweets?.dataPoints?.map((item) => item.value),
          backgroundColor: "#454e6c",
        },
        {
          label: "Confectionery",
          data: temp?.confectionery?.dataPoints?.map((item) => item.value),
          backgroundColor: "#aebbe2",
        },
        {
          label: "Breads",
          data: temp?.breads?.dataPoints?.map((item) => item.value),
          backgroundColor: "#7c87aa",
        },
      ],
    };

    return generatedData;
  }

  return (
    <Master>
      <FilterContainer>
        <Overview>Monthly Overview</Overview>
        <Month>
          <MonthSub onClick={() => setDisplay((prev) => !prev)}>
            {months[month - 1].name}
            <span class="material-symbols-outlined">expand_more</span>
          </MonthSub>
          {display ? (
            <Calendar>
              {months.map((item) => {
                return (
                  <CalendarItem
                    onClick={() => {
                      setMonth(item.id);
                      setDisplay(false);
                    }}
                  >
                    {item.name}
                  </CalendarItem>
                );
              })}
            </Calendar>
          ) : null}
        </Month>
      </FilterContainer>
      <AnalyticsOverview>
        <OverviewItem flex={2.5} bgColor={"#fff"}>
          <OverviewTitle>Profits</OverviewTitle>
          <Amount>&#8377;{data?.[0]?.totalProfit}</Amount>
        </OverviewItem>
        <OverviewItem flex={1} bgColor={"#eaeefc"}>
          <OverviewTitle>Orders</OverviewTitle>
          <Amount>{data?.[1]?.totalOrders}</Amount>
        </OverviewItem>
        <OverviewItem flex={1} bgColor={"#dbe1f9"}>
          <OverviewTitle>Sales</OverviewTitle>
          <Amount>&#8377;{data?.[0]?.totalSales}</Amount>
        </OverviewItem>
        <OverviewItem flex={1} bgColor={"#d0d9f8"}>
          <OverviewTitle>Expenses</OverviewTitle>
          <Amount>&#8377;{data?.[0]?.totalExpenses}</Amount>
        </OverviewItem>
      </AnalyticsOverview>
      <Graphs>
        <GraphItem flex={2}>
          <GraphTitle>Sales</GraphTitle>
          <Line
            options={newOptions}
            data={generateData("Line", data?.[0]?.dataPoints)}
          />
        </GraphItem>
        <GraphItem flex={1}>
          <GraphTitle>Platform Orders</GraphTitle>
          <Pie
            options={options}
            data={generateData("Pie", data?.[2]?.dataPoints)}
          />
        </GraphItem>
      </Graphs>
      <Graphs>
        <GraphItem flex={1}>
          <GraphTitle>Orders</GraphTitle>
          <Line
            options={newOptions}
            data={generateData("Line", data?.[1]?.dataPoints)}
          />
        </GraphItem>
        <GraphItem flex={2}>
          <GraphTitle>Category Sales</GraphTitle>
          <Bar options={options} data={generateDataBar(data?.[3])} />
        </GraphItem>
      </Graphs>
    </Master>
  );
};

export default AnalyticsBody;

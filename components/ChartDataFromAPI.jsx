import styles from "./Chart.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label } from "recharts";
import { useEffect, useState } from "react";

// here we fetch data from the API
async function fetchData() {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate());
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const prisområde = "NO5";
  const url = `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_${prisområde}.json`;
  return await fetch(url).then((res) => res.json());
}

export default function ChartDataFromFile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);
  if (!data) return <div className={styles.container}>Loading...</div>;
  const convertedData = data.map((item) => {
    // convert from and to, to hours
    item.from = new Date(item.time_start).getHours();
    item.to = new Date(item.time_end).getHours();
    return {
      period: item.from,
      price: item.NOK_per_kWh * 1.25 + 0.1541,
    };
  });
  const { period: lowestPeriod, price: lowestPrice } = convertedData.reduce(
    (min, item) => {
      return item.price < min.price ? item : min;
    },
    convertedData[0]
  );
  const { period: highestPeriod, price: highestPrice } = convertedData.reduce(
    (max, item) => {
      return item.price > max.price ? item : max;
    },
    convertedData[0]
  );
  return (
    <div>
      <div className={styles.header}>
        <h1> Dagens strømpris for region NO5 (Vest, Bergen) </h1>
        <p> I dag er strømprisen lavest kl: {lowestPeriod}:00 </p>
        <p>
          {" "}
          Da koster det {parseFloat(lowestPrice.toString()).toFixed(2)} kr per
          kWt{" "}
        </p>
        <p> Det kan være lurt å bruke strømekrevende apperater da </p>
        <br></br>
        <p> I dag er strømprisen høyest kl: {highestPeriod}:00 </p>
        <p>
          {" "}
          Da koster det {parseFloat(highestPrice.toString()).toFixed(2)} kr per
          kWt{" "}
        </p>
        <p> Det kan være lurt å ikke bruke strømekrevende apperater da </p>
      </div>
      <div className={styles.container}>
        <LineChart id="123" width={1000} height={500} data={convertedData}>
          <XAxis dataKey="period">
            <Label
              value="Tid på døgnet"
              offset={-5}
              position="insideBottom"
              fontSize={20}
            />
          </XAxis>
          <YAxis
            label={{
              value: "Pris per kWh (Kr)",
              angle: -90,
              position: "insideLeft",
              fontSize: 20,
            }}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="price" stroke="#0b6623" dot={true} />
        </LineChart>
      </div>
    </div>
  );
}

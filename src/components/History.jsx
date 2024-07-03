import React, { useState, useEffect } from "react";
import arrowUp from "../assets/ArrowUp.png";
import arrowDown from "../assets/ArrowDown.png";
import image1 from "../assets/respiratory rate.png";
import image2 from "../assets/temperature.png";
import image3 from "../assets/HeartBPM.png";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { token } from "./data/axiosInstance";

const History = () => {
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [heartrate, setheartRate] = useState([]);
  const [diagnosticList, setDiagnosticList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        const responses = response.data;
        console.log(responses)
        const datap = responses.map(({ diagnosis_history }) =>
          diagnosis_history
            .slice(0, 6)
            .reverse()
            .map(({ blood_pressure, month, year }) => ({
              name: month.substring(0, 3) + ". " + year,
              systolic: blood_pressure.systolic.value,
              diastolic: blood_pressure.diastolic.value,
            }))
      
        );
        setBloodPressureData(datap[3]);
        const heartp = responses.map(({ diagnosis_history }) =>
          diagnosis_history.map(
            ({ heart_rate, temperature, respiratory_rate }) => ({
              heart: heart_rate.value,
              heartLevel: heart_rate.levels,
              respiratory: respiratory_rate.value,
              resLevel: respiratory_rate.levels,
              temperature: temperature.value,
              tempLevel: temperature.levels,
            })
          )
        );
        setheartRate(heartp[3]);
        const diagnostic = responses.map(({diagnostic_list})=>(
          diagnostic_list.map(({name, description, status})=>(
            {
              name,
              description,
              status
            }
          ))

        ))
        setDiagnosticList(diagnostic[3])
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(bloodPressureData);

  const colors = ["#E0F3FA", "#FFE6E9", "#FFE6F1"];
  const heartData = heartrate[0];
  const respiratoryData = heartrate[0];
  const temperatureData = heartrate[0];
  console.log(heartData);

  return (
    <div>
<div className="bg-white flex-1 rounded-2xl my-6 mx-4 p-4">
      <h1 className="font-semibold my-6 text-xl"> Diagnosis History</h1>
      <div className="flex justify-between bg-[#F4F0FE] rounded-lg px-4 py-6 h-[55%]">
        <ResponsiveContainer width="100%" height={300}>
          <div className="flex justify-between items-center px-4 ">
            <h2 className="font-bold text-xl ">Blood Pressure</h2>
            <select className="bg-[#F4F0FE]">
              <option value="Last six months">Last six months</option>
              <option value="Last three months">Last three months</option>
              <option value="Last month">Last month</option>
            </select>
          </div>
          <LineChart
            width={500}
            height={400}
            data={bloodPressureData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[60, 180]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#E66FD2"
              fill="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#8C6FE6"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-2xl bg-[#E66FD2]"></div>
            <h1 className="font-semibold text-sm">Systolic</h1>
          </div>
          <h1 className="font-semibold text-2xl">160</h1>
          <div className="flex justify-between items-center gap-2 ">
            <img src={arrowUp} alt="arrow up" />
            <p className="font-semibold text-sm w-[150px]">
              Higher than average
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2 items-center mt-4">
            <div className="w-3 h-3 rounded-2xl bg-[#8C6FE6]"></div>
            <h1 className="font-semibold text-sm">Diastolic</h1>
          </div>
          <h1 className="font-semibold text-2xl">78</h1>
          <div className="flex justify-between items-center gap-2">
            <img src={arrowDown} alt="arrow down" />
            <p className="font-semibold text-sm w-[150px]">
              Lower than average
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {respiratoryData && (
          <div
            className="flex-1 p-4 rounded-lg"
            style={{ backgroundColor: colors[0] }}
          >
            <div className="">
              <img src={image1} alt="respiratory icon" />
              <h2 className="font-semibold text-lg">Respiratory Rate</h2>
            </div>
            <h1 className="font-bold text-2xl">
              {respiratoryData.respiratory} bpm
            </h1>
            <p className="font-medium text-sm mt-2">
              {respiratoryData.resLevel}
            </p>
          </div>
        )}
        {temperatureData && (
          <div
            className="flex-1 p-4 rounded-lg"
            style={{ backgroundColor: colors[1] }}
          >
            <div className="">
              <img src={image2} alt="temperature icon" className="" />
              <h2 className="font-semibold text-lg">Temperature</h2>
            </div>
            <h1 className="font-bold text-2xl">
              {temperatureData.temperature} &deg;F
            </h1>
            <p className="font-medium text-sm mt-2">
              {temperatureData.tempLevel}
            </p>
          </div>
        )}
        {heartData && (
          <div
            className="flex-1 p-4 rounded-lg items-center"
            style={{ backgroundColor: colors[2] }}
          >
            <div className="">
              <img src={image3} alt="heart icon" className="" />
              <h2 className="font-semibold text-lg">Heart Rate</h2>
            </div>
            <h1 className="font-bold text-2xl">{heartData.heart} bmp</h1>
            <p className="font-medium text-sm mt-2">{heartData.heartLevel}</p>
          </div>
        )}
      </div>
    </div>
    <div className="bg-white rounded-lg m-4 p-4 text-sm">
  <h1 className="text-xl font-bold mx-4">Diagnosis List</h1>
  <div className="overflow-y-auto h-[200px] sidebar">
    <table className="bg-[#F6F7F8] h-full rounded-lg p-4 m-4">
      <thead className="font-bold">
        <tr className="">
          <th className="w-1/3 p-2">Problem/Diagnosis</th>
          <th className="w-1/3 p-2">Description</th>
          <th className="w-1/3 p-2">Status</th>
        </tr>
      </thead>
      <tbody className="font-semibold">
        {diagnosticList.map(({ name, description, status }, index) => (
          <tr key={index}>
            <td className="w-2/5 p-2">{name}</td>
            <td className="w-3/5 p-2">{description}</td>
            <td className="w-2/5 p-2">{status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
    
  );
};

export default History;

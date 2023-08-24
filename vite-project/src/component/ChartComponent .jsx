import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'

const ChartComponent = () => {
  const[data,setData] = useState([])
  const fetchData = ()=>{
    axios.get("http://127.0.0.1:5000/api/medicament")
    .then((res) => {
      setData(res.data);
      console.log(res.data[0]);
    }) 
  }
  useEffect(()=>(
    fetchData()
  ),[])
  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories:  data.map(item => item.nomMed),
    },
  };

  const series = [
    {
      name: 'Sales',
      data: data.map(item=>item.stock),
    },
  ];

  return (
    <div >
      <ReactApexChart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default ChartComponent;

// pages/relatorio/custo.jsx
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import withAuth from "../../components/autenticacao"; // Importa o HOC com o nome correto

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioCusto = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [mediaGeral, setMediaGeral] = useState(null);
  const datePickerRef = useRef(null);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const media = data.datasets[0].data.reduce((acc, curr) => acc + curr, 0) / data.labels.length;
    setMediaGeral(media.toFixed(2));
  }, []);

  const data = {
    labels: Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`),
    datasets: [
      {
        label: "Custo (R$)",
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 50),
        backgroundColor: "rgba(0, 100, 166, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Média de Custo por Dia" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Custo (R$)" }, grid: { display: false } },
      x: { title: { display: true, text: "Dias do Mês" }, grid: { display: false } },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "var(--font-family-ui)",
        color: "rgba(0, 100, 166, 0.50)",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          zIndex: 1000,
          padding: "10px 0",
        }}
      >
        <VscArrowCircleLeft
          style={{
            fontSize: "50px",
            cursor: "pointer",
            position: "absolute",
            left: "10px",
          }}
          onClick={handleBackToMenu}
        />
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Relatório Custo</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "45px" }}>
        <AiOutlineCalendar
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={toggleDatePicker}
        />
      </div>
      {isDatePickerOpen && (
        <div ref={datePickerRef} style={{ marginTop: "10px" }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            inline
          />
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "rgba(0, 100, 166, 0.1)",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "rgba(0, 100, 166, 0.8)",
          textAlign: "center",
          width: "300px",
        }}
      >
        Média Geral do Mês: R$ {mediaGeral}
      </div>

      <div style={{ width: "800px", marginTop: "20px" }}>
        <Bar data={data} options={options} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => console.log("Exportar PDF")}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff80",
              border: "3px solid #0064a6",
            }}
          >
            <span
              style={{
                color: "#0064a6",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Exportar PDF
            </span>
          </div>
        </div>

        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => console.log("Exportar Excel")}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff80",
              border: "3px solid #0064a6",
            }}
          >
            <span
              style={{
                color: "#0064a6",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Exportar Excel
            </span>
          </div>
        </div>
      </div>

      <div style={{ height: "30px" }}></div>
    </div>
  );
};

export default withAuth(RelatorioCusto);
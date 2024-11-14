// pages/relatorio/custo.jsx
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import withAuth from "../../components/autenticacao";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioCusto = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [mediaGeral, setMediaGeral] = useState(null);
  const [custosDiarios, setCustosDiarios] = useState([]);
  const [isExportEnabled, setIsExportEnabled] = useState(false);
  const datePickerRef = useRef(null);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    consultarCusto(date);
  };

  const consultarCusto = async (date) => {
    try {
      const response = await fetch("/api/relatorios/custo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }),
      });

      const data = await response.json();
      if (response.ok && data.custosDiarios.length > 0) {
        setCustosDiarios(data.custosDiarios);
        setMediaGeral(data.mediaMensal.toFixed(2));
        setIsExportEnabled(true);
      } else {
        alert("Nenhum cardápio encontrado para o mês/ano selecionado.");
        setCustosDiarios([]);
        setMediaGeral(null);
        setIsExportEnabled(false);
      }
    } catch (error) {
      console.error("Erro inesperado ao consultar custo:", error);
      alert("Erro ao consultar o custo. Tente novamente.");
      setIsExportEnabled(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Relatório de Custo Diário", 10, 10);

    custosDiarios.forEach((custo, index) => {
      const y = 20 + index * 10;
      doc.text(`Dia ${index + 1}: R$ ${parseFloat(custo.custo).toFixed(2)}`, 10, y);
    });

    doc.text(`Média Geral do Mês: R$ ${mediaGeral}`, 10, 30 + custosDiarios.length * 10);

    doc.save("relatorio_custo.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = custosDiarios.map((custo) => ({
      Dia: custo.date,
      Custo: parseFloat(custo.custo).toFixed(2),
    }));

    worksheetData.push({
      Dia: "Média Geral do Mês",
      Custo: mediaGeral,
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Custo");

    XLSX.writeFile(workbook, "relatorio_custo.xlsx");
  };

  const data = {
    labels: custosDiarios.map((custo) => custo.date),
    datasets: [
      {
        label: "Custo (R$)",
        data: custosDiarios.map((custo) => parseFloat(custo.custo)),
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
            cursor: isExportEnabled ? "pointer" : "not-allowed",
            marginTop: "20px",
          }}
          onClick={isExportEnabled ? exportToPDF : null}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
            cursor: isExportEnabled ? "pointer" : "not-allowed",
            marginTop: "20px",
          }}
          onClick={isExportEnabled ? exportToExcel : null}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
    </div>
  );
};

export default withAuth(RelatorioCusto);
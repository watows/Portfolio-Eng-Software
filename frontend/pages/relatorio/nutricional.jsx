import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import withAuth from "../../components/autenticacao";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioNutricional = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dataKcal, setDataKcal] = useState([]);
  const [dataCho, setDataCho] = useState([]);
  const [dataPtn, setDataPtn] = useState([]);
  const [dataFibra, setDataFibra] = useState([]);
  const [dataSodio, setDataSodio] = useState([]);
  const [medias, setMedias] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDataLoaded(false);
  };

  useEffect(() => {
    if (selectedDate && !isDataLoaded) {
      consultarNutricional();
    }
  }, [selectedDate, isDataLoaded]);

  const consultarNutricional = async () => {
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    try {
      const response = await fetch("/api/relatorios/nutricional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, year }),
      });

      if (response.ok) {
        const data = await response.json();

        // Adicionando log para verificar os dados recebidos
        console.log("Dados nutricionais recebidos:", data);

        setDataKcal(data.nutricionalDiario.map(d => d.kcal));
        setDataCho(data.nutricionalDiario.map(d => d.cho));
        setDataPtn(data.nutricionalDiario.map(d => d.ptn));
        setDataFibra(data.nutricionalDiario.map(d => d.fibra));
        setDataSodio(data.nutricionalDiario.map(d => d.sodio));

        // Adicionando log para verificar o valor da média de sódio
        console.log("Média de sódio recebida:", data.mediaMensal.sodio);

        setMedias({
          kcal: data.mediaMensal.kcal ? parseFloat(data.mediaMensal.kcal).toFixed(2) : "0.00",
          cho: data.mediaMensal.cho ? parseFloat(data.mediaMensal.cho).toFixed(2) : "0.00",
          ptn: data.mediaMensal.ptn ? parseFloat(data.mediaMensal.ptn).toFixed(2) : "0.00",
          fibra: data.mediaMensal.fibra ? parseFloat(data.mediaMensal.fibra).toFixed(2) : "0.00",
          sodio: data.mediaMensal.sodio ? parseFloat(data.mediaMensal.sodio).toFixed(2) : "0.00"
        });
        setIsDataLoaded(true);
      } else {
        alert("Nenhum cardápio cadastrado para o mês/ano selecionado.");
        setIsDataLoaded(false);
      }
    } catch (error) {
      console.error("Erro ao consultar dados nutricionais:", error);
      alert("Erro ao consultar dados nutricionais.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Relatório Nutricional", 10, 10);

    ["KCAL", "CHO", "PTN", "Fibra", "Sódio"].forEach((label, index) => {
      const yOffset = 20 + index * 30;
      doc.text(`${label} - Média Mensal: ${medias[label.toLowerCase()] || "0.00"}`, 10, yOffset);
      dataKcal.forEach((value, i) => {
        doc.text(`Dia ${i + 1}: ${value}`, 20, yOffset + 10 + i * 5);
      });
    });

    doc.save("relatorio_nutricional.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = dataKcal.map((_, index) => ({
      Dia: `Dia ${index + 1}`,
      KCAL: dataKcal[index] || 0,
      CHO: dataCho[index] || 0,
      PTN: dataPtn[index] || 0,
      Fibra: dataFibra[index] || 0,
      Sódio: dataSodio[index] || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório Nutricional");

    XLSX.writeFile(workbook, "relatorio_nutricional.xlsx");
  };

  const chartOptions = (label) => ({
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: `Média ${label}: ${medias[label.toLowerCase()] || "0.00"}`,
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: { display: false },
    },
  });

  const chartData = (label, data = []) => ({
    labels: Array.from({ length: data.length }, (_, i) => `Dia ${i + 1}`),
    datasets: [
      {
        label: `${label} (${label === "Sódio" ? "mg" : label === "Fibra" ? "g" : "%"})`,
        data: data,
        backgroundColor: "rgba(0, 100, 166, 0.6)",
      },
    ],
  });

  const renderChartGroup = (label1, data1, label2, data2) => (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
      <div style={{ flex: 1 }}>
        <Bar options={chartOptions(label1)} data={chartData(label1, data1)} />
      </div>
      <div style={{ flex: 1 }}>
        <Bar options={chartOptions(label2)} data={chartData(label2, data2)} />
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontFamily: "var(--font-family-ui)", color: "rgba(0, 100, 166, 0.8)", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: "0", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#ffffff", zIndex: 1000, padding: "10px 0" }}>
        <VscArrowCircleLeft style={{ fontSize: "50px", cursor: "pointer", position: "absolute", left: "10px" }} onClick={handleBackToMenu} />
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Relatório Nutricional</h1>
      </div>

      <div style={{ marginTop: "50px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <AiOutlineCalendar style={{ fontSize: "30px", cursor: "pointer" }} onClick={toggleDatePicker} />
      </div>
      {isDatePickerOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => handleDateChange(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          inline
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%", maxWidth: "800px", marginTop: "20px" }}>
        <div style={{ width: "100%" }}>
          <Bar options={chartOptions("KCAL")} data={chartData("KCAL", dataKcal)} />
        </div>
        {renderChartGroup("CHO", dataCho, "PTN", dataPtn)}
        {renderChartGroup("Fibra", dataFibra, "Sódio", dataSodio)}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: isDataLoaded ? "pointer" : "not-allowed",
            marginTop: "20px",
          }}
          onClick={isDataLoaded ? exportToPDF : null}
        >
          <div style={{ height: "49px", width: "146px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff80", border: "3px solid #0064a6" }}>
            <span style={{ color: "#0064a6", fontFamily: "Inter-Regular, Helvetica", fontSize: "16px", fontWeight: "400" }}>Exportar PDF</span>
          </div>
        </div>

        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: isDataLoaded ? "pointer" : "not-allowed",
            marginTop: "20px",
          }}
          onClick={isDataLoaded ? exportToExcel : null}
        >
          <div style={{ height: "49px", width: "146px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff80", border: "3px solid #0064a6" }}>
            <span style={{ color: "#0064a6", fontFamily: "Inter-Regular, Helvetica", fontSize: "16px", fontWeight: "400" }}>Exportar Excel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(RelatorioNutricional);
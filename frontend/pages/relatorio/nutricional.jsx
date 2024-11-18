import React, { useState } from "react";
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
  const [datasCardapio, setDatasCardapio] = useState([]);
  const [medias, setMedias] = useState({});
  const [isExportEnabled, setIsExportEnabled] = useState(false);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    consultarNutricional(date);
  };

  const consultarNutricional = async (date) => {
    try {
      const response = await fetch("/api/relatorios/nutricional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }),
      });

      const data = await response.json();
      if (response.ok && data.nutricionalDiario.length > 0) {
        setDataKcal(data.nutricionalDiario.map((d) => d.kcal));
        setDataCho(data.nutricionalDiario.map((d) => d.cho));
        setDataPtn(data.nutricionalDiario.map((d) => d.ptn));
        setDataFibra(data.nutricionalDiario.map((d) => d.fibra));
        setDataSodio(data.nutricionalDiario.map((d) => d.sodio));

        setDatasCardapio(data.nutricionalDiario.map((d) => d.date));

        setMedias({
          kcal: parseFloat(data.mediaMensal.kcal).toFixed(2),
          cho: parseFloat(data.mediaMensal.cho).toFixed(2),
          ptn: parseFloat(data.mediaMensal.ptn).toFixed(2),
          fibra: parseFloat(data.mediaMensal.fibra).toFixed(2),
          sodio: parseFloat(data.mediaMensal.sodio).toFixed(2),
        });

        setIsExportEnabled(true);
      } else {
        alert("Nenhum cardápio encontrado para o mês/ano selecionado.");
        setDataKcal([]);
        setDataCho([]);
        setDataPtn([]);
        setDataFibra([]);
        setDataSodio([]);
        setDatasCardapio([]);
        setMedias({});
        setIsExportEnabled(false);
      }
    } catch (error) {
      console.error("Erro ao consultar dados nutricionais:", error);
      alert("Erro ao consultar dados nutricionais. Tente novamente.");
      setIsExportEnabled(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text("Relatório Nutricional", 10, 10);

    let currentY = 20;

    const addChartDataToPDF = (label, data, dates) => {
      doc.text(`${label}:`, 10, currentY);
      currentY += 10;

      dates.forEach((date, index) => {
        const value = data[index] || "0";
        doc.text(`Dia ${date}: ${label} - ${value}`, 10, currentY);
        currentY += 7;

        if (currentY > 280) {
          doc.addPage();
          currentY = 20;
        }
      });

      currentY += 10;
    };

    addChartDataToPDF("KCAL", dataKcal, datasCardapio);
    addChartDataToPDF("CHO", dataCho, datasCardapio);
    addChartDataToPDF("PTN", dataPtn, datasCardapio);
    addChartDataToPDF("Fibra", dataFibra, datasCardapio);
    addChartDataToPDF("Sódio", dataSodio, datasCardapio);

    doc.text("Médias Mensais:", 10, currentY);
    currentY += 10;
    doc.text(`KCAL: ${medias.kcal || "0.00"}`, 10, currentY);
    currentY += 7;
    doc.text(`CHO: ${medias.cho || "0.00"}`, 10, currentY);
    currentY += 7;
    doc.text(`PTN: ${medias.ptn || "0.00"}`, 10, currentY);
    currentY += 7;
    doc.text(`Fibra: ${medias.fibra || "0.00"}`, 10, currentY);
    currentY += 7;
    doc.text(`Sódio: ${medias.sodio || "0.00"}`, 10, currentY);

    doc.save("relatorio_nutricional.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = datasCardapio.map((date, index) => ({
      Dia: date,
      KCAL: dataKcal[index] || "0",
      CHO: dataCho[index] || "0",
      PTN: dataPtn[index] || "0",
      Fibra: dataFibra[index] || "0",
      Sódio: dataSodio[index] || "0",
    }));

    worksheetData.push({
      Dia: "Médias Mensais",
      KCAL: medias.kcal || "0.00",
      CHO: medias.cho || "0.00",
      PTN: medias.ptn || "0.00",
      Fibra: medias.fibra || "0.00",
      Sódio: medias.sodio || "0.00",
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório Nutricional");

    XLSX.writeFile(workbook, "relatorio_nutricional.xlsx");
  };

  const renderCustomTitleAndChart = (title, media, chartOptions, chartData, width = "400px") => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width }}>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px 20px",
          backgroundColor: "rgba(0, 100, 166, 0.1)",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "rgba(0, 100, 166, 0.8)",
          textAlign: "center",
          width: "250px",
          maxWidth: "100%",
        }}
      >
        {media ? `${title}: ${media}` : `${title}: `}
      </div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );

  const chartOptions = (label) => ({
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: label },
        grid: { display: false },
      },
      x: {
        title: { display: true, text: "Dias do Mês" },
        grid: { display: false },
      },
    },
  });

  const chartData = (label, data = []) => ({
    labels: datasCardapio,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: "rgba(0, 100, 166, 0.6)",
      },
    ],
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "var(--font-family-ui)",
        color: "rgba(0, 100, 166, 0.8)",
        minHeight: "100vh",
      }}
    >
      <div style={{ position: "fixed", top: "0", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#ffffff", zIndex: 1000, padding: "10px 0" }}>
        <VscArrowCircleLeft style={{ fontSize: "50px", cursor: "pointer", position: "absolute", left: "10px" }} onClick={handleBackToMenu} />
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Relatório Nutricional</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "45px" }}>
        <AiOutlineCalendar style={{ fontSize: "30px", cursor: "pointer" }} onClick={toggleDatePicker} />
      </div>
      {isDatePickerOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          inline
        />
      )}

      <div style={{ width: "800px", marginTop: "10px" }}>
        {renderCustomTitleAndChart("Média KCAL (kcal)", medias.kcal, chartOptions("KCAL (kcal)"), chartData("KCAL", dataKcal), "800px")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {renderCustomTitleAndChart("Média CHO (%)", medias.cho, chartOptions("CHO (%)"), chartData("CHO", dataCho))}
        {renderCustomTitleAndChart("Média PTN (%)", medias.ptn, chartOptions("PTN (%)"), chartData("PTN", dataPtn))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {renderCustomTitleAndChart("Média Fibra (g)", medias.fibra, chartOptions("Fibra (g)"), chartData("Fibra", dataFibra))}
        {renderCustomTitleAndChart("Média Sódio (mg)", medias.sodio, chartOptions("Sódio (mg)"), chartData("Sódio", dataSodio))}
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
            cursor: isExportEnabled ? "pointer" : "not-allowed",
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
            cursor: isExportEnabled ? "pointer" : "not-allowed",
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

export default withAuth(RelatorioNutricional);
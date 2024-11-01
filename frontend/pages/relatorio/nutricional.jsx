import React from "react";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioNutricional = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(0, 100, 166, 0.8)"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(0, 100, 166, 0.8)"
        },
        grid: {
            display: false
        },
        title: {
            display: true,
            text: "Dias do Mês",
            color: "rgba(0, 100, 166, 0.8)"
          }
      },
      y: {
        ticks: {
          color: "rgba(0, 100, 166, 0.8)"
        },
        grid: {
            display: false
        },
        title: {
          display: true,
          text: "% por Dia",
          color: "rgba(0, 100, 166, 0.8)"
        }
      }
    }
  };

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => `Dia ${i + 1}`);
  
  const createChartData = (label, values) => ({
    labels: daysOfMonth,
    datasets: [
      {
        label: `${label} (% por Dia)`,
        data: values,
        backgroundColor: "rgba(0, 100, 166, 0.6)"
      }
    ]
  });

  const dataKcal = createChartData("KCAL", Array(31).fill().map(() => Math.floor(Math.random() * 100) + 50));
  const dataCho = createChartData("CHO", Array(31).fill().map(() => Math.floor(Math.random() * 100)));
  const dataPtn = createChartData("PTN", Array(31).fill().map(() => Math.floor(Math.random() * 100)));
  const dataFibra = createChartData("Fibra", Array(31).fill().map(() => Math.floor(Math.random() * 100)));
  const dataSodio = createChartData("Sódio", Array(31).fill().map(() => Math.floor(Math.random() * 100)));

  const renderChartWithLabel = (title, data) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "600px", marginBottom: "40px" }}>
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
          width: "50%",
          maxWidth: "300px"
        }}
      >
        {title}
      </div>
      <Bar options={chartOptions} data={data} />
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
      {isDatePickerOpen && <DatePicker selected={selectedDate} onChange={(date) => { setSelectedDate(date); toggleDatePicker(); }} dateFormat="MM/yyyy" showMonthYearPicker inline />}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", width: "100%", maxWidth: "800px" }}>
            {renderChartWithLabel("Média KCAL: 120.45%", dataKcal)}
        
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "20px" }}>
            {renderChartWithLabel("Média CHO: 55%", dataCho)}
            {renderChartWithLabel("Média PTN: 66%", dataPtn)}
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "20px" }}>
            {renderChartWithLabel("Média Fibra: 58.45%", dataFibra)}
            {renderChartWithLabel("Média Sódio: 48.35%", dataSodio)}
        </div>

        <div
            style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            }}
        >
        <div
            style={{
                height: "49px",
                width: "148px",
                position: "relative",
                cursor: "pointer",
                marginTop: "20px",
                marginBottom: "20px"
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
                marginBottom: "20px"
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
      </div>
    </div>

  );
};

export default RelatorioNutricional;
import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withAuth from "../../components/autenticacao";
import { format, getDaysInMonth, startOfMonth } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const VisualizarCardapio = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [cardapio, setCardapio] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [isCardapioLoaded, setIsCardapioLoaded] = useState(false);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
    calculateWorkingDays(date);
    setCardapio([]); // Limpa os dados ao mudar o mês
    setIsCardapioLoaded(false); // Marca como não carregado até consultar novamente
  };

  const calculateWorkingDays = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = startOfMonth(date);
    const workingDaysInMonth = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const currentDayOfWeek = currentDate.getDay();

      // Filtrando apenas os dias úteis (segunda a sexta-feira)
      if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
        workingDaysInMonth.push({
          date: currentDate,
          dayOfWeek: currentDayOfWeek,
        });
      }
    }

    // Garantindo que os dias da semana estejam na ordem correta
    const alignedWorkingDays = [];
    let startDayOfWeek = workingDaysInMonth[0]?.dayOfWeek;

    // Preenchemos os dias antes da segunda-feira com null, se necessário
    for (let i = 0; i < (startDayOfWeek - 1) % 7; i++) {
      alignedWorkingDays.push(null);
    }

    alignedWorkingDays.push(...workingDaysInMonth);

    // Preenchemos os dias após sexta-feira com null, se necessário
    while (alignedWorkingDays.length % 5 !== 0) {
      alignedWorkingDays.push(null);
    }

    setWorkingDays(alignedWorkingDays);
  };

  const handleConsultarCardapio = async () => {
    if (!selectedDate) return;

    try {
      setCardapio([]); // Limpa os dados antes de consultar novamente
      setIsCardapioLoaded(false); // Marca como não carregado

      const response = await fetch("/api/cardapio/visualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao consultar cardápio:", errorData.message);
        alert(`Erro ao consultar cardápio: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      console.log("Dados do cardápio recebidos:", data);

      // Organiza o cardápio conforme os dias úteis, preenchendo com valores nulos para alinhamento
      const completeCardapio = workingDays.map((day) => {
        if (!day || !day.date) {
          return { items: [] }; // Dias fora do mês ou não úteis
        }
        const matchingData = data.find((item) => item.date === format(day.date, "yyyy-MM-dd"));
        return matchingData || { items: [] }; // Retorna o cardápio encontrado ou vazio
      });

      setCardapio(completeCardapio);
      setIsCardapioLoaded(true);
    } catch (error) {
      console.error("Erro inesperado ao consultar cardápio:", error);
      alert("Erro inesperado ao consultar cardápio. Verifique o console para mais detalhes.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("Cardápio Mensal", 10, 10);
    doc.setFontSize(12);

    cardapio.forEach((dia, index) => {
      const day = workingDays[index];
      if (day) {
        doc.text(`${format(day.date, "dd/MM/yyyy")} | ${format(day.date, "EEEE", { locale: pt })}`, 10, y);
        y += 10;

        dia.items.forEach((item) => {
          const itemText = `- ${item.name} | ${item.quantity} | ${item.kcal} | ${item.tags}`;
          doc.text(itemText, 20, y);
          y += 7;

          if (y > 280) {
            doc.addPage();
            y = 20;
          }
        });

        y += 10;
      }
    });

    doc.save("cardapio.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = cardapio.flatMap((dia, index) => {
      const day = workingDays[index];
      if (day) {
        return dia.items.map((item) => ({
          Data: format(day.date, "dd/MM/yyyy"),
          Dia: format(day.date, "EEEE", { locale: pt }),
          Receita: item.name,
          Quantidade: item.quantity,
          Calorias: item.kcal,
          Tags: item.tags,
        }));
      }
      return [];
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cardápio");

    XLSX.writeFile(workbook, "cardapio.xlsx");
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
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div style={{ position: "fixed", top: "0", width: "100%", display: "flex", alignItems: "center", backgroundColor: "#ffffff", zIndex: 1000, padding: "10px 0" }}>
        <VscArrowCircleLeft
          style={{
            fontSize: "50px",
            cursor: "pointer",
            position: "absolute",
            left: "10px",
          }}
          onClick={handleBackToMenu}
        />
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Visualização Mensal</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "10px" }}>
        <AiOutlineCalendar
          style={{ fontSize: "35px", cursor: "pointer" }}
          onClick={toggleDatePicker}
        />
      </div>
      {isDatePickerOpen && (
        <div style={{ marginTop: "10px" }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            inline
            locale={pt}
          />
        </div>
      )}

      <div
        style={{
          height: "49px",
          width: "148px",
          position: "relative",
          cursor: selectedDate ? "pointer" : "not-allowed",
          marginTop: "25px",
          marginBottom: "35px",
        }}
        onClick={selectedDate ? handleConsultarCardapio : null}
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
            Consultar
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px", marginTop: "20px", width: "100%" }}>
        {workingDays.map((day, index) => {
          const dailyMenu = cardapio[index] || { items: [] };

          return (
            <div
              key={index}
              style={{
                backgroundColor: day ? "rgba(0, 100, 166, 0.50)" : "transparent",
                padding: "15px",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "12px",
                display: "flex",
                flexDirection: "column",
                height: "285px",
                textAlign: "center",
              }}
            >
              {day ? (
                <>
                  <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    {format(day.date, "dd/MM/yyyy")} | {format(day.date, "EEEE", { locale: pt })}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {dailyMenu.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                        <span
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            width: "35%",
                            textAlign: "left",
                          }}
                          title={item.name}
                        >
                          {item.name}
                        </span>
                        <span style={{ width: "20%", textAlign: "center" }}>{item.quantity}</span>
                        <span style={{ width: "20%", textAlign: "center" }}>{item.kcal}</span>
                        <span style={{ width: "15%", textAlign: "center" }}>{item.tags}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ height: "100%" }}></div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: isCardapioLoaded ? "pointer" : "not-allowed",
          }}
          onClick={isCardapioLoaded ? exportToPDF : null}
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
            <span style={{ color: "#0064a6", fontFamily: "Inter-Regular, Helvetica", fontSize: "16px", fontWeight: "400" }}>
              Exportar PDF
            </span>
          </div>
        </div>

        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: isCardapioLoaded ? "pointer" : "not-allowed",
          }}
          onClick={isCardapioLoaded ? exportToExcel : null}
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
            <span style={{ color: "#0064a6", fontFamily: "Inter-Regular, Helvetica", fontSize: "16px", fontWeight: "400" }}>
              Exportar Excel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(VisualizarCardapio);
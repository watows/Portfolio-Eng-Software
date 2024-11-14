import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withAuth from "../../components/autenticacao";
import { getDaysInMonth, format, startOfMonth } from "date-fns";
import pt from "date-fns/locale/pt-BR";

const GerarCardapio = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [cardapio, setCardapio] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [isCardapioGenerated, setIsCardapioGenerated] = useState(false);

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
  };

  const calculateWorkingDays = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = startOfMonth(date);
    const workingDaysInMonth = [];
    let weekDayIndex = 0;

    const firstWeekDay = firstDayOfMonth.getDay();
    for (let i = 1; i < firstWeekDay; i++) {
      if (i > 0 && i < 6) {
        workingDaysInMonth.push(null);
        weekDayIndex++;
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const currentDayOfWeek = currentDate.getDay();

      if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
        workingDaysInMonth.push({
          date: currentDate,
          dayOfWeek: currentDayOfWeek,
        });
        weekDayIndex++;
      }

      if (weekDayIndex === 5) weekDayIndex = 0;
    }

    setWorkingDays(workingDaysInMonth);
  };

  const handleGerarCardapio = async () => {
    if (!selectedDate) return;

    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      console.log("Enviando requisição para gerar cardápio com a data:", formattedDate);

      const response = await fetch("/api/cardapio/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate, qtd_g: 150, kcal: 300 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao gerar cardápio:", errorData);
        alert(`Erro ao gerar cardápio: ${errorData.message || JSON.stringify(errorData)}`);
        setIsCardapioGenerated(false);
        return;
      }

      const data = await response.json();
      console.log("Dados recebidos do backend:", data);

      const completeCardapio = workingDays.map((day, index) => {
        return data[index] || { items: [{ name: "Cardápio padrão", quantity: "150g", kcal: "300 kcal", tags: "-" }] };
      });

      setCardapio(completeCardapio);
      setIsCardapioGenerated(true);
    } catch (error) {
      console.error("Erro inesperado ao gerar cardápio:", error);
      setIsCardapioGenerated(false);
      alert("Erro inesperado ao gerar cardápio. Verifique o console para mais detalhes.");
    }
  };

  const handleRefazer = () => {
    setIsCardapioGenerated(false);
    handleGerarCardapio();
  };

  const handleGravar = async () => {
    if (!isCardapioGenerated) return; // Verifica se o cardápio foi gerado

    try {
      const response = await fetch("http://localhost:5000/menu/salvar_cardapio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
          cardapio,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao salvar cardápio:", errorData);
        alert(`Erro ao salvar cardápio: ${errorData.message || JSON.stringify(errorData)}`);
        return;
      }

      const data = await response.json();
      console.log("Cardápio salvo com sucesso:", data);
      alert("Cardápio salvo com sucesso!");
    } catch (error) {
      console.error("Erro inesperado ao salvar cardápio:", error);
      alert("Erro inesperado ao salvar cardápio. Verifique o console para mais detalhes.");
    }
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
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Gerar Cardápio</h1>
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
        onClick={selectedDate ? handleGerarCardapio : null}
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
            Gerar
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
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "35%" }}>{item.name}</span>
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
            cursor: isCardapioGenerated ? "pointer" : "not-allowed",
          }}
          onClick={isCardapioGenerated ? handleRefazer : null}
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
              Refazer
            </span>
          </div>
        </div>

        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: isCardapioGenerated ? "pointer" : "not-allowed",
          }}
          onClick={isCardapioGenerated ? handleGravar : null}
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
              Gravar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(GerarCardapio);
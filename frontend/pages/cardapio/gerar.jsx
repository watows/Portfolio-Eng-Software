import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withAuth from "../../components/autenticacao";

const GerarCardapio = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const mockData = Array.from({ length: 20 }, (_, index) => ({
    date: "07/10/2024",
    day: "segunda-feira",
    items: [
      { name: "Escalope bovino ao molho sugo", quantity: 150, kcal: 274 },
      { name: "Cubos suíno com mostarda", quantity: 180, kcal: 315 },
      { name: "Arroz integral", quantity: 100, kcal: 132 },
      { name: "Feijão carioca", quantity: 100, kcal: 134 },
      { name: "Abobrinha rústica com ervas", quantity: 100, kcal: 37 },
      { name: "Salada de tomate", quantity: 30, kcal: 10 },
      { name: "Cenoura ao vapor", quantity: 30, kcal: 12 },
      { name: "Beterraba ralada", quantity: 30, kcal: 11 },
      { name: "Brócolis conserva", quantity: 30, kcal: 10 },
      { name: "Barrinha de Nuts", quantity: 25, kcal: 129, tags: "LG" },
    ],
  }));

  const handleRefazer = () => {
    console.log("Refazer ação");
  };

  const handleGravar = () => {
    console.log("Gravar ação");
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
          />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px", marginTop: "20px", width: "100%" }}>
        {mockData.map((data, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "rgba(0, 100, 166, 0.50)",
              padding: "15px",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "14px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "285px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>
              {data.date} | {data.day}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: "5px",
              }}
            >
              {data.items.map((item, i) => (
                <React.Fragment key={`${index}-${i}`}>
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      padding: "2px 0",
                    }}
                    title={item.name}
                  >
                    {item.name}
                  </div>
                  <div style={{ textAlign: "center", padding: "2px 0" }}>
                    {item.quantity}g
                  </div>
                  <div style={{ textAlign: "center", padding: "2px 0" }}>
                    {item.kcal} kcal
                  </div>
                  <div style={{ textAlign: "center", padding: "2px 0" }}>
                    {item.tags || "-"}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "35px" }}>
        <div
          style={{
            height: "49px",
            width: "148px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff80",
            border: "3px solid #0064a6",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={handleRefazer}
        >
          <span style={{ color: "#0064a6", fontSize: "16px", fontWeight: "400" }}>Refazer</span>
        </div>
        <div
          style={{
            height: "49px",
            width: "148px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff80",
            border: "3px solid #0064a6",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={handleGravar}
        >
          <span style={{ color: "#0064a6", fontSize: "16px", fontWeight: "400" }}>Gravar</span>
        </div>
      </div>

      <div style={{ height: "20px" }}></div>
    </div>
  );
};

export default withAuth(GerarCardapio);
import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withAuth from "../../components/autenticacao";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const VisualizarCardapio = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [cardapio, setCardapio] = useState([]);
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
  };

  const handleConsultarCardapio = async () => {
    if (!selectedDate) return;
  
    try {
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
      setCardapio(data);
      setIsCardapioLoaded(true);
    } catch (error) {
      console.error("Erro inesperado ao consultar cardápio:", error);
      alert("Erro inesperado ao consultar cardápio. Verifique o console para mais detalhes.");
    }
  };  

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 20; // Posição inicial no eixo Y para o conteúdo
  
    doc.setFontSize(16);
    doc.text("Cardápio Mensal", 10, 10);
    doc.setFontSize(12);
  
    cardapio.forEach((dia) => {
      // Adiciona o título com a data
      doc.text(`${dia.date}:`, 10, y);
      y += 10;
  
      dia.items.forEach((item) => {
        // Formatação do texto de cada item do cardápio
        const itemText = `- ${item.name} | ${item.quantity} | ${item.kcal} | ${item.tags}`;
        doc.text(itemText, 20, y);
        y += 7; // Incrementa a posição Y para o próximo item
  
        // Verifica se o conteúdo ultrapassa o limite da página
        if (y > 280) {
          doc.addPage();
          y = 20; // Reinicia a posição Y para a nova página
        }
      });
  
      y += 10; // Espaçamento entre os dias
    });
  
    doc.save("cardapio.pdf");
  };  

  const exportToExcel = () => {
    const worksheetData = cardapio.flatMap((dia) =>
      dia.items.map((item) => ({
        Data: dia.date,
        Receita: item.name,
        Quantidade: item.quantity,
        Calorias: item.kcal,
        Tags: item.tags,
      }))
    );

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
        {cardapio.map((dia, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "rgba(0, 100, 166, 0.50)",
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
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{format(new Date(dia.date), "dd/MM/yyyy", { locale: pt })}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {dia.items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "35%" }}>{item.name}</span>
                  <span style={{ width: "20%", textAlign: "center" }}>{item.quantity}</span>
                  <span style={{ width: "20%", textAlign: "center" }}>{item.kcal}</span>
                  <span style={{ width: "15%", textAlign: "center" }}>{item.tags}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
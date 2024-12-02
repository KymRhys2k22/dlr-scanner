import { useEffect, useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState({});
  const [open, setOpen] = useState(false);
  const [resultText, setResultText] = useState("");


  const department = (results) => {
    let department = "";
    switch (results) {
      case "500":
        department = "Cleaning";
        break;
      case "110":
        department = "Apparel";
        break;
      case "120":
        department = "Accessories";
        break;
      case "160":
        department = "Cosmetics";
        break;
      case "170":
        department = "HBA";
        break;
      case "210":
        department = "Stationery";
        break;
      case "220":
        department = "Toys";
        break;
      case "260":
        department = "Food";
        break;
      case "310":
        department = "DIY";
        break;
      case "360":
        department = "Storage";
        break;
      case "410":
        department = "Kitchen";
        break;
      case "420":
        department = "Tableware";
        break;
      case "100":
        department = "Apparel & Accessories";
        break;
      case "250":
        department = "Food";
        break;
      case "200":
        department = "General Merchandise";
        break;
      case "300":
        department = "Hardware";
        break;
      case "150":
        department = "Health & Beauty Aids";
        break;
      case "450":
        department = "Interior";
        break;
      case "400":
        department = "Kitchen & Dining";
        break;
      case "550":
        department = "Outdoor";
        break;
      case "350":
        department = "Storage";
        break;
    }
    return department;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/KymRhys2k22/price-checker-app/refs/heads/master/src/items.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const res = JSON.stringify(jsonData);
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };




    fetchData();
  }, []);

  useEffect(() => {
    const found = () => data.filter(item => item.SKU === resultText || item.UPC === resultText).map((items) => {
      setDataResult(items);
      setOpen(true)
    });

    found();



  }, [resultText])

  return (
    <div>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(_err, result) => {

          if (result) {
            console.log(result.text);
            setResultText(result.text);



          }
        }}
      />
      <p>Result: {dataResult ? dataResult.SKU : "No data"}</p>
      {open && (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"
            }`}
          onClick={() => setOpen(false)} // Close modal on click
        >
          <div
            className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-150 opacity-0"
              }`}
          >
            <p>Item name: {dataResult.SKU || "N/A"}</p>
            <p>Price: {dataResult.Price || "N/A"}</p>
            <p>Stock: {dataResult.Description || "N/A"}</p>
            <p>UPC: {dataResult.UPC || "N/A"}</p>
            <p>Department: {department(dataResult.Department) || "N/A"}</p>
            <p>Sub Department: {department(dataResult["Sub Dep"]) || "N/A"}</p>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;

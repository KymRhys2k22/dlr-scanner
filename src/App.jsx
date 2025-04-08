import { useEffect, useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import cameraOpen from "./assets/camera-open.svg";
import cameraClose from "./assets/camera-close.svg";
function App() {
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState({});
  const [open, setOpen] = useState(false);
  const [resultText, setResultText] = useState("");
  const [UPC, setUPC] = useState("");
  const [camera, setCamera] = useState(true);
  const [cameraImage, setCameraImage] = useState(true);

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
          "https://raw.githubusercontent.com/KymRhys2k22/drl-scanner/refs/heads/main/src/itemss.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const found = () =>
      data
        .filter((item) => item.SKU === resultText || item.UPC === resultText)

        .map((items) => {
          setDataResult(items);
          setOpen(true);
        });

    found();
  }, [resultText]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="w-screen h-screen bg-zinc-400 py-2 flex flex-col">
      <div className="mx-auto h-full     w-[350px] flex flex-col justify-center items-center my-8">
        <a
          href="https://drive.google.com/uc?export=download&id=1IW0ufs59LIxuKMtoVn4_fOfXk3uMIuDu"
          className="cursor-pointer animate-pulse">
          <div className="flex max-w-48 h-12 px-3 py-4 gap-2 rounded-xl items-center justify-center bg-zinc-500 text-white sm:h-14">
            <svg viewBox="0 0 16 16" className="w-5 sm:w-7">
              <path
                fill="currentColor"
                d="m10.213 
                1.471l.691-1.26q.069-.124-.048-.192q-.128-.057-.195.058l-.7
                1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037
                5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673
                1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0
                0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11a.35.35 0 0 1-.263-.11a.37.37
                0 0 1-.107-.264a.37.37 0 0 1 .107-.265a.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36
                0 0 1 .112.265a.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11a.37.37 0 0 1-.268-.11a.36.36
                0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5
                11.77q0 .441.311.75q.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288a.97.97 0 0 0 .71-.288a.95.95 
                0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288a.97.97 0 0 0
                .71-.288a.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308q.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98
                0 0 0-.702.278a.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0
                .293-.69V6.146a.9.9 0 0 0-.293-.685a1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9
                0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69a.97.97 0 0 1-.707.284a1 1 0 0 1-.712-.284a.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68"></path>
            </svg>
            <div>
              <div className="text-[.5rem] sm:text-xs text-left">
                Download <i className="text-yellow-300">new</i> 3.0.1
              </div>
              <div className="text-sm font-semibold font-sans -mt-1 sm:text-xl">
                Android APK
              </div>
            </div>
          </div>
        </a>
        <div className="mt-9">
          {camera && (
            <BarcodeScanner
              width={400}
              height={400}
              onUpdate={(_err, result) => {
                if (result) {
                  setResultText(result.text);
                }
              }}
            />
          )}
        </div>

        <input
          onKeyUp={onEnter}
          className=" w-full h-10 px-3 py-2 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={UPC}
          onSubmit={(e) => {
            setDataResult(UPC);
            e.preventDefault();
          }}
          onChange={(e) => setUPC(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setResultText(UPC);
            }
          }}
          type="text"
          inputMode="numeric"
          maxLength="13"
          placeholder="SKU or UPC"
          pattern="[0-9]*"
        />
        {/* Camera Button */}
        {cameraImage ? (
          <img
            src={cameraOpen}
            alt="camera"
            className="w-10 h-10 mt-4 cursor-pointer text-zinc-50"
            onClick={() => {
              setCamera(!camera);
              setCameraImage(!cameraImage);
            }}
          />
        ) : (
          <img
            src={cameraClose}
            alt="camera"
            className="w-10 h-10 mt-4 cursor-pointer fill-white"
            onClick={() => {
              setCamera(!camera);
              setCameraImage(!cameraImage);
            }}
          />
        )}
      </div>
      {open && (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-colors ${
            open ? "visible bg-black/20" : "invisible"
          }`}
          onClick={() => {
            setOpen(false), setUPC("");
          }} // Close modal on click
        >
          <div
            className={`bg-white rounded-xl shadow p-6 transition-all duration-300 flex flex-col gap-1 items-center ${
              open ? "scale-100 opacity-100" : "scale-150 opacity-0"
            }`}>
            <p className="text-sm  text-gray-700">Item Description: </p>
            <a
              className="text-blue-500 underline"
              href={`https://www.google.com/search?tbm=isch&q=${dataResult.Description}`}
              target="_blank">
              <strong>{dataResult.Description || "No Data"}</strong>
            </a>
            <p className="text-sm text-gray-700">Department: </p>
            <strong>{department(dataResult.Department) || "No Data"}</strong>
            <p className="text-sm text-gray-700">SKU:</p>
            <a
              className="text-blue-500 underline"
              href={`https://www.google.com/search?tbm=isch&q=${dataResult.SKU}`}
              target="_blank">
              <strong>{dataResult.SKU || "No Data"}</strong>
            </a>
            <p className="text-sm text-gray-700">Price:</p>
            <strong>{dataResult.Price || "No Data"}</strong>

            <p className="text-sm text-gray-700">UPC: </p>
            <a
              className="text-blue-500 underline"
              href={`https://www.google.com/search?tbm=isch&q=${dataResult.UPC}`}
              target="_blank">
              <strong>{dataResult.UPC || "No Data"}</strong>
            </a>
            <p className="text-sm text-gray-700">Sub Department: </p>
            <strong>{department(dataResult["Sub Dep"]) || "No Data"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

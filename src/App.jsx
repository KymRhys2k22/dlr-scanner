import { useState } from "react";

import BarcodeScanner from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState("");

  return (
    <>
      <BarcodeScanner
        width={500}
        height={500}
        onUpdate={(_err, result) => {
          if (result) setData(result.getText());
        }}
      />
      <p>Result: {data}</p>
    </>
  );
}

export default App;
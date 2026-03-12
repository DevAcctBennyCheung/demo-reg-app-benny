import { useState } from "react"
import { BroswserRoute, Routes, Route, Link, BrowserRouter } from "react-router-dom"
import RegOptList from "./RegOptList"
import RegOptDetail from "./RegOptDetail"
import Checkout from "./Checkout"
import { CartContext } from "./CartContext"

function App() {

  const [targetCartItem, setTargetCartItem] = useState([])

  return (

    <div className="App">
      <BrowserRouter>
        <CartContext.Provider value={{ targetCartItem, setTargetCartItem }}>
          <Routes>
            <Route path="/" element={<RegOptList />} />
            <Route path="/regOptDetail" element={<RegOptDetail />}>
              <Route path=":paramsId" element={<RegOptDetail />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<>Page Not Found. 找不到頁面。</>} />
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );

}

export default App;
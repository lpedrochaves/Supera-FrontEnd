import { BrowserRouter } from "react-router-dom";

import Navegacao from "./routes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navegacao/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

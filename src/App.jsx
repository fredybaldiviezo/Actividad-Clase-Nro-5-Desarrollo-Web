import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListaComentarios from "./pages/ListaComentarios";
import RutaPrivada from "./context/RutaPrivada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/comisiones"
          element={
            <RutaPrivada>
              <ListaComentarios comisionId={1} />
            </RutaPrivada>
          }
        />

        <Route path="/" element={<Navigate to="/comisiones" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}
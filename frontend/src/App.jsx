import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;

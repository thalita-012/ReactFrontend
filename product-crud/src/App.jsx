import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />

        <Route
          path="/create"
          element={<ProductCreate />}
        />

        <Route
          path="/edit/:id"
          element={<ProductEdit />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
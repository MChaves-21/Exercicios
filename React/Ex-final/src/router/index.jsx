import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Certifique-se de que o caminho está correto
import ItemList from "../components/ItemList";
import ItemDetail from "../components/ItemDetail";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Este será seu layout principal
    children: [
      {
        path: "items",
        element: <ItemList />,
      },
      {
        path: "items/new",
        element: <AddItem />,
      },
      {
        path: "items/:itemId",
        element: <ItemDetail />,
      },
      {
        path: "items/:itemId/edit",
        element: <EditItem />,
      },
    ],
  },
]);

export default router;
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ContactList from "./components/ContactList";
import NewContact from "./components/NewContact";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ContactList />} />
      <Route path="/edit" element={<NewContact />} />
    </>
  )
);

function App() {
  return (
    <div>
      <h1>App</h1>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

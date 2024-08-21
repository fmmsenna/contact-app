import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ContactList from "./components/ContactList";
import NewContact from "./components/NewContact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/contact-list" element={<ContactList />} />
      <Route path="/edit" element={<NewContact />} />
    </>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

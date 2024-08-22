import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SessionProvider } from "./components/SessionContext";

import ContactList from "./components/ContactList";
import NewContact from "./components/NewContact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ConfirmLogin from "./pages/ConfirmLogin";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/check-email" element={<ConfirmLogin />} />
      <Route path="/contact-list" element={<ContactList />} />
      <Route path="/edit" element={<NewContact />} />
    </>
  )
);

function App() {
  return (
    <div>
      <SessionProvider>
        <RouterProvider router={appRouter} />
      </SessionProvider>
    </div>
  );
}

export default App;

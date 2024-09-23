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
import UpdateContact from "./pages/UpdateContact";
import AuthGuard from "./components/AuthGuard";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthGuard />}>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/edit" element={<NewContact />} />
        <Route path="/:id" element={<UpdateContact />} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/check-email" element={<ConfirmLogin />} />
    </Route>
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

import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import api from "./api/axios";
import { setAuthChecked, setAuthUser } from "./features/authSlice";
import { useEffect } from "react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        {" "}
        <TodoDashboard />{" "}
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/check-auth");
        if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
        }
      } catch (error) {
        console.log("User not authenticated");
      } finally {
        dispatch(setAuthChecked());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

import MainPage from './pages/MainPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute children={<MainPage />} />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

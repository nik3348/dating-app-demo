import MainPage from './pages/MainPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppContextProvider from './context/AppContextProvider.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",

      element: <ProtectedRoute children={<MainPage />}/>,
    },
  ]);

  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;

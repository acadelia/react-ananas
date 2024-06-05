// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import "./App.css";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { Login, Register, Dashboard } from './Pages';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;

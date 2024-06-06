import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Dashboard } from './Pages';
import { ProtectedRoute } from './utils/protectedRoute';
import { NotFound } from './components'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
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

// function App() {
//   return (
//     <Routes>
//       <Route element={<PrivateRoutes />}>
//         <Route element={<Dashboard />} path='/' />
//       </Route>
//       <Route element={<PublicRoutes />}>
//         <Route element={<Login />} path='/login' />
//         <Route element={<Register />} path='/register' />
//       </Route>
//     </Routes>
//   )
// }

export default App;
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Dashboard, Friends, Profile } from './Pages';
import { ProtectedRoute } from './utils/protectedRoute';
import { NotFound, Spinner } from './components'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/loading" element={<Spinner />} />
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

export default App;
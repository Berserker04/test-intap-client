import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { API } from "../api";
import NavBar from "../components/layouts/NavBar";
import LoginView from "../views/auth/login/LoginView";
import RegisterView from "../views/auth/register/RegisterView";
import Home from "../views/home/HomeView";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);


  const validateToken = useCallback(
    async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: { 'Authorization': 'Bearer ' + token }
        }
        await API.POST("/user", {}, config).then(data => {
          if (data.user) {
            localStorage.setItem("full_name", data.user.full_name);
            setIsAuth(true)
          }
        })
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, [])

  useEffect(() => {
    validateToken()
  }, [validateToken])

  if (loading) return (
    <h1 style={{ display: 'flex', justifyContent: 'center'}}>Cargando...</h1>
  )

  return (
    <BrowserRouter>
      {
        !isAuth ? (
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/registrar" element={<RegisterView />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )
          : (
            <Routes>
              <Route path="/" element={<NavBar />} >
                <Route index element={<Home />} />
                <Route path="*" element={<Navigate to="home" />} />
              </Route>
            </Routes>
          )
      }
    </BrowserRouter>
  );
}

export default App;;
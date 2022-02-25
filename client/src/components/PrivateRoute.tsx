import { CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { Navigate, Outlet, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function PrivateRoute(props: any) {
  const [isAuth, setIsAuth] = useState<any>(null);
  const { id } = useParams();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    })
  });

  
  return id === "null" ? <Navigate to="/" /> :
    isAuth === null ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  ) : isAuth === true ? <Outlet /> : <Navigate to="/login" />
}
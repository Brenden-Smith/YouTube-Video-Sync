import React from "react"
import { Navigate, Outlet, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppDispatch } from "../store/hooks";
import { setRoomId } from "../store/roomId";

export default function PrivateRoute() {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  dispatch(setRoomId(id))
  return getAuth().currentUser ? <Outlet/> : <Navigate to="/login"/>
}
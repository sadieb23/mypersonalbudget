import { redirect } from "react-router-dom";

// helpers
import { keepItem } from "../helpers";
import { fetchData } from "../helpers";


export async function loginAction() {
  // delete the user
  fetchData({
    key: "userName"
  })
  
  
  // return redirect
  return redirect("/")
}
import { loginAction } from './login';
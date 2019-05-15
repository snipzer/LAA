import Repository from "../../components/vues/pages/Repository";
import Home from "../../components/vues/pages/Home";
import Loader from "../../components/layout/Loader";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import UpdateUserForm from "../../components/forms/UpdateUserForm";

export default [
  { path: "/", component: Home },
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegisterForm },
  { path: "/repository", component: Repository },
  { path: "/loader", component: Loader },
  { path: "/update", component: UpdateUserForm }
];

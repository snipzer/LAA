import Repository from "../../components/vues/pages/Repository";
import Home from "../../components/vues/pages/Home";
import Loader from "../../components/layout/Loader";
import LoginForm from "../../components/forms/LoginForm";
import Register from "../../components/vues/pages/Register";
import UpdateUserForm from "../../components/forms/UpdateUserForm";

export default [
  { path: "/", component: Home },
  { path: "/login", component: LoginForm },
  { path: "/register", component: Register },
  { path: "/repository", component: Repository },
  { path: "/loader", component: Loader },
  { path: "/update", component: UpdateUserForm }
];

import Repository from "../../components/vues/pages/Repository";
import Loader from "../../components/layout/Loader";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import Language from "../../components/vues/pages/Language";

export default [
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegisterForm },
  { path: "/repository", component: Repository },
  { path: "/loader", component: Loader },
  { path: "/language", component: Language }
];

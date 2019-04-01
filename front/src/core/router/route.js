import Repository from "../../components/vues/pages/Repository";
import OpenSource from "../../components/vues/pages/OpenSource";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import Language from "../../components/vues/pages/Language";

export default [
  { path: "/login", component: LoginForm },
  { path: "/register", component: RegisterForm },
  { path: "/repository", component: Repository },
  { path: "/opensource", component: OpenSource },
  { path: "/language", component: Language }
];

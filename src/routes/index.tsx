import LoginRoutes from "./login.routes";
import AppRoutes from "./app.routes";
import tokenExists from "../store/auth";

export default function Routes() {
  const authStore = tokenExists((state) => state.token);

  // return authStore ? <AppRoutes /> : <LoginRoutes />;
  return <AppRoutes />;
}

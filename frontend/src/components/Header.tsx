import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar";
import Logo from './shared/Logo'
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";


export default function Header() {
  const auth = useAuth();
  
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo></Logo>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
                onClick={auth.logout}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

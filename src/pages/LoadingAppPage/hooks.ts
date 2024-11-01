import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getCurrentUserService } from "@/services/zoom";
import { useLogout } from "@/hooks";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  useInitialisedDeskproAppClient((client) => {
    getCurrentUserService(client)
      .then(() => navigate("/home"))
      .catch(logout)
  }, [navigate]);
};

export { useCheckIsAuth };

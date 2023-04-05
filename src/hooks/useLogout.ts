import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { TOKEN_PATH } from "../services/zoom";

type UseLogout = () => {
    isLoading: boolean,
    logout: () => void,
};

const useLogout: UseLogout = () => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logout = useCallback(() => {
        if (!client) {
            return;
        }

        setIsLoading(true);

        client.deleteState(TOKEN_PATH)
          .then(() => navigate("/login"))
          .catch(() => navigate("/login"))
          .finally(() => setIsLoading(false));
    }, [client, navigate]);

    return { logout, isLoading };
};

export { useLogout };

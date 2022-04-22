import { useContext } from "react";
import { valideUserPermissions } from "../../utils/valideUserPermissions";

import { AuthContext } from "../context/AuthContext";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = valideUserPermissions({
    user: user ?? {},
    permissions,
    roles,
  });

  return userHasValidPermissions;
}

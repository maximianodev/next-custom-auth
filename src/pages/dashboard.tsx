import { useContext, useEffect } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";

import Can from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => {})
      .catch((err) => {});
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>

      <Can permissions={["metrics.list"]}>
        <>Métricas</>
      </Can>

      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});

import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const body = await response.json();
  return body;
}

function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return (
      <>
        <p>Última atualização: Carregando...</p>
      </>
    );
  }

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  const lastTime = parseISOString(data.updated_at);

  const { database } = data.dependencies;

  return (
    <>
      <p>Última atualização: {lastTime.toLocaleString("pt-br")}</p>
      <p>Conexões com o banco de dados: {database.number_of_connections}</p>
      <p>
        Máximo número de conexões com o banco de dados:
        {" " + database.max_connections}
      </p>
      <p>Versão do banco de dados: {database.version}</p>
    </>
  );
}

export default StatusPage;

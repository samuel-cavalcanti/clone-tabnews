const retry = require("async-retry");

async function fetchStatus() {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/status`);
  if (response.status !== 200)
    throw Error(`${response.status}\n${response.statusText}`);
}

async function waitNext() {
  await retry(fetchStatus, {
    retries: 100,
    factor: 1,
    maxTimeout: 1_000,
  });
}

beforeAll(async () => {
  await waitNext();
});

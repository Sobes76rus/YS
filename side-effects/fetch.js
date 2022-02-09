export const fetchRetry = async (
  input,
  init,
  { retryTimeout = 60000 } = {}
) => {
  const startTime = new Date().getTime();
  while (!retryTimeout || new Date().getTime() < startTime + retryTimeout) {
    const resp = await fetch(input, init);
    if (resp.status < 500) return resp;
    await new Promise((res) => setTimeout(res, 1000));

    console.warn("Retry on", resp.status, resp.statusText);
  }

  return await fetch(input, init);
};

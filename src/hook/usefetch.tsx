function useFetch() {
  const apiKey = import.meta.env.VITE_CLIENT_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const url = "https://api.themoviedb.org/3/";
  function fetchTmdb(endpoint: string) {
    return fetch(url + endpoint, options);
  }
  return fetchTmdb;
}

export default useFetch;

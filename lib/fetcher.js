const baseURL = "http://localhost:3000/";

export default async function fetcher(endpoint) {
  const response = await fetch(`${baseURL}${endpoint}`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

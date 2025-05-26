import useSWR from "swr";

// const baseURL =
//   "https://blog-next-86oi.vercel.app/" || "http://localhost:3000/";
const baseURL = "http://localhost:3000/";
const response = (...args) => fetch(...args).then((res) => res.json());

export default function useFetcher(endpoint) {
  const { data, error } = useSWR(`${baseURL}${endpoint}`, response);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

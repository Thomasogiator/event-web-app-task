import { useQuery } from "@tanstack/react-query";

const fetchEvents = async (url: string) => {
    const response = await fetch(url);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.userMessage || "Something went wrong");
    }
    return response.json();
};

export const useFetchEvents = (endpoint: string) => {
    return useQuery({
      queryKey: [endpoint],
      queryFn: () => fetchEvents(endpoint),
    });
};

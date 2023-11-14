import useSWR from 'swr';

export function useCategories(storeId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/${storeId}/categories`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  return {
    categories: data,
    isError: error,
    isLoading,
  };
}

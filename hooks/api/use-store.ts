import useSWR from 'swr';

export function useStore() {
  const { data, error, isLoading } = useSWR('/api/stores', (...args) =>
    fetch(...args).then((res) => res.json())
  );

  return {
    stores: data,
    isError: error,
    isLoading,
  };
}

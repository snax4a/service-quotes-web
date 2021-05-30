import React from "react";
import { privateClient } from "../lib/queryClient";

export default function useQueryData(url: string) {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    isLoading: true,
  });

  const fetch = React.useCallback(async () => {
    setState({ isLoading: true });
    try {
      const data = await privateClient.get(url).json();
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, [url]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    fetch,
  };
}

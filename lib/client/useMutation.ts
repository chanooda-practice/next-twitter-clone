import { useState } from "react";

export interface UseMutationState<T> {
  loading?: boolean;
  data?: T;
  error?: object;
}

export type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prevState) => ({ ...prevState, ["loading"]: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => {
        setState((prevState) => ({ ...prevState, data }));
      })
      .catch((error) => setState((prevState) => ({ ...prevState, error })))
      .finally(() => {
        setState((prevState) => ({ ...prevState, loading: false }));
      });
  }
  return [mutation, { ...state }];
}

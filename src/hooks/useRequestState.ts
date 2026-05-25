import { useState } from "react";

export type RequestStatus = "idle" | "loading" | "success" | "error";

export const useRequestState = <TKey extends string>(initialStatuses: Record<TKey, RequestStatus>) => {
  const [statuses, setStatuses] = useState<Record<TKey, RequestStatus>>(initialStatuses);
  const [errors, setErrors] = useState<Partial<Record<TKey, string>>>({});

  const setStatus = (key: TKey, status: RequestStatus) => {
    setStatuses((current) => ({ ...current, [key]: status }));
  };

  const setError = (key: TKey, message: string | null) => {
    setErrors((current) => {
      const next = { ...current };
      if (message) {
        next[key] = message;
      } else {
        delete next[key];
      }
      return next;
    });
  };

  return {
    errors,
    setError,
    setStatus,
    statuses,
  };
};

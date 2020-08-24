
export type pendingWithCallback = (
    path: string,
    callback: (exists: boolean) => void
  ) => void;
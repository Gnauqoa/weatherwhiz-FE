export const getError = (err: any) => {
  const multipleErrors = (err as any).response?.data?.error?.errors;
  return multipleErrors
    ? (err as any).response?.data?.error?.errors.join(".")
    : (err as any).response?.data?.error;
};

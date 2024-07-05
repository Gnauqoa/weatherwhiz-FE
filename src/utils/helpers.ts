export const ensureArray = <T>(data: T): T | [] => (Array.isArray(data) ? data : []);
export const sum = (type: string, tableData: any[]) =>
  tableData.reduce((total, currentValue: any) => total + currentValue[type], 0);

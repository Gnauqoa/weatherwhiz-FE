export const isServer = false;

export const TOKEN_NAME = "_ut.lw";
const BO_RANK = "_b_r";

export const saveToken = (token: string): void | null =>
  !isServer && token ? localStorage.setItem(TOKEN_NAME, token) : null;
export const getToken = (): string | null =>
  !isServer ? localStorage.getItem(TOKEN_NAME) : null;
export const removeToken = (): void | null =>
  !isServer ? localStorage.removeItem(TOKEN_NAME) : null;

export const saveBoRank = (bo_rank: string): void | null =>
  !isServer && bo_rank ? localStorage.setItem(BO_RANK, bo_rank) : null;
export const getBoRank = (): string | null =>
  !isServer ? localStorage.getItem(BO_RANK) : null;
export const removeBoRank = (): void | null =>
  !isServer ? localStorage.removeItem(BO_RANK) : null;

export const BASE_URL = "/vitepress-start/";
export const joinPath = (base: string, path: string): string =>
  `${base}${path}`.replace(/\/+/g, "/");

export const withBase = (path: string): string => joinPath(BASE_URL, path);

export const isGithub = () => "";

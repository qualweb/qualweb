export type PageOptions = {
  mobile?: boolean;
  landscape?: boolean;
  touch?: boolean;
  userAgent?: string;
  resolution?: {
    width?: number;
    height?: number;
  };
};

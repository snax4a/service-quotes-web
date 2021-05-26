export const isServer = typeof window === "undefined";

export const decodeToken = (jsonWebToken: string) => {
  // parse json object from base64 encoded jwt token
  return JSON.parse(atob(jsonWebToken.split(".")[1]));
};

export const isBefore = (date1: Date, date2: Date) => {
  return date1 < date2;
};

export const isServer = typeof window === "undefined";

export const decodeToken = (jsonWebToken: string) => {
  // parse json object from base64 encoded jwt token
  return JSON.parse(atob(jsonWebToken.split(".")[1]));
};

export const isBefore = (date1: Date, date2: Date) => {
  return date1 < date2;
};

export const camelCaseToWords = (string: string) => {
  const result = string.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function createDateFormatOptions(
  format: string
): Intl.DateTimeFormatOptions {
  switch (format) {
    case "intlDate": {
      // EN returns 3/16/2021, 5:45 PM
      return {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    }
    case "intlTime": {
      // EN returns 05:45 PM
      return {
        hour: "numeric",
        minute: "numeric",
      };
    }
    default: {
      // EN returns Tuesday, March 16, 2021, 5:45 PM
      return {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    }
  }
}

export const formatDateString = (dateString: string, format = "default") => {
  return new Intl.DateTimeFormat("pl", createDateFormatOptions(format))
    .format(new Date(dateString))
    .toString();
};

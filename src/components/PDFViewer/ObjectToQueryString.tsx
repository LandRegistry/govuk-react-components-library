export const ObjectToQueryString = (
  queryParameters: Record<string, string | number | boolean | null | undefined>,
): string => {
  return queryParameters
    ? Object.entries(queryParameters).reduce(
        (
          queryString: string,
          [key, val]: [string, string | number | boolean | null | undefined],
        ) => {
          const symbol: string = queryString.length === 0 ? "?" : "&";
          queryString += val ? `${symbol}${key}=${val}` : "";
          return queryString;
        },
        "",
      )
    : "";
};

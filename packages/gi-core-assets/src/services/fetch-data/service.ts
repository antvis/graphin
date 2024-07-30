type FetchDataService = (props: { properties: { url: string } }) => Promise<any>;

export const getFetchData: FetchDataService = ({ properties }) => {
  const { url } = properties;
  return fetch(url).then((res) => res.json());
};

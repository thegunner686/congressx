interface QueryParam {
  name: string;
  value: string;
}

export const url_builder = (base: string, params: QueryParam[]) => {
  const extend = (_endpoint) => {
    return url_builder(`${base}/${_endpoint}`, params);
  };

  const query_param = (_name, _value) => {
    return url_builder(base, [
      ...params,
      {
        name: _name,
        value: _value,
      } as QueryParam,
    ]);
  };

  const done = () => {
    const query_params = params
      .map(({ name, value }) => `${name}=${value}`)
      .join("&");
    return `${base}?${query_params}`;
  };

  return {
    extend,
    query_param,
    done,
  };
};

export const build_request_url = (base_url: string) => {
  return url_builder(base_url, []);
};

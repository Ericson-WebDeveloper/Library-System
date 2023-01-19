export const getParams = (url = window.location) => {
  // Create a params object
  let params: { page: any; p: any } = {
    page: "",
    p: "",
  };
  new URL(String(url)).searchParams.forEach(function (val, key) {
    params[key] = val;
  });
  params.page = undefined;
  params.p = undefined;
  return params;
};

export const constructQuery = (object: any): any => {
  let keys = Object.keys(object);

  let param = {};

  keys.forEach((key) => {
    if (object[key] !== "") {
      param[key] = object[key];
    }
  });

  return param;
};

export const makeQueryParams = (object: any): string => {
  let queryString = Object.keys(object)
    .map(function (key) {
      return key + "=" + object[key];
    })
    .join("&");
  // console.log(queryString);
  return queryString;
};

export const urlQueryParams = (url: any = window.location) => {
  // Create a params object
  let param: { page: any } = {
    page: "",
  };
  new URL(url).searchParams.forEach(function (val, key) {
    if (val !== "") {
      param[key] = val;
    }
  });

  param.page = undefined;
  delete param.page;

  return param;
};

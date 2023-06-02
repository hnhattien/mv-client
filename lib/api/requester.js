const API_URL = process.env.API_URL;
const CLIENT_URL =
  "http://ec2-13-239-112-137.ap-southeast-2.compute.amazonaws.com/";
export const getClientBaseURL = () => {
  return typeof window === "undefined"
    ? process.env.CLIENT_URL || CLIENT_URL
    : CLIENT_URL;
};
export const getBaseURL = () => {
  return typeof window === "undefined"
    ? process.env.API_URL || API_URL
    : API_URL;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async (url, locale = "vi", params = {}) =>
    fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        headers: {},
      }
    ),

  getSync: async (url, locale, params) => {
    const response = await fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        headers: {},
      }
    );

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  post: async (url, data = {}, locale = "vi") => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  put: async (url, data = {}, locale = "vi") => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  postFormData: async (url, data) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  // getWithToken: async (url, locale = 'vi', params) => {
  //   const session = await getSession();
  //   const response = await fetch(
  //     `${getBaseURL()}${url}${params ? '?' + new URLSearchParams(params) : ''}`,
  //     {
  //       headers: {
  //         'Accept-Language': locale,
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     }
  //   );
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);

  // },
  // postWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
  // putWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
  // deleteWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
};



import axios from 'axios';

export const commonAPI = async (reqMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: reqMethod,
    url,
    data: reqBody,
    headers: reqHeader || {
      'device-id': 'd12121',
      'app-type': 'web',
    },
  };

  try {
    const result = await axios(reqConfig);
    return result;
  } catch (err) {
    return err;
  }
};


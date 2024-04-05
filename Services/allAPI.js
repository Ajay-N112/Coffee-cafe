
import { commonAPI } from './commonAPI';
import { serverURL } from './serverURL';

// User registration API
export const registerAPI = async (details) => await commonAPI('POST', `${serverURL}/api/1.0/auth/signup`, details, '');

// User login API
export const loginAPI = async (details) => await commonAPI('POST', `${serverURL}/api/1.0/auth/login`, details, '');

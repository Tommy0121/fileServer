import axios, { AxiosRequestConfig } from "axios";

type MyRequestConfig = {
  debounce?: boolean;
  throttle?: boolean
}

const debounce = (func,time:number) =>{

}

const throttle = () => {

}

export default ( axiosConfig:AxiosRequestConfig, myConfig?:MyRequestConfig) => {

  return axios.request(axiosConfig);
}
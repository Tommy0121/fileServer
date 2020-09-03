import axios, { AxiosRequestConfig } from "axios";

type MyRequestConfig = {
  debounce?: boolean;
  throttle?: boolean
}


// debounce 
export const withDebounce = (func:Function,time:number) =>{
 
  let id:number|undefined=undefined
  return ()=>{
  
      window.clearTimeout(id);
      id=window.setTimeout(func,time)
    
   
  }
}

export const withThrottle = (func:Function,time:number) => {
  let validate:boolean = true;
  return () =>{
    if (!validate) return
    func();
    validate = !validate;
    window.setTimeout(()=>{validate = !validate},time)
  }

}

export default ( axiosConfig:AxiosRequestConfig, myConfig?:MyRequestConfig) => {

  return axios.request(axiosConfig);
}
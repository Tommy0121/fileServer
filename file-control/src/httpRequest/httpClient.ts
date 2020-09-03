
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
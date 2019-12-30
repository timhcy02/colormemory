let disabled = false

exports.disabled = disabled;

export function pressButton() {
    exports.disabled = true;
    
    // enable after 1.5 second
    setTimeout(()=>{
      exports.disabled = false;
    }, 1000)
}
  
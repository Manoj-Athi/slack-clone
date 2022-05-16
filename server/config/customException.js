function customException(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }
  
customException.prototype = Object.create(Error.prototype);

export default customException
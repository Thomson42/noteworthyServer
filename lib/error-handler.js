//eslint-disable-next-line no-console
function getErrorHandler(log = console.log) {
    
  return function errorHandler(err, req, res, next) { 
      let code, error;
  
      if (err.name === 'ValidationError') {
          code = 400;
          const { errors } = err;
          error = Object.keys(errors).map(key => errors[key].message);
      }
      else if (err.name === 'CastError') {
          code = 400;
          error = err.message;
      }
      else if(err.code) {
          code = err.code;
          error = err.error;
      }
      else {
          code = 500;
          error = 'Internal Server Error';
          log(err);
      }
  
      res.status(code).send({ error });
  };  
}
  
module.exports = getErrorHandler;
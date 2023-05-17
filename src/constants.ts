/* Constants related to HTTP Status codes and Related Error Objects */
export const HttpStatus = {
  // HttpStatus for Success
  OK: 200,
  // HttpStatus for Data Created
  CREATED: 201,
  // HttpStatus for Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,
  // HttpStatus for Server Error
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const origin = "*";

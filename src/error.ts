import { HttpStatus } from "./constants";

export class CustomError extends Error {
  message!: string;
  status!: number;
  code!: number;
  additionalInfo!: string;

  constructor(
    status: number,
    code: number,
    message: string,
    additionalInfo: string
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.additionalInfo = additionalInfo;
  }

  static handle(error: Record<string, any>, additionalInfo?: string) {
    error.additionalInfo = additionalInfo ? additionalInfo : "";
    return new CustomError(
      error.status,
      error.code,
      error.message,
      error.additionalInfo
    );
  }
}

export const ErrorInfo = {
  // HTTP Status 400 - BAD_REQUEST
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: 40000,
    message: "Bad Request",
    additionalInfo: "",
  },
  MISSING_PARAM: {
    status: HttpStatus.BAD_REQUEST,
    code: 40001,
    message: "Required Parameter(s) not present",
    additionalInfo: "",
  },
  INVALID_INPUT: {
    status: HttpStatus.BAD_REQUEST,
    code: 40002,
    message: "Input Parameter(s) is not valid",
    additionalInfo: "",
  },

  // HTTP Status 401 - UNAUTHORIZED
  AUTH_REQUIRED: {
    status: HttpStatus.UNAUTHORIZED,
    code: 40101,
    message: "Authentication Required",
    additionalInfo: "",
  },

  // HTTP Status 403 - FORBIDDEN
  ACCESS_RESTRICTED: {
    status: HttpStatus.FORBIDDEN,
    code: 40301,
    message: "Access Restricted",
    additionalInfo: "",
  },

  // HTTP Status 404 - NOT_FOUND
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 40401,
    message: "Resource Not Found",
    additionalInfo: "",
  },

  // HTTP Status 405 - METHOD_NOT_ALLOWED
  METHOD_NOT_ALLOWED: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    code: 40501,
    message: "Method Not Allowed",
    additionalInfo: "",
  },

  // HTTP Status 409 - CONFLICT
  CONFLICT: {
    status: HttpStatus.CONFLICT,
    code: 40901,
    message: "Conflict",
    additionalInfo: "",
  },

  // HTTP Status 415 - UNSUPPORTED MEDIA TYPE
  FILE_TOO_LARGE: {
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    code: 41501,
    message: "File size too large",
    additionalInfo: "",
  },
  FILE_TYPE_NOT_SUPPORTED: {
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    code: 41502,
    message: "File type not supported",
    additionalInfo: "",
  },

  // HTTP Status 429 - TOO_MANY_REQUESTS
  TOO_MANY_REQUESTS: {
    status: HttpStatus.TOO_MANY_REQUESTS,
    code: 42901,
    message: "Too many requests",
    additionalInfo: "",
  },

  // HTTP Status 500 - INTERNAL_SERVER_ERROR
  INTERNAL_SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 50001,
    message: "Internal Server Error",
    additionalInfo: "",
  },

  // HTTP Status 503 - SERVICE_UNAVAILABLE
  DATABASE_ERROR: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: 50301,
    message: "Database Error",
    additionalInfo: "",
  },
  SERVER_ERROR: {
    status: HttpStatus.SERVICE_UNAVAILABLE,
    code: 50302,
    message: "Server Error",
    additionalInfo: "",
  },
};

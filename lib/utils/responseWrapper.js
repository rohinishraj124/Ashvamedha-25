// A helper function to format successful API responses consistently.
export const success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

// A helper function to format error API responses consistently.
export const error = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};


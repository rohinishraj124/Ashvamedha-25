import { success } from '../utils/responseWrapper';

// This function can be used as a simple health check for your API
const testcron = (req, res) => {
  return res.status(200).json(success(200, "API is working properly"));
}

export default {
    testcron
};

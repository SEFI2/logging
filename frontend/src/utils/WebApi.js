// Declare API URL
const API_URL = process.env.REACT_APP_API_URL;

/**
 * parseJSON - converts response to JSON
 *
 * @param  {Response} response
 */
function parseJSON(response) {
  console.log({ response });
  if (response.status >= 400) {
    throw new Error(response);
  }
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response;
}

export default {
  /**
   * getTraffic - Requests to api for traffic check
   *
   * @param  {Date} startTime
   * @param  {Date} endTime
   */
  getTraffic: async (startTime, endTime) => {
    const url = `${API_URL}/api/traffic?startTime=${startTime}&endTime=${endTime}`;
    const response = await fetch(url);
    return parseJSON(response);
  },

  /**
   * getStats - Requests to api for statistics
   *
   * @param  {Date} startTime
   * @param  {Date} endTime
   */
  getStats: async (startTime, endTime) => {
    const url = `${API_URL}/api/stats?startTime=${startTime}&endTime=${endTime}`;
    const response = await fetch(url);
    return parseJSON(response);
  }
};

/**
 *
 * @param {any} h
 * @param {{ statusCode: number; message: string; data: Record<string, any>}} resp
 */
function response(h, resp) {
    return h
      .response({
        error: resp.statusCode >= 400,
        statusCode: resp.statusCode,
        errMessage: resp.message,
        data: resp.data || null,
      })
      .code(resp.statusCode);
  }
  
  module.exports = {
    hapiResponse: response,
  };
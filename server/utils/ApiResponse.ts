/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  timestamp: string;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
  }
}

export default ApiResponse;

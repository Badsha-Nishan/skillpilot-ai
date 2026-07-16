/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemStatus {
  status: "healthy" | "unstable" | "offline";
  timestamp: string;
  uptime: number;
  environment: string;
}

export interface NetworkDiagnostics {
  clientIp?: string;
  userAgent?: string;
  host: string;
}

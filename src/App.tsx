/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import { AuthProvider } from "./providers/AuthProvider";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

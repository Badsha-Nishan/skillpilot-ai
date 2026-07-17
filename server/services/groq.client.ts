/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY || "";

export const groq = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

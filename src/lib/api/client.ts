import 'server-only'

import axios from 'axios'

/**
 * The shared Axios instance for the StreamVibe NestJS API. Server-only: the
 * browser never talks to the API directly, and `API_URL` is not exposed to it.
 */
export const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10_000,
})

// Checked per request rather than at import, so a build without API_URL still
// passes (nothing calls the API while prerendering) and a missing value fails
// with its name instead of as a request to a relative URL.
api.interceptors.request.use((config) => {
  if (!config.baseURL) {
    throw new Error('API_URL is not set. Add it to web/.env, pointing at the NestJS API.')
  }
  return config
})

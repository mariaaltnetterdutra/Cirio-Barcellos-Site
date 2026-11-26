export const ADMIN_TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

export const ADMIN_PASSWORD_MIN_LENGTH = 10;
export const ADMIN_TOKEN_SECRET_MIN_LENGTH = 32;

export const ADMIN_RATE_LIMIT = { limit: 120, ttl: 60_000 };
export const ADMIN_LOGIN_RATE_LIMIT = { limit: 5, ttl: 60_000 };

export const LEADS_PAGE_SIZE = { default: 20, max: 50 } as const;
export const SEARCH_MAX_LENGTH = 80;

interface ClientRateLimitEntry {
  count: number;
  resetTime: number;
}

class ClientRateLimiter {
  private storage: Map<string, ClientRateLimitEntry>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.storage = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(key: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.storage.get(key);

    if (!entry || now > entry.resetTime) {
      this.storage.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true, remaining: this.maxRequests - 1, resetTime: now + this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetTime: entry.resetTime };
    }

    entry.count++;
    return { allowed: true, remaining: this.maxRequests - entry.count, resetTime: entry.resetTime };
  }

  getTimeUntilReset(key: string): number {
    const entry = this.storage.get(key);
    if (!entry) return 0;
    return Math.max(0, entry.resetTime - Date.now());
  }
}

// Rate limiter for GitHub API calls (per user session)
export const githubApiRateLimiter = new ClientRateLimiter(60000, 20);

// Rate limiter for search operations
export const searchRateLimiter = new ClientRateLimiter(30000, 5);

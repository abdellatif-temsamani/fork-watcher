const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
const MAX_USERNAME_LENGTH = 39;

export function validateGitHubUsername(username: string): { valid: boolean; error?: string } {
  const trimmed = username.trim();

  if (!trimmed) {
    return { valid: false, error: "Username is required" };
  }

  if (trimmed.length > MAX_USERNAME_LENGTH) {
    return { valid: false, error: `Username must be ${MAX_USERNAME_LENGTH} characters or less` };
  }

  if (!GITHUB_USERNAME_REGEX.test(trimmed)) {
    return {
      valid: false,
      error: "Username can only contain alphanumeric characters and hyphens (cannot start/end with hyphen)",
    };
  }

  // Check for common injection patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /data:text\/html/i,
    /%3Cscript/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: "Invalid characters detected" };
    }
  }

  return { valid: true };
}

export function sanitizeGitHubUsername(username: string): string {
  return username
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "")
    .slice(0, MAX_USERNAME_LENGTH);
}

export function validateRepoName(repoName: string): { valid: boolean; error?: string } {
  const trimmed = repoName.trim();

  if (!trimmed) {
    return { valid: false, error: "Repository name is required" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Repository name too long" };
  }

  // GitHub repo names can contain alphanumeric, hyphens, underscores, and periods
  const repoRegex = /^[a-zA-Z0-9._-]+$/;
  if (!repoRegex.test(trimmed)) {
    return { valid: false, error: "Invalid repository name format" };
  }

  return { valid: true };
}

export function sanitizeString(input: string, maxLength: number = 100): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, maxLength);
}

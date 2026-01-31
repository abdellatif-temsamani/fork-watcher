import { GitHubRepo, GitHubFork } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  // Use token from environment variable if available
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User "${username}" not found`);
    }
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch repos: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchRepoForks(owner: string, repo: string): Promise<GitHubFork[]> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/forks?per_page=100`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch forks: ${response.statusText}`);
  }

  return response.json();
}

export interface GitHubOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  fork: boolean;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  language: string | null;
  owner: GitHubOwner;
  forks_url: string;
}

export interface GitHubFork {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  language: string | null;
  owner: GitHubOwner;
  created_at: string;
  updated_at: string;
}

export interface RepoWithForks {
  repo: GitHubRepo;
  forks: GitHubFork[];
}

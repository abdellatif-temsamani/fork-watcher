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
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
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

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  type: string;
}

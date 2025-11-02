export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

const GITHUB_USERNAME = "prithvisaran3";

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Sort by stars first, then by pushed_at
    return repos
      .filter((repo) => !repo.name.includes("prithvisaran3")) // Filter out profile repos
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, 12); // Take top 12
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Dart: "#00B4AB",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Go: "#00ADD8",
    Rust: "#dea584",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };

  return colors[language || ""] || "#8b949e";
}


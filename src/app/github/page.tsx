import UsernameInput from "@/components/github/UsernameInput";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GitHub Fork Watcher",
    description:
        "Enter a GitHub username to see all their repositories and forks",
};

export default function GitHubPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <UsernameInput />
        </main>
    );
}

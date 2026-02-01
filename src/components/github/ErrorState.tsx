"use client";

import { WindowPanel } from "@/components/y2k/WindowPanel";
import { ChromeButton } from "@/components/y2k/ChromeButton";
import { StatusBadge } from "@/components/y2k/StatusBadge";
import { TerminalBlock } from "@/components/y2k/TerminalBlock";
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <WindowPanel
      variant="elevated"
      showWindowControls
      className="w-full max-w-lg mx-auto"
    >
      <div className="p-8">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/30 shadow-[0_0_30px_oklch(0.55_0.2_25/0.3)]">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 h-20 w-20 rounded-2xl bg-destructive/20 blur-xl" />
          </div>
        </div>

        <div className="text-center mb-6">
          <StatusBadge variant="destructive" className="mb-4">
            ERROR
          </StatusBadge>
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground">
            We encountered an error while fetching the data
          </p>
        </div>

        {/* Error Details */}
        <TerminalBlock
          title="error.log"
          className="mb-8 border-destructive/30"
        >
          <span className="text-destructive">{message}</span>
        </TerminalBlock>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/github" className="w-full sm:w-auto">
            <ChromeButton variant="filled" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Another User
            </ChromeButton>
          </Link>
          <ChromeButton
            variant="default"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </ChromeButton>
        </div>
      </div>
    </WindowPanel>
  );
}

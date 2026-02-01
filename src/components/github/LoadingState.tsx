import { WindowPanel } from "@/components/y2k/WindowPanel";
import { StatusBadge } from "@/components/y2k/StatusBadge";

export function LoadingState() {
  return (
    <WindowPanel variant="elevated" showWindowControls className="w-full">
      <div className="flex flex-col items-center justify-center py-16 px-8">
        {/* Animated Spinner */}
        <div className="relative mb-8">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-2 h-12 w-12 rounded-full bg-primary/10 shadow-[0_0_20px_oklch(0.75_0.25_145/0.3)]" />
        </div>

        <StatusBadge variant="jungle" glow className="mb-4">
          FETCHING DATA
        </StatusBadge>

        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Scanning repositories...
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Retrieving fork data from GitHub. This may take a moment depending on the user&apos;s repository count.
        </p>

        {/* Loading bars */}
        <div className="mt-8 w-full max-w-xs space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-full rounded-full bg-muted overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-primary/60 animate-pulse"
                style={{
                  width: `${30 + i * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </WindowPanel>
  );
}

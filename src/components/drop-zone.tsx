import { UploadCloud } from "lucide-react";
import { useState, type ReactNode } from "react";

/**
 * Drag-and-drop upload target for the admin mockups.
 *
 * Frontend only: dropped files are never read or stored. The component reports
 * the drop through `onFiles` so callers can show a confirmation, and renders
 * `preview` in place of the prompt once something has been "attached".
 */
export function DropZone({
  label,
  hint,
  onFiles,
  preview,
  className = "",
  compact = false,
}: {
  label: string;
  hint: string;
  onFiles?: (fileNames: string[]) => void;
  preview?: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const names = Array.from(event.dataTransfer?.files ?? []).map((file) => file.name);
    onFiles?.(names.length ? names : [label]);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`rounded-lg border border-dashed transition ${
        dragging
          ? "border-blue bg-blue/10 shadow-glow"
          : "border-border bg-surface hover:border-blue/50"
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => onFiles?.([label])}
        className={`flex w-full flex-col items-center justify-center rounded-lg px-4 text-center ${
          compact ? "py-6" : "py-10 sm:py-12"
        }`}
      >
        {preview ?? (
          <>
            <UploadCloud
              className={`${compact ? "size-5" : "size-6"} ${
                dragging ? "text-blue" : "text-blue-ink"
              }`}
            />
            <span className="mt-3 text-sm font-semibold">
              {dragging ? `Drop to attach ${label.toLowerCase()}` : label}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">{hint}</span>
          </>
        )}
      </button>
    </div>
  );
}

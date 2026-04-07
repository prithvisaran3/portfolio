"use client";

import { useEffect } from "react";

export function CopyProtection() {
    useEffect(() => {
        const preventDefault = (e: Event) => {
            e.preventDefault();
        };

        const handleKeydown = (e: KeyboardEvent) => {
            // Prevent Cmd+C, Cmd+X, Cmd+U (View Source), Cmd+S (Save), Cmd+P (Print)
            if (
                (e.metaKey || e.ctrlKey) &&
                ["c", "x", "u", "s", "p"].includes(e.key.toLowerCase())
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", preventDefault);
        document.addEventListener("copy", preventDefault);
        document.addEventListener("cut", preventDefault);
        document.addEventListener("dragstart", preventDefault);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("contextmenu", preventDefault);
            document.removeEventListener("copy", preventDefault);
            document.removeEventListener("cut", preventDefault);
            document.removeEventListener("dragstart", preventDefault);
            document.removeEventListener("keydown", handleKeydown);
        };
    }, []);

    return null;
}

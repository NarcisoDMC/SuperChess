"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    if (!mounted) {
        return null;
    }

    const isDark = (resolvedTheme || theme) === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Alternar modo oscuro y claro"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 text-neutral-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 dark:border-neutral-800/80 dark:bg-neutral-900/80 dark:text-neutral-100"
        >
            {isDark ? (
                <Sun className="h-5 w-5 text-blue-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
                <Moon className="h-5 w-5 text-neutral-700 transition-transform duration-300 hover:-rotate-12" />
            )}
        </button>
    );
}
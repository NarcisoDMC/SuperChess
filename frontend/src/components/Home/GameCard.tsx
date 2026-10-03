import React from "react";
import {
    Zap,
    Flame,
    Clock,
    Trophy,
    Bot,
    Puzzle,
    Shuffle,
    Swords,
    Play,
    Users,
    type LucideIcon
} from "lucide-react";

export interface GameModeItem {
    id: string;
    title: string;
    timeControl: string;
    description: string;
    badge: string;
    badgeColor: string; // Tailwind color classes for badge
    gradient: string;   // Tailwind gradient classes for icon/accent
    iconName: "zap" | "flame" | "clock" | "trophy" | "bot" | "puzzle" | "shuffle" | "swords";
    playersOnline?: string;
    actionText?: string;
}

const ICON_MAP: Record<GameModeItem["iconName"], LucideIcon> = {
    zap: Zap,
    flame: Flame,
    clock: Clock,
    trophy: Trophy,
    bot: Bot,
    puzzle: Puzzle,
    shuffle: Shuffle,
    swords: Swords,
};

interface GameCardProps {
    game: GameModeItem;
    onPlay?: (game: GameModeItem) => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
    const Icon = ICON_MAP[game.iconName] || Trophy;

    return (
        <div className="group relative flex flex-col justify-between w-[290px] sm:w-[320px] h-[390px] shrink-0 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 snap-start select-none">

            {/* Decorative subtle top gradient bar */}
            <div
                className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${game.gradient} opacity-80 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300`}
            />

            {/* Card Header: Icon & Badge */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${game.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className="w-6 h-6" />
                    </div>

                    <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${game.badgeColor}`}
                    >
                        {game.badge}
                    </span>
                </div>

                {/* Title & Time Control */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {game.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <Clock className="w-3.5 h-3.5 inline" />
                    <span>{game.timeControl}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {game.description}
                </p>
            </div>

            {/* Card Footer: Players count & Action Button */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {game.playersOnline && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <Users className="w-3.5 h-3.5" />
                        <span>{game.playersOnline}</span>
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPlay?.(game);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r ${game.gradient} hover:opacity-95 active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
                >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{game.actionText || "Jugar ahora"}</span>
                </button>
            </div>
        </div>
    );
}

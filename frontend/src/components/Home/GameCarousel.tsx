"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import GameCard, { type GameModeItem } from "./GameCard";

export const DEFAULT_CHESS_MODES: GameModeItem[] = [
    {
        id: "blitz",
        title: "Blitz",
        timeControl: "3 min • 5 min",
        description: "El modo más popular del mundo. Partidas dinámicas llenas de emoción y cálculo rápido bajo presión.",
        badge: "Popular",
        badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300",
        gradient: "from-amber-500 to-orange-600",
        iconName: "flame",
        playersOnline: "5,820 jugadores activos",
        actionText: "Jugar Blitz"
    },
    {
        id: "bullet",
        title: "Bullet",
        timeControl: "1 min • 1+1 s",
        description: "Velocidad vertiginosa. Pon a prueba tus reflejos e instinto donde cada fracción de segundo cuenta.",
        badge: "Ultra Rápido",
        badgeColor: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300",
        gradient: "from-rose-500 to-red-600",
        iconName: "zap",
        playersOnline: "2,940 jugadores activos",
        actionText: "Jugar Bullet"
    },
    {
        id: "rapid",
        title: "Rápido (Rapid)",
        timeControl: "10 min • 15+10 s",
        description: "El equilibrio ideal. Tiempo suficiente para pensar jugadas profundas sin perder agilidad competitiva.",
        badge: "Estratégico",
        badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
        gradient: "from-blue-500 to-indigo-600",
        iconName: "clock",
        playersOnline: "3,410 jugadores activos",
        actionText: "Jugar Rápido"
    },
    {
        id: "classical",
        title: "Clásico",
        timeControl: "30 min • 60 min",
        description: "Ajedrez de torneo tradicional. Desarrolla planes a largo plazo, finales técnicos y cálculo maestro.",
        badge: "Torneo",
        badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
        gradient: "from-emerald-500 to-teal-600",
        iconName: "trophy",
        playersOnline: "1,150 jugadores activos",
        actionText: "Jugar Clásico"
    },
    {
        id: "ai-bots",
        title: "Entrena con IA",
        timeControl: "A tu propio ritmo",
        description: "Desafía bots de diferentes personalidades y niveles de ELO (desde 400 hasta 3200+) para mejorar tu juego.",
        badge: "Inteligencia Artificial",
        badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
        gradient: "from-purple-500 to-pink-600",
        iconName: "bot",
        playersOnline: "Disponible 24/7",
        actionText: "Retar a la IA"
    },
    {
        id: "puzzles",
        title: "Puzzles Tácticos",
        timeControl: "Sin límite de tiempo",
        description: "Entrena tu visión táctica resolviendo problemas de mate, clavadas y sacrificios ganadores adaptados a tu nivel.",
        badge: "Entrenamiento",
        badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
        gradient: "from-amber-500 to-yellow-600",
        iconName: "puzzle",
        playersOnline: "+50,000 problemas",
        actionText: "Resolver Puzzles"
    },
    {
        id: "chess-960",
        title: "Ajedrez 960",
        timeControl: "Fischer Random",
        description: "Posición inicial de piezas aleatoria. Cero teoría de aperturas memorizada, 100% comprensión y creatividad pura.",
        badge: "Variante",
        badgeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
        gradient: "from-cyan-500 to-blue-600",
        iconName: "shuffle",
        playersOnline: "780 jugadores activos",
        actionText: "Jugar 960"
    },
    {
        id: "superchess-arena",
        title: "SuperChess Arena",
        timeControl: "Reglas Especiales",
        description: "Partidas con poderes especiales, casillas secretas y habilidades únicas. El ajedrez llevado al siguiente nivel.",
        badge: "Exclusivo",
        badgeColor: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-300",
        gradient: "from-fuchsia-500 to-violet-600",
        iconName: "swords",
        playersOnline: "Modo SuperChess",
        actionText: "Entrar a la Arena"
    }
];

interface GameCarouselProps {
    games?: GameModeItem[];
    title?: string;
    subtitle?: string;
    onSelectGame?: (game: GameModeItem) => void;
}

export default function GameCarousel({
    games = DEFAULT_CHESS_MODES,
    title = "Tipos de Partida",
    subtitle = "Elige tu modalidad preferida y sumérgete en el tablero",
    onSelectGame,
}: GameCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Check scroll position to enable/disable arrow buttons and update active dot
    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

        // Approximate index for indicator dots
        const cardWidth = 320; // approximate width + gap
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(Math.max(0, index), games.length - 1));
    }, [games.length]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollState();
        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [updateScrollState]);

    // Scroll smoothly by a distance
    const scrollByDistance = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollAmount = el.clientWidth * 0.75;
        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    // Scroll to a specific card index
    const scrollToIndex = (index: number) => {
        const el = scrollRef.current;
        if (!el) return;

        const cards = el.children;
        if (cards[index]) {
            (cards[index] as HTMLElement).scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }
    };

    // Drag-to-scroll event handlers (Mouse)
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollRef.current;
        if (!el) return;

        setIsDragging(true);
        setHasMoved(false);
        setStartX(e.pageX - el.offsetLeft);
        setScrollStart(el.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const el = scrollRef.current;
        if (!el) return;

        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.3;

        if (Math.abs(walk) > 5) {
            setHasMoved(true);
        }
        el.scrollLeft = scrollStart - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const handleCardPlay = (game: GameModeItem) => {
        if (hasMoved) return; // Prevent triggering if user was dragging
        if (onSelectGame) {
            onSelectGame(game);
        } else {
            console.log("Selected game mode:", game.id);
        }
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>SuperChess Modos</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                        {subtitle}
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                        onClick={() => scrollByDistance("left")}
                        disabled={!canScrollLeft}
                        aria-label="Desplazar hacia la izquierda"
                        className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer backdrop-blur"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scrollByDistance("right")}
                        disabled={!canScrollRight}
                        aria-label="Desplazar hacia la derecha"
                        className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer backdrop-blur"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable / Draggable Container */}
            <div className="relative group">
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className={`flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"
                        }`}
                    style={{ WebkitOverflowScrolling: "touch" }}
                    tabIndex={0}
                    role="region"
                    aria-label="Carrusel de tipos de juego de ajedrez"
                >
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onPlay={handleCardPlay}
                        />
                    ))}
                </div>
            </div>

            {/* Pagination dots & helper note */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline-block">
                    Arrastra con el ratón o desliza con el dedo para ver más modos
                </span>

                <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
                    {games.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            aria-label={`Ir a tarjeta ${idx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx
                                    ? "w-6 bg-blue-600 dark:bg-blue-400"
                                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

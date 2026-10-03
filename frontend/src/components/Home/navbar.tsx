"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Home, Users } from "lucide-react";
import SideNav from "./SideNav";

const MotionLink = motion.create(Link);

export type NavTabId = "inicio" | "comunidad";

interface TabItem {
    id: NavTabId;
    label: string;
    icon: typeof Home;
}

const TABS: TabItem[] = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "comunidad", label: "Comunidad", icon: Users },
];

export default function Navbar() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<NavTabId>("inicio");
    const [isMenuHovered, setIsMenuHovered] = useState(false);

    return (
        <>
            <header className="w-full relative z-30">
                {/* Navbar principal */}
                <nav className="bg-blue-300 dark:bg-blue-500 rounded-b-3xl shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo and Home Link with subtle Motion hover animation */}
                            <MotionLink
                                href="/"
                                initial="initial"
                                whileHover="hover"
                                whileTap={{ scale: 0.97 }}
                                className="relative isolate flex items-center rounded-2xl px-3 py-1.5 h-16 select-none focus:outline-none cursor-pointer"
                            >
                                {/* Fondo sutil animado con motion/react en la posición correcta */}
                                <motion.span
                                    variants={{
                                        initial: { scale: 0.82, opacity: 0 },
                                        hover: {
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 26,
                                            },
                                        },
                                    }}
                                    className="absolute inset-0 rounded-2xl bg-white/45 dark:bg-white/20 border border-white/50 dark:border-white/25 shadow-xs pointer-events-none"
                                />

                                <Image
                                    src="/SuperChess/Assets/SuperChessLogo.svg"
                                    alt="SuperChess Logo"
                                    width={100}
                                    height={50}
                                    className="dark:hidden relative z-10"
                                    priority
                                />
                                <Image
                                    src="/SuperChess/Assets/SuperChessLogoObscure.svg"
                                    alt="SuperChess Logo"
                                    width={100}
                                    height={50}
                                    className="hidden dark:block relative z-10"
                                    priority
                                />
                            </MotionLink>

                            {/* Hamburger Button to Open Sidenav */}
                            <motion.button
                                type="button"
                                onClick={() => setIsSideNavOpen(true)}
                                onMouseEnter={() => setIsMenuHovered(true)}
                                onMouseLeave={() => setIsMenuHovered(false)}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Abrir menú de navegación"
                                aria-expanded={isSideNavOpen}
                                className="relative isolate p-2.5 rounded-2xl text-slate-800 dark:text-slate-100 cursor-pointer focus:outline-none select-none"
                            >
                                {/* Fondo sutil animado con motion/react en la posición correcta */}
                                <AnimatePresence>
                                    {isMenuHovered && (
                                        <motion.span
                                            key="hamburger-hover-bg"
                                            initial={{ scale: 0.82, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.82, opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 26,
                                            }}
                                            className="absolute inset-0 rounded-2xl bg-white/45 dark:bg-white/20 border border-white/50 dark:border-white/25 shadow-xs pointer-events-none"
                                        />
                                    )}
                                </AnimatePresence>
                                <Menu className="w-6 h-6 relative z-10" />
                            </motion.button>
                        </div>
                    </div>
                </nav>

                {/* Tabbar debajo del propio navbar con bordes inferiores redondeados */}
                <div className="flex justify-center -mt-1 sm:-mt-1.5 px-4 relative z-20">
                    <nav
                        aria-label="Pestañas principales"
                        className="bg-blue-300 dark:bg-blue-500 rounded-b-3xl shadow-md border-x border-b border-blue-400/50 dark:border-blue-400/30 px-3.5 py-1.5 flex items-center gap-3 overflow-visible"
                    >
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    aria-selected={isActive}
                                    role="tab"
                                    className="relative px-5 py-2 rounded-2xl text-sm font-semibold transition-colors duration-200 cursor-pointer z-10 flex items-center gap-2 select-none focus:outline-none"
                                >
                                    {/* Sobresaliente animado sutil con rebote discreto y ligero estiramiento */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabSobresaliente"
                                            className="absolute -inset-x-1.5 -inset-y-0.5 bg-white dark:bg-slate-900 rounded-2xl shadow-md ring-1 ring-blue-400/30 dark:ring-blue-400/20 -z-10"
                                            transition={{
                                                layout: {
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 28,
                                                    mass: 0.6,
                                                },
                                                scaleX: {
                                                    duration: 0.28,
                                                    times: [0, 0.4, 0.8, 1],
                                                },
                                                scaleY: {
                                                    duration: 0.28,
                                                    times: [0, 0.4, 0.8, 1],
                                                },
                                            }}
                                            animate={{
                                                scaleX: [1, 1.09, 0.98, 1],
                                                scaleY: [1, 0.95, 1.01, 1],
                                            }}
                                        />
                                    )}

                                    <Icon
                                        className={`w-4 h-4 transition-transform duration-200 ${isActive
                                                ? "scale-105 text-blue-600 dark:text-blue-400"
                                                : "text-slate-700 dark:text-blue-100"
                                            }`}
                                    />
                                    <span
                                        className={
                                            isActive
                                                ? "text-blue-950 dark:text-white font-bold"
                                                : "text-slate-800/80 dark:text-blue-100/80 hover:text-slate-950 dark:hover:text-white"
                                        }
                                    >
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Sidenav component */}
            <SideNav
                isOpen={isSideNavOpen}
                onClose={() => setIsSideNavOpen(false)}
            />
        </>
    );
}
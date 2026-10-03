"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
    X,
    LogIn,
    UserPlus,
    BarChart3,
    Settings,
    HelpCircle,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

const MotionLink = motion.create(Link);

interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
    const [isCloseHovered, setIsCloseHovered] = useState(false);
    // Prevent scrolling when sidenav is open & listen for Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop overlay */}
                    <motion.div
                        key="sidenav-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        onClick={onClose}
                        aria-hidden="true"
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs cursor-pointer"
                    />

                    {/* Sidenav panel */}
                    <motion.aside
                        key="sidenav-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú de navegación"
                        className="relative z-10 h-full w-80 max-w-[85vw] sm:w-88 bg-blue-300 dark:bg-blue-500 rounded-l-3xl shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-blue-400/60 dark:border-blue-400/30 text-slate-800 dark:text-white"
                    >
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between p-5 border-b border-blue-400/40 dark:border-blue-400/30">
                                <MotionLink
                                    href="/"
                                    onClick={onClose}
                                    initial="initial"
                                    whileHover="hover"
                                    whileTap={{ scale: 0.97 }}
                                    className="relative isolate group flex items-center rounded-2xl px-3 py-1.5 h-16 select-none focus:outline-none cursor-pointer"
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
                                        width={90}
                                        height={50}
                                        className="dark:hidden transition-transform duration-200 group-hover:scale-105 relative z-10"
                                        priority
                                    />
                                    <Image
                                        src="/SuperChess/Assets/SuperChessLogoObscure.svg"
                                        alt="SuperChess Logo"
                                        width={90}
                                        height={50}
                                        className="hidden dark:block transition-transform duration-200 group-hover:scale-105 relative z-10"
                                        priority
                                    />
                                </MotionLink>

                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    onMouseEnter={() => setIsCloseHovered(true)}
                                    onMouseLeave={() => setIsCloseHovered(false)}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Cerrar menú"
                                    className="relative isolate p-2.5 rounded-2xl text-slate-800 dark:text-slate-100 cursor-pointer focus:outline-none select-none"
                                >
                                    {/* Fondo sutil animado con motion/react en la posición correcta */}
                                    <AnimatePresence>
                                        {isCloseHovered && (
                                            <motion.span
                                                key="close-hover-bg"
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
                                    <X className="w-6 h-6 relative z-10" />
                                </motion.button>
                            </div>

                            {/* Action Buttons: Iniciar Sesión y Registrarse */}
                            <div className="p-5 flex flex-col gap-3">
                                {/* Botón Iniciar Sesión */}
                                <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/login"
                                        onClick={onClose}
                                        className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-2xl font-semibold text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-[length:200%_auto] hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600"
                                    >
                                        <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        <span className="tracking-wide">Iniciar Sesión</span>
                                    </Link>
                                </motion.div>

                                {/* Botón Registrarse */}
                                <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/registro"
                                        onClick={onClose}
                                        className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-2xl font-semibold text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-teal-500"
                                    >
                                        <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                        <span className="tracking-wide">Registrarse</span>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Botones de navegación transparentes con delimitación arriba y abajo */}
                            <div className="px-5 pt-3 pb-6 flex flex-col space-y-3.5">
                                <p className="text-xs uppercase font-bold tracking-widest text-slate-700/80 dark:text-blue-100/70 px-1 mb-1">
                                    Navegación
                                </p>

                                {/* Opción Estadísticas */}
                                <motion.div whileHover={{ x: 6 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href="/estadisticas"
                                        onClick={onClose}
                                        className="group w-full flex items-center justify-between py-3.5 px-3 bg-transparent border-t border-b border-blue-400/70 dark:border-blue-300/40 text-slate-800 dark:text-slate-100 font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <BarChart3 className="w-5 h-5 text-blue-800 dark:text-blue-200 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm font-semibold">Estadísticas</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700/70 dark:text-slate-300/70 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                                {/* Opción Configuración */}
                                <motion.div whileHover={{ x: 6 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href="/configuracion"
                                        onClick={onClose}
                                        className="group w-full flex items-center justify-between py-3.5 px-3 bg-transparent border-t border-b border-blue-400/70 dark:border-blue-300/40 text-slate-800 dark:text-slate-100 font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Settings className="w-5 h-5 text-blue-800 dark:text-blue-200 group-hover:rotate-45 transition-transform duration-300" />
                                            <span className="text-sm font-semibold">Configuración</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700/70 dark:text-slate-300/70 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                                {/* Opción Ayuda */}
                                <motion.div whileHover={{ x: 6 }} whileTap={{ scale: 0.99 }}>
                                    <Link
                                        href="/ayuda"
                                        onClick={onClose}
                                        className="group w-full flex items-center justify-between py-3.5 px-3 bg-transparent border-t border-b border-blue-400/70 dark:border-blue-300/40 text-slate-800 dark:text-slate-100 font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="w-5 h-5 text-blue-800 dark:text-blue-200 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm font-semibold">Ayuda</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700/70 dark:text-slate-300/70 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Sidenav Footer */}
                        <div className="p-5 border-t border-blue-400/40 dark:border-blue-400/30 flex items-center justify-between text-xs text-slate-700 dark:text-blue-100/80">
                            <div className="flex items-center gap-1.5 font-medium">
                                <ShieldCheck className="w-4 h-4 text-blue-800 dark:text-blue-200" />
                                <span>SuperChess v1.0</span>
                            </div>
                            <span>© {new Date().getFullYear()}</span>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}

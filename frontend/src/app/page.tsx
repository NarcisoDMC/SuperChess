import GameCarousel from "@/components/Home/GameCarousel";

export default function Home() {
    return (
        <main className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Carrusel de tipos de juego de ajedrez */}
            <div className="py-6">
                <GameCarousel />
            </div>
        </main>
    );
}

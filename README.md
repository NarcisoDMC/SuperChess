# ♟️ SuperChess

<div align="center">

![Status](https://img.shields.io/badge/Estado-En_Desarrollo_Temprano-orange?style=for-the-badge&logo=git)
![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)

<p align="center">
  <b>Una plataforma web moderna, rápida y visualmente atractiva para jugar ajedrez en línea, resolver acertijos y competir con jugadores de todo el mundo.</b>
</p>

</div>

---

> [!WARNING]
> ### 🚧 Proyecto en Fase Temprana de Desarrollo (Work in Progress)
> Este proyecto se encuentra actualmente en una **fase inicial de desarrollo**. Muchas de las características, pantallas y servicios backend están en diseño e implementación activa. La estructura del código, los modelos de datos y las interfaces pueden cambiar con frecuencia.

---

## 📖 Acerca del Proyecto

**SuperChess** nace con la visión de crear un entorno de ajedrez contemporáneo con una experiencia de usuario (UX/UI) fluida, soporte para partidas multijugador en tiempo real, múltiples controles de tiempo, análisis asistido por inteligencia artificial y variantes dinámicas.

### 🌟 Modos de Juego Planificados

- ⚡ **Bullet:** Partidas ultra rápidas (1 min, 1+1 s) para poner a prueba los reflejos.
- 🔥 **Blitz:** El modo más popular (3 min, 5 min) con cálculo rápido y alta adrenalina.
- ⏱️ **Rápido (Rapid):** Partidas de 10 min a 15+10 s para un pensamiento más profundo.
- 🏆 **Clásico:** Partidas tradicionales de torneo (30 min a 60 min).
- 🤖 **Entrenamiento con IA:** Partidas contra bots con diferentes estilos y rangos de ELO.
- 🧩 **Puzzles & Tácticas:** Desafíos diarios y resolución de problemas para afinar la visión táctica.
- 🔀 **Chess960 (Fischer Random):** Posiciones iniciales aleatorias para desafiar la teoría de aperturas.
- ⚔️ **Torneos y Arenas:** Competencias comunitarias en tiempo real.

---

## 🛠️ Stack Tecnológico

El proyecto está estructurado como una arquitectura modular:

### **Frontend**
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [Motion](https://motion.dev/) (`motion/react`)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Tema:** [next-themes](https://github.com/pacocoursey/next-themes) (Modo Claro / Modo Oscuro)

### **Backend**
- **Entorno:** [Node.js](https://nodejs.org/)
- **Framework:** [Express 5](https://expressjs.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Ejecución en desarrollo:** `tsx watch`

### **Gestor de Paquetes**
- [pnpm](https://pnpm.io/)

---

## 📁 Estructura del Repositorio

```plaintext
SuperChess/
├── backend/               # Servidor API y lógica en tiempo real
│   ├── package.json       # Dependencias y scripts del backend (Express 5, TS)
│   └── tsconfig.json      # Configuración de TypeScript del backend
│
├── frontend/              # Aplicación web cliente en Next.js
│   ├── public/            # Recursos estáticos, logos y vectores
│   ├── src/
│   │   ├── app/           # App Router (rutas, layouts y páginas principales)
│   │   └── components/    # Componentes reutilizables (Navbar, SideNav, Carousels, Cards)
│   ├── package.json       # Dependencias del frontend
│   └── tsconfig.json      # Configuración de TypeScript del frontend
│
├── .gitignore             # Reglas de exclusión de Git (ignora node_modules, .next, etc.)
├── package.json           # Configuración raíz del proyecto
└── README.md              # Documentación principal del proyecto
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Prerrequisitos
- **Node.js** >= 20.x
- **pnpm** >= 9.x (`npm install -g pnpm`)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/NarcisoDMC/SuperChess.git
cd SuperChess
```

### 2. Ejecutar el Frontend
```bash
cd frontend
pnpm install
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la interfaz interactiva.

### 3. Ejecutar el Backend
```bash
cd ../backend
pnpm install
pnpm dev
```

---

## 🗺️ Hoja de Ruta (Roadmap)

- [x] Estructura base del proyecto y configuración de monorepo/carpetas.
- [x] Diseño UI/UX inicial con soporte Dark/Light mode y carrusel de modalidades.
- [x] Menú de navegación responsive (Navbar y SideNav con animaciones fluidas).
- [ ] Tablero de ajedrez interactivo con validación de movimientos legales.
- [ ] Servidor de WebSockets para partidas multijugador en tiempo real.
- [ ] Sistema de emparejamiento (Matchmaking) y cálculo de rating ELO.
- [ ] Integración de motor de análisis e IA (Stockfish).
- [ ] Sistema de usuarios, perfiles, historial de partidas y estadísticas.

---

## 👤 Autor

Desarrollado por **[NarcisoDMC](https://github.com/NarcisoDMC)**.

---

## 📄 Licencia

Este proyecto se encuentra bajo la licencia **ISC**. Consulta los archivos de paquete para más detalles.

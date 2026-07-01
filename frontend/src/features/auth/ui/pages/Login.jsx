import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageCircle, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import { AuthHook } from "../../hook/AuthHook";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const FEATURES = [
    { icon: Lock, label: "End-to-End Encryption" },
    { icon: Zap, label: "Real-time Messaging" },
    { icon: ShieldCheck, label: "Secure Google Authentication" },
];

const AVATAR_GRADIENTS = [
    "from-emerald-400 to-teal-500",
    "from-indigo-400 to-violet-500",
    "from-cyan-400 to-blue-500",
    "from-fuchsia-400 to-purple-500",
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 6,
}));

/* ------------------------------------------------------------------ */
/*  Background layers                                                  */
/* ------------------------------------------------------------------ */

const AuroraBlobs = () => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/30 blur-[120px]"
            animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-indigo-500/25 blur-[130px]"
            animate={{ x: [0, -60, 40, 0], y: [0, -50, 30, 0], scale: [1, 0.9, 1.2, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-[-10rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-[110px]"
            animate={{ x: [0, 50, -60, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-10 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

const GridOverlay = () => (
    <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
            backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
        }}
    />
);

const FloatingParticles = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
            <motion.span
                key={p.id}
                className="absolute rounded-full bg-white/70"
                style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
                animate={{ y: [0, -24, 0], opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
        ))}
    </div>
);

const MouseGlow = ({ x, y }) => (
    <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
            background: useTransform(
                [x, y],
                ([xv, yv]) =>
                    `radial-gradient(600px circle at ${xv}px ${yv}px, rgba(52,211,153,0.10), rgba(99,102,241,0.06) 40%, transparent 70%)`
            ),
        }}
    />
);

const Vignette = () => (
    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_90px_rgba(2,4,10,0.9)]" />
);

/* ------------------------------------------------------------------ */
/*  Decorative 3D-ish floating elements                                 */
/* ------------------------------------------------------------------ */

const GlassSphere = ({ className, size = 90, duration = 9, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full border border-white/20 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] ${className}`}
        style={{ width: size, height: size }}
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
        <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-white/50 blur-[3px]" />
    </motion.div>
);

const GradientCube = ({ className, size = 56, duration = 10, delay = 0 }) => (
    <motion.div
        className={`absolute ${className}`}
        style={{ width: size, height: size, perspective: 600 }}
        animate={{ y: [0, 16, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
        <motion.div
            className="h-full w-full rounded-xl bg-gradient-to-br from-emerald-400/70 via-teal-500/50 to-indigo-500/60 shadow-[0_10px_40px_rgba(16,185,129,0.35)]"
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: duration * 3, delay, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
        />
    </motion.div>
);

const FloatingRing = ({ className, size = 110, duration = 16, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full border-2 border-emerald-300/30 ${className}`}
        style={{ width: size, height: size }}
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{
            rotate: { duration, delay, repeat: Infinity, ease: "linear" },
            y: { duration: duration / 2, delay, repeat: Infinity, ease: "easeInOut" },
        }}
    />
);

const FloatingChatBubble = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${className}`}
        animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
        <MessageCircle className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
    </motion.div>
);

const FloatingCard = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute w-32 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${className}`}
        animate={{ y: [0, 14, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 11, delay, repeat: Infinity, ease: "easeInOut" }}
    >
        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-emerald-400/70 to-transparent" />
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10" />
        <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
    </motion.div>
);

const SceneDecorations = () => (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
        <GlassSphere className="left-[8%] top-[18%]" size={100} duration={9} />
        <GlassSphere className="right-[10%] top-[62%]" size={70} duration={11} delay={1} />
        <GradientCube className="right-[16%] top-[16%]" size={52} delay={0.5} />
        <GradientCube className="left-[14%] bottom-[16%]" size={38} delay={1.2} />
        <FloatingRing className="left-[4%] bottom-[8%]" size={130} delay={0.3} />
        <FloatingRing className="right-[6%] top-[10%]" size={90} duration={13} delay={0.8} />
        <FloatingChatBubble className="left-[20%] top-[8%]" delay={0.4} />
        <FloatingChatBubble className="right-[22%] bottom-[12%]" delay={1.6} />
        <FloatingCard className="right-[6%] top-[38%]" delay={0.9} />
        <FloatingCard className="left-[6%] top-[42%]" delay={1.8} />
    </div>
);

/* Compact decoration set for small screens — fewer, smaller elements, kept
   out of the card's vertical band so they read as ambient motion rather than
   clutter on a narrow viewport. */
const MobileDecorations = () => (
    <div className="pointer-events-none absolute inset-0 block md:hidden">
        <GlassSphere className="left-[6%] top-[7%]" size={46} duration={7} />
        <GlassSphere className="right-[8%] bottom-[9%]" size={38} duration={8} delay={0.6} />
        <GradientCube className="right-[10%] top-[10%]" size={26} duration={8} delay={0.3} />
        <FloatingRing className="left-[10%] bottom-[6%]" size={58} duration={10} delay={0.2} />
        <FloatingChatBubble className="right-[12%] top-[16%]" delay={0.5} />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Logo                                                                */
/* ------------------------------------------------------------------ */

const Logo3D = () => (
    <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.div
            className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                background:
                    "conic-gradient(from 0deg, rgba(52,211,153,0.9), rgba(99,102,241,0.9), rgba(34,211,238,0.9), rgba(52,211,153,0.9))",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/15 to-white/[0.02] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <MessageCircle className="h-7 w-7 text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" strokeWidth={1.75} />
            </motion.div>
        </motion.div>
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-emerald-300"
                style={{ top: "50%", left: "50%" }}
                animate={{
                    x: [0, Math.cos((i * 2 * Math.PI) / 3) * 46],
                    y: [0, Math.sin((i * 2 * Math.PI) / 3) * 46],
                    opacity: [0, 1, 0],
                }}
                transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: "easeInOut" }}
            />
        ))}
    </div>
);

/* ------------------------------------------------------------------ */
/*  Magnetic Google button with ripple + morph loading                 */
/* ------------------------------------------------------------------ */

const GoogleButton = ({ onClick, loading }) => {
    const ref = useRef(null);
    const [ripples, setRipples] = useState([]);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 250, damping: 18 });
    const springY = useSpring(y, { stiffness: 250, damping: 18 });

    const handleMouseMove = (e) => {
        if (!ref.current || loading) return;
        const rect = ref.current.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        x.set(relX * 0.25);
        y.set(relY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleClick = (e) => {
        if (loading) return;
        const rect = ref.current.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
            ...prev,
            { id, left: e.clientX - rect.left, top: e.clientY - rect.top },
        ]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
        onClick?.();
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            disabled={loading}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.96 }}
            className={`
                group relative mt-9 flex h-14 w-full items-center justify-center gap-3
                overflow-hidden rounded-2xl border font-semibold
                transition-colors duration-300
                ${loading
                    ? "cursor-not-allowed border-white/10 bg-white/[0.04] text-gray-400"
                    : "cursor-pointer border-white/15 bg-white/[0.08] text-white backdrop-blur-xl hover:bg-white/[0.14]"
                }
            `}
        >
            {/* glow border */}
            {!loading && (
                <motion.span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                        background:
                            "linear-gradient(120deg, rgba(52,211,153,0.35), rgba(99,102,241,0.35), rgba(34,211,238,0.35))",
                        filter: "blur(14px)",
                    }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* ripples */}
            {ripples.map((r) => (
                <motion.span
                    key={r.id}
                    className="pointer-events-none absolute rounded-full bg-white/40"
                    style={{ left: r.left, top: r.top, translateX: "-50%", translateY: "-50%" }}
                    initial={{ width: 0, height: 0, opacity: 0.5 }}
                    animate={{ width: 260, height: 260, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                />
            ))}

            <span className="relative z-10 flex items-center gap-3">
                <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                        <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="flex items-center gap-2"
                        >
                            <span className="flex items-center gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="h-2 w-2 rounded-full bg-emerald-300"
                                        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ))}
                            </span>
                            <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_1.8s_linear_infinite]">
                                Connecting...
                            </span>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="flex items-center gap-3"
                        >
                            <motion.svg
                                width="20"
                                height="20"
                                viewBox="0 0 48 48"
                                whileHover={{ rotate: [0, -8, 8, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.141 35.091 26.715 36 24 36c-5.175 0-9.628-3.329-11.283-7.946l-6.522 5.025C9.535 39.556 16.227 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 0 1-4.084 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                />
                            </motion.svg>
                            Continue with Google
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </motion.button>
    );
};

/* ------------------------------------------------------------------ */
/*  Feature badges + trust row                                         */
/* ------------------------------------------------------------------ */

const containerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const FeatureBadges = () => (
    <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="mt-7 flex flex-wrap items-center justify-center gap-2"
    >
        {FEATURES.map(({ icon: Icon, label }) => (
            <motion.span
                key={label}
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.04 }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-colors hover:border-emerald-300/30 hover:text-white"
            >
                <Icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2} />
                {label}
            </motion.span>
        ))}
    </motion.div>
);

const TrustedRow = () => (
    <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6"
    >
        <div className="flex items-center">
            {AVATAR_GRADIENTS.map((g, i) => (
                <motion.div
                    key={g}
                    initial={{ opacity: 0, scale: 0.5, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -4, zIndex: 10 }}
                    className={`-ml-2.5 first:ml-0 h-8 w-8 rounded-full border-2 border-[#0b0e17] bg-gradient-to-br ${g} shadow-lg`}
                />
            ))}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="-ml-2.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b0e17] bg-white/10 text-[10px] font-semibold text-gray-300 backdrop-blur-xl"
            >
                2k+
            </motion.div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300/80" />
            Trusted by developers worldwide
        </p>
    </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const Login = () => {
    const { handleGoogleLogin, loading } = AuthHook();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef(null);

    const cardRotateX = useTransform(mouseY, [0, 1], [4, -4]);
    const cardRotateY = useTransform(mouseX, [0, 1], [-4, 4]);
    const springRotateX = useSpring(cardRotateX, { stiffness: 120, damping: 20 });
    const springRotateY = useSpring(cardRotateY, { stiffness: 120, damping: 20 });

    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);

    useEffect(() => {
        const updateFromPoint = (clientX, clientY) => {
            const normX = clientX / window.innerWidth;
            const normY = clientY / window.innerHeight;
            mouseX.set(normX);
            mouseY.set(normY);
            glowX.set(clientX);
            glowY.set(clientY);
        };
        const handleMove = (e) => updateFromPoint(e.clientX, e.clientY);
        const handleTouch = (e) => {
            const touch = e.touches[0];
            if (touch) updateFromPoint(touch.clientX, touch.clientY);
        };
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleTouch, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleTouch);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060a] p-5"
        >
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>

            {/* Background layers */}
            <AuroraBlobs />
            <GridOverlay />
            <FloatingParticles />
            <MouseGlow x={glowX} y={glowY} />
            <SceneDecorations />
            <MobileDecorations />
            <Vignette />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
                transition={{
                    opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                }}
                style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
                className="relative z-10 w-full max-w-md"
            >
                <motion.div
                    variants={containerStagger}
                    initial="hidden"
                    animate="show"
                    className="relative rounded-[36px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-10"
                >
                    {/* animated border glow */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[36px] opacity-60"
                        style={{
                            background:
                                "linear-gradient(120deg, rgba(52,211,153,0.25), transparent 30%, transparent 70%, rgba(99,102,241,0.25))",
                            padding: 1,
                            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                        }}
                        animate={{ opacity: [0.35, 0.7, 0.35] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* top reflection */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[36px] bg-gradient-to-b from-white/[0.08] to-transparent" />

                    <motion.div variants={fadeUp} className="flex justify-center">
                        <Logo3D />
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-7 text-center text-4xl font-bold tracking-tight sm:text-5xl"
                    >
                        <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.25)]">
                            Chat Freely
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-4 max-w-xs text-center leading-relaxed text-gray-400"
                    >
                        Connect with friends, share moments and continue your conversations with a single click.
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <GoogleButton onClick={handleGoogleLogin} loading={loading} />
                    </motion.div>

                    <motion.p variants={fadeUp} className="mt-5 text-center text-xs text-gray-500">
                        Secure authentication powered by Google
                    </motion.p>

                    <FeatureBadges />
                    <TrustedRow />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
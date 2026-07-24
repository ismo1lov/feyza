import { useState, useEffect } from "react";


interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 100);
    const holdTimer = setTimeout(() => setPhase("exit"), 2000);
    const exitTimer = setTimeout(() => onFinish(), 2800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-out ${
        phase === "exit" ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(340 60% 92%), hsl(30 50% 95%), hsl(280 30% 95%))",
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[80px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/20 blur-[60px] animate-pulse-soft" style={{ animationDelay: "1s" }} />

      <div
        className={`text-center transition-all duration-700 ease-out ${
          phase === "enter" ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Logo mark */}
        <div className="relative mx-auto mb-6 w-28 h-28">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-soft" />
          <div className="absolute inset-2 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            <img src="/favicon.png" alt="Feyza Aura Logo" className="w-full h-full object-cover scale-110" />
          </div>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gradient mb-3">
          Feyza Aura
        </h1>
        <div className="w-12 h-0.5 mx-auto rounded-full gradient-primary mb-3" />
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Beauty Studio
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

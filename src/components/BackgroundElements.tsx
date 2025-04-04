import { Shield, Key, Lock, ShieldCheck, KeyRound } from "lucide-react";

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top left gradient */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Bottom right gradient */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Password-themed floating icons */}
      <div
        className="absolute left-10 top-1/3 text-primary/10 animate-bounce"
        style={{ animationDuration: "8s" }}
      >
        <Shield className="w-32 h-32" />
      </div>

      <div
        className="absolute right-20 top-1/4 text-primary/5 animate-pulse"
        style={{ animationDuration: "6s" }}
      >
        <Key className="w-24 h-24" />
      </div>

      <div
        className="absolute left-1/4 bottom-1/4 text-primary/10 animate-pulse"
        style={{ animationDuration: "7s" }}
      >
        <ShieldCheck className="w-36 h-36" />
      </div>

      <div
        className="absolute right-1/3 bottom-20 text-primary/5 animate-bounce"
        style={{ animationDuration: "9s" }}
      >
        <KeyRound className="w-20 h-20" />
      </div>

      {/* Small floating elements */}
      <div
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary/10 rounded-full animate-bounce duration-4000"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute top-2/3 left-2/3 w-6 h-6 bg-primary/20 rounded-full animate-bounce duration-5000"
        style={{ animationDuration: "5s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-10 h-10 bg-primary/15 rounded-full animate-pulse duration-7000"
        style={{ animationDuration: "7s" }}
      />

      {/* Middle right icon */}
      <div
        className="absolute right-10 top-2/3 text-primary/10 animate-pulse"
        style={{ animationDuration: "10s" }}
      >
        <Lock className="w-28 h-28" />
      </div>

      {/* Icon in center background */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5 animate-pulse"
        style={{ animationDuration: "15s" }}
      >
        <Shield className="w-64 h-64" />
      </div>
    </div>
  );
};

export default BackgroundElements;

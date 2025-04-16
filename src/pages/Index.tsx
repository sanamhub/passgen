import React, { useState, useEffect } from "react";
import PasswordDisplay from "@/components/PasswordDisplay";
import PasswordOptions from "@/components/PasswordOptions";
import PasswordStrength from "@/components/PasswordStrength";
import ApiSection from "@/components/ApiSection";
import { generatePassword } from "@/utils/passwordGenerator";
import type { PasswordOptions as PasswordOptionsType } from "@/utils/passwordGenerator";
import { Github, Key, Shield } from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptionsType>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    easyToSay: false,
    easyToRead: false,
  });

  const [password, setPassword] = useState("");
  const { theme, setTheme } = useTheme();

  // Generate password whenever options change
  useEffect(() => {
    setPassword(generatePassword(passwordOptions));
  }, [passwordOptions]);

  const regeneratePassword = () => {
    setPassword(generatePassword(passwordOptions));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      <BackgroundElements />

      <header className="py-4 px-6 bg-card/60 backdrop-blur-sm shadow-sm relative z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Key className="h-6 w-6 mr-2 text-primary" />
            <h1 className="flex items-center text-xl md:text-2xl font-bold">
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PassGenFly
              </span>
              <span className="hidden sm:block ml-2 text-muted-foreground text-sm font-normal border-l border-border pl-2">
                Secure Password Generator
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
            <a
              href="https://github.com/sanamhub/password-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <PasswordDisplay
              password={password}
              regeneratePassword={regeneratePassword}
            />
          </div>

          <PasswordOptions
            options={passwordOptions}
            setOptions={setPasswordOptions}
          />

          <PasswordStrength password={password} options={passwordOptions} />

          <ApiSection />
        </div>
      </main>
    </div>
  );
};

export default Index;

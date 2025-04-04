import React from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card } from "./ui/card";

interface PasswordDisplayProps {
  password: string;
  regeneratePassword: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  regeneratePassword,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy password");
      console.error("Failed to copy password: ", err);
    }
  };

  return (
    <Card className="p-4 mb-6 border bg-card text-card-foreground">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xl font-medium overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide mr-2 py-1 max-w-[80%]">
          {password}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Copy password"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={regeneratePassword}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Regenerate password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-1 bg-primary rounded-full mt-1 opacity-70"></div>
    </Card>
  );
};

export default PasswordDisplay;

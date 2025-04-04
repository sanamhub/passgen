import React from "react";
import {
  calculatePasswordStrength,
  getStrengthInfo,
} from "../utils/passwordGenerator";
import { PasswordOptions } from "../utils/passwordGenerator";
import { Card } from "./ui/card";

interface PasswordStrengthProps {
  password: string;
  options: PasswordOptions;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  options,
}) => {
  const strength = calculatePasswordStrength(password, options);
  const { label, color } = getStrengthInfo(strength);

  return (
    <Card className="p-4 mt-4 border bg-card text-card-foreground">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Password Strength:</h3>
        <span className="font-medium" style={{ color }}>
          {label}
        </span>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full">
        <div
          className="h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${strength}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </Card>
  );
};

export default PasswordStrength;

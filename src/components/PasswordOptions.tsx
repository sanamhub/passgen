import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordOptions as PasswordOptionsType } from "../utils/passwordGenerator";
import { Card } from "./ui/card";

interface PasswordOptionsProps {
  options: PasswordOptionsType;
  setOptions: React.Dispatch<React.SetStateAction<PasswordOptionsType>>;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({
  options,
  setOptions,
}) => {
  const handleLengthChange = (value: number[]) => {
    setOptions((prev) => ({ ...prev, length: value[0] }));
  };

  const handleLengthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setOptions((prev) => ({ ...prev, length: value }));
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    name: keyof PasswordOptionsType
  ) => {
    if (typeof checked === "boolean") {
      setOptions((prev) => ({
        ...prev,
        [name]: checked,
        // If selecting a new character mode, disable the others
        ...(name === "easyToSay" && checked ? { easyToRead: false } : {}),
        ...(name === "easyToRead" && checked ? { easyToSay: false } : {}),
      }));
    }
  };

  const handleCharacterModeChange = (value: string) => {
    if (value === "all") {
      setOptions((prev) => ({ ...prev, easyToSay: false, easyToRead: false }));
    } else if (value === "easyToSay") {
      setOptions((prev) => ({ ...prev, easyToSay: true, easyToRead: false }));
    } else if (value === "easyToRead") {
      setOptions((prev) => ({ ...prev, easyToSay: false, easyToRead: true }));
    }
  };

  return (
    <Card className="p-6 border bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-6 text-left">
        Customize your password
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="length" className="text-base font-medium">
            Password Length
          </Label>
          <Input
            id="length-input"
            type="number"
            value={options.length}
            onChange={handleLengthInputChange}
            className="w-24 text-center"
            min={1}
            max={100}
          />
        </div>
        <div className="px-1">
          <Slider
            id="length"
            value={[options.length]}
            min={4}
            max={32}
            step={1}
            onValueChange={handleLengthChange}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="font-medium mb-2">Character Types</div>
          <RadioGroup
            value={
              options.easyToSay
                ? "easyToSay"
                : options.easyToRead
                ? "easyToRead"
                : "all"
            }
            onValueChange={handleCharacterModeChange}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem id="all-chars" value="all" />
              <Label
                htmlFor="all-chars"
                className="text-sm font-medium cursor-pointer"
              >
                All characters
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem id="easy-to-say" value="easyToSay" />
              <Label
                htmlFor="easy-to-say"
                className="text-sm font-medium cursor-pointer"
              >
                Easy to say
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="easy-to-read" value="easyToRead" />
              <Label
                htmlFor="easy-to-read"
                className="text-sm font-medium cursor-pointer"
              >
                Easy to read
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="font-medium mb-2">Include Characters</div>
          <div
            className={`flex items-center space-x-2 ${
              options.easyToSay || options.easyToRead ? "opacity-50" : ""
            }`}
          >
            <Checkbox
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, "uppercase")
              }
              disabled={options.easyToSay || options.easyToRead}
            />
            <Label
              htmlFor="uppercase"
              className="text-sm font-medium cursor-pointer"
            >
              Uppercase
            </Label>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              options.easyToSay || options.easyToRead ? "opacity-50" : ""
            }`}
          >
            <Checkbox
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, "lowercase")
              }
              disabled={options.easyToSay || options.easyToRead}
            />
            <Label
              htmlFor="lowercase"
              className="text-sm font-medium cursor-pointer"
            >
              Lowercase
            </Label>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              options.easyToSay || options.easyToRead ? "opacity-50" : ""
            }`}
          >
            <Checkbox
              id="numbers"
              checked={options.numbers}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, "numbers")
              }
              disabled={options.easyToSay || options.easyToRead}
            />
            <Label
              htmlFor="numbers"
              className="text-sm font-medium cursor-pointer"
            >
              Numbers
            </Label>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              options.easyToSay || options.easyToRead ? "opacity-50" : ""
            }`}
          >
            <Checkbox
              id="symbols"
              checked={options.symbols}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, "symbols")
              }
              disabled={options.easyToSay || options.easyToRead}
            />
            <Label
              htmlFor="symbols"
              className="text-sm font-medium cursor-pointer"
            >
              Symbols
            </Label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PasswordOptions;

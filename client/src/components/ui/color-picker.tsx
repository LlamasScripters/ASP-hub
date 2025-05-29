import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  className?: string;
}

const predefinedColors = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#eab308", // yellow-500
  "#22c55e", // green-500
  "#06b6d4", // cyan-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#6b7280", // gray-500
  "#1f2937", // gray-800
  "#7c3aed", // purple-600
  "#059669", // emerald-600
];

export function ColorPicker({ value = "#3b82f6", onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleColorSelect = (color: string) => {
    setLocalValue(color);
    onChange(color);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalValue(newColor);
    if (/^#[0-9a-fA-F]{6}$/.test(newColor)) {
      onChange(newColor);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border border-border"
              style={{ backgroundColor: localValue }}
            />
            <span>{localValue}</span>
            <Palette className="ml-auto h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Couleurs prédéfinies
            </label>
            <div className="grid grid-cols-6 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded border-2 border-border hover:scale-110 transition-transform",
                    localValue === color && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Couleur personnalisée
            </label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={localValue}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-12 h-10 p-0 border-0 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={localValue}
                onChange={handleInputChange}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 
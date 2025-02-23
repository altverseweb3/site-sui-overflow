import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface BrandedSelectProps {
  onChange: (token: string) => void;
  className?: string;
  placeholder: string;
  variant?: "default" | "colored";
}

export function BrandedSelect({
  onChange,
  className,
  placeholder,
  variant = "default",
}: BrandedSelectProps) {
  const baseStyles =
    "w-full rounded-lg focus:ring-0 focus:ring-offset-0 h-12 text-md";
  const variantStyles =
    variant === "colored"
      ? "bg-amber-500/25 hover:bg-amber-500/30 text-amber-500 border-amber-500"
      : "bg-zinc-700 border-zinc-600 border-3";

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={`${baseStyles} ${variantStyles} ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-zinc-800 border-zinc-700"></SelectContent>
    </Select>
  );
}

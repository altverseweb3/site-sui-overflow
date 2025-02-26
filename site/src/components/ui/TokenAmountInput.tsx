import React from "react";

interface TokenAmountInputProps {
  amount: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dollarValue?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export function TokenAmountInput({
  amount,
  onChange,
  dollarValue = "$0.00",
  readOnly = false,
  placeholder = "0",
}: TokenAmountInputProps) {
  return (
    <div className="flex-1 flex flex-col items-end">
      <input
        type="number"
        value={amount}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-3xl focus:outline-none text-right"
        readOnly={readOnly}
      />
      <span className="text-zinc-400 text-sm">{dollarValue}</span>
    </div>
  );
}

export default TokenAmountInput;

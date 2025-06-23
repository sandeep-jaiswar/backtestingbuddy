"use client"

import { ChangeEvent, useState } from "react";
import { Input, Select } from "@/components/ui";

type SelectOption = {}

const SearchBar = () => {
    const [options, setOptions] = useState<SelectOption[]>([])
    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value);
        const data = await fetch(`/api/search?query=${e.target.value}`);
        console.log(data.json());
    }


    return (
        <div className="w-full">
            <Input
                type="text"
                placeholder="Search for stocks, ETFs, indices, and more..."
                className="w-full"
                onChange={onChange}
            />
            <Select
                className="mt-2"
                options={[
                    { value: "stocks", label: "Stocks" },
                    { value: "etfs", label: "ETFs" },
                    { value: "indices", label: "Indices" },
                    { value: "cryptocurrencies", label: "Cryptocurrencies" },
                ]}
                placeholder="Select a category"
            />
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
        </div>
    )
}

export default SearchBar;
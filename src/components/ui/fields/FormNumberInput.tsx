import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";

interface FormNumberInputProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	min?: number;
	max?: number;
}

export function FormNumberInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	className,
	error,
	disabled,
	required,
	min,
	max,
}: FormNumberInputProps<T>) {
	return (
		<div>
			{label && (
				<Label htmlFor={name}>
					{label}
					{required && <span className="ml-1">*</span>}
				</Label>
			)}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						id={name}
						type="number"
						min={min}
						max={max}
						placeholder={placeholder}
						disabled={disabled}
						onChange={(e) =>
							field.onChange(Number.parseInt(e.target.value) || 0)
						}
						className={`${error ? "border-red-500" : ""} ${className || ""}`}
					/>
				)}
			/>
			{error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
		</div>
	);
}

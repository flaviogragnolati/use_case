import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";

interface FormInputProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	type?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
}

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	className,
	error,
	disabled,
	required,
}: FormInputProps<T>) {
	return (
		<div>
			{label && (
				<Label htmlFor={name}>
					{label}
					{required && <span className="ml ml ml ml ml ml">*</span>}
				</Label>
			)}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						id={name}
						type={type}
						placeholder={placeholder}
						disabled={disabled}
						className={`${error ? "border-red-500" : ""} ${className || ""}`}
					/>
				)}
			/>
			{error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
		</div>
	);
}

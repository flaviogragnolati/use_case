import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/textarea";

interface FormTextareaProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	rows?: number;
}

export function FormTextarea<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	className,
	error,
	disabled,
	required,
	rows,
}: FormTextareaProps<T>) {
	return (
		<div>
			{label && (
				<Label htmlFor={name}>
					{label}
					{required && <span className="ml-1 ml-1 ml-1 ml">*</span>}
				</Label>
			)}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Textarea
						{...field}
						id={name}
						placeholder={placeholder}
						disabled={disabled}
						rows={rows}
						className={`${error ? "border-red-500" : ""} ${className || ""}`}
					/>
				)}
			/>
			{error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
		</div>
	);
}

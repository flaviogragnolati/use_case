import {
	Controller,
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Label } from "~/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/ui/select";

export interface SelectOption {
	value: string;
	label: string;
}

interface FormSelectProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	options: SelectOption[];
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	placeholder = "Seleccionar opción",
	className,
	error,
	disabled,
	required,
	options,
}: FormSelectProps<T>) {
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
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						disabled={disabled}
					>
						<SelectTrigger
							className={`${error ? "border-red-500" : ""} ${className || ""}`}
						>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			{error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
		</div>
	);
}

import { Plus, Trash2 } from "lucide-react";
import {
	Controller,
	useFieldArray,
	type FieldPath,
	type ArrayPath,
	useFormContext,
} from "react-hook-form";
import { useRef, useEffect } from "react";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Input } from "~/ui/input";
import type { StringArraySectionProps, StringArrayFields } from "./types";
import type { UseCaseForm } from "~/schemas";

export function StringArraySection<T extends StringArrayFields>({
	name,
	title,
	description,
}: StringArraySectionProps<T>) {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const {
		control,
		formState: { errors },
	} = useFormContext<UseCaseForm>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: name as ArrayPath<UseCaseForm>,
	});

	const fieldError = errors[name as keyof typeof errors];

	const handleAppend = () => {
		append("" as any);

		// Focus on the new input after it's rendered
		setTimeout(() => {
			const newIndex = fields.length;
			inputRefs.current[newIndex]?.focus();
		}, 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAppend();
		}
	};

	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, fields.length);
	}, [fields.length]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2">
						<Controller
							name={`${name}.${index}` as FieldPath<UseCaseForm>}
							control={control}
							render={({ field: controllerField }) => (
								<Input
									{...controllerField}
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									value={String(controllerField.value || "")}
									placeholder={`Ingrese ${title.toLowerCase()}`}
									className={
										fieldError && Array.isArray(fieldError) && fieldError[index]
											? "border-red-500"
											: ""
									}
									onKeyDown={handleKeyDown}
								/>
							)}
						/>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => remove(index)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
				{fieldError && (
					<p className="text-red-500 text-sm">
						{Array.isArray(fieldError)
							? "Por favor complete todos los campos"
							: typeof fieldError === "object" && fieldError.message
								? fieldError.message
								: "Por favor complete todos los campos"}
					</p>
				)}
				<Button
					type="button"
					variant="outline"
					onClick={handleAppend}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar {title}
				</Button>
			</CardContent>
		</Card>
	);
}

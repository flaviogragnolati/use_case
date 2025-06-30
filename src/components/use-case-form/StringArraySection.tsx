import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, type FieldPath } from "react-hook-form";
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
	control,
	errors,
}: StringArraySectionProps<T>) {
	// Create a properly typed useFieldArray call
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	// Type-safe error access
	const fieldError = (errors as Record<string, any>)[name];

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
									value={String(controllerField.value || "")}
									placeholder={`Ingrese ${title.toLowerCase()}`}
									className={fieldError?.[index] ? "border-red-500" : ""}
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
					onClick={() => append("")}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar {title.endsWith("s") ? title.slice(0, -1) : title}
				</Button>
			</CardContent>
		</Card>
	);
}

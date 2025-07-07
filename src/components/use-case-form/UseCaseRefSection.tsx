import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { FormInput, FormNumberInput } from "~/ui/fields";
import type { FormSectionProps } from "./types";
import type { UseCaseForm } from "~/schemas";

export function UseCaseRefSection() {
	const {
		control,
		formState: { errors: _errors },
	} = useFormContext<UseCaseForm>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "useCaseRef",
	});

	const errors = _errors.useCaseRef ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Referencias de Casos de Uso</CardTitle>
				<CardDescription>
					Referencias a otros casos de uso relacionados
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2">
						<FormNumberInput
							control={control}
							name={`useCaseRef.${index}.id`}
							placeholder="ID"
							className="w-24"
							error={errors[index]?.id?.message}
						/>
						<FormInput
							control={control}
							name={`useCaseRef.${index}.name`}
							placeholder="Nombre del caso de uso"
							className="flex-1"
							error={errors[index]?.name?.message}
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
				<Button
					type="button"
					variant="outline"
					onClick={() => append({ id: Date.now(), name: "" })}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar Referencia
				</Button>
			</CardContent>
		</Card>
	);
}

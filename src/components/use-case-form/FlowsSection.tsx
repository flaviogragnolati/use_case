import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createFlowDefaultValues } from "~/lib/useCaseDefaults";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import {
	FormInput,
	FormNumberInput,
	FormSelect,
	FormTextarea,
	type SelectOption,
} from "~/ui/fields";
import { FlowDetailsSection } from "./FlowDetailsSection";
import type { UseCaseForm } from "~/schemas";

export function FlowsSection() {
	const {
		control,
		formState: { errors: _errors },
	} = useFormContext<UseCaseForm>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "flows",
	});

	const flowTypeOptions: SelectOption[] = [
		{ value: "main", label: "Principal" },
		{ value: "alternative", label: "Alternativo" },
		{ value: "exception", label: "Excepción" },
	];

	const errors = _errors.flows ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Flujos</CardTitle>
				<CardDescription>
					Defina los flujos principales, alternativos y de excepción
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{fields.map((field, flowIndex) => (
					<Card key={field.id} className="border-l-4 border-l-blue-500">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg">Flujo {flowIndex + 1}</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => remove(flowIndex)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormSelect
									control={control}
									name={`flows.${flowIndex}.type`}
									label="Tipo de Flujo"
									placeholder="Seleccionar tipo"
									options={flowTypeOptions}
									error={errors[flowIndex]?.type?.message}
									required
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormInput
									control={control}
									name={`flows.${flowIndex}.name`}
									label="Nombre del Flujo"
									placeholder="Nombre del flujo"
									error={errors[flowIndex]?.name?.message}
									required
								/>
								<FormNumberInput
									control={control}
									name={`flows.${flowIndex}.frequency`}
									label="Frecuencia (%)"
									min={0}
									max={100}
									error={errors[flowIndex]?.frequency?.message}
									required
								/>
							</div>

							<FormTextarea
								control={control}
								name={`flows.${flowIndex}.description`}
								label="Descripción"
								placeholder="Descripción del flujo"
								error={errors[flowIndex]?.description?.message}
								required
							/>

							<FlowDetailsSection flowIndex={flowIndex} />
						</CardContent>
					</Card>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => append(createFlowDefaultValues())}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar Flujo
				</Button>
			</CardContent>
		</Card>
	);
}

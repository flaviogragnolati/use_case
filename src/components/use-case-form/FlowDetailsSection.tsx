import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { createFlowDetailDefaultValues } from "~/lib/useCaseDefaults";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";
import { Label } from "~/ui/label";
import { FormInput, FormNumberInput, FormTextarea } from "~/ui/fields";
import { FlowDetailArraySection } from "./FlowDetailArraySection";
import type { FormSectionWithWatchProps } from "./types";

interface FlowDetailsSectionProps extends FormSectionWithWatchProps {
	flowIndex: number;
}

export function FlowDetailsSection({
	control,
	errors,
	flowIndex,
	watch,
}: FlowDetailsSectionProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `flows.${flowIndex}.flowDetails`,
	});

	return (
		<div className="space-y-4">
			<Label className="font-medium text-base">Detalles del Flujo</Label>
			{fields.map((field, detailIndex) => (
				<Card key={field.id} className="bg-gray-50">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">
								Paso {detailIndex + 1}
							</CardTitle>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => remove(detailIndex)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<FormNumberInput
								control={control}
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.step`}
								label="Número de Paso"
								min={1}
							/>
							<FormInput
								control={control}
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.actor`}
								label="Actor"
								placeholder="Nombre del actor"
							/>
						</div>

						<FormInput
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.action`}
							label="Acción"
							placeholder="Descripción de la acción"
						/>

						<FormInput
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.systemResponse`}
							label="Respuesta del Sistema"
							placeholder="Respuesta del sistema"
						/>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.conditions`}
							label="Condiciones"
							placeholder="Ingrese condición"
						/>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.exceptions`}
							label="Excepciones"
							placeholder="Ingrese excepción"
						/>

						<FormTextarea
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.notes`}
							label="Notas"
							placeholder="Notas adicionales"
						/>
					</CardContent>
				</Card>
			))}
			<Button
				type="button"
				variant="outline"
				onClick={() => append(createFlowDetailDefaultValues(fields.length + 1))}
				className="flex items-center gap-2"
			>
				<Plus className="h-4 w-4" />
				Agregar Detalle del Flujo
			</Button>
		</div>
	);
}

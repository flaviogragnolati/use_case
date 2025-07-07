import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createFlowDetailDefaultValues } from "~/lib/useCaseDefaults";
import { Button } from "~/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";
import { Label } from "~/ui/label";
import { FormInput, FormNumberInput, FormTextarea } from "~/ui/fields";
import { FlowDetailArraySection } from "./FlowDetailArraySection";
import type { UseCaseForm } from "~/schemas";

interface FlowDetailsSectionProps {
	flowIndex: number;
}

export function FlowDetailsSection({ flowIndex }: FlowDetailsSectionProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<UseCaseForm>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: `flows.${flowIndex}.flowDetails`,
	});

	const flowErrors = errors.flows ?? [];

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
								error={
									flowErrors[flowIndex]?.flowDetails?.[detailIndex]?.step
										?.message
								}
							/>
							<FormInput
								control={control}
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.actor`}
								label="Actor"
								placeholder="Nombre del actor"
								error={
									flowErrors[flowIndex]?.flowDetails?.[detailIndex]?.actor
										?.message
								}
							/>
						</div>

						<FormInput
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.action`}
							label="Acción"
							placeholder="Descripción de la acción"
							error={
								flowErrors[flowIndex]?.flowDetails?.[detailIndex]?.action
									?.message
							}
						/>

						<FormInput
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.systemResponse`}
							label="Respuesta del Sistema"
							placeholder="Respuesta del sistema"
							error={
								flowErrors[flowIndex]?.flowDetails?.[detailIndex]
									?.systemResponse?.message
							}
						/>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.conditions`}
							label="Condiciones"
							placeholder="Ingrese condición"
							index={detailIndex}
						/>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.exceptions`}
							label="Excepciones"
							placeholder="Ingrese excepción"
							index={detailIndex}
						/>

						<FormTextarea
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.notes`}
							label="Notas"
							placeholder="Notas adicionales"
							error={
								flowErrors[flowIndex]?.flowDetails?.[detailIndex]?.notes
									?.message
							}
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

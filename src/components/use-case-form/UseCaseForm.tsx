"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { UseCasePreview } from "~/components/useCasePreview";
import { createUseCaseDefaultValues } from "~/lib/useCaseDefaults";
import {
	useCaseFormSchema,
	type UseCaseForm as UseCaseFormT,
	type UseCaseFull,
} from "~/schemas";
import { Button } from "~/ui/button";
import { api } from "~/trpc/react";

import { ActorsSection } from "./ActorsSection";
import { BasicInformationSection } from "./BasicInformationSection";
import { FlowsSection } from "./FlowsSection";
import { StringArraySection } from "./StringArraySection";
import { UseCaseRefSection } from "./UseCaseRefSection";
import type { StringArrayFields } from "./types";

interface UseCaseFormProps {
	initialData?: UseCaseFull;
	isEditMode?: boolean;
	onSuccess?: () => void;
}

export function UseCaseForm({
	initialData,
	isEditMode = false,
	onSuccess,
}: UseCaseFormProps) {
	const [showPreview, setShowPreview] = useState(false);
	const [formData, setFormData] = useState<UseCaseFormT | null>(null);

	const { mutateAsync: saveUseCaseMutation, isPending } =
		api.useCase.saveUseCase.useMutation({
			onSuccess: (result) => {
				console.log("Use case saved successfully:", result);
				if (onSuccess) {
					onSuccess();
				}
			},
			onError: (error) => {
				console.error("Error saving use case:", error);
			},
		});

	const form = useForm<UseCaseFormT>({
		resolver: zodResolver(useCaseFormSchema),
		defaultValues: initialData || createUseCaseDefaultValues(),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = form;

	// Reset form when initialData changes
	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData, reset]);

	const onSubmit = async (data: UseCaseFormT) => {
		try {
			if (isEditMode && initialData?.id) {
				// Update existing use case - ensure all IDs are present
				const updateData = {
					...data,
					id: initialData.id,
					flows: data.flows.map((flow) => ({
						...flow,
						id: flow.id || 0, // This should be handled by the backend
						flowDetails: flow.flowDetails.map((detail) => ({
							...detail,
							id: detail.id || 0, // This should be handled by the backend
						})),
					})),
				};

				await saveUseCaseMutation({
					type: "update",
					...updateData,
				});
			} else {
				// Create new use case - remove optional IDs
				const { id, ...createData } = data;
				const cleanedData = {
					...createData,
					flows: createData.flows.map(({ id: flowId, ...flow }) => ({
						...flow,
						flowDetails: flow.flowDetails.map(
							({ id: detailId, ...detail }) => detail,
						),
					})),
				};

				await saveUseCaseMutation({
					type: "create",
					...cleanedData,
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const handlePreview = () => {
		const currentData = form.getValues();
		setFormData(currentData);
		setShowPreview(true);
	};

	if (showPreview && formData) {
		return (
			<UseCasePreview data={formData} onBack={() => setShowPreview(false)} />
		);
	}

	return (
		<div className="space-y-8">
			{isEditMode && (
				<div className="mb-6">
					<h1 className="mb-2 font-bold text-2xl text-gray-900">
						Editar Caso de Uso
					</h1>
					<p className="text-gray-600">
						Modifica los campos necesarios y guarda los cambios.
					</p>
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<BasicInformationSection
					control={control}
					errors={errors}
					watch={watch}
				/>

				<StringArraySection<"participants">
					name="participants"
					title="Participantes"
					description="Personas que contribuyeron a este caso de uso"
					control={control}
					errors={errors}
				/>

				<StringArraySection<"documentationRef">
					name="documentationRef"
					title="Referencias de Documentación"
					description="Referencias a documentación relacionada"
					control={control}
					errors={errors}
				/>

				<UseCaseRefSection control={control} errors={errors} />

				<ActorsSection control={control} errors={errors} />

				<StringArraySection<"preconditions">
					name="preconditions"
					title="Precondiciones"
					description="Estado en el que debe estar el sistema antes de la ejecución"
					control={control}
					errors={errors}
				/>

				<StringArraySection<"succuesfulResults">
					name="succuesfulResults"
					title="Resultados Exitosos"
					description="Resultados exitosos esperados"
					control={control}
					errors={errors}
				/>

				<StringArraySection<"failedResults">
					name="failedResults"
					title="Resultados Fallidos"
					description="Resultados fallidos esperados"
					control={control}
					errors={errors}
				/>

				<StringArraySection<"conditions">
					name="conditions"
					title="Condiciones"
					description="Condiciones que afectan el resultado"
					control={control}
					errors={errors}
				/>

				<FlowsSection control={control} errors={errors} watch={watch} />

				<StringArraySection<"input">
					name="input"
					title="Datos de Entrada"
					description="Datos de entrada requeridos para ejecutar el caso de uso"
					control={control}
					errors={errors}
				/>

				<StringArraySection<"output">
					name="output"
					title="Datos de Salida"
					description="Datos de salida producidos por el caso de uso"
					control={control}
					errors={errors}
				/>

				<div className="flex gap-4">
					<Button
						type="submit"
						className="flex items-center gap-2"
						disabled={isPending}
					>
						<Save className="h-4 w-4" />
						{isPending
							? "Guardando..."
							: isEditMode
								? "Actualizar Caso de Uso"
								: "Guardar Caso de Uso"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={handlePreview}
						className="flex items-center gap-2"
					>
						<Eye className="h-4 w-4" />
						Vista Previa
					</Button>
				</div>
			</form>
		</div>
	);
}

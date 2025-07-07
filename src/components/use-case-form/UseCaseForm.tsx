"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

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
		mode: "onBlur",
	});

	const { handleSubmit, reset } = form;

	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData, reset]);

	const onSubmit = async (data: UseCaseFormT) => {
		console.log("Submitting form data:", data);
		try {
			if (isEditMode && initialData?.id) {
				await saveUseCaseMutation({
					type: "update",
					...data,
				});
			} else {
				await saveUseCaseMutation({
					type: "create",
					...data,
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const onInvalid = (errors: (typeof form)["formState"]["errors"]) => {
		console.log("Form validation errors:", errors);
		const formStatus = form.getValues().status;
		if (formStatus === "draft") {
			// onSubmit(form.getValues());
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

			<FormProvider {...form}>
				<form
					onSubmit={handleSubmit(onSubmit, onInvalid)}
					className="space-y-8"
				>
					<BasicInformationSection />

					<StringArraySection<"participants">
						name="participants"
						title="Participantes"
						description="Personas que contribuyeron a este caso de uso"
					/>

					<StringArraySection<"documentationRef">
						name="documentationRef"
						title="Referencias de Documentación"
						description="Referencias a documentación relacionada"
					/>

					<UseCaseRefSection />

					<ActorsSection />

					<StringArraySection<"preconditions">
						name="preconditions"
						title="Precondiciones"
						description="Estado en el que debe estar el sistema antes de la ejecución"
					/>

					<StringArraySection<"succuesfulResults">
						name="succuesfulResults"
						title="Resultados Exitosos"
						description="Resultados exitosos esperados"
					/>

					<StringArraySection<"failedResults">
						name="failedResults"
						title="Resultados Fallidos"
						description="Resultados fallidos esperados"
					/>

					<StringArraySection<"conditions">
						name="conditions"
						title="Condiciones"
						description="Condiciones que afectan el resultado"
					/>

					<FlowsSection />

					<StringArraySection<"input">
						name="input"
						title="Datos de Entrada"
						description="Datos de entrada requeridos para ejecutar el caso de uso"
					/>

					<StringArraySection<"output">
						name="output"
						title="Datos de Salida"
						description="Datos de salida producidos por el caso de uso"
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
			</FormProvider>
		</div>
	);
}

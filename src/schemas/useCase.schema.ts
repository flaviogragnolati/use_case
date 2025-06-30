import { z } from "zod";

// Use Case Flow Detail Schemas
export const createUseCaseFlowDetailSchema = z.object({
	step: z.number().min(1, "El paso debe ser al menos 1"),
	actor: z.string().min(1, "El actor es obligatorio"),
	action: z.string().min(1, "La acción es obligatoria"),
	systemResponse: z.string().min(1, "La respuesta del sistema es obligatoria"),
	conditions: z.array(z.string().min(1, "La condición no puede estar vacía")),
	exceptions: z.array(z.string().min(1, "La excepción no puede estar vacía")),
	notes: z.string(),
});

export const updateUseCaseFlowDetailSchema =
	createUseCaseFlowDetailSchema.extend({
		id: z.number().min(1, "El ID debe ser al menos 1"),
	});

// Use Case Flow Schemas
export const createUseCaseFlowSchema = z.object({
	name: z.string().min(1, "El nombre del flujo es obligatorio"),
	type: z.enum(["main", "alternative", "exception"]),
	frequency: z
		.number()
		.min(0)
		.max(100, "La frecuencia debe estar entre 0 y 100"),
	description: z.string().min(1, "La descripción es obligatoria"),
	flowDetails: z
		.array(createUseCaseFlowDetailSchema)
		.min(1, "Se requiere al menos un detalle del flujo"),
});

export const updateUseCaseFlowSchema = createUseCaseFlowSchema.extend({
	id: z.number().min(1, "El ID debe ser al menos 1"),
	flowDetails: z
		.array(updateUseCaseFlowDetailSchema)
		.min(1, "Se requiere al menos un detalle del flujo"),
});

// Use Case Schemas
export const createUseCaseSchema = z.object({
	date: z.string().min(1, "La fecha es obligatoria"),
	sector: z.string().min(1, "El sector es obligatorio"),
	name: z.string().min(1, "El nombre del caso de uso es obligatorio"),
	participants: z.array(
		z.string().min(1, "El nombre del participante no puede estar vacío"),
	),
	description: z.string().min(1, "La descripción es obligatoria"),
	trigger: z.string().min(1, "El disparador es obligatorio"),
	documentationRef: z.array(
		z.string().min(1, "La referencia de documentación no puede estar vacía"),
	),
	useCaseRef: z.array(
		z.object({
			id: z.number().min(1, "El ID de referencia debe ser al menos 1"),
			name: z.string().min(1, "El nombre de la referencia es obligatorio"),
		}),
	),
	actors: z.object({
		primary: z.array(
			z.string().min(1, "El actor principal no puede estar vacío"),
		),
		secondary: z.array(
			z.string().min(1, "El actor secundario no puede estar vacío"),
		),
	}),
	preconditions: z.array(
		z.string().min(1, "La precondición no puede estar vacía"),
	),
	succuesfulResults: z.array(
		z.string().min(1, "El resultado exitoso no puede estar vacío"),
	),
	failedResults: z.array(
		z.string().min(1, "El resultado fallido no puede estar vacío"),
	),
	conditions: z.array(z.string().min(1, "La condición no puede estar vacía")),
	flows: z
		.array(createUseCaseFlowSchema)
		.min(1, "Se requiere al menos un flujo"),
	input: z.array(z.string().min(1, "La entrada no puede estar vacía")),
	output: z.array(z.string().min(1, "La salida no puede estar vacía")),
	notes: z.string(),
	status: z.enum(["draft", "review", "approved", "rejected"]),
});

export const updateUseCaseSchema = createUseCaseSchema.extend({
	id: z.number().min(1, "El ID debe ser al menos 1"),
	flows: z
		.array(updateUseCaseFlowSchema)
		.min(1, "Se requiere al menos un flujo"),
});

export const upsertUseCaseSchema = z.discriminatedUnion("type", [
	createUseCaseSchema.extend({ type: z.literal("create") }),
	updateUseCaseSchema.extend({ type: z.literal("update") }),
]);

// Form schemas for React Hook Form (handles both create and update)
export const useCaseFormFlowDetailSchema = createUseCaseFlowDetailSchema.extend(
	{
		id: z.number().min(1, "El ID debe ser al menos 1").optional(),
	},
);

export const useCaseFormFlowSchema = createUseCaseFlowSchema.extend({
	id: z.number().min(1, "El ID debe ser al menos 1").optional(),
	flowDetails: z
		.array(useCaseFormFlowDetailSchema)
		.min(1, "Se requiere al menos un detalle del flujo"),
});

export const useCaseFormSchema = createUseCaseSchema.extend({
	id: z.number().min(1, "El ID debe ser al menos 1").optional(),
	flows: z.array(useCaseFormFlowSchema).min(1, "Se requiere al menos un flujo"),
});

// Type exports
export type CreateUseCaseFlowDetail = z.infer<
	typeof createUseCaseFlowDetailSchema
>;
export type UpdateUseCaseFlowDetail = z.infer<
	typeof updateUseCaseFlowDetailSchema
>;
export type CreateUseCaseFlow = z.infer<typeof createUseCaseFlowSchema>;
export type UpdateUseCaseFlow = z.infer<typeof updateUseCaseFlowSchema>;
export type CreateUseCase = z.infer<typeof createUseCaseSchema>;
export type UpdateUseCase = z.infer<typeof updateUseCaseSchema>;
export type UseCaseForm = z.infer<typeof useCaseFormSchema>;
export type UseCaseFull = UpdateUseCase;

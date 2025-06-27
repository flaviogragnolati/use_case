import { z } from "zod";

// Zod validation schema
export const useCaseFlowDetailSchema = z.object({
	step: z.number().min(1, "Step must be at least 1"),
	actor: z.string().min(1, "Actor is required"),
	action: z.string().min(1, "Action is required"),
	systemResponse: z.string().min(1, "System response is required"),
	conditions: z.array(z.string().min(1, "Condition cannot be empty")),
	exceptions: z.array(z.string().min(1, "Exception cannot be empty")),
	notes: z.string(),
});
export type UseCaseFlowDetail = z.infer<typeof useCaseFlowDetailSchema>;

export const useCaseFlowSchema = z.object({
	id: z.number().min(1, "ID must be at least 1"),
	name: z.string().min(1, "Flow name is required"),
	type: z.enum(["main", "alternative", "exception"]),
	frequency: z.number().min(0).max(100, "Frequency must be between 0 and 100"),
	description: z.string().min(1, "Description is required"),
	flowDetails: z
		.array(useCaseFlowDetailSchema)
		.min(1, "At least one flow detail is required"),
});
export type UseCaseFlow = z.infer<typeof useCaseFlowSchema>;

export const useCaseSchema = z.object({
	id: z.number().min(1, "ID must be at least 1"),
	date: z.string().min(1, "Date is required"),
	sector: z.string().min(1, "Sector is required"),
	name: z.string().min(1, "Use case name is required"),
	participants: z.array(z.string().min(1, "Participant name cannot be empty")),
	description: z.string().min(1, "Description is required"),
	trigger: z.string().min(1, "Trigger is required"),
	documentationRef: z.array(
		z.string().min(1, "Documentation reference cannot be empty"),
	),
	useCaseRef: z.array(
		z.object({
			id: z.number().min(1, "Reference ID must be at least 1"),
			name: z.string().min(1, "Reference name is required"),
		}),
	),
	actors: z.object({
		primary: z.array(z.string().min(1, "Primary actor cannot be empty")),
		secondary: z.array(z.string().min(1, "Secondary actor cannot be empty")),
	}),
	preconditions: z.array(z.string().min(1, "Precondition cannot be empty")),
	succuesfulResults: z.array(
		z.string().min(1, "Successful result cannot be empty"),
	),
	failedResults: z.array(z.string().min(1, "Failed result cannot be empty")),
	conditions: z.array(z.string().min(1, "Condition cannot be empty")),
	flows: z.array(useCaseFlowSchema).min(1, "At least one flow is required"),
	input: z.array(z.string().min(1, "Input cannot be empty")),
	output: z.array(z.string().min(1, "Output cannot be empty")),
	notes: z.string(),
	status: z.enum(["draft", "review", "approved", "rejected"]),
});
export type UseCase = z.infer<typeof useCaseSchema>;

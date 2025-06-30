import type { UseCaseFull } from "~/schemas";
import type { UseCaseWithIncludes } from "~/types";

// Transform database result to match UseCase type
export function transformUseCaseData(
	dbUseCase: UseCaseWithIncludes,
): UseCaseFull {
	return {
		id: dbUseCase.id,
		date: dbUseCase.date,
		sector: dbUseCase.sector,
		name: dbUseCase.name,
		participants: dbUseCase.participants,
		description: dbUseCase.description,
		trigger: dbUseCase.trigger,
		documentationRef: dbUseCase.documentationRef,
		useCaseRef: [], // TODO: Handle references when implemented in schema
		actors: {
			primary: dbUseCase.primaryActors || [],
			secondary: dbUseCase.secondaryActors || [],
		},
		preconditions: dbUseCase.preconditions,
		succuesfulResults: dbUseCase.successfulResults || [],
		failedResults: dbUseCase.failedResults,
		conditions: dbUseCase.conditions,
		flows:
			dbUseCase.flows?.map((flow) => ({
				id: flow.id,
				name: flow.name,
				type: flow.type,
				frequency: flow.frequency,
				description: flow.description,
				flowDetails:
					flow.flowDetails?.map((detail) => ({
						id: detail.id,
						step: detail.step,
						actor: detail.actor,
						action: detail.action,
						systemResponse: detail.systemResponse,
						conditions: detail.conditions || [],
						exceptions: detail.exceptions || [],
						notes: detail.notes || "",
					})) || [],
			})) || [],
		input: dbUseCase.input,
		output: dbUseCase.output,
		notes: dbUseCase.notes || "",
		status: dbUseCase.status as "draft" | "review" | "approved" | "rejected",
	};
}

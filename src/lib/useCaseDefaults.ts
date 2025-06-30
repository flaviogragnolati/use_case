import type { CreateUseCase } from "~/schemas";

export function createUseCaseDefaultValues() {
	return {
		date: new Date().toISOString().split("T")[0] ?? "",
		sector: "",
		name: "",
		participants: [],
		description: "",
		trigger: "",
		documentationRef: [],
		useCaseRef: [],
		actors: {
			primary: [],
			secondary: [],
		},
		preconditions: [],
		succuesfulResults: [],
		failedResults: [],
		conditions: [],
		flows: [
			{
				name: "",
				type: "main",
				frequency: 100,
				description: "",
				flowDetails: [
					{
						step: 1,
						actor: "",
						action: "",
						systemResponse: "",
						conditions: [],
						exceptions: [],
						notes: "",
					},
				],
			},
		],
		input: [],
		output: [],
		notes: "",
		status: "draft",
	} satisfies CreateUseCase;
}

export function createFlowDefaultValues() {
	return {
		name: "",
		type: "main" as const,
		frequency: 100,
		description: "",
		flowDetails: [
			{
				step: 1,
				actor: "",
				action: "",
				systemResponse: "",
				conditions: [],
				exceptions: [],
				notes: "",
			},
		],
	};
}

export function createFlowDetailDefaultValues(step = 1) {
	return {
		step,
		actor: "",
		action: "",
		systemResponse: "",
		conditions: [],
		exceptions: [],
		notes: "",
	};
}

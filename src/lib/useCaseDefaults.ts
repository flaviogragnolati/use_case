import type { UseCase } from "~/types";

export function createUseCaseDefaultValues(): UseCase {
	return {
		id: Date.now(), // Auto-generate ID based on timestamp
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
				id: Date.now(), // Auto-generate flow ID
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
	};
}

export function createFlowDefaultValues() {
	return {
		id: Date.now(),
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

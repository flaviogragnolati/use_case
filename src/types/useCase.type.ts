export type UseCaseFlowDetail = {
	step: number;
	actor: string;
	action: string;
	systemResponse: string;
	conditions: string[];
	exceptions: string[];
	notes: string;
};

export type UseCaseFlow = {
	id: number;
	name: string;
	type: "main" | "alternative" | "exception";
	frequency: number;
	description: string;
	flowDetails: UseCaseFlowDetail[];
};

export type UseCase = {
	id: number;
	date: string;
	sector: string;
	name: string;
	participants: string[];
	description: string;
	trigger: string;
	documentationRef: string[];
	useCaseRef: {
		id: number;
		name: string;
	}[];
	actors: {
		primary: string[];
		secondary: string[];
	};
	preconditions: string[];
	succuesfulResults: string[];
	failedResults: string[];
	conditions: string[];
	flows: UseCaseFlow[];
	input: string[];
	output: string[];
	notes: string;
	status: "draft" | "review" | "approved" | "rejected";
};

import type {
	Control,
	FieldErrors,
	UseFormWatch,
	FieldPath,
	ArrayPath,
} from "react-hook-form";
import type { UseCaseForm } from "~/schemas";

export interface FormSectionProps {
	control?: Control<UseCaseForm>;
	errors?: FieldErrors<UseCaseForm>;
}

export interface FormSectionWithWatchProps extends FormSectionProps {
	watch: UseFormWatch<UseCaseForm>;
}

// Extract string array fields from UseCaseForm type automatically
export type StringArrayFields = {
	[K in keyof UseCaseForm]: UseCaseForm[K] extends string[] ? K : never;
}[keyof UseCaseForm];

export interface StringArraySectionProps<T extends StringArrayFields>
	extends FormSectionProps {
	name: T;
	title: string;
	description: string;
}

export interface FlowDetailArraySectionProps {
	control: Control<UseCaseForm>;
	name: string;
	label: string;
	placeholder: string;
	index: number;
}

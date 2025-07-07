import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import type { FlowDetailArraySectionProps } from "./types";
import type { UseCaseForm } from "~/schemas";

export function FlowDetailArraySection({
	name,
	label,
	placeholder,
	index,
}: FlowDetailArraySectionProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<UseCaseForm>();
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	// name: flows.[flowIdx].flowDetails.[detailIdx].fieldName
	const flowIdx = Number.parseInt(name.split(".")[1] ?? "0"); // Extract flow index from name
	const detailIdx = Number.parseInt(name.split(".")[3] ?? "0"); // Extract detail index from name
	const fieldName = (name.split(".").pop() ||
		"") as keyof UseCaseForm["flows"][number]["flowDetails"][number];

	const flowDetailErrors =
		errors.flows?.[flowIdx]?.flowDetails?.[detailIdx] ?? [];

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			{fields.map((field, idx) => (
				<div key={field.id} className="flex gap-2">
					<div className="flex-1">
						<Controller
							name={`${name}.${idx}`}
							control={control}
							render={({ field }) => {
								const error = flowDetailErrors?.[fieldName]?.[idx]?.message;

								return (
									<div>
										<Input
											{...field}
											placeholder={placeholder}
											className={error ? "border-red-500" : ""}
										/>
										{error && (
											<p className="mt-1 text-red-500 text-sm">{error}</p>
										)}
									</div>
								);
							}}
						/>
					</div>
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => remove(index)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => append("")}
				className="flex items-center gap-2"
			>
				<Plus className="h-4 w-4" />
				Agregar {label}
			</Button>
		</div>
	);
}

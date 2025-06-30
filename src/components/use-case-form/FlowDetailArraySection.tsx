import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import type { FlowDetailArraySectionProps } from "./types";

export function FlowDetailArraySection({
	control,
	name,
	label,
	placeholder,
}: FlowDetailArraySectionProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name as any,
	});

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<Controller
						name={`${name}.${index}` as any}
						control={control}
						render={({ field }) => (
							<Input {...field} placeholder={placeholder} />
						)}
					/>
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
				Agregar {label.slice(0, -1)}
			</Button>
		</div>
	);
}

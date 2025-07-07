import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Separator } from "~/ui/separator";
import type { UseCaseForm } from "~/schemas";

export function ActorsSection() {
	const {
		control,
		formState: { errors },
	} = useFormContext<UseCaseForm>();

	const primaryFields = useFieldArray({
		control,
		name: "actors.primary",
	});

	const secondaryFields = useFieldArray({
		control,
		name: "actors.secondary",
	});

	const primaryError = errors.actors?.primary ?? [];
	const secondaryError = errors.actors?.secondary ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Actores</CardTitle>
				<CardDescription>
					Actores primarios y secundarios involucrados en el caso de uso
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label className="font-medium text-base">Actores Primarios</Label>
					<div className="mt-2 space-y-2">
						{primaryFields.fields.map((field, index) => (
							<div key={field.id} className="flex gap-2">
								<Controller
									name={`actors.primary.${index}`}
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Nombre del actor primario"
											className={primaryError[index] ? "border-red-500" : ""}
										/>
									)}
								/>
								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={() => primaryFields.remove(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={() => primaryFields.append("")}
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Agregar Actor Primario
						</Button>
					</div>
				</div>

				<Separator />

				<div>
					<Label className="font-medium text-base">Actores Secundarios</Label>
					<div className="mt-2 space-y-2">
						{secondaryFields.fields.map((field, index) => (
							<div key={field.id} className="flex gap-2">
								<Controller
									name={`actors.secondary.${index}`}
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Nombre del actor secundario"
											className={secondaryError[index] ? "border-red-500" : ""}
										/>
									)}
								/>
								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={() => secondaryFields.remove(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={() => secondaryFields.append("")}
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Agregar Actor Secundario
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

import { useFormContext } from "react-hook-form";
import { C } from "~/constants";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import {
	FormInput,
	FormSelect,
	FormTextarea,
	type SelectOption,
} from "~/ui/fields";
import type { UseCaseForm } from "~/schemas";

export function BasicInformationSection() {
	const {
		control,
		formState: { errors },
	} = useFormContext<UseCaseForm>();

	const statusOptions: SelectOption[] = C.formStatus.map((status) => ({
		value: status,
		label: C.statusMap[status],
	}));
	const procedureOptions: SelectOption[] = C.procedures.map(
		(procedure, idx) => ({
			value: String(idx),
			label: procedure,
		}),
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Información Básica</CardTitle>
				<CardDescription>
					Ingrese los detalles básicos del caso de uso
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormInput
						control={control}
						name="date"
						label="Fecha"
						type="date"
						error={errors.date?.message}
						required
					/>
					<FormSelect
						control={control}
						name="status"
						label="Estado"
						placeholder="Seleccionar estado"
						options={statusOptions}
						error={errors.status?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormInput
						control={control}
						name="sector"
						label="Sector"
						placeholder="ej., DGI, DGCEOR, DG..."
						error={errors.sector?.message}
						required
					/>
					<FormSelect
						control={control}
						name="relatedProcedure"
						label="Tramiite Relacionado"
						placeholder="Seleccionar trámite"
						options={procedureOptions}
						error={errors.relatedProcedure?.message}
						required
					/>
				</div>

				<FormInput
					control={control}
					name="name"
					label="Nombre del Caso de Uso"
					placeholder="Ingrese el nombre del caso de uso"
					error={errors.name?.message}
					required
				/>

				<FormTextarea
					control={control}
					name="description"
					label="Descripción"
					placeholder="Breve descripción del caso de uso"
					error={errors.description?.message}
					required
				/>

				<FormInput
					control={control}
					name="trigger"
					label="Disparador"
					placeholder="Evento que dispara el caso de uso"
					error={errors.trigger?.message}
					required
				/>

				<FormTextarea
					control={control}
					name="notes"
					label="Notas"
					placeholder="Notas adicionales"
				/>
			</CardContent>
		</Card>
	);
}

"use client";
import { useState } from "react";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { UseCasePreview } from "~/components/useCasePreview";
import { Separator } from "~/ui/separator";
import { useCaseSchema } from "~/schemas";
import type { UseCase } from "~/types";
import {
	createUseCaseDefaultValues,
	createFlowDefaultValues,
	createFlowDetailDefaultValues,
} from "~/lib/useCaseDefaults";

export function UseCaseForm() {
	const [showPreview, setShowPreview] = useState(false);
	const [formData, setFormData] = useState<UseCase | null>(null);

	const form = useForm<UseCase>({
		resolver: zodResolver(useCaseSchema),
		defaultValues: createUseCaseDefaultValues(),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = form;

	const onSubmit = (data: UseCase) => {
		console.log("Form submitted:", data);
		setFormData(data);
		setShowPreview(true);
	};

	if (showPreview && formData) {
		return (
			<UseCasePreview data={formData} onBack={() => setShowPreview(false)} />
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Información Básica</CardTitle>
					<CardDescription>
						Ingrese los detalles básicos del caso de uso
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<Label htmlFor="id">ID (Generado automáticamente)</Label>
							<Input value={watch("id")} disabled className="bg-gray-100" />
						</div>
						<div>
							<Label htmlFor="date">Fecha</Label>
							<Controller
								name="date"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										type="date"
										className={errors.date ? "border-red-500" : ""}
									/>
								)}
							/>
							{errors.date && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.date.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<Label htmlFor="sector">Sector</Label>
							<Controller
								name="sector"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="ej., Finanzas, Salud, Educación"
										className={errors.sector ? "border-red-500" : ""}
									/>
								)}
							/>
							{errors.sector && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.sector.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="status">Estado</Label>
							<Controller
								name="status"
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger
											className={errors.status ? "border-red-500" : ""}
										>
											<SelectValue placeholder="Seleccionar estado" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="draft">Borrador</SelectItem>
											<SelectItem value="review">En Revisión</SelectItem>
											<SelectItem value="approved">Aprobado</SelectItem>
											<SelectItem value="rejected">Rechazado</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.status && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.status.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<Label htmlFor="name">Nombre del Caso de Uso</Label>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Ingrese el nombre del caso de uso"
									className={errors.name ? "border-red-500" : ""}
								/>
							)}
						/>
						{errors.name && (
							<p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
						)}
					</div>

					<div>
						<Label htmlFor="description">Descripción</Label>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<Textarea
									{...field}
									placeholder="Breve descripción del caso de uso"
									className={errors.description ? "border-red-500" : ""}
								/>
							)}
						/>
						{errors.description && (
							<p className="mt-1 text-red-500 text-sm">
								{errors.description.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="trigger">Disparador</Label>
						<Controller
							name="trigger"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Evento que dispara el caso de uso"
									className={errors.trigger ? "border-red-500" : ""}
								/>
							)}
						/>
						{errors.trigger && (
							<p className="mt-1 text-red-500 text-sm">
								{errors.trigger.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="notes">Notas</Label>
						<Controller
							name="notes"
							control={control}
							render={({ field }) => (
								<Textarea {...field} placeholder="Notas adicionales" />
							)}
						/>
					</div>
				</CardContent>
			</Card>

			<StringArraySection
				name="participants"
				title="Participantes"
				description="Personas que contribuyeron a este caso de uso"
				control={control}
				errors={errors}
			/>

			<StringArraySection
				name="documentationRef"
				title="Referencias de Documentación"
				description="Referencias a documentación relacionada"
				control={control}
				errors={errors}
			/>

			<UseCaseRefSection control={control} errors={errors} />

			<ActorsSection control={control} errors={errors} />

			<StringArraySection
				name="preconditions"
				title="Precondiciones"
				description="Estado en el que debe estar el sistema antes de la ejecución"
				control={control}
				errors={errors}
			/>

			<StringArraySection
				name="succuesfulResults"
				title="Resultados Exitosos"
				description="Resultados exitosos esperados"
				control={control}
				errors={errors}
			/>

			<StringArraySection
				name="failedResults"
				title="Resultados Fallidos"
				description="Resultados fallidos esperados"
				control={control}
				errors={errors}
			/>

			<StringArraySection
				name="conditions"
				title="Condiciones"
				description="Condiciones que afectan el resultado"
				control={control}
				errors={errors}
			/>

			<FlowsSection control={control} errors={errors} watch={watch} />

			<StringArraySection
				name="input"
				title="Datos de Entrada"
				description="Datos de entrada requeridos para ejecutar el caso de uso"
				control={control}
				errors={errors}
			/>

			<StringArraySection
				name="output"
				title="Datos de Salida"
				description="Datos de salida producidos por el caso de uso"
				control={control}
				errors={errors}
			/>

			<div className="flex gap-4">
				<Button type="submit" className="flex items-center gap-2">
					<Save className="h-4 w-4" />
					Guardar Caso de Uso
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => {
						const currentData = form.getValues();
						setFormData(currentData);
						setShowPreview(true);
					}}
					className="flex items-center gap-2"
				>
					<Eye className="h-4 w-4" />
					Vista Previa
				</Button>
			</div>
		</form>
	);
}

// Helper components
function StringArraySection({
	name,
	title,
	description,
	control,
	errors,
}: any) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2">
						<Controller
							name={`${name}.${index}`}
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder={`Ingrese ${title.toLowerCase()}`}
									className={errors[name]?.[index] ? "border-red-500" : ""}
								/>
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
				{errors[name] && (
					<p className="text-red-500 text-sm">
						{errors[name].message || "Por favor complete todos los campos"}
					</p>
				)}
				<Button
					type="button"
					variant="outline"
					onClick={() => append("")}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar {title.endsWith("s") ? title.slice(0, -1) : title}
				</Button>
			</CardContent>
		</Card>
	);
}

function UseCaseRefSection({ control, errors }: any) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "useCaseRef",
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Referencias de Casos de Uso</CardTitle>
				<CardDescription>
					Referencias a otros casos de uso relacionados
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2">
						<Controller
							name={`useCaseRef.${index}.id`}
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="number"
									placeholder="ID"
									onChange={(e) =>
										field.onChange(Number.parseInt(e.target.value) || 0)
									}
									className={`w-24 ${errors.useCaseRef?.[index]?.id ? "border-red-500" : ""}`}
								/>
							)}
						/>
						<Controller
							name={`useCaseRef.${index}.name`}
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Nombre del caso de uso"
									className={`flex-1 ${errors.useCaseRef?.[index]?.name ? "border-red-500" : ""}`}
								/>
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
					onClick={() => append({ id: Date.now(), name: "" })}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar Referencia
				</Button>
			</CardContent>
		</Card>
	);
}

function ActorsSection({ control, errors }: any) {
	const primaryFields = useFieldArray({
		control,
		name: "actors.primary",
	});

	const secondaryFields = useFieldArray({
		control,
		name: "actors.secondary",
	});

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
											className={
												errors.actors?.primary?.[index] ? "border-red-500" : ""
											}
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
											className={
												errors.actors?.secondary?.[index]
													? "border-red-500"
													: ""
											}
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

function FlowsSection({ control, errors, watch }: any) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "flows",
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Flujos</CardTitle>
				<CardDescription>
					Defina los flujos principales, alternativos y de excepción
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{fields.map((field, flowIndex) => (
					<Card key={field.id} className="border-l-4 border-l-blue-500">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg">Flujo {flowIndex + 1}</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => remove(flowIndex)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label>ID del Flujo (Generado automáticamente)</Label>
									<Input
										value={watch(`flows.${flowIndex}.id`)}
										disabled
										className="bg-gray-100"
									/>
								</div>
								<div>
									<Label>Tipo de Flujo</Label>
									<Controller
										name={`flows.${flowIndex}.type`}
										control={control}
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger
													className={
														errors.flows?.[flowIndex]?.type
															? "border-red-500"
															: ""
													}
												>
													<SelectValue placeholder="Seleccionar tipo" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="main">Principal</SelectItem>
													<SelectItem value="alternative">
														Alternativo
													</SelectItem>
													<SelectItem value="exception">Excepción</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label>Nombre del Flujo</Label>
									<Controller
										name={`flows.${flowIndex}.name`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												placeholder="Nombre del flujo"
												className={
													errors.flows?.[flowIndex]?.name
														? "border-red-500"
														: ""
												}
											/>
										)}
									/>
								</div>
								<div>
									<Label>Frecuencia (%)</Label>
									<Controller
										name={`flows.${flowIndex}.frequency`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												type="number"
												min="0"
												max="100"
												onChange={(e) =>
													field.onChange(Number.parseInt(e.target.value) || 0)
												}
												className={
													errors.flows?.[flowIndex]?.frequency
														? "border-red-500"
														: ""
												}
											/>
										)}
									/>
								</div>
							</div>

							<div>
								<Label>Descripción</Label>
								<Controller
									name={`flows.${flowIndex}.description`}
									control={control}
									render={({ field }) => (
										<Textarea
											{...field}
											placeholder="Descripción del flujo"
											className={
												errors.flows?.[flowIndex]?.description
													? "border-red-500"
													: ""
											}
										/>
									)}
								/>
							</div>

							<FlowDetailsSection
								control={control}
								errors={errors}
								flowIndex={flowIndex}
								watch={watch}
							/>
						</CardContent>
					</Card>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => append(createFlowDefaultValues())}
					className="flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					Agregar Flujo
				</Button>
			</CardContent>
		</Card>
	);
}

function FlowDetailsSection({ control, errors, flowIndex, watch }: any) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `flows.${flowIndex}.flowDetails`,
	});

	return (
		<div className="space-y-4">
			<Label className="font-medium text-base">Detalles del Flujo</Label>
			{fields.map((field, detailIndex) => (
				<Card key={field.id} className="bg-gray-50">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">
								Paso {detailIndex + 1}
							</CardTitle>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => remove(detailIndex)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<div>
								<Label>Número de Paso</Label>
								<Controller
									name={`flows.${flowIndex}.flowDetails.${detailIndex}.step`}
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											type="number"
											min="1"
											onChange={(e) =>
												field.onChange(Number.parseInt(e.target.value) || 1)
											}
										/>
									)}
								/>
							</div>
							<div>
								<Label>Actor</Label>
								<Controller
									name={`flows.${flowIndex}.flowDetails.${detailIndex}.actor`}
									control={control}
									render={({ field }) => (
										<Input {...field} placeholder="Nombre del actor" />
									)}
								/>
							</div>
						</div>

						<div>
							<Label>Acción</Label>
							<Controller
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.action`}
								control={control}
								render={({ field }) => (
									<Input {...field} placeholder="Descripción de la acción" />
								)}
							/>
						</div>

						<div>
							<Label>Respuesta del Sistema</Label>
							<Controller
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.systemResponse`}
								control={control}
								render={({ field }) => (
									<Input {...field} placeholder="Respuesta del sistema" />
								)}
							/>
						</div>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.conditions`}
							label="Condiciones"
							placeholder="Ingrese condición"
						/>

						<FlowDetailArraySection
							control={control}
							name={`flows.${flowIndex}.flowDetails.${detailIndex}.exceptions`}
							label="Excepciones"
							placeholder="Ingrese excepción"
						/>

						<div>
							<Label>Notas</Label>
							<Controller
								name={`flows.${flowIndex}.flowDetails.${detailIndex}.notes`}
								control={control}
								render={({ field }) => (
									<Textarea {...field} placeholder="Notas adicionales" />
								)}
							/>
						</div>
					</CardContent>
				</Card>
			))}
			<Button
				type="button"
				variant="outline"
				onClick={() => append(createFlowDetailDefaultValues(fields.length + 1))}
				className="flex items-center gap-2"
			>
				<Plus className="h-4 w-4" />
				Agregar Detalle del Flujo
			</Button>
		</div>
	);
}

function FlowDetailArraySection({ control, name, label, placeholder }: any) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<Controller
						name={`${name}.${index}`}
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

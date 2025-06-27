"use client";

import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Badge } from "~/ui/badge";
import { ArrowLeft, Download, Share } from "lucide-react";
import type { UseCase } from "~/schemas";
import {
	getStatusColor,
	getStatusText,
	getFlowTypeColor,
} from "~/lib/useCase.utils";

// type UseCaseFlowDetail = {
// 	step: number;
// 	actor: string;
// 	action: string;
// 	systemResponse: string;
// 	conditions: string[];
// 	exceptions: string[];
// 	notes: string;
// };

// type UseCaseFlow = {
// 	id: number;
// 	name: string;
// 	type: "main" | "alternative" | "exception";
// 	frequency: number;
// 	description: string;
// 	flowDetails: UseCaseFlowDetail[];
// };

// type UseCase = {
// 	id: number;
// 	date: string;
// 	sector: string;
// 	name: string;
// 	participants: string[];
// 	description: string;
// 	trigger: string;
// 	documentationRef: string[];
// 	useCaseRef: {
// 		id: number;
// 		name: string;
// 	}[];
// 	actors: {
// 		primary: string[];
// 		secondary: string[];
// 	};
// 	preconditions: string[];
// 	succuesfulResults: string[];
// 	failedResults: string[];
// 	conditions: string[];
// 	flows: UseCaseFlow[];
// 	input: string[];
// 	output: string[];
// 	notes: string;
// 	status: "draft" | "review" | "approved" | "rejected";
// };

interface UseCasePreviewProps {
	data: UseCase;
	onBack: () => void;
}

export function UseCasePreview({ data, onBack }: UseCasePreviewProps) {
	const exportToJSON = () => {
		const dataStr = JSON.stringify(data, null, 2);
		const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
		const exportFileDefaultName = `use-case-${data.id}-${data.name.replace(/\s+/g, "-").toLowerCase()}.json`;

		const linkElement = document.createElement("a");
		linkElement.setAttribute("href", dataUri);
		linkElement.setAttribute("download", exportFileDefaultName);
		linkElement.click();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Button
					variant="outline"
					onClick={onBack}
					className="flex items-center gap-2"
				>
					<ArrowLeft className="h-4 w-4" />
					Volver al Formulario
				</Button>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={exportToJSON}
						className="flex items-center gap-2"
					>
						<Download className="h-4 w-4" />
						Exportar JSON
					</Button>
					<Button variant="outline" className="flex items-center gap-2">
						<Share className="h-4 w-4" />
						Compartir
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-2xl">{data.name}</CardTitle>
							<CardDescription>
								Use Case #{data.id} • {data.sector}
							</CardDescription>
						</div>
						<Badge className={getStatusColor(data.status)}>
							{getStatusText(data.status)}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<h4 className="font-medium text-gray-500 text-sm uppercase tracking-wide">
								Fecha
							</h4>
							<p className="mt-1">{new Date(data.date).toLocaleDateString()}</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-500 text-sm uppercase tracking-wide">
								Disparador
							</h4>
							<p className="mt-1">{data.trigger}</p>
						</div>
					</div>

					<div>
						<h4 className="mb-2 font-medium text-gray-500 text-sm uppercase tracking-wide">
							Descripción
						</h4>
						<p className="text-gray-700">{data.description}</p>
					</div>

					{data.notes && (
						<div>
							<h4 className="mb-2 font-medium text-gray-500 text-sm uppercase tracking-wide">
								Notas
							</h4>
							<p className="text-gray-700">{data.notes}</p>
						</div>
					)}
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Participantes</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{data.participants
								.filter((p) => p.trim())
								.map((participant, index) => (
									<Badge key={index} variant="secondary">
										{participant}
									</Badge>
								))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Actores</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h5 className="mb-2 font-medium text-sm">Primarios</h5>
							<div className="flex flex-wrap gap-2">
								{data.actors.primary
									.filter((a) => a.trim())
									.map((actor, index) => (
										<Badge key={index} className="bg-blue-100 text-blue-800">
											{actor}
										</Badge>
									))}
							</div>
						</div>
						<div>
							<h5 className="mb-2 font-medium text-sm">Secundarios</h5>
							<div className="flex flex-wrap gap-2">
								{data.actors.secondary
									.filter((a) => a.trim())
									.map((actor, index) => (
										<Badge
											key={index}
											className="bg-purple-100 text-purple-800"
										>
											{actor}
										</Badge>
									))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ListCard title="Precondiciones" items={data.preconditions} />
				<ListCard title="Condiciones" items={data.conditions} />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ListCard title="Resultados Exitosos" items={data.succuesfulResults} />
				<ListCard title="Resultados Fallidos" items={data.failedResults} />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ListCard title="Datos de Entrada" items={data.input} />
				<ListCard title="Datos de Salida" items={data.output} />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ListCard
					title="Referencias de Documentación"
					items={data.documentationRef}
				/>
				<Card>
					<CardHeader>
						<CardTitle>Referencias de Casos de Uso</CardTitle>
					</CardHeader>
					<CardContent>
						{data.useCaseRef.length > 0 ? (
							<div className="space-y-2">
								{data.useCaseRef.map((ref, index) => (
									<div
										key={index}
										className="flex items-center gap-2 rounded bg-gray-50 p-2"
									>
										<Badge variant="outline">#{ref.id}</Badge>
										<span>{ref.name}</span>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 italic">Sin referencias</p>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Flujos</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{data.flows.map((flow, flowIndex) => (
						<Card key={flowIndex} className="border-l-4 border-l-blue-500">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-lg">{flow.name}</CardTitle>
										<CardDescription>Flujo #{flow.id}</CardDescription>
									</div>
									<div className="flex items-center gap-2">
										<Badge className={getFlowTypeColor(flow.type)}>
											{flow.type === "main"
												? "Principal"
												: flow.type === "alternative"
													? "Alternativo"
													: "Excepción"}
										</Badge>
										<Badge variant="outline">{flow.frequency}%</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-gray-700">{flow.description}</p>

								<div className="space-y-4">
									<h5 className="font-medium">Detalles del Flujo</h5>
									{flow.flowDetails.map((detail, detailIndex) => (
										<Card key={detailIndex} className="bg-gray-50">
											<CardContent className="pt-4">
												<div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
													<div>
														<span className="font-medium text-gray-500 text-sm">
															Paso {detail.step}
														</span>
														<p className="font-medium">{detail.actor}</p>
													</div>
													<div>
														<span className="font-medium text-gray-500 text-sm">
															Acción
														</span>
														<p>{detail.action}</p>
													</div>
												</div>

												<div className="mb-4">
													<span className="font-medium text-gray-500 text-sm">
														Respuesta del Sistema
													</span>
													<p>{detail.systemResponse}</p>
												</div>

												{detail.conditions.filter((c) => c.trim()).length >
													0 && (
													<div className="mb-4">
														<span className="font-medium text-gray-500 text-sm">
															Condiciones
														</span>
														<ul className="mt-1 list-inside list-disc space-y-1">
															{detail.conditions
																.filter((c) => c.trim())
																.map((condition, index) => (
																	<li key={index} className="text-sm">
																		{condition}
																	</li>
																))}
														</ul>
													</div>
												)}

												{detail.exceptions.filter((e) => e.trim()).length >
													0 && (
													<div className="mb-4">
														<span className="font-medium text-gray-500 text-sm">
															Excepciones
														</span>
														<ul className="mt-1 list-inside list-disc space-y-1">
															{detail.exceptions
																.filter((e) => e.trim())
																.map((exception, index) => (
																	<li
																		key={index}
																		className="text-red-600 text-sm"
																	>
																		{exception}
																	</li>
																))}
														</ul>
													</div>
												)}

												{detail.notes && (
													<div>
														<span className="font-medium text-gray-500 text-sm">
															Notas
														</span>
														<p className="mt-1 text-gray-600 text-sm">
															{detail.notes}
														</p>
													</div>
												)}
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

function ListCard({ title, items }: { title: string; items: string[] }) {
	const filteredItems = items.filter((item) => item.trim());

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{filteredItems.length > 0 ? (
					<ul className="space-y-2">
						{filteredItems.map((item, index) => (
							<li key={index} className="flex items-start gap-2">
								<span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500 italic">Sin elementos</p>
				)}
			</CardContent>
		</Card>
	);
}

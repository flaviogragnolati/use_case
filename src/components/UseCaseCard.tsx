"use client";

import { Calendar, Edit, Eye, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStatusColor, getStatusText } from "~/lib/useCase.utils";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/ui/dialog";
import { UseCasePreview } from "./useCasePreview";
import type { UseCaseFull } from "~/schemas";

interface UseCaseCardProps {
	useCase: UseCaseFull;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
	const router = useRouter();
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const handleView = () => {
		setIsPreviewOpen(true);
	};

	const handleEdit = () => {
		router.push(`/use_case/${useCase.id}?edit=true`);
	};

	const handleDelete = () => {
		console.log(`Deleting Use Case ${useCase.id}`);
	};

	return (
		<>
			<Card className="transition-shadow duration-200 hover:shadow-lg">
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<CardTitle className="mb-1 line-clamp-2 text-lg">
								{useCase.name}
							</CardTitle>
							<CardDescription className="text-sm">
								Caso de Uso #{useCase.id}
							</CardDescription>
						</div>
						<Badge className={getStatusColor(useCase.status)}>
							{getStatusText(useCase.status)}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-sm">
							<div className="h-2 w-2 rounded-full bg-blue-500" />
							<span className="font-medium">Sector:</span>
							<span className="text-gray-600">{useCase.sector}</span>
						</div>

						<div className="flex items-center gap-2 text-sm">
							<Calendar className="h-4 w-4 text-gray-400" />
							<span className="font-medium">Fecha:</span>
							<span className="text-gray-600">
								{new Date(useCase.date).toLocaleDateString("es-ES")}
							</span>
						</div>

						<div className="flex items-start gap-2 text-sm">
							<Users className="mt-0.5 h-4 w-4 text-gray-400" />
							<div>
								<span className="font-medium">Participantes:</span>
								<div className="mt-1 flex flex-wrap gap-1">
									{useCase.participants.map((participant, index) => (
										<Badge key={index} variant="secondary" className="text-xs">
											{participant}
										</Badge>
									))}
								</div>
							</div>
						</div>

						<div className="text-sm">
							<span className="font-medium">Descripción:</span>
							<p className="mt-1 line-clamp-2 text-gray-600">
								{useCase.description}
							</p>
						</div>

						<div className="text-sm">
							<span className="font-medium">Disparador:</span>
							<p className="mt-1 line-clamp-1 text-gray-600">
								{useCase.trigger}
							</p>
						</div>

						<div className="text-sm">
							<span className="font-medium">
								Flujos ({useCase.flows.length}):
							</span>
							<div className="mt-1 flex flex-wrap gap-1">
								{useCase.flows.map((flow, index) => (
									<Badge
										key={index}
										variant="outline"
										className={`text-xs ${
											flow.type === "main"
												? "border-blue-200 text-blue-700"
												: flow.type === "alternative"
													? "border-purple-200 text-purple-700"
													: "border-orange-200 text-orange-700"
										}`}
									>
										{flow.type === "main"
											? "Principal"
											: flow.type === "alternative"
												? "Alternativo"
												: "Excepción"}
									</Badge>
								))}
							</div>
						</div>
					</div>

					<div className="flex gap-2 border-t pt-2">
						<Button
							variant="outline"
							size="sm"
							className="flex flex-1 items-center gap-1 bg-transparent"
							onClick={handleView}
						>
							<Eye className="h-3 w-3" />
							Ver
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex flex-1 items-center gap-1 bg-transparent"
							onClick={handleEdit}
						>
							<Edit className="h-3 w-3" />
							Editar
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700"
							onClick={handleDelete}
						>
							<Trash2 className="h-3 w-3" />
						</Button>
					</div>
				</CardContent>
			</Card>

			<Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
				<DialogContent className="max-h-[90vh]vh]vhwv4xl overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Vista Previa - {useCase.name}</DialogTitle>
					</DialogHeader>
					<UseCasePreview
						data={useCase}
						onBack={() => setIsPreviewOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}

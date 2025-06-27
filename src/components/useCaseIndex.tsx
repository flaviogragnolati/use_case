"use client";

import { useState, useMemo } from "react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { Badge } from "~/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/ui/select";
import {
	Search,
	Plus,
	Calendar,
	Users,
	FileText,
	Eye,
	Edit,
	Trash2,
} from "lucide-react";
import { getStatusColor, getStatusText } from "~/lib/useCase.utils";

// Mock data for demonstration
const mockUseCases = [
	{
		id: 1,
		name: "Registro de Usuario",
		sector: "Autenticación",
		status: "approved" as const,
		date: "2024-01-15",
		participants: ["Ana García", "Carlos López"],
		description: "Proceso de registro de nuevos usuarios en el sistema",
		trigger: "Usuario hace clic en 'Registrarse'",
		flows: [
			{ type: "main", name: "Registro exitoso" },
			{ type: "exception", name: "Email ya existe" },
		],
	},
	{
		id: 2,
		name: "Procesamiento de Pagos",
		sector: "Finanzas",
		status: "review" as const,
		date: "2024-01-20",
		participants: ["María Rodríguez", "Juan Pérez", "Luis Martín"],
		description: "Gestión completa del procesamiento de pagos online",
		trigger: "Usuario confirma compra",
		flows: [
			{ type: "main", name: "Pago exitoso" },
			{ type: "alternative", name: "Pago con tarjeta de crédito" },
			{ type: "exception", name: "Pago rechazado" },
		],
	},
	{
		id: 3,
		name: "Gestión de Inventario",
		sector: "Logística",
		status: "draft" as const,
		date: "2024-01-25",
		participants: ["Pedro Sánchez"],
		description: "Control y seguimiento del inventario de productos",
		trigger: "Actualización automática cada hora",
		flows: [
			{ type: "main", name: "Actualización de stock" },
			{ type: "exception", name: "Error de conexión" },
		],
	},
	{
		id: 4,
		name: "Generación de Reportes",
		sector: "Análisis",
		status: "approved" as const,
		date: "2024-02-01",
		participants: ["Elena Fernández", "Roberto Silva"],
		description: "Creación automática de reportes de ventas mensuales",
		trigger: "Fin de mes",
		flows: [
			{ type: "main", name: "Reporte generado" },
			{ type: "alternative", name: "Reporte personalizado" },
		],
	},
	{
		id: 5,
		name: "Notificaciones Push",
		sector: "Comunicación",
		status: "rejected" as const,
		date: "2024-02-05",
		participants: ["Carmen Torres", "Diego Ruiz"],
		description: "Sistema de notificaciones push para móviles",
		trigger: "Evento específico del usuario",
		flows: [
			{ type: "main", name: "Notificación enviada" },
			{ type: "exception", name: "Usuario sin permisos" },
		],
	},
	{
		id: 6,
		name: "Backup Automático",
		sector: "Seguridad",
		status: "review" as const,
		date: "2024-02-10",
		participants: ["Fernando López", "Isabel García"],
		description: "Proceso automatizado de respaldo de datos críticos",
		trigger: "Programación diaria a las 2:00 AM",
		flows: [
			{ type: "main", name: "Backup completado" },
			{ type: "exception", name: "Fallo en el backup" },
		],
	},
];

interface UseCaseIndexProps {
	onCreateNew: () => void;
}

export function UseCaseIndex({ onCreateNew }: UseCaseIndexProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sectorFilter, setSectorFilter] = useState<string>("all");

	const uniqueSectors = useMemo(() => {
		const sectors = mockUseCases.map((uc) => uc.sector);
		return [...new Set(sectors)].sort();
	}, []);

	const filteredUseCases = useMemo(() => {
		return mockUseCases.filter((useCase) => {
			const matchesSearch =
				useCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				useCase.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
				useCase.participants.some((p) =>
					p.toLowerCase().includes(searchTerm.toLowerCase()),
				);

			const matchesStatus =
				statusFilter === "all" || useCase.status === statusFilter;
			const matchesSector =
				sectorFilter === "all" || useCase.sector === sectorFilter;

			return matchesSearch && matchesStatus && matchesSector;
		});
	}, [searchTerm, statusFilter, sectorFilter]);

	return (
		<div className="space-y-6">
			{/* Search and Filters */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Search className="w-5 h-5" />
						Buscar y Filtrar Casos de Uso
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
								<Input
									placeholder="Buscar por nombre, descripción, sector o participantes..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-40">
									<SelectValue placeholder="Estado" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todos los Estados</SelectItem>
									<SelectItem value="draft">Borrador</SelectItem>
									<SelectItem value="review">En Revisión</SelectItem>
									<SelectItem value="approved">Aprobado</SelectItem>
									<SelectItem value="rejected">Rechazado</SelectItem>
								</SelectContent>
							</Select>
							<Select value={sectorFilter} onValueChange={setSectorFilter}>
								<SelectTrigger className="w-40">
									<SelectValue placeholder="Sector" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todos los Sectores</SelectItem>
									{uniqueSectors.map((sector) => (
										<SelectItem key={sector} value={sector}>
											{sector}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-600">
							Mostrando {filteredUseCases.length} de {mockUseCases.length} casos
							de uso
						</p>
						<Button onClick={onCreateNew} className="flex items-center gap-2">
							<Plus className="w-4 h-4" />
							Nuevo Caso de Uso
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Use Cases Grid */}
			{filteredUseCases.length === 0 ? (
				<Card>
					<CardContent className="text-center py-12">
						<FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No se encontraron casos de uso
						</h3>
						<p className="text-gray-600 mb-4">
							{searchTerm || statusFilter !== "all" || sectorFilter !== "all"
								? "Intenta ajustar los filtros de búsqueda"
								: "Comienza creando tu primer caso de uso"}
						</p>
						<Button onClick={onCreateNew} className="flex items-center gap-2">
							<Plus className="w-4 h-4" />
							Crear Primer Caso de Uso
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredUseCases.map((useCase) => (
						<Card
							key={useCase.id}
							className="hover:shadow-lg transition-shadow duration-200"
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-lg mb-1 line-clamp-2">
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
										<div className="w-2 h-2 bg-blue-500 rounded-full" />
										<span className="font-medium">Sector:</span>
										<span className="text-gray-600">{useCase.sector}</span>
									</div>

									<div className="flex items-center gap-2 text-sm">
										<Calendar className="w-4 h-4 text-gray-400" />
										<span className="font-medium">Fecha:</span>
										<span className="text-gray-600">
											{new Date(useCase.date).toLocaleDateString("es-ES")}
										</span>
									</div>

									<div className="flex items-start gap-2 text-sm">
										<Users className="w-4 h-4 text-gray-400 mt-0.5" />
										<div>
											<span className="font-medium">Participantes:</span>
											<div className="flex flex-wrap gap-1 mt-1">
												{useCase.participants.map((participant, index) => (
													<Badge
														key={index}
														variant="secondary"
														className="text-xs"
													>
														{participant}
													</Badge>
												))}
											</div>
										</div>
									</div>

									<div className="text-sm">
										<span className="font-medium">Descripción:</span>
										<p className="text-gray-600 mt-1 line-clamp-2">
											{useCase.description}
										</p>
									</div>

									<div className="text-sm">
										<span className="font-medium">Disparador:</span>
										<p className="text-gray-600 mt-1 line-clamp-1">
											{useCase.trigger}
										</p>
									</div>

									<div className="text-sm">
										<span className="font-medium">
											Flujos ({useCase.flows.length}):
										</span>
										<div className="flex flex-wrap gap-1 mt-1">
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

								<div className="flex gap-2 pt-2 border-t">
									<Button
										variant="outline"
										size="sm"
										className="flex-1 flex items-center gap-1 bg-transparent"
									>
										<Eye className="w-3 h-3" />
										Ver
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="flex-1 flex items-center gap-1 bg-transparent"
									>
										<Edit className="w-3 h-3" />
										Editar
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

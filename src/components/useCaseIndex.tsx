"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus, Search } from "lucide-react";

import { C } from "~/constants";
import { Input } from "~/ui/input";
import { Button } from "~/ui/button";
import { UseCaseCard } from "./UseCaseCard";
import type { UseCaseFull } from "~/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/ui/select";

interface UseCaseIndexProps {
	useCases: UseCaseFull[];
}

export function UseCaseIndex({ useCases }: UseCaseIndexProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sectorFilter, setSectorFilter] = useState<string>("all");

	const uniqueSectors = useMemo(() => {
		const sectors = useCases.map((uc) => uc.sector);
		return [...new Set(sectors)].sort();
	}, [useCases]);

	const filteredUseCases = useMemo(() => {
		return useCases.filter((useCase) => {
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
	}, [useCases, searchTerm, statusFilter, sectorFilter]);

	const handleCreateNew = () => {
		router.push("/use_case/new");
	};

	return (
		<div className="space-y-6">
			{useCases.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Search className="h-5 w-5" />
							Buscar y Filtrar Casos de Uso
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-4 md:flex-row">
							<div className="flex-1">
								<div className="relative">
									<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
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
										{C.formStatus.map((status) => (
											<SelectItem key={status} value={status}>
												{C.statusMap[status]}
											</SelectItem>
										))}
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
							<p className="text-gray-600 text-sm">
								Mostrando {filteredUseCases.length} de {useCases.length} casos
								de uso
							</p>
							<Button
								onClick={handleCreateNew}
								className="flex cursor-pointer items-center gap-2"
							>
								<Plus className="h-4 w-4" />
								Nuevo Caso de Uso
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{filteredUseCases.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
						<h3 className="mb-2 font-medium text-gray-900 text-lg">
							No se encontraron casos de uso
						</h3>
						<p className="mb-4 text-gray-600">
							{searchTerm || statusFilter !== "all" || sectorFilter !== "all"
								? "Intenta ajustar los filtros de búsqueda"
								: "Comienza creando tu primer caso de uso"}
						</p>
						<Button
							onClick={handleCreateNew}
							className="mx-auto flex cursor-pointer items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Crear Primer Caso de Uso
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredUseCases.map((useCase) => (
						<UseCaseCard key={useCase.id} useCase={useCase} />
					))}
				</div>
			)}
		</div>
	);
}

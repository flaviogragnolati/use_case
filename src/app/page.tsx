"use client";

import { useState } from "react";
import { UseCaseForm } from "~/components/useCaseForm";
import { UseCaseIndex } from "~/components/useCaseIndex";
import { Button } from "~/ui/button";
import { Plus, List } from "lucide-react";

export default function Home() {
	const [currentView, setCurrentView] = useState<"index" | "form">("index");

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Sistema de Gestión de Casos de Uso
						</h1>
					</div>

					<div className="flex justify-center gap-4 mb-8">
						<Button
							variant={currentView === "index" ? "default" : "outline"}
							onClick={() => setCurrentView("index")}
							className="flex items-center gap-2"
						>
							<List className="w-4 h-4" />
							Lista de Casos de Uso
						</Button>
						<Button
							variant={currentView === "form" ? "default" : "outline"}
							onClick={() => setCurrentView("form")}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Crear Nuevo Caso de Uso
						</Button>
					</div>

					{currentView === "index" ? (
						<UseCaseIndex onCreateNew={() => setCurrentView("form")} />
					) : (
						<UseCaseForm onBackToIndex={() => setCurrentView("index")} />
					)}
				</div>
			</div>
		</div>
	);
}

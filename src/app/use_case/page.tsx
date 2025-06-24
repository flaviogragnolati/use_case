"use client";

import { UseCaseForm } from "~/components/useCaseForm";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8 text-center">
						<h1 className="mb-2 font-bold text-3xl text-gray-900">
							Sistema de Gestión de Casos de Uso
						</h1>
					</div>
					<UseCaseForm />
				</div>
			</div>
		</div>
	);
}

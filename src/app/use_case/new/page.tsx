import { UseCaseForm } from "~/components/use-case-form/UseCaseForm";

export default function NewUseCasePage() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8 text-center">
						<h1 className="mb-2 font-bold text-3xl text-gray-900">
							Crear Nuevo Caso de Uso
						</h1>
						<p className="text-gray-600">
							Complete el formulario para crear un nuevo caso de uso
						</p>
					</div>

					<div className="rounded-lg border bg-white p-8 shadow-sm">
						<UseCaseForm />
					</div>
				</div>
			</div>
		</div>
	);
}

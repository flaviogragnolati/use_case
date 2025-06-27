"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { UseCasePreview } from "~/components/useCasePreview";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface UseCasePageProps {
	params: { id: string };
}

export default function UseCasePage({ params }: UseCasePageProps) {
	const router = useRouter();
	const useCaseId = Number.parseInt(params.id, 10);

	const {
		data: useCase,
		isLoading,
		error,
	} = api.useCase.getUseCase.useQuery(
		{ id: useCaseId },
		{
			enabled: !Number.isNaN(useCaseId),
		},
	);

	if (Number.isNaN(useCaseId)) {
		return (
			<div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8">
						<Button
							variant="outline"
							onClick={() => router.back()}
							className="mb-4"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</div>
					<div className="text-center">
						<h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
						<h2 className="mb-4 text-xl font-semibold text-gray-700">
							ID de caso de uso inválido
						</h2>
						<p className="text-gray-600">
							El ID proporcionado no es válido. Por favor, verifica la URL e
							intenta nuevamente.
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8">
						<Button
							variant="outline"
							onClick={() => router.back()}
							className="mb-4"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</div>
					<div className="text-center">
						<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Cargando...
							</span>
						</div>
						<p className="mt-4 text-gray-600">Cargando caso de uso...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !useCase) {
		return (
			<div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8">
						<Button
							variant="outline"
							onClick={() => router.back()}
							className="mb-4"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</div>
					<div className="text-center">
						<h1 className="mb-4 font-bold text-4xl text-gray-900">404</h1>
						<h2 className="mb-4 font-semibold text-gray-700 text-xl">
							Caso de uso no encontrado
						</h2>
						<p className="text-gray-600">
							El caso de uso que buscas no existe o ha sido eliminado.
						</p>
						<Button onClick={() => router.push("/use_case")} className="mt-6">
							Ir a casos de uso
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (!useCase) {
		return (
			<div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8">
						<Button
							variant="outline"
							onClick={() => router.back()}
							className="mb-4"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</div>
					<div className="text-center">
						<h1 className="mb-4 font-bold text-4xl text-gray-900">404</h1>
						<h2 className="mb-4 font-semibold text-gray-700 text-xl">
							Caso de uso no encontrado
						</h2>
						<p className="text-gray-600">
							El caso de uso que buscas no existe o ha sido eliminado.
						</p>
						<Button onClick={() => router.push("/use_case")} className="mt-6">
							Ir a casos de uso
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<Button
						variant="outline"
						onClick={() => router.back()}
						className="mb-4"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Volver
					</Button>
				</div>
				<UseCasePreview data={useCase} onBack={() => router.back()} />
			</div>
		</div>
	);
}

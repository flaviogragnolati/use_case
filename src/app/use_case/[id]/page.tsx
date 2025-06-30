"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { ErrorComponent } from "~/components/ErrorComponent";
import { LoadingSkeleton } from "~/components/FormLoadingSkeleton";
import { NotFoundComponent } from "~/components/NotFoundComponent";
import { Button } from "~/components/ui/button";
import { UseCasePreview } from "~/components/useCasePreview";
import { UseCaseForm } from "~/components/use-case-form/UseCaseForm";
import { api } from "~/trpc/react";

interface UseCasePageProps {
	params: Promise<{ id: string }>;
}

export default async function UseCasePage({ params }: UseCasePageProps) {
	const { id } = await params;
	const router = useRouter();
	const searchParams = useSearchParams();
	const isEditMode = searchParams.get("edit") === "true";
	const useCaseId = Number.parseInt(id, 10);

	const {
		data: useCase,
		isLoading,
		error,
		refetch,
	} = api.useCase.getUseCase.useQuery(
		{ id: useCaseId },
		{
			enabled: !Number.isNaN(useCaseId),
		},
	);

	const notFound = !useCase && !error;
	const isError = error || Number.isNaN(useCaseId);

	if (isError) {
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
					<ErrorComponent
						error={error}
						onRetry={() => refetch()}
						onGoHome={() => router.push("/use_case")}
						title="Error al cargar el caso de uso"
					/>
				</div>
			</div>
		);
	}

	if (notFound || !useCase) {
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
					<NotFoundComponent
						title="ID de caso de uso inválido o no encontrado"
						message="El ID proporcionado no es válido o no existe. Por favor, verifica la URL e intenta nuevamente."
						onGoHome={() => router.push("/use_case")}
					/>
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
					<LoadingSkeleton />
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
				{isEditMode ? (
					<UseCaseForm
						initialData={useCase}
						isEditMode={true}
						onSuccess={() => router.push(`/use_case/${useCaseId}`)}
					/>
				) : (
					<UseCasePreview data={useCase} onBack={() => router.back()} />
				)}
			</div>
		</div>
	);
}

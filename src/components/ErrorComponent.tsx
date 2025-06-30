import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface ErrorComponentProps {
	error?: { message?: string } | null;
	onRetry?: () => void;
	onGoHome?: () => void;
	title?: string;
	message?: string;
}

export function ErrorComponent({
	error,
	onRetry,
	onGoHome,
	title = "Error",
	message,
}: ErrorComponentProps) {
	const displayMessage =
		message || error?.message || "Ha ocurrido un error inesperado";

	return (
		<div className="flex min-h-[400px] items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<AlertCircle className="h-6 w-6 text-red-600" />
					</div>
					<CardTitle className="-xl text-xl text-xl text-xl text-xl">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					<p className="text-gray-600">{displayMessage}</p>
					<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
						{onRetry && (
							<Button
								onClick={onRetry}
								variant="default"
								className="w-full sm:w-auto"
							>
								<RefreshCw className="mr-2 h-4 w-4" />
								Reintentar
							</Button>
						)}
						{onGoHome && (
							<Button
								onClick={onGoHome}
								variant="outline"
								className="w-full sm:w-auto"
							>
								<Home className="mr-2 h-4 w-4" />
								Ir al inicio
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

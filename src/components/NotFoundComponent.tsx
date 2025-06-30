import { FileQuestion, Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface NotFoundComponentProps {
	id?: string | number;
	onGoHome?: () => void;
	title?: string;
	message?: string;
}

export function NotFoundComponent({
	id,
	onGoHome,
	title = "404 - No encontrado",
	message,
}: NotFoundComponentProps) {
	const displayMessage =
		message ||
		(id
			? `El elemento con ID "${id}" no fue encontrado`
			: "El recurso solicitado no existe");

	return (
		<div className="flex min-h-[400px] items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
						<FileQuestion className="h-6 w-6 text-gray-600" />
					</div>
					<CardTitle className="mb-2 font-bol font-bold text-gray-900">
						404
					</CardTitle>
					<CardTitle className="-xl text-xl text-xl text-xl text-xl">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					<p className="text-gray-600">{displayMessage}</p>
					{onGoHome && (
						<Button
							onClick={onGoHome}
							variant="default"
							className="w-full sm:w-auto"
						>
							<Home className="mr-2 h-4 w-4" />
							Ir al inicio
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

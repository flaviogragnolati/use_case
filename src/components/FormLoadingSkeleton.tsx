import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="space-y-6">
			{/* Header skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-8 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/5" />
				</CardContent>
			</Card>

			{/* Details skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-1/3" />
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Skeleton className="h-4 w-1/4" />
							<Skeleton className="h-4 w-3/4" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-1/4" />
							<Skeleton className="h-4 w-2/3" />
						</div>
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-20 w-full" />
					</div>
				</CardContent>
			</Card>

			{/* Flows skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-1/4" />
				</CardHeader>
				<CardContent className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="space-y-3 rounded-lg border p-4">
							<Skeleton className="h-5 w-1/3" />
							<Skeleton className="h-4 w-full" />
							<div className="grid grid-cols-1 gap-2 md:grid-cols-4">
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

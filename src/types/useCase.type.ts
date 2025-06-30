import type { Prisma } from "@prisma/client";

export type UseCaseWithIncludes = Prisma.UseCaseGetPayload<{
	include: {
		flows: {
			include: {
				flowDetails: true;
			};
		};
	};
}>;

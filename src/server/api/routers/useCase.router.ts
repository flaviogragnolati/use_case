import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { transformUseCaseData } from "~/utils/useCase.utils";
import { upsertUseCaseSchema } from "~/schemas";

export const useCaseRouter = createTRPCRouter({
	saveUseCase: protectedProcedure
		.input(upsertUseCaseSchema)
		.mutation(async ({ input, ctx }) => {
			const { db, session } = ctx;
			const userId = session.user.id;

			try {
				const isUpdate = input.type === "update";

				if (isUpdate) {
					// Verify the use case exists and belongs to the user
					const existingUseCase = await db.useCase.findFirst({
						where: {
							id: input.id,
							authorId: userId,
						},
					});

					if (!existingUseCase) {
						throw new TRPCError({
							code: "NOT_FOUND",
							message:
								"Use case not found or you don't have permission to edit it",
						});
					}

					// Update existing use case
					const updatedUseCase = await db.useCase.update({
						where: { id: input.id },
						data: {
							date: input.date,
							sector: input.sector,
							name: input.name,
							participants: input.participants,
							description: input.description,
							trigger: input.trigger,
							documentationRef: input.documentationRef,
							primaryActors: input.actors.primary,
							secondaryActors: input.actors.secondary,
							preconditions: input.preconditions,
							successfulResults: input.succuesfulResults,
							failedResults: input.failedResults,
							conditions: input.conditions,
							input: input.input,
							output: input.output,
							notes: input.notes,
							status: input.status,
						},
					});

					// Delete existing flows and their details
					await db.useCaseFlow.deleteMany({
						where: { useCaseId: input.id },
					});

					// Create new flows and their details
					for (const flow of input.flows) {
						const createdFlow = await db.useCaseFlow.create({
							data: {
								name: flow.name,
								type: flow.type,
								frequency: flow.frequency,
								description: flow.description,
								useCaseId: updatedUseCase.id,
							},
						});

						// Create flow details
						for (const detail of flow.flowDetails) {
							await db.useCaseFlowDetail.create({
								data: {
									step: detail.step,
									actor: detail.actor,
									action: detail.action,
									systemResponse: detail.systemResponse,
									conditions: detail.conditions,
									exceptions: detail.exceptions,
									notes: detail.notes,
									flowId: createdFlow.id,
								},
							});
						}
					}

					// Handle use case references if needed
					// Note: The current schema expects useCaseRef but the DB has a many-to-many relationship
					// This might need to be implemented based on your specific requirements

					return {
						success: true,
						id: updatedUseCase.id,
						message: "Use case updated successfully",
					};
				}

				const newUseCase = await db.useCase.create({
					data: {
						date: input.date,
						sector: input.sector,
						name: input.name,
						participants: input.participants,
						description: input.description,
						trigger: input.trigger,
						documentationRef: input.documentationRef,
						primaryActors: input.actors.primary,
						secondaryActors: input.actors.secondary,
						preconditions: input.preconditions,
						successfulResults: input.succuesfulResults,
						failedResults: input.failedResults,
						conditions: input.conditions,
						input: input.input,
						output: input.output,
						notes: input.notes,
						status: input.status,
						authorId: userId,
					},
				});

				// Create flows and their details
				for (const flow of input.flows) {
					const createdFlow = await db.useCaseFlow.create({
						data: {
							name: flow.name,
							type: flow.type,
							frequency: flow.frequency,
							description: flow.description,
							useCaseId: newUseCase.id,
						},
					});

					// Create flow details
					for (const detail of flow.flowDetails) {
						await db.useCaseFlowDetail.create({
							data: {
								step: detail.step,
								actor: detail.actor,
								action: detail.action,
								systemResponse: detail.systemResponse,
								conditions: detail.conditions,
								exceptions: detail.exceptions,
								notes: detail.notes,
								flowId: createdFlow.id,
							},
						});
					}
				}

				return {
					success: true,
					id: newUseCase.id,
					message: "Use case created successfully",
				};
			} catch (error) {
				console.error("Error saving use case:", error);

				if (error instanceof TRPCError) {
					throw error;
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to save use case",
				});
			}
		}),
	getUseCase: publicProcedure
		.input(z.object({ id: z.number().optional(), name: z.string().optional() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;

			if (!input.id && !input.name) return null;

			try {
				if (input.id) {
					const useCase = await db.useCase.findUnique({
						where: { id: input.id },
						include: {
							flows: {
								include: {
									flowDetails: true,
								},
							},
						},
					});

					if (!useCase) {
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Use case not found",
						});
					}

					return transformUseCaseData(useCase);
				}

				if (input.name) {
					const useCase = await db.useCase.findFirst({
						where: { name: { contains: input.name, mode: "insensitive" } },
						include: {
							flows: {
								include: {
									flowDetails: true,
								},
							},
						},
					});

					if (!useCase) {
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Use case not found",
						});
					}

					return transformUseCaseData(useCase);
				}

				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Either id or name must be provided",
				});
			} catch (error) {
				console.error("Error fetching use case:", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to fetch use case",
				});
			}
		}),
	getAllUseCases: publicProcedure.query(async ({ ctx }) => {
		const { db } = ctx;

		try {
			const useCases = await db.useCase.findMany({
				include: {
					flows: {
						include: {
							flowDetails: true,
						},
					},
				},
			});

			return useCases.map(transformUseCaseData);
		} catch (error) {
			console.error("Error fetching all use cases:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to fetch use cases",
			});
		}
	}),
	deleteUseCase: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				hardDelete: z.boolean().optional().default(false),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { db, session } = ctx;
			const userId = session.user.id;

			try {
				// Verify the use case exists and belongs to the user
				const existingUseCase = await db.useCase.findFirst({
					where: {
						id: input.id,
						authorId: userId,
					},
				});

				if (!existingUseCase) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message:
							"Use case not found or you don't have permission to delete it",
					});
				}

				if (input.hardDelete) {
					// Hard delete the use case and its related data
					await db.useCaseFlowDetail.deleteMany({
						where: { flow: { useCaseId: input.id } },
					});
					await db.useCaseFlow.deleteMany({
						where: { useCaseId: input.id },
					});
					await db.useCase.delete({ where: { id: input.id } });
				} else {
					// Soft delete by updating status
					await db.useCase.update({
						where: { id: input.id },
						data: { status: "deleted" },
					});
				}

				return {
					success: true,
					message: "Use case deleted successfully",
				};
			} catch (error) {
				console.error("Error deleting use case:", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to delete use case",
				});
			}
		}),
});

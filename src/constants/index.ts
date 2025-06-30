const constants = {
	formStatus: ["draft", "review", "approved", "rejected"],
	statusMap: {
		draft: "Borrador",
		review: "En Revisión",
		approved: "Aprobado",
		rejected: "Rechazado",
	},
} as const;

export { constants as C };

const constants = {
	formStatus: ["draft", "review", "approved", "rejected"],
	statusMap: {
		draft: "Borrador",
		review: "En Revisión",
		approved: "Aprobado",
		rejected: "Rechazado",
	},
	procedures:[
		'Inicio',
		'Reinicio',
		"Scrap",
		'CEOR',
		"Otros"
	]
} as const;

export { constants as C };

export const getStatusColor = (status: string) => {
	switch (status) {
		case "draft":
			return "bg-gray-100 text-gray-800 border-gray-200";
		case "review":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "approved":
			return "bg-green-100 text-green-800 border-green-200";
		case "rejected":
			return "bg-red-100 text-red-800 border-red-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const getStatusText = (status: string) => {
	switch (status) {
		case "draft":
			return "Borrador";
		case "review":
			return "En Revisión";
		case "approved":
			return "Aprobado";
		case "rejected":
			return "Rechazado";
		default:
			return status;
	}
};

export const getFlowTypeColor = (type: string) => {
	switch (type) {
		case "main":
			return "bg-blue-100 text-blue-800";
		case "alternative":
			return "bg-purple-100 text-purple-800";
		case "exception":
			return "bg-orange-100 text-orange-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

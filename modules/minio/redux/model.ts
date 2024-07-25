export interface MinIO {
	file: File | null;
	files: File[];
}

export const minIO: MinIO = {
	file: null,
	files: [],
};

import { PayloadAction } from "@reduxjs/toolkit";
import { DocumentForm, DocumentGrid, DocumentFilter, Document } from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const documentReducers = {
	setDocumentGrid: (state: Document, action: PayloadAction<DocumentGrid>) => {
		state.grid = action.payload;
	},
	setDocumentFilter: (
		state: Document,
		action: PayloadAction<DocumentFilter>
	) => {
		state.filter = action.payload;
	},
	setDocumentForm: (state: Document, action: PayloadAction<DocumentForm>) => {
		state.form = action.payload;
	},
	setDocumentPagination: (
		state: Document,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};

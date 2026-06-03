export type FilmType = 'Thick' | 'Thin' | null;
export type AnalysisStatus = 'Positive' | 'Negative';
export type AnalysisGrade = '1+' | '2+' | '3+' | '4+' | 'Nil';

export interface PatientInfo {
	first_name: string;
	surname: string;
	patient_id: string;
	// created_at: string; // ISO yyyy-mm-dd
}

export interface DiagnosticRecord {
	id: number;            // record id
	patientId: string;
	firstName: string;
	surname: string;
	date: string;          // ISO date for display
	status: AnalysisStatus;
	grade: AnalysisGrade;
	filmType: 'Thick' | 'Thin';
	snapshots: string[];   // image URLs
}

export interface ActiveSession extends PatientInfo {
	userId: number | null; // DB-assigned id returned after patient creation
	filmType: FilmType;
	snapshots: string[];
}

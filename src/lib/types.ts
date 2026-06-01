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
	id: string;            // record id
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
	filmType: FilmType;
	snapshots: string[];
}

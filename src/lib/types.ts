export type FilmType = 'Thick' | 'Thin' | null;
export type AnalysisStatus = 'Positive' | 'Negative';
export type AnalysisGrade = '1+' | '2+' | '3+' | '4+' | 'Nil';

export interface PatientInfo {
	first_name: string;
	surname: string;
	patient_id: string;
}

export interface DiagnosticRecord {
	id: number;
	patient_id: string;
	first_name: string;
	surname: string;
	created_at: string;
	status: AnalysisStatus;
	grade: AnalysisGrade;
	film_type: 'Thick' | 'Thin';
	snapshots: string[];
}

export interface ActiveSession extends PatientInfo {
	user_id: number | null; // DB-assigned id returned after patient creation
	filmType: FilmType;
	snapshots: string[];
}

export interface AnalysisItem {
	id: number;
	user_id: number;
	file_dir: string;
	status: string;
	grade: string;
	created_at: string;
	user: {
		first_name: string;
		surname: string;
	};
}

// exact backend response structure from GET /analysis/{user_id}
export interface UserAnalysisResult {
	count: number;
	analysis: AnalysisItem[];
}

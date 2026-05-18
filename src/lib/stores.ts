import { writable } from 'svelte/store';
import type { ActiveSession, DiagnosticRecord } from './types';

/* -- Sample blood smear images (public domain microscopy from Wikimedia Commons) -- */
const sampleSnapshots = [
	'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Plasmodium_falciparum_01.png/640px-Plasmodium_falciparum_01.png',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Plasmodium_falciparum_02.png/640px-Plasmodium_falciparum_02.png',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Plasmodium_falciparum_03.png/640px-Plasmodium_falciparum_03.png',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Plasmodium_falciparum_ring_form_in_a_thick_blood_smear.jpg/640px-Plasmodium_falciparum_ring_form_in_a_thick_blood_smear.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Plasmodium_falciparum_ring-forms_and_gametocytes.jpg/640px-Plasmodium_falciparum_ring-forms_and_gametocytes.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Plasmodium_falciparum_thin_blood_film_01.JPG/640px-Plasmodium_falciparum_thin_blood_film_01.JPG'
];

const emptySession: ActiveSession = {
	firstName: '',
	surname: '',
	patientId: '',
	analysisDate: new Date().toISOString().slice(0, 10),
	filmType: null,
	snapshots: []
};

export const activeSession = writable<ActiveSession>({ ...emptySession });

export function resetSession() {
	activeSession.set({
		...emptySession,
		analysisDate: new Date().toISOString().slice(0, 10)
	});
}

/* -- Mock diagnostic records (initial seed) -- */
const initialRecords: DiagnosticRecord[] = [
	{
		id: 'rec-001',
		patientId: '4814199001zluhg7Ye',
		firstName: 'Abimbola',
		surname: 'Okonkwo',
		date: '2023-09-04',
		status: 'Positive',
		grade: '2+',
		filmType: 'Thin',
		snapshots: sampleSnapshots.slice(0, 6)
	},
	{
		id: 'rec-002',
		patientId: '8755120013ndnedXH',
		firstName: 'Adeola',
		surname: 'Joshua',
		date: '2023-11-02',
		status: 'Negative',
		grade: 'Nil',
		filmType: 'Thick',
		snapshots: sampleSnapshots.slice(0, 4)
	},
	{
		id: 'rec-003',
		patientId: '0915313712jenoy6S',
		firstName: 'Adetayo',
		surname: 'Adekunle',
		date: '2024-01-18',
		status: 'Positive',
		grade: '1+',
		filmType: 'Thin',
		snapshots: sampleSnapshots.slice(2, 6)
	},
	{
		id: 'rec-004',
		patientId: '6857681123bptg40',
		firstName: 'Babatunde',
		surname: 'Balogun',
		date: '2024-02-08',
		status: 'Positive',
		grade: '3+',
		filmType: 'Thick',
		snapshots: sampleSnapshots
	},
	{
		id: 'rec-005',
		patientId: '6571892194penbu1H',
		firstName: 'Sade',
		surname: 'Eluwa',
		date: '2024-03-30',
		status: 'Negative',
		grade: 'Nil',
		filmType: 'Thin',
		snapshots: sampleSnapshots.slice(0, 3)
	},
	{
		id: 'rec-006',
		patientId: '1404516969a4hpt33',
		firstName: 'Bankole',
		surname: 'Otedola',
		date: '2024-05-19',
		status: 'Positive',
		grade: '4+',
		filmType: 'Thick',
		snapshots: sampleSnapshots
	},
	{
		id: 'rec-007',
		patientId: '1233444545gjkn844',
		firstName: 'Dara',
		surname: 'Simi',
		date: '2023-05-19',
		status: 'Positive',
		grade: '2+',
		filmType: 'Thin',
		snapshots: sampleSnapshots
	}
];

export const records = writable<DiagnosticRecord[]>(initialRecords);

export function addRecord(rec: DiagnosticRecord) {
	records.update((r) => [rec, ...r]);
}

export { sampleSnapshots };

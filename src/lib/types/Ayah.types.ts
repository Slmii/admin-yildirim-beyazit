export interface ApiSurah {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	numberOfAyahs: number;
	revelationType: string;
}

export interface ApiSingleSurah {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	numberOfAyahs: number;
	revelationType: string;
	ayahs: {
		number: number;
		text: string;
	}[];
}

export interface ApiAyah {
	number: number;
	text: string;
	surah: ApiSurah;
}

export interface AddQuranAyah {
	ayah: number;
	surah: number;
	completeSurah: boolean;
}

export enum QuranAyahPreviewLanguageEnum {
	TR = 'tr.diyanet',
	NL = 'nl.siregar',
	AR = 'quran-simple-enhanced'
}

export interface QuranAyah {
	id: number;
	surah: number;
	ayah: number;
	language: string;
	order: number;
	completeSurah: boolean;
	createdAt: Date;
	updatedAt: Date;
}

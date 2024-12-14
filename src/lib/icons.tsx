import { createSvgIcon } from '@mui/material/utils';

const icons = {
	save: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2' />
			<path d='M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
			<path d='M14 4l0 4l-6 0l0 -4' />
		</svg>,
		'Save'
	),
	'sidebar-close': createSvgIcon(
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 3a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h12zm-3 2h-9a1 1 0 0 0 -.993 .883l-.007 .117v12a1 1 0 0 0 .883 .993l.117 .007h9v-14zm-3.293 4.293a1 1 0 0 1 .083 1.32l-.083 .094l-1.292 1.293l1.292 1.293a1 1 0 0 1 .083 1.32l-.083 .094a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 -.083 -1.32l.083 -.094l2 -2a1 1 0 0 1 1.414 0z' />
		</svg>,
		'Sidebar Close'
	),
	'sidebar-open': createSvgIcon(
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 3a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h12zm0 2h-9v14h9a1 1 0 0 0 .993 -.883l.007 -.117v-12a1 1 0 0 0 -.883 -.993l-.117 -.007zm-4.387 4.21l.094 .083l2 2a1 1 0 0 1 .083 1.32l-.083 .094l-2 2a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.292 -1.293l-1.292 -1.293a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.32 -.083z' />
		</svg>,
		'Sidebar Open'
	),
	speaker: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 8a3 3 0 0 1 0 6' />
			<path d='M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5' />
			<path d='M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8' />
		</svg>,
		'Speaker'
	),
	book: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0' />
			<path d='M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0' />
			<path d='M3 6l0 13' />
			<path d='M12 6l0 13' />
			<path d='M21 6l0 13' />
		</svg>,
		'Book'
	),
	add: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M12 5l0 14' />
			<path d='M5 12l14 0' />
		</svg>,
		'Add'
	),
	upload: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
			<path d='M7 9l5 -5l5 5' />
			<path d='M12 4l0 12' />
		</svg>,
		'Upload'
	),
	import: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M14 3v4a1 1 0 0 0 1 1h4' />
			<path d='M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3' />
		</svg>,
		'Import'
	),
	close: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 6l-12 12' />
			<path d='M6 6l12 12' />
		</svg>,
		'Close'
	),
	copy: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
			<path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
		</svg>,
		'Copy'
	),
	edit: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
			<path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
			<path d='M16 5l3 3' />
		</svg>,
		'Edit'
	),
	'add-user': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
			<path d='M16 19h6' />
			<path d='M19 16v6' />
			<path d='M6 21v-2a4 4 0 0 1 4 -4h4' />
		</svg>,
		'Add User'
	),
	language: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M4 5h7' />
			<path d='M9 3v2c0 4.418 -2.239 8 -5 8' />
			<path d='M5 9c0 2.144 2.952 3.908 6.7 4' />
			<path d='M12 20l4 -9l4 9' />
			<path d='M19.1 18h-6.2' />
		</svg>,
		'Language'
	),
	mosque: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M3 21h7v-2a2 2 0 1 1 4 0v2h7' />
			<path d='M4 21v-10' />
			<path d='M20 21v-10' />
			<path d='M4 16h3v-3h10v3h3' />
			<path d='M17 13a5 5 0 0 0 -10 0' />
			<path d='M21 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z' />
			<path d='M5 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z' />
			<path d='M12 2a2 2 0 1 0 2 2' />
			<path d='M12 6v2' />
		</svg>,
		'Mosque'
	),
	euro: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M17.2 7a6 7 0 1 0 0 10' />
			<path d='M13 10h-8m0 4h8' />
		</svg>,
		'Euro'
	),
	check: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M5 12l5 5l10 -10' />
		</svg>,
		'Check'
	),
	checked: createSvgIcon(
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.626 7.293a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z' />
		</svg>,
		'Checked'
	),
	unchecked: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
		</svg>,
		'Unchecked'
	),
	delete: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M4 7h16' />
			<path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
			<path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
			<path d='M10 12l4 4m0 -4l-4 4' />
		</svg>,
		'Delete'
	),
	'chevron-up': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M6 15l6 -6l6 6' />
		</svg>,
		'Chevron Up'
	),
	'chevron-down': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M6 9l6 6l6 -6' />
		</svg>,
		'Chevron Down'
	),
	'chevron-left': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M15 6l-6 6l6 6' />
		</svg>,
		'Chevron Left'
	),
	'chevron-left-pipe': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M7 6v12' />
			<path d='M18 6l-6 6l6 6' />
		</svg>,
		'Chevron Left Pipe'
	),
	'chevron-right': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M9 6l6 6l-6 6' />
		</svg>,
		'Chevron Right'
	),
	'chevron-right-pipe': createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M6 6l6 6l-6 6' />
			<path d='M17 5v13' />
		</svg>,
		'Chevron Right Pipe'
	),
	menu: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M4 6l16 0' />
			<path d='M4 12l16 0' />
			<path d='M4 18l16 0' />
		</svg>,
		'Menu'
	),
	users: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
			<path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
			<path d='M16 3.13a4 4 0 0 1 0 7.75' />
			<path d='M21 21v-2a4 4 0 0 0 -3 -3.85' />
		</svg>,
		'Users'
	),
	invoice: createSvgIcon(
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M14 3v4a1 1 0 0 0 1 1h4' />
			<path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
			<path d='M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5' />
			<path d='M12 17v1m0 -8v1' />
		</svg>,
		'Invoice'
	)
};

export type Icon = keyof typeof icons;
export { icons };

export default function inputZone() {
	return (
		<div className="bg-gray-400 p-4 h-20 sticky bottom-0">
			<div className="flex flex-row flex-1 h-full rounded divide-gray-200 divide-x">
				<div className="pr-2 flex-1">
					<input
						type="text"
						className="w-full h-full rounded border-gray-500"
					/>
				</div>
				<div className="flex flex-col justify-center items-stretch pl-2">
					<button className="bg-blue-500 rounded shadow text-sm text-white h-full w-full px-2">
						SEND
					</button>
				</div>
			</div>
		</div>
	);
}

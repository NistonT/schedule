import { UseFormRegister } from "react-hook-form";
import { IAuthorization } from "../../../type/authorization.type";

type Props = {
	type: string;
	name: keyof IAuthorization;
	label: string;
	register: UseFormRegister<IAuthorization>;
	required?: boolean;
};

export const InputForm = ({
	name,
	register,
	type,
	label,
	required = true,
}: Props) => {
	return (
		<>
			<div className='relative mb-4'>
				<label htmlFor={name} className='leading-7 text-sm text-gray-600'>
					{label}
				</label>
				<input
					{...register(name, { required })}
					type={type}
					id={name}
					className='w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
				/>
			</div>
		</>
	);
};

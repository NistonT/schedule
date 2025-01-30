import { UseFormRegister } from "react-hook-form";

type Props = {
	label: string;
	name: string;
	type: string;
	isRequired: boolean;
	required: boolean | string;
	register: UseFormRegister<any>;
	errors: string | undefined;
	minLengthValue?: number;
	maxLengthValue?: number;
	patternValue?: RegExp | undefined;
	patternMessage?: string | undefined;
};

export const InputLabelForm = ({
	label,
	type,
	name,
	isRequired = true,
	required,
	register,
	errors,
	minLengthValue = 3,
	maxLengthValue = 255,
	patternValue = /^.*$/,
	patternMessage = "",
}: Props) => {
	return (
		<>
			<div className='relative mb-4'>
				<label
					htmlFor={name}
					className='leading-7 text-sm text-gray-600 select-none'
				>
					{label}
				</label>
				<input
					{...register(name, {
						required,
						minLength: {
							value: minLengthValue,
							message: `Имя пользователя должно содержать не менее ${minLengthValue} символов`,
						},
						maxLength: {
							value: maxLengthValue,
							message: `Имя пользователя должно содержать не более ${maxLengthValue} символов`,
						},
						pattern: {
							value: patternValue,
							message: patternMessage,
						},
					})}
					type={type}
					id={name}
					className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					required={isRequired}
				/>
				{errors && <p className='text-red-500 text-xs mt-1'>{errors}</p>}
			</div>
		</>
	);
};

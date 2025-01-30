import { CheckboxLabelForm } from "@/components/ui/input/CheckboxLabelForm";
import { InputLabelForm } from "@/components/ui/input/InputLabelForm";
import { MessageError } from "@/components/ui/message/MessageError";
import { MessageGreen } from "@/components/ui/message/MessageGreen";
import { NavLink } from "react-router-dom";
import { useRegistration } from "../hook/useRegistration";
import { PasswordForm } from "./PasswordForm";

export const FormRegister = () => {
	const {
		onSubmit,
		register,
		handleSubmit,
		errors,
		sendMessage,
		isSendErrorMessage,
		isSendMessage,
		sendErrorMessage,
	} = useRegistration();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=' bg-gray-100 rounded-lg p-8 flex flex-col w-1/3 mt-10 md:mt-0'
		>
			<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
				Регистрация
			</h2>
			<InputLabelForm
				label={"Имя пользователя"}
				name={"username"}
				type={"text"}
				isRequired={true}
				required={"Введите имя пользователя"}
				register={register}
				errors={errors["username"]?.message}
				minLengthValue={3}
				maxLengthValue={50}
				patternValue={/^(?=(?:.*[a-zA-Z]){3})[a-zA-Z0-9]+$/}
				patternMessage='Пароль должен содержать хотя бы три английские буквы (нижний или верхний регистр). Допускаются только латинские буквы и цифры.'
			/>
			<InputLabelForm
				label={"Почта"}
				name={"email"}
				type={"email"}
				isRequired={true}
				required={"Введите почту"}
				register={register}
				errors={errors["email"]?.message}
				minLengthValue={3}
				maxLengthValue={100}
				patternValue={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
				patternMessage='Адрес электронной почты должен содержать:
Латинские буквы, цифры и символы перед @.
Доменное имя после @ и доменную зону (например, .com, .co.uk).'
			/>

			<PasswordForm register={register} errors={errors["password"]?.message} />

			<InputLabelForm
				label={"Подтверждение пароля"}
				name={"confirmPassword"}
				type={"password"}
				isRequired={true}
				required={"Повторите пароль"}
				register={register}
				errors={errors["confirmPassword"]?.message}
			/>
			<CheckboxLabelForm
				label={"Подтвердите условия использования"}
				name={"terms"}
				register={register}
				required={false}
			/>

			{isSendMessage && <MessageGreen message={sendMessage} />}
			{isSendErrorMessage && <MessageError message={sendErrorMessage} />}
			<button className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
				Регистрация
			</button>
			<p className='text-xs text-gray-500 mt-3'>
				У вас уже есть аккаунт?
				<NavLink
					to='/'
					className='text-indigo-500 hover:underline ml-1 cursor-pointer'
				>
					Войти
				</NavLink>
			</p>
		</form>
	);
};

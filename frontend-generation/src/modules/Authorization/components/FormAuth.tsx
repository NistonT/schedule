import { ButtonForm } from "@/components/ui/button/ButtonForm";
import { InputLabelForm } from "@/components/ui/input/InputLabelForm";
import { MessageError } from "@/components/ui/message/MessageError";
import { useAuthorization } from "../hook/useAuthorization";

export const FormAuth = () => {
	const { onSubmit, register, handleSubmit, messageError, isError, errors } =
		useAuthorization();

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputLabelForm
					label={"Имя пользователя"}
					name={"username"}
					type={"text"}
					isRequired={true}
					required={"Введите имя пользователя"}
					register={register}
					errors={errors["username"]?.message}
				/>
				<InputLabelForm
					label={"Пароль"}
					name={"password"}
					type={"password"}
					isRequired={true}
					required={"Введите пароль"}
					register={register}
					errors={errors["password"]?.message}
				/>
				{isError && <MessageError message={messageError} />}
				<ButtonForm name={"Войти"} />
			</form>
		</>
	);
};

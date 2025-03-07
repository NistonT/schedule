import { MessageError } from "@/components/ui/message/MessageError";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updatedUserApi } from "../../api/updatedUser.api";
import { EUpdateUser } from "../../type/update-user.type";

type Props = {
	type: EUpdateUser;
	name: string;
	label: string;
	user_id: number;
	minLengthValue: number;
	maxLengthValue: number;
	patternValue: RegExp;
	patternMessage: string;
};

export const InputUpdate = ({
	name,
	label,
	user_id,
	type,
	minLengthValue = 1,
	maxLengthValue = 255,
	patternValue = /^.*$/,
	patternMessage = "",
}: Props) => {
	const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
	const [sendMessage, setSendMessage] = useState<string>("");
	const [isSendMessage, setIsSendMessage] = useState<boolean>(false);

	const [nameValue, setNameValue] = useState<string>(name);

	const handlerSaveButton = () => {
		const transformedData: Record<string, string> = {
			[type]: nameValue,
		};

		if (nameValue.length < minLengthValue) {
			setSendMessage(
				`Значение должно быть не менее ${minLengthValue} символов.`
			);
			setIsSendMessage(true);
			return;
		}

		if (nameValue.length > maxLengthValue) {
			setSendMessage(
				`Значение должно быть не более ${maxLengthValue} символов.`
			);
			setIsSendMessage(true);
			return;
		}

		if (!patternValue.test(nameValue)) {
			setSendMessage(patternMessage);
			setIsSendMessage(true);
			return;
		}

		mutate(transformedData);
	};

	const { mutate } = useMutation({
		mutationKey: ["updateUser"],
		mutationFn: (data: Record<string, string>) => updatedUserApi(user_id, data),
		onSuccess: () => {
			setIsReadOnly(!isReadOnly);
		},
	});

	const handlerUpdateButton = () => {
		setIsReadOnly(!isReadOnly);
	};

	const handlerCloseButton = () => {
		if (nameValue !== name) {
			setNameValue(name);
		}
		setIsReadOnly(!isReadOnly);
	};

	return (
		<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
			<div className='text-sm font-medium text-gray-500'>{label}</div>
			<div className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center'>
				<input
					className={`bg-transparent border-b-2 border-gray-300 focus:outline-none max-w-64 ${
						isReadOnly
							? "text-gray-500 focus:border-blue-500"
							: "cursor-not-allowed"
					}`}
					value={nameValue}
					onChange={event => setNameValue(event.target.value)}
					readOnly={!isReadOnly}
					minLength={minLengthValue}
					maxLength={maxLengthValue}
					pattern={patternValue.source}
					title={patternMessage}
				/>
				<div className='flex gap-4'>
					{isSendMessage && <MessageError message={sendMessage} />}
					{isReadOnly && (
						<button
							onClick={handlerSaveButton}
							className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-blue-400`}
						>
							Сохранить
						</button>
					)}
					<button
						onClick={isReadOnly ? handlerCloseButton : handlerUpdateButton}
						className={`px-4 py-2 ${
							!isReadOnly ? "bg-blue-500" : "bg-red-500"
						} text-white rounded ${
							!isReadOnly ? "hover:bg-blue-600" : "hover:bg-red-600"
						} focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
							!isReadOnly ? "focus:ring-blue-400 " : "focus:ring-red-400 "
						}`}
					>
						{!isReadOnly ? "Изменить" : "Отменить"}
					</button>
				</div>
			</div>
		</div>
	);
};

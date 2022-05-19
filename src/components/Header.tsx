import React from 'react';
import { checkValidation } from '../helpers/checkVaildation';
import '../scss/components/header.scss';
import contactsStore from '../stores/contactsStore';
import { Button } from './Button';
import { Popup } from './Popup';

export const Header: React.FC = () => {
	const [popupVisible, setPopupVisible] = React.useState(false);
	const [nameValue, setNameValue] = React.useState<string>('');
	const [phoneValue, setPhoneValue] = React.useState<string>('');

	const createContact = () => {
		if (checkValidation(phoneValue, nameValue)) {
			contactsStore.reqCreateContact(nameValue, phoneValue);
			setPopupVisible(false);
		} else {
			alert('Номер телефона или название контакта неверный!');
		}
	};
	return (
		<>
			<header>
				<h3>Контакты</h3>
				<button
					className="green-btn"
					onClick={() => {
						setNameValue('');
						setPhoneValue('');
						setPopupVisible(true);
					}}>
					Добавить
				</button>
			</header>

			{popupVisible && (
				<Popup setPopupVisable={setPopupVisible}>
					<>
						<div>
							<p>Название контакта</p>
							<input
								type="text"
								value={nameValue}
								placeholder="Название контакта"
								onChange={e => {
									setNameValue(e.target.value);
								}}
							/>
						</div>

						<div>
							<p>Мобильный номер</p>
							<input
								type="number"
								placeholder="Номер телефона"
								value={phoneValue}
								onChange={e => {
									setPhoneValue(e.target.value);
								}}
							/>
						</div>

						<div>
							<Button
								onClick={() => {
									setPopupVisible(false);
								}}
								style="red-btn">
								Отмена
							</Button>
							<Button onClick={createContact} style="green-btn">
								Сохранить
							</Button>
						</div>
					</>
				</Popup>
			)}
		</>
	);
};

import React from 'react';
import { checkValidation } from '../helpers/checkVaildation';
import contactsStore from '../stores/contactsStore';
import { ContactTypes } from '../types/ContactTypes';
import { Button } from './Button';
import { Popup } from './Popup';

export const ContactItem: React.FC<ContactTypes> = ({ name, phone, _id }) => {
	const [nameValue, setNameValue] = React.useState(name);
	const [phoneValue, setPhoneValue] = React.useState(phone);
	const [popupVisable, setPopupVisable] = React.useState(false);
	const [popupType, setPopupType] = React.useState('refactor');

	const deleteContact = () => {
		setPopupVisable(false);
		contactsStore.reqDeleteContact(_id);
	};

	const refactorContact = () => {
		if (checkValidation(phoneValue, nameValue)) {
			contactsStore.reqRefactorContact(_id, nameValue, phoneValue);
			setPopupVisable(false);
		} else {
			alert('Номер телефона или название контакта неверный!');
		}
	};

	return (
		<>
			<div className="contactItem">
				<h3>{name}</h3>
				<p>{phone}</p>

				<div className="contactItem__btn">
					<Button
						style="green-btn"
						onClick={() => {
							setPopupType('refactor');
							setPopupVisable(true);
						}}>
						Редактировать
					</Button>
					<Button
						style="red-btn"
						onClick={() => {
							setPopupType('del');
							setPopupVisable(true);
						}}>
						Удалить
					</Button>
				</div>
			</div>

			{popupVisable && (
				<Popup setPopupVisable={setPopupVisable}>
					{popupType === 'refactor' ? (
						<>
							<div>
								<p>Название контакта</p>
								<input
									type="text"
									value={nameValue}
									onChange={e => {
										setNameValue(e.target.value);
									}}
								/>
							</div>

							<div>
								<p>Мобильный телефон</p>
								<input
									type="text"
									value={phoneValue}
									onChange={e => {
										setPhoneValue(e.target.value);
									}}
								/>
							</div>

							<div>
								<Button
									onClick={() => setPopupVisable(false)}
									style="red-btn">
									Отмена
								</Button>
								<Button
									onClick={refactorContact}
									style="green-btn">
									Сохранить
								</Button>
							</div>
						</>
					) : (
						<>
							<h3>Удалить контакт {name}?</h3>
							<div>
								<Button
									onClick={() => setPopupVisable(false)}
									style="green-btn">
									Отмена
								</Button>
								<Button onClick={deleteContact} style="red-btn">
									Удалить
								</Button>
							</div>
						</>
					)}
				</Popup>
			)}
		</>
	);
};

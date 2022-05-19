import React from 'react';
import { ContactTypes } from '../types/ContactTypes';
import { ContactItem } from './ContactItem';
import '../scss/components/contacts.scss';
import { observer } from 'mobx-react-lite';
import contactsStore from '../stores/contactsStore';

export const Сontacts: React.FC = observer(() => {
	// const [contacts, setContacts] = React.useState<ContactTypes[]>([]);
	React.useEffect(() => {
		contactsStore.fetchContacts();
	}, []);

	return (
		<div className="container">
			<div className="contacts">
				{contactsStore.contacts.length > 0 ? (
					<>
						{contactsStore.contacts.map((el, index) => (
							<ContactItem
								_id={el._id}
								name={el.name}
								phone={el.phone}
								createdAt={el.createdAt}
								key={`${el.name}_${index}`}
							/>
						))}
					</>
				) : (
					<h2>Создайте свой первый контакт</h2>
				)}
			</div>
		</div>
	);
});

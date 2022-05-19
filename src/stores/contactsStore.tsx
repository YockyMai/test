import axios, { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { ContactTypes } from '../types/ContactTypes';

class contactsStore {
	contacts: ContactTypes[] = [];
	constructor() {
		makeAutoObservable(this);
	}

	fetchContacts() {
		axios
			.get('http://localhost:5000/contacts')
			.then((contacts: AxiosResponse) => {
				this.setContacts(contacts.data.contacts);
				console.log(contacts.data.contacts);
			});
	}

	sortContacts() {
		this.contacts.sort((a, b) => {
			if (a.createdAt && b.createdAt) {
				if (a.createdAt < b.createdAt) return 1;
				else return -1;
			} else return 0;
		});
	}

	setContacts(contacts: ContactTypes[]) {
		this.contacts = contacts;
		this.sortContacts();
	}

	reqDeleteContact(_id: string) {
		axios
			.delete(`http://localhost:5000/contacts/${_id}`)
			.then((res: AxiosResponse) => {
				const _id = res.data.deletedContact._id;
				this.deleteContact(_id);
			})
			.catch((err: AxiosError) => {
				alert('Что то пошло не так, попробуйте позже!');
			});
	}

	reqCreateContact(name: string, phone: string) {
		axios
			.post('http://localhost:5000/contacts/', {
				name,
				phone,
			})
			.then((res: AxiosResponse) => {
				const { name, phone, _id, createdAt } = res.data.contact;
				this.createContact(name, phone, _id, createdAt);
			})
			.catch(err => {
				alert('Похоже, номер телефона записан в неправильном формате');
			});

		this.sortContacts();
	}

	reqRefactorContact(_id: string, name: string, phone: string) {
		axios
			.post('http://localhost:5000/contacts/refactor', {
				_id,
				name,
				phone,
			})
			.then((res: AxiosResponse) => {
				this.refactorContact(_id, name, phone);
			})
			.catch(err => alert('Неверные данные!'));
	}

	deleteContact(_id: string) {
		this.contacts = this.contacts.filter(contact => contact._id !== _id);
		this.sortContacts();
	}

	createContact(name: string, phone: string, _id: string, createdAt: string) {
		this.contacts.push({
			name,
			phone,
			_id,
			createdAt,
		});
		this.sortContacts();
	}

	refactorContact(_id: string, name: string, phone: string) {
		const arrayId = this.contacts.map(el => el._id);
		const id = arrayId.indexOf(_id);
		this.contacts[id].name = name;
		this.contacts[id].phone = phone;

		this.sortContacts();
	}
}

export default new contactsStore();

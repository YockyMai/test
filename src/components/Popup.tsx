import React from 'react';
import { Button } from './Button';
import '../scss/components/popup.scss';

interface IPopup {
	setPopupVisable: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const Popup: React.FC<IPopup> = ({ setPopupVisable, children }) => {
	return (
		<div
			className="popup"
			onClick={e => {
				setPopupVisable(false);
			}}>
			<div
				onClick={e => {
					e.stopPropagation();
				}}
				className="popup-content">
				{children}
			</div>
		</div>
	);
};

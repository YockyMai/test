import React from 'react';

interface IButton {
	children: string;
	style?: string;
	onClick?: () => void;
}

export const Button: React.FC<IButton> = ({ children, onClick, style }) => {
	return (
		<button
			className={style}
			onClick={() => {
				onClick && onClick();
			}}>
			{children}
		</button>
	);
};

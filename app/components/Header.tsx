'use client';
import { Avatar } from '@radix-ui/themes';
import { LoginButton } from '@telegram-auth/react';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HOME, PROFILE } from '../constants/routes';
import useUser from '../hooks/useUser';

interface ITelegramData {
	auth_date: number;
	first_name: string;
	hash: string;
	id: number;
	photo_url: string;
	username: string;
}

const Header: React.FC = () => {
	const [id, setId] = useState(null);
	const { data: user } = useUser(id);
	console.log('user', user);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTelegramLogin = async (data: ITelegramData) => {
		const response = await fetch('http://localhost:3001/api/user/signup', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json',
			},
		});
		const res = await response.json();
		console.log(res);
		console.log(jwtDecode(res.token));
		localStorage.setItem('token', res.token);
		setId(res?.id);
	};

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token) {
			const decoded = jwtDecode(token);
			console.log(decoded);
			setId(decoded?.id);
		}
	}, []);

	return (
		<div className="flex justify-between items-center px-28 pt-4 bg-[linear-gradient(180deg,_#161d28,_rgba(22,_29,_40,_.95)_15%,_rgba(22,_29,_40,_0))] container mx-auto">
			<Link href={HOME} className="text-lg font-bold">
				TG MINI APP
			</Link>
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-1">
					<span className="text-sm">33.52$</span>
				</div>
				<div className="text-sm bg-red-600 px-2 py-1 rounded">1231230$</div>
				{user && user.user?.PhotoUrl ? (
					<Link href={PROFILE}>
						<Avatar src={user.user?.PhotoUrl} fallback="A" radius="full" />
					</Link>
				) : (
					<LoginButton
						botUsername="testminiappasdasdas12312312bot"
						onAuthCallback={handleTelegramLogin}
						buttonSize="medium"
						cornerRadius={5}
						showAvatar={false}
						lang="en"
					/>
				)}
			</div>
		</div>
	);
};

export default Header;

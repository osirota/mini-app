'use client';

import React, { useState } from 'react';

const Profile: React.FC = () => {
	// Локальное состояние для личной информации и баланса
	const [userInfo, setUserInfo] = useState({
		name: 'John Doe',
		email: 'john.doe@example.com',
		balance: 100.0,
		avatarUrl: '/default-avatar.png',
	});

	const [depositAmount, setDepositAmount] = useState<number>(0);
	const [newName, setNewName] = useState<string>(userInfo.name);
	const [newEmail, setNewEmail] = useState<string>(userInfo.email);

	// Функция пополнения баланса
	const handleDeposit = () => {
		if (depositAmount > 0) {
			setUserInfo({
				...userInfo,
				balance: userInfo.balance + depositAmount,
			});
			setDepositAmount(0); // Сброс суммы пополнения
		}
	};

	// Функция обновления личной информации
	const handleUpdateProfile = () => {
		setUserInfo({
			...userInfo,
			name: newName,
			email: newEmail,
		});
	};

	return (
		<div className="text-white flex flex-col">
			<main className="flex-1 py-8">
				<div className="bg-gray-800 p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-4">Личный профиль</h2>

					{/* Секция с информацией о пользователе */}
					<div className="flex space-x-6 mb-6">
						<img
							src={userInfo.avatarUrl}
							alt="Avatar"
							className="w-32 h-32 rounded-full"
						/>
						<div className="flex flex-col space-y-2">
							<p>
								<strong>Имя:</strong> {userInfo.name}
							</p>
							<p>
								<strong>Email:</strong> {userInfo.email}
							</p>
							<p>
								<strong>Баланс:</strong> {userInfo.balance.toFixed(2)}$
							</p>
						</div>
					</div>

					{/* Секция с пополнением баланса */}
					<div className="bg-gray-700 p-4 rounded-lg mb-6">
						<h3 className="text-xl font-semibold mb-4">Пополнить баланс</h3>
						<div className="flex space-x-4">
							<input
								type="number"
								value={depositAmount}
								onChange={(e) => setDepositAmount(Number(e.target.value))}
								className="w-full p-2 rounded bg-gray-600 text-white"
								placeholder="Введите сумму"
							/>
							<button
								onClick={handleDeposit}
								className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
							>
								Пополнить
							</button>
						</div>
					</div>

					{/* Форма обновления личной информации */}
					<div className="bg-gray-700 p-4 rounded-lg">
						<h3 className="text-xl font-semibold mb-4">Обновить информацию</h3>
						<div className="flex flex-col space-y-4">
							<div>
								<label className="block text-sm font-semibold mb-2">Имя</label>
								<input
									type="text"
									value={newName}
									onChange={(e) => setNewName(e.target.value)}
									className="w-full p-2 rounded bg-gray-600 text-white"
									placeholder="Введите новое имя"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold mb-2">
									Email
								</label>
								<input
									type="email"
									value={newEmail}
									onChange={(e) => setNewEmail(e.target.value)}
									className="w-full p-2 rounded bg-gray-600 text-white"
									placeholder="Введите новый email"
								/>
							</div>
							<button
								onClick={handleUpdateProfile}
								className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
							>
								Обновить информацию
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Profile;

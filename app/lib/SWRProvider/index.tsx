'use client';
import { SWRConfig } from 'swr';

interface IProp {
	children: React.ReactNode;
}

export const SWRProvider = ({ children }: IProp) => {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
				revalidateOnFocus: false,
			}}
		>
			{children}
		</SWRConfig>
	);
};

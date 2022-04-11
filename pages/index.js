import Head from 'next/head';
import Image from 'next/image';
import Counter from '../src/Counter';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>make number go up</title>
				<meta name='description' content='make number go up' />
			</Head>

			<main className={styles.main}>
				<Counter></Counter>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}

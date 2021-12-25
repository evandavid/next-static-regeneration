import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { createClient } from 'contentful';
import Link from 'next/link';
import format from 'date-fns/format';

import styles from '../styles/Home.module.css';

const Home: NextPage = ({ blogs }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">My Blog!</a>
        </h1>

        <div className={styles.grid}>
          {blogs.map((blog: any) => (
            <Link key={blog.fields.slug} passHref href={`/post/${blog.fields.slug}`}>
              <a className={styles.card}>
                <h2>{blog.fields.title} &rarr;</h2>
                <p>{blog.fields.subtitle}</p>
                <p className={styles.time}>{format(new Date(blog.fields.createdAt), 'PPPP')}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const res = await client.getEntries({ content_type: 'first-blog-post' });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 1,
  };
}

export default Home;

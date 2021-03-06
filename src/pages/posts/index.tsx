import { GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import { RichText } from 'prismic-dom';

type Post ={
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostProps{
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.post}>
          { posts.map((post: Post) => (
            <a key={post.slug} href="">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          )) }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();
  
  const response = await prismic.getByType(
    'publication',{
      fetch: ['publication.title','publication.content'],
      pageSize: 100,
    }
  );
  console.log(JSON.stringify(response, null, 2));
  
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content:any) => 
        content.type === 'paragraph'
      )?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',{
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      )
    }
  })

  return {
    props: {posts}
  }


}
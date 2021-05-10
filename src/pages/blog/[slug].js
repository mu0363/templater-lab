import { blogPosts } from 'src/lib/data';

export default function BlogPage() {
  return <div>Enter</div>;
}

export const getStaticProps = async (ctx) => {
  console.log(ctx);

  return {
    props: {
      data: null,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((item) => ({
      params: {
        slug: item.slug,
      },
    })),
    fallback: false,
  };
}

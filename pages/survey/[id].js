import Head from "next/head";

function Survey({ data }) {
  return data.id % 2 ? (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="title" content={data.title} />
        <meta property="description" content={data.body} />
        <meta property="og:description" content={data.body} />
        <meta property="og:title" content={data.title} />
      </Head>
      <div id="typeform" style={{ width: "100vw", height: "100vh" }}>
        <iframe
          id="typeform-full"
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          src="https://convosight.typeform.com/to/FruhO4Up"
        ></iframe>
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="title" content={data.title} />
        <meta property="description" content={data.body} />
        <meta property="og:description" content={data.body} />
        <meta property="og:title" content={data.title} />
      </Head>
      <div id="typeform" style={{ width: "100vw", height: "100vh" }}>
        <iframe
          id="typeform-full"
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          src="https://convosight.typeform.com/to/c7rz2iyB"
        ></iframe>
      </div>
    </>
  );
}

export default Survey;

export async function getStaticPaths() {
  // Get the all the ID from the getStaticPaths
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  // Get the paths we want to pre-render based on posts
  const paths = data
    .map((post) => {
      if (post.id < 10) {
        return {
          params: { id: `${post.id}` },
        };
      }
    })
    .splice(0, 9);
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  // Get the data from the API
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

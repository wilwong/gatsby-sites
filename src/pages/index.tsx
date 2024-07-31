import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";


import { BlogRoll, Layout } from "../components";


export const Head: HeadFC = () => {
  return(
    <>
      <html lang="en" />
      <title>Gatsby Blog</title>
      <meta
        name="description"
        content="Blog posts including tutorials, press releases, etc."
      />
    </>
  );
};

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const allPosts = data.allMdx.nodes;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="mb-1 md:mb-2">Learn</h1>
          <p className="text-[18px] font-semibold leading-6 opacity-80">
            Tutorials, tips and tricks on how to create better content.
          </p>
        </div>
        {allPosts ? (
          <BlogRoll posts={data.allMdx.nodes} />
        ) : (
          <p>Failed loading blog posts</p>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query IndexPage {
    allMdx {
      nodes {
        id
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
        }
        internal {
          contentFilePath
        }
      }
    }
  }
`;
export default IndexPage;


import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql, Link, withPrefix } from "gatsby";
import type { HeadProps, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Layout } from "./Layouts";

const shortcodes = { Link }; // Provide common components here
export const Head = ({data}:HeadProps<Queries.PostTemplateQuery>) => {
  return(
    <>
      <html lang="en" />
      <title>Blog Post</title>
      <meta name="description" content="blog post metatext" />
    </>
  );
};

export default function PostTemplate({
  data,
  children,
}: PageProps<Queries.PostTemplateQuery>) {
  const post = data.mdx;
  const featuredImage =
    post?.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData &&
    getImage(post.frontmatter.featuredImage.childImageSharp.gatsbyImageData);

  return (
    <Layout>
      <Link
        to={withPrefix("/")}
        className="text-md flex w-fit items-center gap-1.5 font-semibold opacity-80 hover:underline"
      >
        Back to Blog
      </Link>
      <h1 className="mb-6 mt-6">
        {post?.frontmatter?.title}
      </h1>

      <div className="h-[200px] w-full overflow-hidden rounded-lg bg-panel/10 sm:h-[300px] md:h-[400px] lg:h-[500px]">
        {featuredImage && (
          <GatsbyImage
            alt={`${post.frontmatter.title} featured image`}
            image={featuredImage}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="mt-8 flex gap-28 lg:mt-10">
        <div className="mdx-styles group mb-20 grow">
          <MDXProvider
            components={shortcodes}
          >
            {children}
          </MDXProvider>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PostTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

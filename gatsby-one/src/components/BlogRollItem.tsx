import React from "react";
import { Link, withPrefix } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
export const BlogRollItem = ({postFrontmatter: pfm}:{postFrontmatter: any})=> {
  const featuredImage =
    pfm.featuredImage?.childImageSharp?.gatsbyImageData &&
      getImage(pfm.featuredImage.childImageSharp.gatsbyImageData);

  const slug = withPrefix(pfm.slug);
  
  return (
    <li className="group">
      <Link to={slug} title={pfm.title}>
        <div className="h-32 overflow-hidden rounded-lg bg-panel/5 sm:h-52">
          {featuredImage && (
            <GatsbyImage
              alt={`${pfm.title} featured image`}
              image={featuredImage}
              className="h-full w-full object-cover transition-all duration-[400ms] group-hover:scale-110"
            />
          )}
        </div>
        <div className="mt-3 flex flex-col">
          <h4 className="my-0 text-[16px] transition-all group-hover:text-link md:text-[18px]">
            {pfm.title}
          </h4>
        </div>
      </Link>
    </li>
  );
}
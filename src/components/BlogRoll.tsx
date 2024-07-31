import React from "react";
import { BlogRollItem } from "./BlogRollItem";

export function BlogRoll({
  posts,
}: {
  posts: Queries.IndexPageQuery["allMdx"]["nodes"];
}) {
  if (posts.length > 0) {
    return (
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
        {posts.map((post) => {
          return <BlogRollItem key={post.id} postFrontmatter={post.frontmatter}/>
          
        })}
      </ul>
    );
  }
  return <p>There are no Posts!</p>;
}
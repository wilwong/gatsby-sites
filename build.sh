#!/bin/bash
# NB: This file is executed by Netlify to build fakeyou.com

set -euxo pipefail

# function replace_commit_ref {
#   # Add the GIT SHA to the build
#   # This must be done before everything else, or it will get cached with the build.
#   # (This might be making the builds less performant?)
#   # COMMIT_REF is defined by Netlify to be the commit SHA
#   # We want a short 8 character reference.
#   SHORT_SHA=$(echo "${COMMIT_REF}" | cut -c1-8)
#   find . -type f -exec sed -i "s/CURRENT_STORYTELLER_VERSION/${SHORT_SHA}/g" {} +
#   # The above command won't work with Mac's version of find/sed. The following is a Mac-friendly version:
#   # find . -type f -exec sed -i '' -e "s/CURRENT_STORYTELLER_VERSION/${SHORT_SHA}/g" {} + 
# }


function build_blog {
  pushd gatsby-one
  yarn install 
  yarn build
  popd
}

echo "Current working directory:"
pwd

# echo "Labelling build with short SHA..."
# replace_commit_ref

echo "Building blog..."
build_blog

echo "Create final output directory..."
mkdir -p deploy/blog

echo "Copying blog artifacts..."
cp -r gatsby-one/public/* deploy/blog/


echo "Copying redirects configuration to Netlify build dir..."
cp netlify_configs/_redirects deploy

echo "List files in deploy directory"
find deploy
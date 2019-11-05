/* eslint-disable no-console */
const EmojiStrip = require('emoji-strip')

// We don't want to publish certain posts
const restrictedPosts = [
  'node-js-databases-using-redis-for-fun-and-profit-af61f9d0e49f', // Content is too long for Contentful
  'node-js-databases-using-couchdb-5135f6f45dc1' // Content is too long for Contentful
]

module.exports = (posts, { cmsBlogPosts, requiredFields }) => {
  const cmsPostSlugs = cmsBlogPosts.map(({ fields }) => fields.slug['en-US'])

  const incompletePosts = cmsBlogPosts
    .filter(({ fields }) => !requiredFields.every(field => fields[field]))
    .map(p => EmojiStrip(p.fields.slug['en-US']))

  const newPosts = posts.filter(({ slug }) => !cmsPostSlugs.includes(slug))

  const postsToUpdate = posts.filter(
    ({ slug }) =>
      incompletePosts.includes(slug) && !restrictedPosts.includes(slug)
  )

  const result = postsToUpdate.concat(newPosts)

  if (newPosts.length && newPosts.length > 0) {
    console.info(`New Posts: ${newPosts.map(({ title }) => title)}`)
  } else {
    console.info(`No new posts to publish`)
  }

  if (postsToUpdate.length && postsToUpdate.length > 0) {
    console.info(
      `Posts to update: ${postsToUpdate.map(({ title }) => `\n${title}`)}`
    )
  } else {
    console.info(`No posts to update`)
  }

  return result
}

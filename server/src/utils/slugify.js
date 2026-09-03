const slugifyString = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

const makeUniqueSlug = async (Model, baseText, currentId = null) => {
  let baseSlug = slugifyString(baseText);
  if (!baseSlug) baseSlug = 'item';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Model.findOne({ where: { slug } });
    if (!existing || (currentId && existing.id === currentId)) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

module.exports = { slugifyString, makeUniqueSlug };

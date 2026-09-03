const { Op } = require('sequelize');
const { Destination, TourPackage, Experience, Article } = require('../models');
const { sendSuccess } = require('../utils/apiResponse');

// @desc    Universal search across destinations, tours, experiences, and journal
// @route   GET /api/search?q=
// @access  Public
const searchAll = async (req, res, next) => {
  try {
    const q = req.query.q ? req.query.q.trim() : '';

    if (!q) {
      return sendSuccess(res, {
        tours: [],
        destinations: [],
        experiences: [],
        articles: []
      });
    }

    const likeQuery = `%${q}%`;

    const [tours, destinations, experiences, articles] = await Promise.all([
      TourPackage.findAll({
        where: {
          status: 'published',
          [Op.or]: [
            { title: { [Op.like]: likeQuery } },
            { location: { [Op.like]: likeQuery } },
            { shortDescription: { [Op.like]: likeQuery } }
          ]
        },
        attributes: ['id', 'title', 'slug', 'category', 'duration', 'price', 'coverImage', 'rating'],
        limit: 8
      }),
      Destination.findAll({
        where: {
          status: 'published',
          [Op.or]: [
            { name: { [Op.like]: likeQuery } },
            { country: { [Op.like]: likeQuery } },
            { region: { [Op.like]: likeQuery } }
          ]
        },
        attributes: ['id', 'name', 'slug', 'country', 'region', 'thumbnail', 'shortDescription'],
        limit: 6
      }),
      Experience.findAll({
        where: {
          status: 'published',
          [Op.or]: [
            { name: { [Op.like]: likeQuery } },
            { category: { [Op.like]: likeQuery } },
            { description: { [Op.like]: likeQuery } }
          ]
        },
        attributes: ['id', 'name', 'slug', 'category', 'thumbnail', 'description'],
        limit: 6
      }),
      Article.findAll({
        where: {
          status: 'published',
          [Op.or]: [
            { title: { [Op.like]: likeQuery } },
            { excerpt: { [Op.like]: likeQuery } },
            { category: { [Op.like]: likeQuery } }
          ]
        },
        attributes: ['id', 'title', 'slug', 'category', 'coverImage', 'publishedAt'],
        limit: 6
      })
    ]);

    return sendSuccess(res, {
      query: q,
      results: {
        tours,
        destinations,
        experiences,
        articles
      },
      totalMatches: tours.length + destinations.length + experiences.length + articles.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchAll };

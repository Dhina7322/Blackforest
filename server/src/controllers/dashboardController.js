const { Enquiry, TourPackage, Destination, Experience, Article, Testimonial, AuditLog, User } = require('../models');
const { sendSuccess } = require('../utils/apiResponse');

// @desc    Get dashboard metrics and charts data
// @route   GET /api/dashboard/stats
// @access  Private (Admin/Superadmin/Editor)
const getStats = async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      activeTours,
      totalDestinations,
      totalExperiences,
      totalArticles,
      totalTestimonials
    ] = await Promise.all([
      Enquiry.count(),
      Enquiry.count({ where: { status: 'new' } }),
      TourPackage.count({ where: { status: 'published' } }),
      Destination.count({ where: { status: 'published' } }),
      Experience.count({ where: { status: 'published' } }),
      Article.count({ where: { status: 'published' } }),
      Testimonial.count({ where: { status: 'published' } })
    ]);

    // Status breakdown for enquiries
    const statusCounts = await Enquiry.findAll({
      attributes: [
        'status',
        [Enquiry.sequelize.fn('COUNT', Enquiry.sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    const statusMap = {
      new: 0,
      contacted: 0,
      in_progress: 0,
      qualified: 0,
      converted: 0,
      closed: 0,
      spam: 0
    };

    statusCounts.forEach(item => {
      const s = item.get('status');
      const c = parseInt(item.get('count'), 10);
      if (statusMap[s] !== undefined) statusMap[s] = c;
    });

    // Recent 6 enquiries
    const recentEnquiries = await Enquiry.findAll({
      limit: 6,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name']
        }
      ]
    });

    // Popular categories/regions distribution
    const tourCategories = await TourPackage.findAll({
      attributes: [
        'category',
        [TourPackage.sequelize.fn('COUNT', TourPackage.sequelize.col('id')), 'count']
      ],
      group: ['category']
    });

    return sendSuccess(res, {
      counters: {
        totalEnquiries,
        newEnquiries,
        activeTours,
        totalDestinations,
        totalExperiences,
        totalArticles,
        totalTestimonials
      },
      enquiryStatusChart: statusMap,
      tourCategories,
      recentEnquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get audit logs
// @route   GET /api/dashboard/audit-logs
// @access  Private (Superadmin)
const getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const { rows: logs, count: total } = await AuditLog.findAndCountAll({
      limit: parseInt(limit, 10),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'role']
        }
      ]
    });

    return sendSuccess(res, {
      logs,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getAuditLogs
};

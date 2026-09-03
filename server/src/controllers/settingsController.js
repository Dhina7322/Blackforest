const { Settings } = require('../models');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { logAudit } = require('../services/auditService');

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return sendSuccess(res, settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin/Superadmin)
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    const {
      siteName,
      logo,
      darkLogo,
      favicon,
      phone,
      email,
      whatsapp,
      address,
      socialLinks,
      footerText,
      copyright,
      googleMapsUrl,
      analyticsId,
      facebookPixelId,
      defaultSeoTitle,
      defaultSeoDescription
    } = req.body;

    if (siteName !== undefined) settings.siteName = siteName;
    if (logo !== undefined) settings.logo = logo;
    if (darkLogo !== undefined) settings.darkLogo = darkLogo;
    if (favicon !== undefined) settings.favicon = favicon;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (whatsapp !== undefined) settings.whatsapp = whatsapp;
    if (address !== undefined) settings.address = address;
    if (socialLinks !== undefined) settings.socialLinks = socialLinks;
    if (footerText !== undefined) settings.footerText = footerText;
    if (copyright !== undefined) settings.copyright = copyright;
    if (googleMapsUrl !== undefined) settings.googleMapsUrl = googleMapsUrl;
    if (analyticsId !== undefined) settings.analyticsId = analyticsId;
    if (facebookPixelId !== undefined) settings.facebookPixelId = facebookPixelId;
    if (defaultSeoTitle !== undefined) settings.defaultSeoTitle = defaultSeoTitle;
    if (defaultSeoDescription !== undefined) settings.defaultSeoDescription = defaultSeoDescription;

    await settings.save();

    await logAudit({
      userId: req.user?.id,
      action: 'UPDATE_SETTINGS',
      entity: 'Settings',
      entityId: settings.id,
      ip: req.ip
    });

    return sendSuccess(res, settings, 'Website settings updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};

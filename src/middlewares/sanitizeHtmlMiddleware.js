import * as cheerio from 'cheerio';

export function sanitizeHtmlMiddleware(req, res, next) {
  const htmlContent = req.body.description;

  if (!htmlContent) {
    return res.status(400).json({ error: "Поле 'description' обов'язкове" });
  }

  // Завантаження HTML у режимі фрагменту
  const $ = cheerio.load(htmlContent, {
    xmlMode: false,
  });

  // Видаляємо небезпечні теги
  $('script, iframe, style, link, meta').remove();

  // Видаляємо небезпечні атрибути
  $('[onload], [onclick], [onmouseover], [onerror]').each((_, element) => {
    $(element).removeAttr('onload');
    $(element).removeAttr('onclick');
    $(element).removeAttr('onmouseover');
    $(element).removeAttr('onerror');
  });

  // Повертаємо очищений HTML без зайвих тегів
  req.body.description = $('body').length ? $('body').html() : $.html();

  next();
}

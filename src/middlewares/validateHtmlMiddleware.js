import { Parser } from 'htmlparser2';

export function validateHtmlMiddleware(req, res, next) {
  const htmlContent = req.body.description;

  if (!htmlContent) {
    return res.status(400).json({ error: "Поле 'description' обов'язкове" });
  }

  let hasTags = false; // Прапорець для перевірки наявності HTML-тегів
  let isValid = true;

  const parser = new Parser(
    {
      onopentag() {
        hasTags = true; // Знайдено відкритий тег
      },
      onerror(error) {
        console.error('HTML Validation Error:', error.message);
        isValid = false;
      },
    },
    { decodeEntities: true }
  );

  try {
    parser.write(htmlContent);
    parser.end();
  } catch (error) {
    console.error('Critical Parsing Error:', error.message);
    isValid = false;
  }

  if (!isValid || !hasTags) {
    return res
      .status(400)
      .json({ error: "Невалідна або неповна HTML-розмітка в 'description'" });
  }

  next();
}

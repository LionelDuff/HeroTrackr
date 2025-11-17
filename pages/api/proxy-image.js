// /pages/api/proxy-image.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ result: false, error: "Image URL is required" });
  }

  // On sécurise un minimum : on n'autorise que les images venant de superherodb.com
  try {
    const decodedUrl = decodeURIComponent(url);
    const allowedHost = "www.superherodb.com";

    const { hostname } = new URL(decodedUrl);
    if (hostname !== allowedHost) {
      return res
        .status(400)
        .json({ result: false, error: "Forbidden image host" });
    }

    const response = await fetch(decodedUrl);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ result: false, error: "Error fetching image" });
    }

    const arrayBuffer = await response.arrayBuffer();

    // On passe le bon Content-Type (image/jpeg, image/png, ...)
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "image/jpeg"
    );
    // Un peu de cache pour éviter de tout re-télécharger à chaque fois
    res.setHeader("Cache-Control", "public, max-age=86400");

    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Error in proxy-image:", error);
    res.status(500).json({ result: false, error: "Internal server error" });
  }
}

// /pages/api/proxy-image.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ result: false, step: "no-url", error: "Image URL is required" });
  }

  try {
    const decodedUrl = Array.isArray(url) ? url[0] : url;
    console.log("proxy-image | decodedUrl:", decodedUrl);

    let parsed;
    try {
      parsed = new URL(decodedUrl);
    } catch (e) {
      console.error("proxy-image | invalid URL:", decodedUrl);
      return res.status(400).json({
        result: false,
        step: "invalid-url",
        error: "Invalid image URL",
        debug: decodedUrl,
      });
    }

    const hostname = parsed.hostname;
    console.log("proxy-image | hostname:", hostname);

    // 💡 Pour le debug, on enlève la restriction d'host
    // (tu pourras la remettre plus tard si besoin)

    const upstream = await fetch(decodedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://www.superherodb.com/",
      },
    });

    console.log(
      "proxy-image | upstream status:",
      upstream.status,
      upstream.statusText
    );

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error(
        "proxy-image | upstream error body (truncated):",
        text.slice(0, 200)
      );
      // On renvoie 502 pour bien marquer que c'est un problème "en amont"
      return res.status(502).json({
        result: false,
        step: "upstream-fetch",
        upstreamStatus: upstream.status,
        upstreamStatusText: upstream.statusText,
      });
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("content-type") || "image/jpeg";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");

    return res.status(200).end(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("proxy-image | internal error:", error);
    return res.status(500).json({
      result: false,
      step: "catch",
      error: "Internal server error",
    });
  }
}

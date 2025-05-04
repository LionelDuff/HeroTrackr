export default async function handler(req, res) {
  const { id } = req.query;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    return res
      .status(500)
      .json({ result: false, error: "The token is missing" });
  }

  try {
    const response = await fetch(
      `https://superheroapi.com/api/${ACCESS_TOKEN}/${id}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ result: false, error: "Error with Superhero API" });
    }

    const data = await response.json();
    res.status(200).json({ result: true, data: data });
  } catch (error) {
    res.status(500).json({ result: false, error: "Internal server error" });
  }
}

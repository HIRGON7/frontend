export default async function handler(req, res) {
  try {
    const phpResponse = await fetch("https://medguidex.rf.gd/get_symptoms.php", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 MedGuide-Vercel-API"
      }
    });

    const text = await phpResponse.text();

    try {
      const data = JSON.parse(text);

      res.status(200).json(data);
    } catch (error) {
      res.status(502).json({
        success: false,
        message: "InfinityFree did not return JSON. It returned HTML/text instead.",
        preview: text.slice(0, 500)
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vercel API could not reach InfinityFree.",
      error: error.message
    });
  }
}

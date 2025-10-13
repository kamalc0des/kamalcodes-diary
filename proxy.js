import express from "express";
import fetch from "node-fetch";
import sizeOf from "image-size";

const app = express();

app.get("/random-anime", async (req, res) => {
  try {
    const apis = [
      { base: "https://nekos.best/api/v2/", type: "nekos" },
      { base: "https://api.waifu.pics/sfw/", type: "waifu" },
      { base: "https://api.otakugifs.xyz/gif?reaction=", type: "otaku" },
      { base: "https://purrbot.site/api/img/sfw/", type: "purr" },
    ];

    const randomApi = apis[Math.floor(Math.random() * apis.length)];

    const categories = ["smile", "wave", "happy", "dance", "wink", "hug"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const desiredFormat = req.query.format || "any";

    let validImage = null;
    let tries = 0;

    while (!validImage && tries < 5) {
      const response = await fetch(`${randomApi.base}${randomCategory}`);
      const data = await response.json();

      let imgUrl = null;

      // Adaptation selon l’API
      switch (randomApi.type) {
        case "nekos":
          imgUrl = data.results?.[0]?.url;
          break;
        case "waifu":
          imgUrl = data.url;
          break;
        case "otaku":
          imgUrl = data.url;
          break;
        case "purr":
          imgUrl = data.link || data.image || data.url;
          break;
      }

      // Si aucune URL trouvée, on retente
      if (!imgUrl) {
        tries++;
        continue;
      }

      try {
        const buffer = Buffer.from(await fetch(imgUrl).then((r) => r.arrayBuffer()));
        const { width, height } = sizeOf(buffer);

        if (desiredFormat === "landscape" && width > height) validImage = imgUrl;
        else if (desiredFormat === "portrait" && height > width) validImage = imgUrl;
        else if (desiredFormat === "any") validImage = imgUrl;
      } catch {
        // Si image illisible → on réessaie
      }

      tries++;
    }

    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    });

    if (validImage) res.redirect(`${validImage}?r=${Date.now()}`);
    else res.redirect("https://i.waifu.pics/5WvRr3K.gif");
  } catch (error) {
    console.error("❌ Error:", error);
    res.redirect("https://i.waifu.pics/5WvRr3K.gif");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Anime image proxy running → http://localhost:${PORT}/random-anime`);
});
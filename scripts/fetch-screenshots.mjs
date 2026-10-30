import fs from "fs";
import path from "path";

const portfolioItems = [
  { id: "almadenah-water", url: "https://almadenahwater.com/" },
  { id: "ohod-water", url: "https://www.ohodwater.com/" },
  { id: "farabi-clinics", url: "https://farabiclinics.com/ar" },
  { id: "al-tayyar-law", url: "https://al-tayyarlaw.com/" },
  { id: "lawyer-ali-dahim", url: "https://lawyeralidahim.com/" },
  { id: "darzaid", url: "https://darzaid-sa.com/" },
  { id: "teeshirtate", url: "https://www.teeshirtate.com/" },
  { id: "adraj-shop", url: "https://adrajshop.com/" },
  { id: "amthle", url: "https://amthle.com/" },
  { id: "ceilings-art", url: "https://www.ceilingsart.sa/" },
  { id: "safelines", url: "https://www.safelinescc.sa/" },
  { id: "dgrcon", url: "https://dgrcon.com/" },
  { id: "landmarks", url: "https://landmarksco.com/" },
  { id: "khotot-alengaz", url: "https://www.khototalengaz.com/ar" },
  { id: "lamset-emart", url: "https://www.lamsetemart.com/" },
  { id: "servix-saudi", url: "https://www.servixsaudi.com/" },
  { id: "nilofar-talent", url: "https://www.nilofartalent.com/" },
  { id: "wiswis-trading", url: "https://www.wiswistrading.com/" },
  { id: "mibda", url: "https://www.mibda.com/" },
  { id: "almohtaref", url: "https://almohtaref-sa.com/" },
  { id: "saleh-alazhari", url: "https://www.salehalazhari.com/" },
  { id: "alferoz-cleaning", url: "https://alferoz-cleaning.vercel.app/" },
  { id: "efalcon", url: "https://efalcon.vercel.app/" },
  { id: "rewa", url: "https://rewa-phi.vercel.app/" },
];

const outDir = path.resolve("public/portfolio");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadOne(item) {
  const filePath = path.join(outDir, `${item.id}.jpg`);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 5000) {
    console.log(`Already exists: ${item.id}`);
    return;
  }

  const thumUrl = `https://image.thum.io/get/width/700/crop/850/${item.url}`;
  console.log(`Downloading: ${item.id} -> ${item.url}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(thumUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length > 5000) {
        fs.writeFileSync(filePath, buffer);
        console.log(`✓ Saved ${item.id}.jpg (${(buffer.length / 1024).toFixed(1)} KB)`);
        return;
      }
    }
    console.warn(`Failed for ${item.id} (status: ${res.status})`);
  } catch (err) {
    console.error(`Error ${item.id}:`, err.message);
  }
}

async function main() {
  console.log(`Starting downloading screenshots for ${portfolioItems.length} websites...`);
  for (const item of portfolioItems) {
    await downloadOne(item);
    await sleep(600); // polite pause
  }
  console.log("All completed!");
}

main();

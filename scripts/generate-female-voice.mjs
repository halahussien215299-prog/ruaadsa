import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";

async function main() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("ar-SA-ZariyahNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  
  const text = "معقول في ألفين وستة وعشرين تدفع آلاف الريالات عشان تسوي موقع إلكتروني لنشاطك؟! مؤسسة رواد الرقمية بالمدينة المنورة بتسلّمك موقع إلكتروني احترافي متكامل يبدأ من ثلاثمية وتسعة وتسعين ريال بس! شامل دومين دوت كوم مجاناً، استضافة سريعة لسنة كاملة، ولوحة تحكم لإدارة محتواك بنفسك، وتسليم سريع خلال ثلاثة إلى خمسة أيام عمل فقط! لا تضيّع عملاءك، تواصل معنا الحين على الواتساب وابدأ نشاطك!";
  
  console.log("Generating female audio stream...");
  const { readable, audioStream } = tts.toStream(text);
  const stream = readable || audioStream;
  
  const writeStream = fs.createWriteStream("public/voiceover-female.mp3");
  stream.pipe(writeStream);
  
  writeStream.on("finish", () => {
    console.log("✓ Saved public/voiceover-female.mp3! Size:", fs.statSync("public/voiceover-female.mp3").size, "bytes");
  });
}

main().catch(console.error);


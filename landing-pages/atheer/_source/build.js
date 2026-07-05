const fs=require("fs");
const path=require("path");

const SRC=__dirname+path.sep;
const T=SRC+"template.html";
const FD=path.resolve(__dirname,"../../eddah/fonts/thmanyah")+path.sep;
const OUTDIR=path.resolve(__dirname,"..")+path.sep;
const IMGDIR=OUTDIR+"assets/img/";
const VID=OUTDIR+"assets/hero.mp4";
const tpl=fs.readFileSync(T,"utf8");

const mime={
  ".webp":"image/webp",
  ".mp4":"video/mp4",
  ".woff2":"font/woff2"
};
const dataUri=file=>{
  const ext=path.extname(file).toLowerCase();
  return `data:${mime[ext]||"application/octet-stream"};base64,${fs.readFileSync(file).toString("base64")}`;
};

const fontFiles={
  __F_SANS_L__:"thmanyahsans-Light.woff2",
  __F_SANS_R__:"thmanyahsans-Regular.woff2",
  __F_SANS_M__:"thmanyahsans-Medium.woff2",
  __F_SANS_B__:"thmanyahsans-Bold.woff2",
  __F_SERIF_R__:"thmanyahserifdisplay-Regular.woff2",
  __F_SERIF_B__:"thmanyahserifdisplay-Bold.woff2"
};
const fontBase="https://akoz20100-blip.github.io/Landing-page-/landing-pages/eddah/fonts/thmanyah/";
const images={
  __IMG_OG__:"og.webp",
  __IMG_HERO_POSTER__:"hero-poster.webp",
  __IMG_IDENTITY_PORTRAIT__:"identity-portrait.webp",
  __IMG_IDENTITY_LANDSCAPE__:"identity-landscape.webp",
  __IMG_SLIDER_BEFORE__:"slider-before.webp",
  __IMG_SLIDER_AFTER__:"slider-after.webp",
  __IMG_EDDAH_01__:"eddah-01.webp",
  __IMG_EDDAH_02__:"eddah-02.webp",
  __IMG_EDDAH_03__:"eddah-03.webp",
  __IMG_EDDAH_04__:"eddah-04.webp",
  __IMG_EDDAH_05__:"eddah-05.webp",
  __IMG_EDDAH_06__:"eddah-06.webp",
  __IMG_NUZUL_01__:"nuzul-01.webp",
  __IMG_NUZUL_02__:"nuzul-02.webp",
  __IMG_NUZUL_03__:"nuzul-03.webp",
  __IMG_NUZUL_04__:"nuzul-04.webp",
  __IMG_NUZUL_05__:"nuzul-05.webp",
  __IMG_NUZUL_06__:"nuzul-06.webp",
  __IMG_NASAQ_01__:"nasaq-01.webp",
  __IMG_NASAQ_02__:"nasaq-02.webp",
  __IMG_NASAQ_03__:"nasaq-03.webp",
  __IMG_NASAQ_04__:"nasaq-04.webp",
  __IMG_NASAQ_05__:"nasaq-05.webp",
  __IMG_NASAQ_06__:"nasaq-06.webp",
  __IMG_DIMORA_01__:"dimora-01.webp",
  __IMG_DIMORA_02__:"dimora-02.webp",
  __IMG_DIMORA_03__:"dimora-03.webp",
  __IMG_DIMORA_04__:"dimora-04.webp",
  __IMG_DIMORA_05__:"dimora-05.webp",
  __IMG_DIMORA_06__:"dimora-06.webp"
};

let source=tpl.replace("<head>","<head>\n<!-- Reference build: external Thmanyah fonts + relative video + relative WebP images. -->");
for(const [token,file] of Object.entries(fontFiles)){
  source=source.split(token).join(fontBase+file);
}
source=source.split("__VIDEO__").join("assets/hero.mp4");
for(const [token,file] of Object.entries(images)){
  source=source.split(token).join("assets/img/"+file);
}
fs.writeFileSync(OUTDIR+"index.source.html",source);

let standalone=tpl;
for(const [token,file] of Object.entries(fontFiles)){
  standalone=standalone.split(token).join(dataUri(FD+file));
}
standalone=standalone.split("__VIDEO__").join(dataUri(VID));
for(const [token,file] of Object.entries(images)){
  standalone=standalone.split(token).join(dataUri(IMGDIR+file));
}
fs.writeFileSync(OUTDIR+"index.html",standalone);

const leftovers=[...(source.match(/__[A-Z0-9_]+__/g)||[]),...(standalone.match(/__[A-Z0-9_]+__/g)||[])];
if(leftovers.length){
  throw new Error(`Unresolved build tokens: ${[...new Set(leftovers)].join(", ")}`);
}
const mb=bytes=>(bytes/1024/1024).toFixed(2)+"MB";
const kb=bytes=>(bytes/1024).toFixed(0)+"KB";
const standaloneSize=fs.statSync(OUTDIR+"index.html").size;
const sourceSize=fs.statSync(OUTDIR+"index.source.html").size;
console.log(`built. index.html: ${mb(standaloneSize)} | source: ${kb(sourceSize)} | images: ${Object.keys(images).length} | leftover: 0`);
if(standaloneSize>12*1024*1024) throw new Error("index.html exceeds 12MB");
if(sourceSize>90*1024) throw new Error("index.source.html exceeds 90KB");

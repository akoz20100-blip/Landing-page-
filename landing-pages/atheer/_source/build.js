const fs=require("fs");
const path=require("path");
const SRC=__dirname+path.sep;                                   // _source/
const T=SRC+"template.html";                                    // edit this
const FD=path.resolve(__dirname,"../../eddah/fonts/thmanyah")+path.sep;
const OUTDIR=path.resolve(__dirname,"..")+path.sep;             // landing-pages/atheer/
const VID=OUTDIR+"assets/hero.mp4";
const IMGDIR=OUTDIR+"assets/img/";                             // Atheer real images live here
const tpl=fs.readFileSync(T,"utf8");
// Atheer's real images — optimized WebP in assets/img/ (external + relative in BOTH builds,
// lazy-loaded; keeps index.html small instead of base64-bloating it by ~0.5MB).
const imgMap={
  __IMG_ABOUT__:"assets/img/studio-moodboard.webp",
  __IMG_ENHANCE__:"assets/img/bloom-portrait.webp",
  __IMG_W1__:"assets/img/ai-gallery.webp",
  __IMG_W2__:"assets/img/designer-desk.webp",
  __IMG_W3__:"assets/img/canvas-bloom.webp",
  __IMG_W4__:"assets/img/studio-moodboard.webp",
  __IMG_W5__:"assets/img/ai-gallery.webp",
  __IMG_W6__:"assets/img/bloom-portrait.webp",
  __IMG_CTA__:"assets/img/canvas-bloom.webp"
};
let work=tpl;
for(const k in imgMap) work=work.split(k).join(imgMap[k]);
const fontFiles={__F_SANS_L__:"thmanyahsans-Light.woff2",__F_SANS_R__:"thmanyahsans-Regular.woff2",__F_SANS_M__:"thmanyahsans-Medium.woff2",__F_SANS_B__:"thmanyahsans-Bold.woff2",__F_SERIF_R__:"thmanyahserifdisplay-Regular.woff2",__F_SERIF_B__:"thmanyahserifdisplay-Bold.woff2"};
const base="https://akoz20100-blip.github.io/Landing-page-/landing-pages/eddah/fonts/thmanyah/";
const fontURL={__F_SANS_L__:base+"thmanyahsans-Light.woff2",__F_SANS_R__:base+"thmanyahsans-Regular.woff2",__F_SANS_M__:base+"thmanyahsans-Medium.woff2",__F_SANS_B__:base+"thmanyahsans-Bold.woff2",__F_SERIF_R__:base+"thmanyahserifdisplay-Regular.woff2",__F_SERIF_B__:base+"thmanyahserifdisplay-Bold.woff2"};
// self-contained (base64 fonts + video)
let a=work;
for(const k in fontFiles) a=a.split(k).join("data:font/woff2;base64,"+fs.readFileSync(FD+fontFiles[k]).toString("base64"));
a=a.split("__VIDEO__").join("data:video/mp4;base64,"+fs.readFileSync(VID).toString("base64"));
fs.writeFileSync(OUTDIR+"index.html",a);
// source (external URLs + relative video)
let b=work.replace("<head>","<head>\n<!-- Reference build: external Thmanyah fonts + relative video + relative WebP images. -->");
for(const k in fontURL) b=b.split(k).join(fontURL[k]);
b=b.split("__VIDEO__").join("assets/hero.mp4");
fs.writeFileSync(OUTDIR+"index.source.html",b);
const rem=(a.match(/__[A-Z_]+__/g)||[]).concat(b.match(/__[A-Z_]+__/g)||[]);
console.log("built. index.html:",(fs.statSync(OUTDIR+"index.html").size/1024/1024).toFixed(2)+"MB | source:",(fs.statSync(OUTDIR+"index.source.html").size/1024).toFixed(0)+"KB | leftover:",rem.length);

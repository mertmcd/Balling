manifest: [
    {src:require("./images/CachedBmp_152.png"), id:"CachedBmp_152"},
    {src:require("./images/CachedBmp_103.png"), id:"CachedBmp_103"},
    {src:require("./images/test2_atlas_1.png"), id:"test2_atlas_1"},
    {src:require("./images/test2_atlas_2.png"), id:"test2_atlas_2"},
    {src:require("./images/test2_atlas_3.png"), id:"test2_atlas_3"}
],

new AnimateHelper(fileName, (canvas, root, containerDiv)=>{
    this.canvas = canvas;
    this.root = root;
    this.containerDiv = containerDiv;
    this.animateReady();
});

Animate programından export alındığında bir tane html, bir tane js ve kullanılan resimleri içeren images diye bir klasörden oluşur. Buradaki js ve images klasörünü projemize kopyalıyoruz. js dosyası içinde bir kaç ufak düzenleme yapmamız gerekiyor. Öncelikle resimlerin yüklendiği yeri bulup bütün referansları require şeklinde değiştiriyoruz. (Normalde bu resimler harici okunacağı için bu kısımda sadece dosya yolu yer alır, bizim her şeyi tek dosyaya gömmemiz gerektiği için bu şekilde yapıyoruz)
</br>
<js>
manifest: [
    {src: require("./images/CachedBmp_152.png"), id:"CachedBmp_152"},
    {src: require("./images/CachedBmp_103.png"), id:"CachedBmp_103"},
    {src: require("./images/test2_atlas_1.png"), id:"test2_atlas_1"},
    {src: require("./images/test2_atlas_2.png"), id:"test2_atlas_2"},
    {src: require("./images/test2_atlas_3.png"), id:"test2_atlas_3"}
],
</js>
</br>
Js dosyası içerisinde ayrıca en alt satırdaki <b>var createjs, AdobeAn;</b> kısmını siliyoruz.
<br>
Bu iki adımı yaptıktan sonra dosya kullanıma hazır. Proje içinde şu şekilde kullanıyoruz:
<br>
<js>
///filename genelde js dosyası ile aynıdır, değilse js dosyasının içinden bakmak gerekiyor
new AnimateHelper(fileName, (canvas, root, containerDiv)=>{
    ///bu kısımda artık animate canvas'ı kullanıma hazır demek oluyor
});
</js>
<br>
Burada canvas sahneye yeni eklenen canvas, root Animate dosyası içindeki her şeyi içeren obje. Bu objeyi kullanarak her şeyi kontrol ediyoruz, animasyonu durdurma, belli bir noktaya götürme, sahnedeki objelere erişip event ekleme, konumlarını, yazıları değiştirme vs.Basitçe bir end card ekleme örneği template'in içinde mevcut.
<br>
Animate içinde birden fazla sahneyi (mesela 2 end card) yapmak mümkün. Animasyonu kontrol etmek için genelde şu 4 fonksiyon kullanılır:
<br>
<js>
root.stop();//animasyonu durdurur
root.play();//animasyonu başlatır
root.gotoAndStop(0);//0. frame'e gider ve animasyonu durdurur
root.gotoAndPlay(0);//0. frame'e gider ve animasyonu başlatır
</js>
<br>
Animate'te ayrıca frame'lere isim vermekte mümkün. Mesela tasarımcı endcard1 ve endcard2 diye isimlendirirse, animasyonu başlatırken gotoAndPlay fonksiyonunda frame numarası yerine frame ismi verilebilir.



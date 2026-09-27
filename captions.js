/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Çiftse ÷ 2, tekse × 3 + 1, 1 olunca dur', en: 'Even: ÷ 2, odd: × 3 + 1, stop at 1',
      note: 'Bir algoritma: bir sayı seç. Sayı 1 ise dur. Değilse: çiftse 2’ye böl, tekse 3 ile çarpıp 1 ekle. Sonra yeniden başa dön.' },
    { scene: 2, start: 10.8, end: 21.0, tr: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1', en: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1',
      note: 'Algoritmayı 6 ile çalıştıralım. 6 çift: 2’ye böl, 3. 3 tek: 3 çarpı 3 artı 1, 10. Sonra 5, 16, 8, 4, 2 ve 1.' },
    { scene: 2, start: 21.4, end: 27.8, tr: '8 adımda 1’e ulaştı', en: 'It reached 1 in 8 steps',
      note: '6’dan başlayan sayı 8 adımda 1’e ulaştı ve algoritma durdu.' },
    { scene: 3, start: 28.6, end: 38.0, tr: 'Algoritmayı tabloya dönüştür', en: 'Turn the algorithm into a table',
      note: 'Adımları bir tabloya yazalım: 0. adımda 6, 1. adımda 3, sonra 10, 5, 16, 8, 4, 2, 1. 5 ile başlarsak: 16, 8, 4, 2, 1; 5 adım.' },
    { scene: 3, start: 38.4, end: 45.8, tr: 'Her sütun bir işlem', en: 'Each column is one operation',
      note: 'Tabloda her sütun bir adımı gösterir; her adımda ya 2’ye böldük ya da 3 ile çarpıp 1 ekledik.' },
    { scene: 4, start: 46.6, end: 56.0, tr: '7 ile: 52’ye kadar çıkıyor', en: 'From 7: it climbs to 52',
      note: 'Bir de 7 ile deneyelim: 7 çarpı 3 artı 1, 22. Sonra 11, 34, 17, 52... Sayı önce büyüyor, 52’ye kadar çıkıyor; sonra küçülüyor.' },
    { scene: 4, start: 56.4, end: 63.8, tr: '16 adımda 1', en: '1 after 16 steps',
      note: '26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1. 7’den 1’e 16 adımda ulaştı.' },
    { scene: 5, start: 64.6, end: 72.0, tr: 'Çift sayı yarıya iner', en: 'An even number is halved',
      note: 'İlişkileri sözle ifade edelim: çift sayı her seferinde yarıya iner, yani küçülür. Zincirde çift sayılar turuncu.' },
    { scene: 5, start: 72.4, end: 79.8, tr: 'Tekten sonra hep çift gelir', en: 'An odd number is always followed by an even one',
      note: 'Tek bir sayının 3 katı tektir; 1 fazlası çift olur. Bu yüzden tek sayıdan sonra hep bir çift sayı gelir ve yarıya iner. Denediğimiz her sayı sonunda 1’e ulaştı.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Sırayla uygulanan adımlar', en: 'Steps applied in order',
      note: 'Aklında kalsın: algoritma, sırayla uygulanan adımlardır. Tabloya dökünce ilişkiler görünür.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Adımları sözle açıkla!', en: 'Explain the steps in words!',
      note: 'Adımları ve ilişkileri sözle açıklayabilirsin!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);

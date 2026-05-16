import React from "react";
import { useState, useEffect } from "react";

function QuoteCarousel() {
  const quotes = [
  {
     text: "Health is not valued till sickness comes.", 
    lang: "English",
    author: "Thomas Fuller" },

  {
     text: "الصِحَّة تاجٌ على رُؤوس الأَصِحّاء لا يَراهُ إلّا المَرضى",
    lang: "العربية",
    author:"مثل عربي" },

  {
     text: "La santé est le trésor le plus précieux de la vie.",
    lang: "français",
    author: "Proverbe français"},

  {
    text: "防微杜渐",
   lang: "中文",
   author: "中国谚语"},

  {
  text: "Gesundheit weiß man erst zu schätzen, wenn man krank wird.",
  language: "Deutsch",
  author: "Sprichwort"
},

{
  text: "La salute si apprezza davvero solo quando la si perde.",
  language: "Italiano",
  author: "Proverbio"
},

{
  text: "Gezondheid waardeer je pas echt wanneer je ziek wordt.",
  language: "Nederlands",
  author: "Spreekwoord"
},

{
  text: "Man værdsætter først helbredet, når man bliver syg.",
  language: "Dansk",
  author: "Ordsprog"
},

{
  text: "Man uppskattar inte hälsan förrän man blir sjuk.",
  language: "Svenska",
  author: "Ordspråk"
},

{
  text: "Man setter ikke pris på helsen før man blir syk.",
  language: "Norsk",
  author: "Ordtak"
},

{
  text: "Zdrowie docenia się dopiero wtedy, gdy się je traci.",
  language: "Polski",
  author: "Przysłowie"
},
{
  text: "Здоровье дороже богатства.",
  lang: "Русский",
  author: "Русская пословица"
},

{
  text: "Zdraví je největší bohatství.",
  lang: "Čeština",
  author: "České přísloví"
},

{
  text: "Zdravie je najväčšie bohatstvo.",
  lang: "Slovenčina",
  author: "Slovenské príslovie"
},

{
  text: "Sănătatea este cea mai mare bogăție.",
  lang: "Română",
  author: "Proverb românesc"
},

{
  text: "Здравето е най-голямото богатство.",
  lang: "Български",
  author: "Българска поговорка"
},

{
  text: "Η υγεία είναι ο μεγαλύτερος πλούτος.",
  lang: "Ελληνικά",
  author: "Ελληνική παροιμία"
},

{
  text: "Terveys on suurin rikkaus.",
  lang: "Suomi",
  author: "Suomalainen sananlasku"
},

{
  text: "Здравље је највеће богатство.",
  lang: "Српски",
  author: "Српска пословица"
},

{
  text: "Zdravlje je najveće bogatstvo.",
  lang: "Hrvatski",
  author: "Hrvatska poslovica"
},

{
  text: "Zdravlje je najveće bogatstvo.",
  lang: "Bosanski",
  author: "Bosanska poslovica"
},

{
  text: "Zdravje je največje bogastvo.",
  lang: "Slovenščina",
  author: "Slovenski pregovor"
},

{
  text: "Shëndeti është pasuria më e madhe.",
  lang: "Shqip",
  author: "Proverb shqiptar"
},

{
  text: "Is fearr an tsláinte ná na táinte.",
  lang: "Gaeilge",
  author: "Seanfhocal"
},

{
  text: "Is fheàrr slàinte na tàinte.",
  lang: "Gàidhlig",
  author: "Seanfhacal"
},

{
  text: "Առողջությունն ամենամեծ հարստությունն է։",
  lang: "Հայերեն",
  author: "Հայկական ասացվածք"
},

{
  text: "Sağlık en büyük zenginliktir.",
  lang: "Türkçe",
  author: "Türk atasözü"
},

{
  text: "ჯანმრთელობა უდიდესი სიმდიდრეა.",
  lang: "ქართული",
  author: "ქართული ანდაზა"
}
];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {

    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % quotes.length
    );

  }, 15000);

  return () => clearInterval(interval);

}, []);

  return (
    <div className="quote">
  <h1>{quotes[currentIndex].text}</h1>
  <h3>{quotes[currentIndex].author}</h3>
    </div>
  );
}
export default QuoteCarousel;
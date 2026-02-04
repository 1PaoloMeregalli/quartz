---
title: Privacy & Trasparenza
date: 2026-02-04
tags:
  - privacy
---

# 🌲 Note sulla Privacy (e sul perché non ti sto pedinando)

In un’epoca in cui "se il prodotto è gratis, il prodotto sei tu", ho deciso che questo **Digital Garden** dovesse essere un’oasi di resistenza. Non mi interessa vendere i tuoi dati a un broker; mi interessa che tu legga i miei pensieri senza sentirti il fiato sul collo.

### 🛠️ Architettura e Trasparenza
Questo sito è generato con **Quartz** ed è puramente statico. È ospitato su **GitHub Pages**. Non c'è un backend che registra chi sei o quali siano i tuoi gusti. I server di GitHub loggano i dati tecnici necessari a servire le pagine (come l'indirizzo IP per la negoziazione HTTPS), ma la cosa finisce lì.

### 📊 Umami: Statistiche per Ingegneri
Voglio sapere quali articoli sono i più letti (per il mio ego e per capire cosa sia utile), ma senza usare Google Analytics. Ho scelto **Umami Analytics** perché lavora diversamente:
- **Niente Cookie:** Umami non deposita file sul tuo dispositivo.
- **IP Hashing:** Invece di salvare il tuo IP in chiaro, Umami genera una stringa anonima tramite **hash SHA-256** combinata con un "salt" che scade ogni 24 ore.

In pratica: posso vedere che "un utente" ha visitato tre pagine oggi, ma domani quell'utente avrà un hash completamente diverso. Non c'è persistenza, non c'è tracciamento cross-site, c'è solo statistica pura e anonima.

### 🎥 YouTube "Zero-Contact"
Odio i tracker che partono a tradimento. Per questo non troverai player incorporati (Iframe) nelle mie note. Troverai solo immagini di anteprima statiche: il tracciamento di Google non parte in automatico. Sei tu a decidere se e quando cliccare per andare su YouTube. Finché resti qui, sei invisibile ai loro algoritmi.

### ☕ Affiliazioni Amazon
Se suggerisco un libro o un tool, uso link di affiliazione. Se compri qualcosa, Amazon mi riconosce una piccola commissione. **A te il costo non cambia**, ma per me è come ricevere un caffè virtuale per il lavoro di cura di questo spazio. La mia soddisfazione ringrazia.

### 📡 RSS: Riprenditi il controllo (Anti-Algoritmo)
Potrebbe sembrare una tecnologia anacronistica, ma ho scelto di offrire un feed **[RSS](/index.xml)** perché credo fermamente nel ritorno al controllo dei propri contenuti.

In un web dominato da feed infiniti scelti da algoritmi di raccomandazione che decidono cosa devi vedere per massimizzare il tuo tempo di permanenza, l'RSS è un atto di ribellione. Usando un feed reader, sei **tu** a scegliere cosa leggere e quando farlo. Niente notifiche push manipolatorie, niente profilazione: solo un file XML che il tuo reader scarica quando decidi tu. 

### 📩 Contatti
Non ci sono newsletter né form di iscrizione. Se però vuoi scrivermi per un feedback tecnico, un'osservazione o un saluto, ne sarei felice:
- 💼 **LinkedIn:** [Inserisci qui il tuo link]
- 📧 **Email:** [Inserisci qui la tua mail]

---



***
Ecco come configurare il file `quartz.layout.ts` per rendere il footer coerente con il resto del "giardino":

### Il Codice per `quartz.layout.ts`

footer: Component.Footer({
  links: {
    "Privacy (Zero Tracking)": "/privacy",
    "Feed RSS (No Algoritmi)": "/index.xml",
    "LinkedIn": "https://www.linkedin.com/in/TUO_PROFILO",
    "Scrivimi una Mail": "mailto:TUA_EMAIL@esempio.it",
  },
  text: `
    <hr />
    <p>
      Creato con <b>Quartz</b>. In qualità di Affiliato Amazon, ricevo un guadagno dagli acquisti idonei: 
      a te non costa nulla, ma il mio ego ringrazia per il caffè virtuale. ☕
    </p>
  `
}),
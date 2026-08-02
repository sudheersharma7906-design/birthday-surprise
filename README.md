# 💖 "Our Story" Birthday Surprise Website

A beautiful, premium, interactive one-page website designed as a digital love letter and birthday surprise for Shivangi.

## Features

1. **Password Protected Entry**: Enter "welcome" or the anniversary date "0000" to unlock the website.
2. **Heartbeat Loading Screen**: 5-second aesthetic beat sequence.
3. **Interactive Welcome Screen**: Glowing typography, floating petals, and immediate music trigger.
4. **Music Player Box**: Sticky floating disc widget with royalty-free backing synth tones fallback (Web Audio API) so music always plays offline or online.
5. **Love Quiz**: Correctly answer four sweet questions about the relationship to unlock the rest of the surprise.
6. **Animated Love Letter**: Clickable envelope that flaps open, slides the letter up, and types out a heartfelt note letter-by-letter.
7. **Live Journey Ticker**: Live counter tracking the exact years, months, days, hours, minutes, and seconds since Reference Name's birth (July 30, 2006). Shows total days since she was born on the top banner.
8. **Polaroid Memory Gallery**: Fully interactive hand-drawn watercolor SVGs that open a blurred-glass lightbox describing beautiful memories.
9. **Interactive Scroll Timeline**: Key milestones sliding into view smoothly on scroll.
10. **Reasons Why I Love You**: A touch-friendly horizontal card slider carousel.
11. **"Open When..." Envelopes**: Clickable cards revealing customized emotional messages.
12. **Secret 3D Gift Box**: Opens with lid animations to reveal interactive ring, chocolates, teddy bear, and dinner coupon SVGs.
13. **Candle Blow Interactive Cake**: Multi-layered birthday cake. Blow into your microphone (Web Audio decibel analyzer) or click the blow button to extinguish the candles, trigger confetti, and start the fireworks.
14. **Starry Proposal Scene & Escape Button**: Typing final message ending with "One Last Click", opening a marriage/relationship proposal card. The "NO" button runs away on hover/touch, leaving only "YES" clickable.
15. **Grand Celebration**: Selecting YES triggers fullscreen fireworks canvas explosions, heart storm particles, and romantic synth arpeggios.

## Folder Structure

```
d:/birthday/
│
├── index.html         # Main structure & illustrations
├── style.css          # Color variables, transitions, animations & responsive layout
├── script.js          # Cursor trails, audio synths, canvas particles & page logic
│
├── data/
│   └── memories.json  # Data schema for polaroid cards
│
└── README.md          # Project documentation
```

## Running the Web App

Simply double-click `index.html` to open it in any web browser!
No local servers or dependencies are required, as all graphics are rendered using high-performance inline SVGs, and audio elements use standard browser synthesizers when offline.

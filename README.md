# YT DLoader

**YT DLoader** is a free, open-source YouTube video downloader for Windows. It provides a clean desktop GUI that lets you download YouTube videos and audio in seconds — no subscriptions, no ads, no malware.

---

## ✨ Features

- 🎬 **Download YouTube videos** in MP4 format
- 🎵 **Extract audio** in MP3 format
- 🖥️ **Simple GUI** built with CustomTkinter (dark mode)
- 📂 **Choose your output folder** (defaults to `~/Downloads`)
- 🔄 **Progress bar** with real-time download feedback
- 📦 **Bundled FFmpeg** for seamless audio/video merging
- 🚀 **Completely free** — no accounts or internet subscriptions needed

---

## 📸 Screenshot

![YT DLoader Screenshot](resources/screenshot.PNG)

---

## 🚀 Getting Started

### Option 1 — Download the Windows installer (recommended)

1. Go to the [website](https://vikhyatvarun.github.io/yt-dloader/) or the [Releases page](https://github.com/Vikhyatvarun/ytdloader.exe/releases).
2. Download **YT-DLoader-setup.exe**.
3. Run the installer and follow the on-screen steps.
4. Launch **YT DLoader** from the Start Menu or Desktop shortcut.

### Option 2 — Run from source

**Prerequisites:** Python 3.9+, pip

```bash
# 1. Clone the repository
git clone https://github.com/Vikhyatvarun/yt-dloader.git
cd yt-dloader

# 2. Install dependencies
pip install customtkinter yt-dlp pillow requests

# 3. Run the app
python "YT DLoader Python files/YTD v2.py"
```

> **Note:** FFmpeg must be available on your system PATH (or placed in an `ffmpeg/` folder next to the script) for video/audio merging to work. Download it from [ffmpeg.org](https://ffmpeg.org/download.html).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| GUI | [CustomTkinter](https://github.com/TomSchimansky/CustomTkinter) + Tkinter |
| Downloading | [yt-dlp](https://github.com/yt-dlp/yt-dlp) |
| Audio/Video merging | [FFmpeg](https://ffmpeg.org/) |
| Thumbnail previews | [Pillow](https://python-pillow.org/) |
| Landing page | HTML, CSS, Tailwind CSS, JavaScript |

---

## 📁 Project Structure

```
yt-dloader/
├── YT DLoader Python files/   # Python source (GUI app)
│   ├── YTD v1.py              # Initial version
│   ├── YTD v1.1.py            # Patch release
│   └── YTD v2.py              # Current version
├── setup/                     # Windows installer (.exe)
├── resources/                 # Images used on the website
├── index.html                 # Project landing page
├── style.css                  # Landing page styles
├── script.js                  # Landing page scripts
├── report.html / report.js    # Bug-report UI
└── terms.html                 # Terms of Service page
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

For bugs or suggestions, email **vikhyatvarun@gmail.com** or open a [GitHub Issue](https://github.com/Vikhyatvarun/yt-dloader/issues).

---

## ⚠️ Disclaimer

YT DLoader is intended for **personal, offline use only**. Please respect YouTube's [Terms of Service](https://www.youtube.com/t/terms) and only download content you have the right to download.

---

## 📄 License

This project is open-source. See the repository for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/vikhyatvarun">vikhyatvarun</a></p>

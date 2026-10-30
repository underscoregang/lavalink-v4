# 🎵 lavalink-v4

A ready-to-run [Lavalink](https://github.com/lavalink-devs/Lavalink) **v4.2.2** node for Discord music bots, preconfigured with plugins for YouTube, Spotify and search.

> 🚀 No build step: download, set your secrets, and run.

---

## ✨ Features

- 🔊 Audio streaming for Discord bots over Lavalink's REST + WebSocket API (v4)
- 📺 **YouTube** via [youtube-plugin](https://github.com/lavalink-devs/youtube-source) (OAuth + remote cipher)
- 🟢 **Spotify** (with YouTube mirroring) via [LavaSrc](https://github.com/topi314/LavaSrc)
- 🔎 Rich search via [LavaSearch](https://github.com/topi314/LavaSearch)
- 🌐 Built-in sources: SoundCloud, Bandcamp, Twitch, Vimeo, Nico, HTTP
- 🎛️ All audio filters enabled (equalizer, timescale, karaoke, rotation, …)
- 📝 Rolling file logs in `./logs/`

---

## 📁 Project Structure

```
lavalink-v4/
├── Lavalink.jar      # Lavalink server v4.2.2 (prebuilt)
├── application.yml   # Server, source and plugin configuration
└── README.md
```

Plugins are downloaded automatically into `./plugins/` on first start.

---

## 🚀 Getting Started

### 🛠 Prerequisites

- ☕ **Java 17 or later** (check with `java -version`; Java 8/11 will not work)
- 🐙 [Git](https://git-scm.com/)

### ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/underscoregang/lavalink-v4.git
   cd lavalink-v4
   ```

2. **Configure secrets** in `application.yml` (see [Configuration](#-configuration)):

   | Key | Placeholder | Purpose |
   | --- | --- | --- |
   | `lavalink.server.password` | `YOUR_PASSWORD` | Password your bot uses to connect |
   | `plugins.lavasrc.spotify.clientId` | `YOUR_CLIENT_ID` | Spotify app client ID |
   | `plugins.lavasrc.spotify.clientSecret` | `YOUR_CLIENT_SECRET` | Spotify app client secret |
   | `plugins.youtube.oauth.refreshToken` | `YOUR_REFRESH_TOKEN` | YouTube OAuth refresh token |

3. **Run the server**

   ```bash
   java -jar Lavalink.jar
   ```

   The node listens on **`0.0.0.0:2000`**.

4. **Verify it's up**

   ```bash
   curl -H "Authorization: YOUR_PASSWORD" http://localhost:2000/version
   ```

---

## 🔧 Configuration

All settings live in `application.yml`. The most important ones:

```yaml
server:
  port: 2000
  address: 0.0.0.0

lavalink:
  server:
    password: YOUR_PASSWORD
    sources:
      youtube: false   # disabled in favor of the youtube-plugin below
      soundcloud: true
      bandcamp: true
      twitch: true

plugins:
  youtube:
    enabled: true
    oauth:
      enabled: true
      refreshToken: YOUR_REFRESH_TOKEN
  lavasrc:
    spotify:
      clientId: YOUR_CLIENT_ID
      clientSecret: YOUR_CLIENT_SECRET
```

### 🔑 Getting credentials

- **Spotify**: create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and copy its client ID and secret.
- **YouTube OAuth**: start the server with `oauth.enabled: true` and no `refreshToken`; the log prints a device-login link. Sign in with a **burner Google account**, then copy the refresh token from the log into `application.yml`. See the [youtube-source OAuth docs](https://github.com/lavalink-devs/youtube-source#using-oauth-tokens).

### 🌱 Using environment variables

To avoid committing secrets, any key can be overridden with an environment variable (Spring Boot naming):

```bash
export LAVALINK_SERVER_PASSWORD="supersecret"
export PLUGINS_LAVASRC_SPOTIFY_CLIENTID="..."
export PLUGINS_LAVASRC_SPOTIFY_CLIENTSECRET="..."
java -jar Lavalink.jar
```

---

## 🤖 Usage

Point your bot's Lavalink client at this node:

| Setting | Value |
| --- | --- |
| Host | `localhost` (or your server IP) |
| Port | `2000` |
| Password | value of `lavalink.server.password` |
| Secure (SSL) | `false` |

Some Lavalink v4 client libraries:

- **JavaScript/TypeScript**: [Shoukaku](https://github.com/shipgirlproject/Shoukaku), [lavalink-client](https://github.com/Tomato6966/lavalink-client)
- **Python**: [Wavelink](https://github.com/PythonistaGuild/Wavelink), [Lavalink.py](https://github.com/devoxin/Lavalink.py)
- **Java/Kotlin**: [lavalink-client](https://github.com/lavalink-devs/lavalink-client)

See the full list in the [Lavalink docs](https://lavalink.dev/clients).

---

## 🩺 Troubleshooting

- **`UnsupportedClassVersionError`**: your Java is too old. Install Java 17+.
- **Port already in use**: change `server.port` in `application.yml`.
- **YouTube tracks fail to load**: make sure the OAuth refresh token is set and `lavalink.server.sources.youtube` stays `false`.
- **Logs**: check `./logs/spring.log`.

---

## 📚 Resources

- [Lavalink Documentation](https://lavalink.dev/)
- [Lavalink on GitHub](https://github.com/lavalink-devs/Lavalink)
- [Plugin list](https://lavalink.dev/plugins)

---

## 📜 License

Lavalink is licensed under the [MIT License](https://github.com/lavalink-devs/Lavalink/blob/master/LICENSE). Plugins are covered by their own licenses.

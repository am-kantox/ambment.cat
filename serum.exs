%{
  site_name: "Alek�ei Matiu�hkin",
  server_root: "https://ambment.cat",
  site_description: "сделано с умом",
  date_format: "{WDfull}, {D} {Mshort} {YYYY}",
  base_url: "/",
  author: "Aleksei “@mudasobwa” Matiushkin",
  author_email: "am@ambment.cat",
  plugins: [
    {Serum.Plugins.LiveReloader, only: :dev},
    Serum.Plugins.SitemapGenerator,
    Serum.Plugins.RssGenerator,
    # AT Protocol / standard.site integration
    {Serum.Plugins.StandardSite,
     handle: "mudasobwa.bsky.social",
     app_password: System.get_env("BSKY_APP_PASSWORD")
    },
    # ActivityPub / Fediverse integration
    {Serum.Plugins.ActivityPub,
     username: "mudasobwa",        # Mastodon handle will be @blog@myblog.com
     actor_path: "/actor.json",    # Optional, defaults to /actor.json
     outbox_path: "/outbox.json"   # Optional, defaults to /outbox.json
    }
  ],
  theme: Serum.Themes.Essence,
  list_title_all: "",
  list_title_tag: "🏷 ~s",
  pagination: true,
  posts_per_page: 25,
  preview_length: 200,
  pretty_urls: false
}

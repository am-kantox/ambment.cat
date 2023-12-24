defmodule Ambment.MixFile do
  use Mix.Project

  def project do
    [
      app: :ambment,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    []
  end

  defp deps do
    [
      {:serum_md, "~> 1.6"},
      {:serum_theme_essence_md, "~> 1.2"},
      # {:serum_md, path: "../Serum", override: true},
      # {:serum_theme_essence_md, path: "../serum-theme-essence-md"},
      {:floki, "~> 0.34"}
    ]
  end
end

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8" />

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Primary meta -->
        <meta name="description" content="AniKisetsu — Catálogo y base de datos de animes. Descubre qué se está emitiendo, próximos estrenos y los títulos más populares." />
        <meta name="theme-color" content="#141218" />
        <meta name="color-scheme" content="dark" />

        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&amp;family=Outfit:wght@100..900&amp;display=swap" rel="stylesheet" />

        <!-- CSS -->
        <link rel="stylesheet" href="../../src/styles/reset.css" />
        <link rel="stylesheet" href="../../src/styles/tokens/index.css" />
        <link rel="stylesheet" href="../../src/styles/base.css" />
        <link rel="stylesheet" href="../../src/styles/utils.css" />
        <link rel="stylesheet" href="./studios.css" />

        <title>Estudios · AniKisetsu</title>
      </head>
      <body>
        <header class="page-header">
          <h1 class="page-header__title">Estudios</h1>
        </header>

        <main class="xslt-main">
          <!-- STATS SECTION -->
          <section class="stats">
            <article class="stats__item">
              <h2 class="stats__label">Estudios</h2>
              <p class="stats__value">
                <xsl:value-of select="count(//studio)" />
              </p>
            </article>

            <article class="stats__item">
              <h2 class="stats__label">Animes</h2>
              <p class="stats__value">
                <xsl:value-of select="count(//anime)" />
              </p>
            </article>

            <article class="stats__item stats__item--score">
              <h2 class="stats__label">Score medio</h2>
              <p class="stats__value"> ★                <xsl:value-of select="format-number(sum(//score) div (count(//anime[score]) * 10), '0.0')" />
              </p>
            </article>
          </section>

          <!-- ============ SECCIÓN 1: Estudios destacados ============ -->
          <section class="cards-section">
            <header class="cards-section__header">
              <h2 class="cards-section__title">Estudios Destacados</h2>
            </header>

            <ol class="cards-section__list">
              <xsl:apply-templates select="studios/studio" mode="ranking">
                <xsl:sort select="(sum(animes/anime/score) div count(animes/anime[score])) + count(animes/anime[score]) div 10" data-type="number" order="descending" />
              </xsl:apply-templates>
            </ol>
          </section>

          <!-- ============ SECCIÓN 2: Estudios populares este año ============ -->
          <section class="cards-section">
            <header class="cards-section__header">
              <h2 class="cards-section__title">Estudios Populares este año</h2>
            </header>

            <ul class="cards-section__list">
              <xsl:apply-templates select="studios/studio[animes/anime[year = 2026]]" mode="ranking">
                <xsl:sort select="(sum(animes/anime[score and popularity and year = 2026]/popularity) div count(animes/anime[score and popularity and year = 2026])) + count(animes/anime[score and popularity and year = 2026]) div 10" data-type="number" order="descending" />
                <xsl:with-param name="year" select="2026" />
              </xsl:apply-templates>
            </ul>
          </section>

          <!-- ============ SECCIÓN 3: Estudios con las Mejores Series ============ -->
          <section class="cards-section">
            <header class="cards-section__header">
              <h2 class="cards-section__title">Estudios con las Mejores Series</h2>
            </header>

            <ul class="cards-section__list">
              <xsl:apply-templates select="studios/studio[animes/anime[@format='TV']]" mode="ranking">
                <xsl:sort select="animes/anime[not(score &lt; ../anime/score)]/score" data-type="number" order="descending" />
              </xsl:apply-templates>
            </ul>
          </section>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="studio" mode="ranking">
    <xsl:param name="year" />

    <xsl:if test="position() &lt;= 10">
      <li>
        <xsl:attribute name="class">
          <xsl:text>studio-card</xsl:text>
          <xsl:if test="position() &lt;= 3">
            <xsl:text> studio-card--rank-</xsl:text>
            <xsl:value-of select="position()" />
          </xsl:if>
        </xsl:attribute>
        <div class="studio-card__rank-container">
          <span class="studio-card__rank">
            <xsl:text>#</xsl:text>
            <xsl:value-of select="position()" />
          </span>
        </div>

        <div class="studio-card__title-stat studio-card__stat">
          <span class="studio-card__title">
            <xsl:value-of select="name" />
          </span>

          <div class="studio-card__meta">
            <span class="studio-card__meta-item">
              <xsl:value-of select="count(animes/anime[not($year) or year = $year])" />
              <xsl:choose>
                <xsl:when test="count(animes/anime[not($year) or year = $year]) &gt; 1">
                              animes
                </xsl:when>
                <xsl:otherwise>
                              anime
                </xsl:otherwise>
              </xsl:choose>
            </span>

            <span class="studio-card__meta-item">
              <xsl:value-of select="sum(animes/anime[not($year) or year = $year]/episodes)" />
              <xsl:choose>
                <xsl:when test="sum(animes/anime[not($year) or year = $year]/episodes) &gt; 1">
                              episodios
                </xsl:when>
                <xsl:otherwise>
                              episodio
                </xsl:otherwise>
              </xsl:choose>
            </span>
          </div>
        </div>

        <div class="studio-card__stat">
          <span class="studio-card__stat-label">Score medio</span>
          <span class="studio-card__stat-value studio-card__stat-value--score">
            <xsl:text>★ </xsl:text>
            <xsl:value-of select="format-number(
                                              sum(animes/anime[not($year) or year = $year]/score) div (count(animes/anime[score and (not($year) or year = $year)]) * 10),
                                              '0.0')" />
          </span>
        </div>

        <div class="studio-card__animes">
          <div class="studio-card__stat">
            <span class="studio-card__stat-label">Mejor anime</span>

            <xsl:apply-templates select="animes/anime[score and (not($year) or year = $year)]" mode="top-1">
              <xsl:sort select="score" data-type="number" order="descending"/>
            </xsl:apply-templates>
          </div>

          <div class="studio-card__stat">
            <span class="studio-card__stat-label">Más popular</span>

            <xsl:apply-templates select="animes/anime[popularity and (not($year) or year = $year)]" mode="top-1">
              <xsl:sort select="popularity" data-type="number" order="descending"/>
            </xsl:apply-templates>
          </div>
        </div>
      </li>
    </xsl:if>
  </xsl:template>

  <xsl:template match="anime" mode="top-1">
    <xsl:if test="position() = 1">
      <span class="studio-card__stat-value">
        <xsl:value-of select="title" />
      </span>

      <span class="studio-card__stat-meta">
        <xsl:value-of select="@format" />
                              · 
        <xsl:value-of select="year" />
                              · ★ 
        <xsl:value-of select=" format-number(score div 10, '0.0') " />
      </span>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
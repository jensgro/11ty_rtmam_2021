/**
 * Eleventy directory data files
 * https://www.11ty.dev/docs/data-template-dir/
 *
 * Comme ce fichier s'appelle
 * nomDuDossierParent.11tydata.js
 * Toutes les key / value pairs vont être traitée par Eleventy comme si elles étaient dans chacun des fichiers de ce dossier
 *
 * Dans ce cas-ci le dossier parent = team
 * Donc Eleventy va traiter les keys/values dans team.11tydata.js comme si elles étaient dans chacun des fichiers Markdown (jerome.md, marie.md, etc.)
 */
module.exports = {
  layout: "layouts/team.njk",
  // page.fileSlug == le nom de fichier (moins la date éventuelle)
  // https://www.11ty.dev/docs/data-eleventy-supplied/#fileslug
  permalink: "team/{{ page.fileSlug }}/index.html",
};

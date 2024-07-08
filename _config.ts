import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
// import postcss from "lume/plugins/postcss.ts";

const site = lume({
  src: './src',
  location: new URL("https://luke-strange.github.io/fris-stats/"),
});

site.use(base_path());

site.use(metas({
  defaultPageData: {
    title: 'title', // Use the `date` value as fallback.
  },
}));

site.use(date());
// site.use(postcss({}));
// site.copy('CNAME');

site.copy('.nojekyll');
// site.copy('assets/images');
// site.copy('assets/css/fonts');

site.copy('assets/js');

export default site;

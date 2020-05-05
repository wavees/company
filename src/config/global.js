import { readable } from 'svelte/store';

// 
// @explanation
// This is config object, that contains general
// information about site, about landing page and
// so on. For example: global site URL (It needed
// to send user to appropriate subdomain address)
export const general =
readable({
  // Site url
  // Hmm, just site url, isn't it?
  url: "wavees.co.vu"
});

//
// @explanation
// Config object, that consists url's and keys to access
// private API, that was made especially for this site.
export const api = 
readable({
  // I dunno what is this thing doing here.
  // I think that I should delete this... But...
  defaultAvatar: "https://cdn.dribbble.com/users/45488/screenshots/9084073/media/f889543c2e901048f8da2d9915d0bf37.jpg",

  // API URL and version parameters
  url: "https://wv-core.glitch.me", 
  version: 1
});

export const languages =
readable({
  en: "English",

  ru: "Русский",
  ua: "Українська"
});

// 
// @explanation
// Config, that consists array of all projects, that
// will be shown on landing pages.
export const projects = 
readable([
  // 
  // Explanation of every project entry.
  // 
  {
    // Name of service
    // If name contains "@" symbol, then system will try
    // to find translation for this title on different
    // languages. Very usefull, ya know.
    name: "Bokkr",

    // URL of service
    // If it starts with "@" symbol - than system
    // will redirect you to main domain's subdomain.
    // For example: bokkr.wavees.co.vu in this case
    url: "@bokkr",

    // Icon name. All icons are stored in ./static/icons/logo/
    // And this is name of project icon.
    icon: "logo/bokkr",

    // Unnecessary value. It allows us to show some projects
    // only in promotion purposes. For example: if set to "promotion",
    // this project will only appear on register screen and
    // nowhere else.

    // @values: "promotion", "noPromotion", null
    type: null,

    // Different descriptions for different
    // pages. 
    description: { 
      // Description of service on
      // register page. We need to
      // promote this app to user, don't we?
      // 
      // @explanation: We store all our texts
      // in localization files. And this is path
      // to exact this localalization.
      promotion: "projects.promotions.bokkr"
 
      // Probably, there will be another
      // types of description for this
      // project. I dunno
    }

    // 
    // Meaning of this objects explained there ⬆
    //
  },
  {
    name: "Pigeon",
    url: "@pigeon",
    icon: "logo/pigeon",
    description: {
      promotion: "projects.promotions.pigeon"
    }
  },
  {
    name: "Unicorn",
    url: "@unicorn",
    icon: "logo/unicorn",
    description: {
      promotion: "projects.promotions.unicorn"
    }
  },
  {
    name: "Paradise",
    url: "paradiser.ml",
    icon: "logo/paradise",
    type: "noPromotion",
    description: {
      promotion: "projects.promotions.paradise"
    }
  },
  {
    // System will try to find name of this app in
    // localization files.
    name: "@projects.promotions.userApps.title",
    icon: "grid",
    type: "promotion",
    description: {
      promotion: "projects.promotions.userApps.description"
    }
  }
]);
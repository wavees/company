import { readable } from 'svelte/store';

export const api = 
readable({ 
  defaultAvatar: "https://cdn.dribbble.com/users/45488/screenshots/9084073/media/f889543c2e901048f8da2d9915d0bf37.jpg",

  url: "https://wv-core.glitch.me", 
  version: 1,
  
  projects: [
    // 
    // Explanation of every project entry.
    // 
    {
      // Name of service
      // If name contains "@" symbol, then system will try
      // to find translation for this title on different
      // languages. Very usefull, ya know.
      name: "Bokkr",

      // Icon name. All icons are stored in ./static/icons/logo/
      // And this is name of project icon.
      icon: "bokkr",

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
      icon: "pigeon",
      description: {
        promotion: "projects.promotions.pigeon"
      }
    },
    {
      name: "Unicorn",
      icon: "unicorn",
      description: {
        promotion: "projects.promotions.unicorn"
      }
    },
    {
      name: "Paradise",
      icon: "paradise",
      type: "noPromotion",
      description: {
        promotion: "projects.promotions.paradise"
      }
    },
    {
      // System will try to find name of this app in
      // localization files.
      name: "@projects.promotions.userApps.title",
      icon: "uapps",
      type: "promotion",
      description: {
        promotion: "projects.promotions.userApps.description"
      }
    }
  ]
});
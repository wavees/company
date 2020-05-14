import { readable, writable } from 'svelte/store';
import axios from "axios";

// 
// @explanation
// This is config object, that contains general
// information about site, about landing page and
// so on. For example: global site URL (It needed
// to send user to appropriate subdomain address)
const general =
readable({
  // Site url
  // Hmm, just site url, isn't it?
  url: "wavees.co.vu"
});

export { general };

const landingPages =
readable([
  {
    id: "index",
    url: "/",

    color: "#ffbd3b"
  },
  {
    id: "philosophy/simplicity",
    url: "/philosophy/simplicity",

    color: "#8ce08c"
  },
  {
    id: "philosophy/beauty",
    url: "philosophy/beauty",

    color: "#9ef5ee"
  }
]);

export { landingPages };

//
// @explanation
// Config object, that consists url's and keys to access
// private API, that was made especially for this site.
const api = 
readable({
  // I dunno what is this thing doing here.
  // I think that I should delete this... But...
  defaultAvatar: "https://cdn.dribbble.com/users/45488/screenshots/9084073/media/f889543c2e901048f8da2d9915d0bf37.jpg",

  // API URL and version parameters
  url: "https://api.wavees.co.vu", 
  version: 1
});

export { api };

const languages =
readable({
  en: "English",

  ru: "Русский",
  ua: "Українська"
});

export { languages };

// 
// PROJECTS OBJECT
// Here we'll make some requests to remote API
// to get projects list.
// 
function createProjectsStore() {
  const { subscribe, set, update } = writable([ ]);

  return {
    subscribe,

    updateProjects: (number) => {
      axios.get(`https://api.wavees.co.vu/network/projects`)
      .then((response) => {
        let data = response.data;

        if (number == "all") {
          set(data);
        } else {
          let sortedProjects = [];

          for (let index = 0; index < number; index++) {
            const element = data[index];
            sortedProjects.push(element);
          };

          set(sortedProjects);
        }
      })
    }
  }
};

const projects = createProjectsStore();

export { projects };
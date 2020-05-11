import { writable } from "svelte/store";
import { api } from './global.js';

const application = {
  url: "https://wv-core.glitch.me"
};

function createUserStore() {
  const { subscribe, set, update } = writable({ loaded: false, token: null, username: null, avatar: null });

  return {
    subscribe,

    // setToken function
    setToken: (token) => {
      fetch(`${application.url}/user/${token}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error == null) {
          update(object => {
            object.loaded = true;

            object.username = response.username;
            object.avatar = response.avatar;

            return object;
          });
        } else {
          update(object => {
            object.loaded = true;
          
            return object;
          });
        }
      });
    },
  }
}

export const user = createUserStore();
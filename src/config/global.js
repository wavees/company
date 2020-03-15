import { readable } from 'svelte/store';

export const api = 
readable({ 
  url: "https://wv-core.herokuapp.com", 
  version: 1 
});
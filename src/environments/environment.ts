// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  genaiApiKey: '202fedea6587499e973da1f45a4f1365',
  genaiApiUrl: 'https://genai-aus-bayer.openai.azure.com/openai/deployments/genai-gpt-35-turbo/chat/completions?api-version=2023-07-01-preview',
  bingAPIKey: 'cbc821ac5fe746b2951dd0a35453d951',
  bingAPIUrl: 'https://api.bing.microsoft.com/v7.0/news/search',
  twitterAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  twitterAPIHost: 'twitter-api45.p.rapidapi.com',
  twitterAPIUrl: 'https://twitter-api45.p.rapidapi.com/search.php',
  instagramAPIKey: '069f5deae7msh39c8af5b39ac14cp1b5a78jsn98ef71307888',
  instagramAPIHost: 'instagram-scraper-api2.p.rapidapi.com',
  instagramAPIUrl: 'https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts',
  linkedInAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  linkedInHost: 'fresh-linkedin-profile-data.p.rapidapi.com',
  linkedInAPIUrl: 'https://fresh-linkedin-profile-data.p.rapidapi.com/search-posts',
  redditAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  redditHost: 'socialgrep.p.rapidapi.com',
  redditAPIUrl: 'https://socialgrep.p.rapidapi.com/search/posts',
  promptAPIKey: 'dfdfdddc7dd5460b98f2f2e784e923cb',
  promptAPIUrl: 'https://llm-api-9ip7.onrender.com/process_csv',
  user: {
    name: 'mshack',
    pass: 'Welcome@1234'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

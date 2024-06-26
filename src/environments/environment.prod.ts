// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '74d00392-b1cf-4311-bc0b-e66e59ab36af',
      authority: 'https://login.microsoftonline.com/94e1538a-3b46-4d3f-b78c-1f1613e4b6a2/',
    }
  },
  apiConfig: {
    scopes: ['profile', 'User.Read'],
    uri: 'https://graph.microsoft.com/v1.0/me'
  },
  genaiApiKey: '93bebe69625e49989ffade25d18f7ee3',
  genaiApiUrl: 'https://cg-hack-genai.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview',
  bingAPIKey: '46947659c59b4b72a48655d111be5a07',
  bingAPIUrl: 'https://api.bing.microsoft.com/v7.0/news/search',
  newsAPIUrl: 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything',
  newsAPIKey: 'a880e279b39547fbb030a4aa3d3a6fc6', // personal
  // newsAPIKey: '55c73ae62b174f6b980c10fc19633986', // cg
  // newsAPIUrl: 'https://asp-be.azurewebsites.net/api/API',
  twitterAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  twitterAPIHost: 'twitter-api45.p.rapidapi.com',
  twitterAPIUrl: 'https://twitter-api45.p.rapidapi.com/search.php',
  linkedInAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  linkedInAPIHost: 'fresh-linkedin-profile-data.p.rapidapi.com',
  linkedInAPIUrl: 'https://fresh-linkedin-profile-data.p.rapidapi.com/search-posts',
  redditAPIKey: '36b7eb69cdmsh46b8137903ed724p13e4a9jsnc6bd37a80958',
  redditHost: 'socialgrep.p.rapidapi.com',
  redditAPIUrl: 'https://www.reddit.com/search.json',
  promptAPIKey: 'dfdfdddc7dd5460b98f2f2e784e923cb',
  promptAPIUrl: 'https://llm-api-9ip7.onrender.com/process_csv',
  langServiceAPIKey: '32255e7060cd41178438eab6aa4ed033',
  langServiceAPIUrl: 'https://langservice-1310992.cognitiveservices.azure.com/',
  pythonBEApiUrl: 'https://aifactoryhub.azurewebsites.net/',
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

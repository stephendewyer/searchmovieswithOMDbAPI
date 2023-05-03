a website to search movies using the Online Movie Database API (OMDb API) and Next.js

by Stephen Dewyer

2023

The search movies website is built using Next.js and communicates using the OMDb API.

How to run the website locally:

1.  Pull the remote git repository into a local directory.
2.  Open the root directory of the local repository.
3.  Run 
    npm install
    in the terminal to install the dependencies.
4.  Generate an API key to communicate with the OMDb at https://www.omdbapi.com/apikey.aspx.  OMDb will send an API key and link to verify access to the key via email after submitting an email address and setting account type via https://www.omdbapi.com/apikey.aspx.
5.  Create a 
    .env.local 
    file in the local repository root directory
6.  Add 
    NEXT_PUBLIC_OMDB_API_KEY="YOUR API KEY"
    in the 
    .env.local 
    file.
7.  Replace "YOUR API KEY" with the API key generated from the OMDb.
8.  Run 
    npm run dev
    in the terminal to run the development server.
9.  Open http://localhost:3000/ in the browser.
10.  Your local repository will run in your browser at http://localhost:3000/.
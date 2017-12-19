# URL Shortener-microservice

This is a mini-express app that short a given valid url.

It is part of freecodeCamp backend certification when they teach node, mongoDB, express related topics

## How it works?

- User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

- User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

- User Story: When I visit that shortened URL, it will redirect me to my original link.

so if you pass `https://jesusantguerrero.com` as parameter to `https://srt.glitch.me/api/`

`https://srt.glitch.me/api/https://jesusantguerrero.com`

**it will return something like :**

```
{
  "original_url": "https://jesusantguerrero.com",
  "shorten_url": "https://srt.glitch.me/c1f7bf"
}
```

And 
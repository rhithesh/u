async function a() {
  const a = await fetch("https://blinkgenerator.com/api/donation", {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en;q=0.8",
      "content-type": "application/json",
      "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      Referer: "https://blinkgenerator.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: '{"step":3,"title":"hello","imageUrl":"https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?q=80&w=2759&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","description":"eeded","label":"dede","actions":[{"value":"2"},{"value":"02"},{"value":"02"}],"customInput":false,"accept":false,"wallet":"5mi8PQAoUBH4BWvdyxLiorDBccf8CbgxFQD5byiraXcp"}',
    method: "POST",
  });
  console.log(a);
}

a();

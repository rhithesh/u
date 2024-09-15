import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

// GET request handler
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  console.log(id);
  let payload: ActionGetResponse;

  if (id == 1) {
    payload = {
      icon: "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Local icon path
      title: "Donate to Rahul",
      description: "Support Rahul by donating SOL.",
      label: "Donate",
      links: {
        actions: [
          {
            label: "Donate 0.1 SOL",
            href: `${url.href}?amount=0.1`,
          },
          {
            label: "Donate 0.6 SOL",
            href: `${url.href}?amount=0.6`,
          },
          {
            href: "/api/actions/donate?oye={amount}",
            label: "Send SOL", // button text
            parameters: [
              {
                name: "amount", // name template literal
                label: "Enter a SOL amount", // placeholder for the input
              },
            ],
          },
        ],
      },
    };
  } else {
    payload = {
      icon: "https://images.unsplash.com/photo-1721332155637-8b339526cf4c?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Local icon path
      title: "Donate to Rahul",
      description: "Support Arun by donating SOL.",
      label: "Donate",
      links: {
        actions: [
          {
            label: "Donate 0.8 SOL",
            href: `${url.href}?amount=0.8`,
          },
          {
            label: "Donate 0.6 SOL",
            href: `${url.href}?amount=0.6`,
          },
        ],
      },
    };
  }
  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
}

export const OPTIONS = GET; // OPTIONS request handler

// POST request handler
export async function POST(request: Request) {
  const body: ActionPostRequest = await request.json();
  const url = new URL(request.url);
  //const amount = Number(url.searchParams.get("amount")) || 0.1;
  const val = Number(url.searchParams.get("oye")) || 0.1;
  let sender;

  try {
    sender = new PublicKey(body.account);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Invalid account",
        },
      }),
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      },
    );
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender, // Sender public key
      toPubkey: new PublicKey("3kga3vV8FsiRBwhWpwEd1J93Z8coDAigLMY7tx51XhXx"), // Replace with your recipient public key
      lamports: val * LAMPORTS_PER_SOL,
    }),
  );
  transaction.feePayer = sender;
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;
  transaction.lastValidBlockHeight = (
    await connection.getLatestBlockhash()
  ).lastValidBlockHeight;

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: "Transaction created",
    },
  });
  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
}

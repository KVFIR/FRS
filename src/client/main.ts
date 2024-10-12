import { DiscordSDK } from "@discord/embedded-app-sdk";

const discordSdk = new DiscordSDK(process.env.DISCORD_CLIENT_ID!);

async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Здесь будет код для авторизации и получения данных
}

setupDiscordSdk().catch(console.error);

// Здесь будет код для отображения списка событий и взаимодействия с пользователем
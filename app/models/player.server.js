import axios from "axios";

export async function getPlayerInfo(player, region) {
  try {
    const account_id = await getPlayerId(player, region);

    const accountInfo = await getPlayerAccountData(account_id, region);

    return accountInfo;
  } catch (error) {
    throw error;
  }
}

async function getPlayerId(player, region) {
  try {
    const res = await axios.get(
      `https://api.worldoftanks.${region}/wot/account/list/?application_id=${process.env.WOT_TOKEN}&search=${player}`
    );
    const { data } = res;
    if (data.status === "error") throw data.error;
    return data.data[0].account_id;
  } catch (error) {
    throw error;
  }
}

async function getPlayerAccountData(account_id, region) {
  try {
    const res = await axios.get(
      `https://api.worldoftanks.${region}/wot/account/info/?application_id=${process.env.WOT_TOKEN}&account_id=${account_id}`
    );
    const { data } = res;
    if (data.status === "error") throw data.error;
    return data;
  } catch (error) {
    throw error;
  }
}

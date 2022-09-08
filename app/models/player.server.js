import axios from "axios";

export async function getPlayerInfo(player, region) {
  try {
    const account_id = await getPlayerId(player, region);

    const accountInfo = await getPlayerAccountData(account_id, region);

    const tanksInfo = await avgTankStats(account_id, region);
    //  console.log(statistics);
    const wn8expVals = await getWn8ExpVal();

    await getRecentPerTank(wn8expVals, tanksInfo);

    return accountInfo;
  } catch (error) {
    throw error;
  }
}

async function getPlayerId(player, region) {
  console.log("1 req");
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
  console.log("2 req");
  try {
    const res = await axios.get(
      `https://api.worldoftanks.${region}/wot/account/info/?application_id=${process.env.WOT_TOKEN}&account_id=${account_id}`
    );
    const { data } = res;
    if (data.status === "error") throw data.error;

    return {
      battles: data.data[account_id].statistics.all.battles,
      wr:
        (data.data[account_id].statistics.all.wins /
          data.data[account_id].statistics.all.battles) *
        100,
    };
  } catch (error) {
    throw error;
  }
}

async function avgTankStats(account_id, region) {
  console.log("3 req");
  try {
    const res = await axios.get(
      `https://api.worldoftanks.${region}/wot/tanks/stats/?application_id=${process.env.WOT_TOKEN}&account_id=${account_id}`
    );
    const { data } = res;
    if (data.status === "error") throw data.error;
    let listAvg = {};
    const listOwnedTanks = data.data[account_id].map((x) => {
      if (x.all.battles > 0) {
        listAvg[x.tank_id] = {
          avgDef: x.all.dropped_capture_points,
          avgFrag: x.all.frags,
          avgSpot: x.all.spotted,
          avgDamage: x.all.damage_dealt,
          avgWinRate: (x.all.wins / x.all.battles) * 100,
          battles: x.all.battles,
        };
        return x.tank_id;
      } else {
        return null;
      }
    });

    const temp = listOwnedTanks.filter((n) => n);

    return { tanks_list: temp, data: listAvg };
  } catch (error) {
    throw error;
  }
}

async function getWn8ExpVal() {
  console.log("4 req");
  try {
    const res = await axios.get(
      `https://static.modxvm.com/wn8-data-exp/json/wn8exp.json`
    );
    const { data } = res;

    const expVals = data.data.map((x) => {
      return {
        tank: x.IDNum,
        data: {
          expDef: x.expDef,
          expFrag: x.expFrag,
          expSpot: x.expSpot,
          expDamage: x.expDamage,
          expWinRate: x.expWinRate,
        },
      };
    });
    return expVals;
  } catch (error) {
    throw error;
  }
}

async function getRecentPerTank(wn8exp, { tanks_list, data }) {
  const wn8perTank = tanks_list.map((vals) => {
    const wn8expdata = wn8exp.find((x) => x.tank === vals).data;
    if (wn8expdata) {
      const tankData = data[vals];

      const rDAMAGE =
        parseFloat(tankData.avgDamage) /
        (parseFloat(wn8expdata.expDamage) * parseFloat(tankData.battles));

      const rSPOT =
        parseFloat(tankData.avgSpot) /
        (parseFloat(wn8expdata.expSpot) * parseFloat(tankData.battles));
      const rFRAG =
        parseFloat(tankData.avgFrag) /
        (parseFloat(wn8expdata.expFrag) * parseFloat(tankData.battles));
      const rDEF =
        parseFloat(tankData.avgDef) /
        (parseFloat(wn8expdata.expDef) * parseFloat(tankData.battles));
      const rWIN =
        parseFloat(tankData.avgWinRate) / parseFloat(wn8expdata.expWinRate);

      const rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
      const rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
      const rFRAGc = Math.max(
        0,
        Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12))
      );
      const rSPOTc = Math.max(
        0,
        Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38))
      );
      const rDEFc = Math.max(
        0,
        Math.min(rDAMAGEc + 0.1, (rDEF - 0.1) / (1 - 0.1))
      );
      return {
        tank_id: vals,
        wn8: (
          980 * rDAMAGEc +
          210 * rDAMAGEc * rFRAGc +
          155 * rFRAGc * rSPOTc +
          75 * rDEFc * rFRAGc +
          145 * Math.min(1.8, rWINc)
        ).toFixed(2),
      };
    } else {
      return null;
    }
  });
  console.log(wn8perTank);
  //mozna inserta do bazy zajebac
}

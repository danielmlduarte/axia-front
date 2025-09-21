const separateByIatf1 = (reproductions: Reproduction[]): SeparateReturn => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    ((!reproduction.cobIndN2 && !reproduction.cobIndN3 && !reproduction.cobIndRt && reproduction.cobIndToque === 1)
    || (new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") < new Date(reproduction && reproduction.cobIndN2 ? reproduction.cobIndN2 : "")))
  ))

  const iatfTotal = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobData !== ""
  ))
  
  return {
    percentage: iatfTotal.length > 0 ? parseFloat(((iatfConception.length / iatfTotal.length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: iatfTotal.length,
    animals: iatfConception
  }
}

const separateByIatf2 = (reproductions: Reproduction[]): SeparateReturn  => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndN2
    && ((!reproduction.cobIndN3 && !reproduction.cobIndRt && reproduction.cobIndToque === 1)
    || (new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") < new Date(reproduction.cobIndN2)
    && new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") > new Date(reproduction && reproduction.cobData ? reproduction.cobData : "")))
  ))

  const iatfTotal = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndN2
  ))

  return {
    percentage: iatfTotal.length > 0 ? parseFloat(((iatfConception.length / iatfTotal.length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: iatfTotal.length,
    animals: iatfConception
  }
}

const separateByIatf3 = (reproductions: Reproduction[]): SeparateReturn  => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndN3
    && ((!reproduction.cobIndRt && reproduction.cobIndToque === 1)
    || ((new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") < new Date(reproduction && reproduction.cobDataRt ? reproduction.cobDataRt : ""))
    && new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") > new Date(reproduction && reproduction.cobIndN2 ? reproduction.cobIndN2 : "")))
  ))

  const iatfTotal = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobDataToqueN3
  ))

  return {
    percentage: iatfTotal.length > 0 ? parseFloat(((iatfConception.length / iatfTotal.length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: iatfTotal.length,
    animals: iatfConception
  }
}

const separateByRepasse = (reproductions: Reproduction[]): SeparateReturn  => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndRt
    && (new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") > new Date(reproduction && reproduction.cobDataRt ? reproduction.cobDataRt : ""))
    && reproduction.cobIndToque === 1
  ))
  
  const iatfTotal = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndRt
    ))

  return {
    percentage: iatfTotal.length > 0 ? parseFloat(((iatfConception.length / iatfTotal.length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: iatfTotal.length,
    animals: iatfConception
  }
}

const separateByIatfTotal = (reproductions: Reproduction[]): SeparateReturn => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    (!reproduction.cobIndRt || (new Date(reproduction && reproduction.cobDataToque ? reproduction.cobDataToque : "") < new Date(reproduction && reproduction.cobDataRt ? reproduction.cobDataRt : "")))
    && reproduction.cobIndToque === 1
  ))
 
  return {
    percentage: reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length > 0 ? parseFloat(((iatfConception.length / reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length,
    animals: iatfConception
  }
}

const separateByIatfTotalRepasse = (reproductions: Reproduction[]): SeparateReturn => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndToque === 1
  ))

  return {
    percentage: reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length > 0 ? parseFloat(((iatfConception.length / reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: reproductions.filter((reproduction: Reproduction) => (reproduction && reproduction.cobData && reproduction.cobData.length > 0)).length,
    animals: iatfConception
  }
}

const separateByPrenhez = (reproductions: Reproduction[]): SeparateReturn => {
  const iatfConception = reproductions.filter((reproduction: Reproduction) => (
    reproduction.cobIndToque === 1
  ))

  return {
    percentage: reproductions.length > 0 ? parseFloat(((iatfConception.length / reproductions.length) * 100).toFixed(2)) : 0,
    conceptionTotal: iatfConception.length,
    inseminationTotal: reproductions.length,
    animals: iatfConception
  }
}

const getSemenPrenhez = (reproduction: Reproduction) => {
  let defaultResult:string = "";
  let result: any;

  if (reproduction.cobIndToque === 1 && reproduction.cobIndRt === 0 ) {
    result = reproduction.cobIndN3 === 1 ? reproduction.semenIatf3 : reproduction.cobIndN2 === 1 ? reproduction.semenIatf2 : reproduction.semenIatf1;
  }
  
  return result ? result : defaultResult;
}

const separateConceptionsBySemen = (reproductions: Reproduction[]) => {
  const groupedConceptions = reproductions.reduce((group: any, reproduction: Reproduction) => {
    if (getSemenPrenhez(reproduction) !== "") {
      group[getSemenPrenhez(reproduction)] = group[getSemenPrenhez(reproduction)] || [];
      group[getSemenPrenhez(reproduction)].push(reproduction);
    }
    return group;
  }, {});

  return groupedConceptions;
}

const getSemenName = (reproduction: any, iatf: number) => {
  let result:string = "";

  if (reproduction["semenIatf" + iatf] !== "") {
    result = reproduction["semenIatf" + iatf];
  }
  
  return result;
}

const separateIatfBySemen = (reproductions: Reproduction[]) => {
  const groupedSemenName = reproductions.reduce((group: any, reproduction: Reproduction) => {
    for (let x = 1; x < 4; x += 1) {
      if (getSemenName(reproduction, x) !== "") {
        group[getSemenName(reproduction, x)] = group[getSemenName(reproduction, x)] || [];
        group[getSemenName(reproduction, x)].push(reproduction);
      }
    }

    return group;
  }, {});

  delete groupedSemenName.undefined;

  return groupedSemenName;
}

const separateIatfsBySemenAndPhase = (reproductions: Reproduction[], iatf: number) => {
  const groupedSemenName = reproductions.reduce((group: any, reproduction: Reproduction) => {
    if (getSemenName(reproduction, iatf) !== "") {
      group[getSemenName(reproduction, iatf)] = group[getSemenName(reproduction, iatf)] || [];
      group[getSemenName(reproduction, iatf)].push(reproduction);
    }

    return group;
  }, {});

  delete groupedSemenName.undefined;

  return groupedSemenName;
}

const separateIatfsByPhaseAndSemen = (reproductions: Reproduction[]) => {
  const iatf1BySemen = separateIatfsBySemenAndPhase(reproductions, 1);
  const iatf2BySemen = separateIatfsBySemenAndPhase(reproductions, 2);
  const iatf3BySemen = separateIatfsBySemenAndPhase(reproductions, 3);
  
  return {
    iatf1: iatf1BySemen,
    iatf2: iatf2BySemen,
    iatf3: iatf3BySemen
  };
}

export { separateByIatf1, separateByIatf2, separateByIatf3, separateByRepasse, separateByIatfTotal, separateByIatfTotalRepasse, separateConceptionsBySemen, separateIatfBySemen, separateByPrenhez, separateIatfsByPhaseAndSemen }
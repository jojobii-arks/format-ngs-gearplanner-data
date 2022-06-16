const x =
  'Name	BP	HP	PP	MEL Pot%	RNG Pot%	TEC Pot%	Pot Floor%	Dmg Resist%	Burn Resist%	Freeze Resist%	Shock Resist%	Blind Resist%	Panic Resist%	Poison Resist%	Pain Resist%	All Resist%	EXP Grind	Fire Pot%	Ice Pot%	Lightning Pot%	Wind Pot%	Light Pot%	Dark Pot%	Low Temp Resist%	Daytime Pot%	Nighttime Pot%';
const y = x.split('\t');
const z = y.map(e => _.camelCase(e));
console.log(z.join('\t'));

fetch('ngsdata.csv')
  .then(res => res.text())
  .then(res => {
    const x = Papa.parse(res, {
      header: true,
      transformHeader: header => _.camelCase(header),
      dynamicTyping: true,
      transform: e => e.replace('%', '')
    });
    console.log(x.data);
    console.log(Papa.unparse(x));
  });

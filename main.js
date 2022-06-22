const $form = document.querySelector("form#input-csv");
const $jsonOutTextArea = document.querySelector("textarea#json-out");
const $csvOutTextArea = document.querySelector("textarea#csv-out");
$form.addEventListener("submit", e => {
  e.preventDefault();
  const {
    csv: { value }
  } = e.target.elements;
  const [csv, json] = parseDataCsv(value);
  $csvOutTextArea.value = csv;
  $jsonOutTextArea.value = JSON.stringify(json);
});

const $csvFile = document.querySelector("form#input-csv");
const $csvTextArea = document.querySelector("textarea#csv");
$csvFile.addEventListener("change", e => {
  if (!e.target.files) return;
  const [file] = e.target.files;
  if (!file) return;
  file.text().then(val => {
    console.log(val);
    $csvTextArea.value = val;
  });
});

/**
 * Parse direct exports from Google Sheets with Papa Parse
 * @param {string} csv - CSV as a string.
 * @returns {object} augments - Augment data keyed by augment name.
 */
function parseDataCsv(csv) {
  const x = Papa.parse(csv, {
    header: true,
    transformHeader: header => _.camelCase(header),
    dynamicTyping: true,
    transform: e => e.replace("%", "").replace("?", 0)
  });
  const dataAsObject = x.data.reduce((augments, augment) => {
    const newAugment = { ...augment };
    if (augment.name.endsWith(" S")) {
      newAugment.name = augment.name.slice(0, -2);
      newAugment.hasCapsuleS = true;
      augments[augment.name] = newAugment;
    } else {
      newAugment.hasCapsuleS = false;
      augments[augment.name] = newAugment;
    }
    return augments;
  }, {});
  const dataAsArray = Object.values(dataAsObject);
  console.log(dataAsObject);
  const newCsv = Papa.unparse(Object.values(dataAsObject));
  return [newCsv, dataAsArray];
}

export const intToDomImageMap: Record<string, string> = {
  "INT-001": "731851127683", // Vegnar Pro 500 ML Bowl -> 16 Oz Heavy Duty Bowl
  "INT-002": "731851127690", // Vegnar Pro 750 ML Bowl -> 25 Oz Heavy Duty Bowl
  "INT-003": "731851127911", // Bowl Lid -> 24/32 Oz Pet Lid
  "INT-004": "731851127706", // Vegnar Pro 500 ML Container -> 16 Oz Heavy Duty Container
  "INT-005": "731851127713", // Vegnar Pro 650 ML Container -> 22 Oz Heavy Duty Container
  "INT-006": "731851127911", // Container Lid -> 24/32 Oz Pet Lid
  "INT-007": "731851127720", // Vegnar Pro 750 ML Container -> 25 Oz Heavy Duty Container
  "INT-008": "731851127737", // Vegnar Pro 1000 ML Container -> 32 Oz Heavy Duty Container
  "INT-009": "731851127911", // Container Lid -> 24/32 Oz Pet Lid
  "INT-010": "731851127768", // 6 x 6 Clamshell -> ClamShell 6 x 6
  "INT-011": "731851127812", // 9 x 6 Clamshell -> ClamShell 9 x 6
  "INT-012": "731851127775", // 8 x 8 Clamshell -> ClamShell 8 x 8
  "INT-013": "731851127782", // 8 x 8 - 3 CP -> ClamShell 8 x 8 3 CP
  "INT-014": "731851127799", // 9 x 9 Clamshell -> ClamShell 9 x 9
  "INT-015": "731851127805", // 9 x 9 - 3 CP -> ClamShell 9 x 9 3 CP
  "INT-016": "731851127508", // 6 Inch Round Plates -> Round Plate 6 Inch
  "INT-017": "731851127515", // 7 Inch Round Plates -> Round Plate 7 Inch
  "INT-018": "731851127522", // 9 Inch Round Plates -> Round Plate 9 Inch
  "INT-019": "731851127539", // 9 Inch - 3 CP Round Plates -> Round Plate 9 Inch 3 CP
  "INT-020": "731851127546", // 10 Inch Round Plates -> Round Plate 10 Inch
  "INT-021": "731851127553", // 10 Inch - 3 CP Round Plates -> Round Plate 10 Inch 3 CP
  "INT-022": "731851127560", // 11 Inch Round Plates -> Round Plate 11 Inch
  "INT-023": "731851127577", // 11 Inch - 4 CP Round Plates -> Round Plate 11 Inch 4 CP
  "INT-024": "731851127584", // 12 Inch Round Plates -> Round Plate 12 Inch
  "INT-025": "731851127591", // 12 Inch - 4 CP Round Plates -> Round Plate 12 Inch 4 CP
  "INT-026": "731851127546", // 10 Inch Oval Plate -> 10 Inch Round Plate
  "INT-027": "731851127584", // 12 Inch Oval Plate -> 12 Inch Round Plate
  "INT-028": "731851127607", // 6 Inch Square Tray -> Square Plate 6 Inch Tray
  "INT-029": "731851127614", // 7 Inch Square Tray -> Square Plate 7 Inch Tray
  "INT-030": "731851127621", // 9 Inch - 3 CP Square Tray -> Meal Tray 9 Inch 3 CP
  "INT-031": "731851127942", // 10 Inch - 3 CP Square Tray -> Meal Tray 10 Inch 3 CP
  "INT-032": "731851127973", // 5 CP Meal Tray 12 Inch -> Meal Tray 12 Inch 5 CP
  "INT-033": "731851127638", // 5 CP Meal Tray 11 Inch -> Meal Tray 11 Inch 5 CP
  "INT-034": "731851127973", // 5 CP Mid Day Meal Tray 10 Inch -> Meal Tray 12 Inch 5 CP
  "INT-035": "731851127973", // 4 CP Meal Tray -> Meal Tray 12 Inch 5 CP
  "INT-036": "731851127973", // 6 CP Meal Tray -> Meal Tray 12 Inch 5 CP
  "INT-037": "731851127959", // 12 Inch - 9 CP Round Meal Tray -> Round Plate 12 Inch 9 CP
  "INT-038": "731851127744", // 3 CP Heavy Duty Meal Tray -> Heavy Duty Meal Tray 3 CP
  "INT-039": "731851127751", // 5 CP Heavy Duty Meal Tray -> Heavy Duty Meal Tray 5 CP
  "INT-040": "731851127966", // 4 x 4 Dona -> 4 x 4 Dona
  "INT-041": "731851127652", // 180 ML Bowl (6 Oz) -> Bowl 180 ML 6 Oz
  "INT-042": "731851127669", // 240 ML Bowl (8 Oz) -> Bowl 240 ML 8 Oz
  "INT-043": "731851127676", // 360 ML Bowl (12 Oz) -> Bowl 360 ML 12 Oz
  "INT-044": "731851127898", // 750 ML Bowl (24 Oz) -> Bowl 750 ML 25 Oz
  "INT-045": "731851127904", // 1000 ML Bowl (32 Oz) -> Bowl 1000 ML 32 Oz
  "INT-046": "731851127911", // Bowl Pet Lids -> 750/1000 ML Crystal Clear PET Bowl Lid
  "INT-047": "731851127850", // 250 ML Coffee Cups (8 Oz) -> Coffee Cup 250 ML
  "INT-048": "731851127829", // 80 MM Sipper Lids -> Sipper Lid 80 mm
  "INT-049": "731851127836", // 90 MM Sipper Lids -> Sipper Lid 90 mm
  "INT-050": "731851127843", // 90 MM Flat Lids -> 90 mm Flat Strew Cuts Lids
};

/**
 * Returns the mapped domestic item code for image mapping if the code is international.
 */
export function getImageItemCode(itemCode: string): string {
  if (itemCode.startsWith("INT-")) {
    return intToDomImageMap[itemCode] || itemCode;
  }
  return itemCode;
}

// Got this from the full file (countries.geojson), since it doesn't exist in medium res. Still very small, so doesn't really matter
import { Feature } from "geojson";

export const gibraltar: Feature = {
  "type": "Feature",
  "properties": {
    "ADMIN": "Gibraltar",
    "admin": "Gibraltar",
    "ISO_A3": "GIB",
    "ISO_A2": "GI"
  },
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [[[[-5.358386758763487, 36.141109447088297], [-5.338773483119979, 36.141119672012252], [-5.339914516999897, 36.129828192000076], [-5.339060024999895, 36.123846747000073], [-5.34203040299991, 36.110500393000052], [-5.350249803999901, 36.119289455000029], [-5.358386758763487, 36.141109447088297]]]]
  }
};

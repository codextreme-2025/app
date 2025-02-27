import "react-native-get-random-values";

import { getCurrentLocation } from "./loaders/location";
import { getCurrentSignals } from "./loaders/signals";
import { LocationModel } from "./model";

export class Localiser {
   model = new LocationModel();

   async measureAndSave() {
      const location = await getCurrentLocation();
      const signals = await getCurrentSignals();

      await this.model.addFingerprint(location, signals);

      console.log((await this.model.getFingerprints()).length);
   }

   async whereAmI() {
      const signals = await getCurrentSignals();

      const location = await this.model.myPosition(signals);

      return location;
   }
}

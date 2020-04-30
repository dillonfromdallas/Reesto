import shapeData from "../../Helpers/shapeData";
import { Restaurant } from "../../Models/Restaurant";
import { RestaurantDto } from "../../Models/RestaurantDto";

export default async function() {
  const query = async () => {
    const base = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
    const key = "q3MNxtfep8Gt";

    const data = await fetch(base, {
      headers: {
        Authorization: `Api-Key ${key}`
      }
    });

    const res: RestaurantDto[] = await data.json();
    return res;
  };

  const data = await query();
  return shapeData(data);
}

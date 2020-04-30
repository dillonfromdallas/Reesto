import { Restaurant } from "../Models/Restaurant";
import { RestaurantDto } from "../Models/RestaurantDto";
import { Hours } from "../Models/Hours";
import processHours from "../Helpers/processHours";

export default function(restaurants: RestaurantDto[]): Restaurant[] {
  let processed: Restaurant[] = [];

  restaurants.map((entry: RestaurantDto) => {
    let {
      address1,
      attire,
      city,
      genre,
      hours,
      id,
      lat,
      long,
      name,
      state,
      tags,
      telephone,
      website,
      zip
    } = entry;
    const processedGenre: string[] = genre.split(",");
    const processedHours: Hours = processHours(hours); // Set Hours logic here.
    const processedTags: string[] = tags.split(",");
    processed.push({
      address1,
      attire,
      city,
      genre: processedGenre,
      hours: processedHours,
      id,
      lat,
      long,
      name,
      state,
      tags: processedTags,
      telephone,
      website,
      zip
    });
  });

  return processed.sort((a, b) => a.name.localeCompare(b.name));
}
